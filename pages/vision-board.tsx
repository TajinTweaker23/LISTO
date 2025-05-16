import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

type ItemProps = {
  id: string;
  url: string;
  index: number;
  onRemove: (id: string) => void;
};

function SortableImage({ id, url, index, onRemove }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
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
      className="rounded-xl overflow-hidden bg-white shadow hover:shadow-lg relative"
    >
      <img src={url} alt={`Vision ${index}`} className="w-full h-56 object-cover" />
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
      >
        ✖
      </button>
    </div>
  );
}

export default function DragDropVisionBoard() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [items, setItems] = useState<{ id: string; url: string }[]>([]);
  const [input, setInput] = useState('');

  const userId = user?.uid;

  useEffect(() => {
    if (!userId) return;
    const loadImages = async () => {
      const docRef = doc(db, 'visionBoards', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItems(docSnap.data().images || []);
      }
    };
    loadImages();
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    setDoc(doc(db, 'visionBoards', userId), { images: items });
  }, [items, userId]);

  const handleAdd = () => {
    if (!input.trim()) return;
    const newItem = {
      id: `${Date.now()}`,
      url: input.trim(),
    };
    setItems((prev) => [...prev, newItem]);
    setInput('');
  };

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
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
          <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {items.map((item, index) => (
                <SortableImage
                  key={item.id}
                  id={item.id}
                  url={item.url}
                  index={index}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
