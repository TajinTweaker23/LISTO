import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';

type Goal = {
  id: string;
  url: string;
  checklist?: { id: string; text: string; done: boolean }[];
  notes?: string;
};

function SortableCard({ item, index, onRemove, onOpen }: {
  item: Goal;
  index: number;
  onRemove: (id: string) => void;
  onOpen: (goal: Goal) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="rounded-xl overflow-hidden bg-white shadow hover:shadow-xl relative border-2 border-transparent hover:border-blue-500"
    >
      <img src={item.url} alt={`Vision ${index}`} className="w-full h-56 object-cover" />
      <div className="absolute top-2 right-2 flex gap-2">
        <button onClick={() => onRemove(item.id)} className="bg-red-600 text-white px-2 py-1 rounded text-xs">✖</button>
        <button onClick={() => onOpen(item)} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Details</button>
      </div>
    </div>
  );
}

export default function VisionBoard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [items, setItems] = useState<Goal[]>([]);
  const [input, setInput] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [note, setNote] = useState('');
  const [checklist, setChecklist] = useState<{ id: string; text: string; done: boolean }[]>([]);

  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      const docSnap = await getDoc(doc(db, 'visionBoards', userId));
      if (docSnap.exists()) {
        setItems(docSnap.data().images || []);
      }
    };
    load();
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setDoc(doc(db, 'visionBoards', userId), { images: items });
    }
  }, [items, userId]);

  const handleAdd = () => {
    if (!input.trim()) return;
    const newItem: Goal = {
      id: `${Date.now()}`,
      url: input.trim(),
      checklist: [],
      notes: '',
    };
    setItems(prev => [...prev, newItem]);
    setInput('');
  };

  const handleRemove = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over?.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSaveDetails = () => {
    if (!selectedGoal) return;
    const updated = items.map(item =>
      item.id === selectedGoal.id
        ? { ...item, notes: note, checklist }
        : item
    );
    setItems(updated);
    setSelectedGoal(null);
  };

  const handleAddChecklistItem = () => {
    const newItem = { id: `${Date.now()}`, text: '', done: false };
    setChecklist(prev => [...prev, newItem]);
  };

  const handleChecklistChange = (id: string, field: 'text' | 'done', value: any) => {
    setChecklist(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">✨ Vision Board</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 px-4 py-2 border rounded shadow-sm"
          />
          <button
            onClick={handleAdd}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Add Image
          </button>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item, index) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={handleRemove}
                  onOpen={(goal) => {
                    setSelectedGoal(goal);
                    setNote(goal.notes || '');
                    setChecklist(goal.checklist || []);
                  }}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold">Details</h2>
            <div>
              <label className="font-medium">Checklist</label>
              {checklist.map(item => (
                <div key={item.id} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) => handleChecklistChange(item.id, 'done', e.target.checked)}
                  />
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => handleChecklistChange(item.id, 'text', e.target.value)}
                    className="flex-1 border px-2 py-1 rounded"
                  />
                </div>
              ))}
              <button
                onClick={handleAddChecklistItem}
                className="text-blue-600 text-sm mt-2"
              >
                + Add checklist item
              </button>
            </div>
            <div>
              <label className="font-medium">Notes</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedGoal(null)} className="text-sm text-gray-500">Cancel</button>
              <button
                onClick={handleSaveDetails}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
