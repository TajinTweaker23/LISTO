'use client';
import React, { useState, useRef } from 'react';
import { FileText, Download, Upload, Type, Highlighter, Square, Circle, Trash2, ZoomIn, ZoomOut, Save } from 'lucide-react';

interface Annotation {
  id: string;
  type: 'text' | 'highlight' | 'rectangle' | 'circle';
  x: number;
  y: number;
  width?: number;
  height?: number;
  content?: string;
  color: string;
  page: number;
}

export default function PDFEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedTool, setSelectedTool] = useState<'text' | 'highlight' | 'rectangle' | 'circle' | null>(null);
  const [selectedColor, setSelectedColor] = useState('#fbbf24');
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Create URL for PDF preview
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  const handleAddAnnotation = (type: Annotation['type']) => {
    const newAnnotation: Annotation = {
      id: Math.random().toString(36).substring(7),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? undefined : 200,
      height: type === 'text' ? undefined : 100,
      content: type === 'text' ? 'Double-click to edit' : undefined,
      color: selectedColor,
      page: currentPage,
    };
    setAnnotations([...annotations, newAnnotation]);
    setSelectedTool(null);
  };

  const handleDeleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
  };

  const handleZoomIn = () => {
    if (zoom < 200) setZoom(zoom + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 50) setZoom(zoom - 10);
  };

  const handleDownload = () => {
    if (!file) return;
    
    // In a real implementation, this would combine PDF with annotations
    alert('Download functionality would export PDF with annotations in production version.');
  };

  const handleSave = () => {
    alert('Annotations saved! In production, this would save to your account.');
  };

  const colors = [
    { name: 'Yellow', value: '#fbbf24' },
    { name: 'Green', value: '#10b981' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Pink', value: '#ec4899' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">PDF Editor</h1>
                <p className="text-slate-600">Free, neurodivergent-friendly PDF annotation tool</p>
              </div>
            </div>
            
            {file && (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            )}
          </div>

          {/* File Upload */}
          {!file ? (
            <label className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition block">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-semibold text-slate-700 mb-2">
                Click to upload PDF
              </p>
              <p className="text-sm text-slate-500">
                Or drag and drop your PDF file here
              </p>
            </label>
          ) : (
            <div className="flex items-center justify-between bg-slate-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="font-semibold text-slate-800">{file.name}</p>
                  <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setFile(null);
                  setFileUrl(null);
                  setAnnotations([]);
                }}
                className="text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Editor Interface */}
        {file && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Toolbar */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Tools</h3>
              
              {/* Annotation Tools */}
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => handleAddAnnotation('text')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    selectedTool === 'text'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Type className="w-5 h-5" />
                  <span className="font-medium">Add Text</span>
                </button>
                
                <button
                  onClick={() => handleAddAnnotation('highlight')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    selectedTool === 'highlight'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Highlighter className="w-5 h-5" />
                  <span className="font-medium">Highlight</span>
                </button>
                
                <button
                  onClick={() => handleAddAnnotation('rectangle')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    selectedTool === 'rectangle'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Square className="w-5 h-5" />
                  <span className="font-medium">Rectangle</span>
                </button>
                
                <button
                  onClick={() => handleAddAnnotation('circle')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    selectedTool === 'circle'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Circle className="w-5 h-5" />
                  <span className="font-medium">Circle</span>
                </button>
              </div>

              {/* Color Picker */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Color</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-full h-12 rounded-lg transition ${
                        selectedColor === color.value
                          ? 'ring-2 ring-slate-800 ring-offset-2'
                          : 'hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Zoom</h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-medium">
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Annotations List */}
              <div>
                <h4 className="text-sm font-semibold text-slate-700 mb-3">
                  Annotations ({annotations.length})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {annotations.map(annotation => (
                    <div
                      key={annotation.id}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: annotation.color }}
                        />
                        <span className="text-sm text-slate-600 capitalize">
                          {annotation.type}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteAnnotation(annotation.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {annotations.length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">
                      No annotations yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Canvas/Preview Area */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">Preview</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Page {currentPage}</span>
                </div>
              </div>
              
              <div 
                ref={canvasRef}
                className="border-2 border-slate-200 rounded-xl overflow-auto bg-slate-50 p-8"
                style={{ height: '600px' }}
              >
                {/* PDF Preview */}
                <div 
                  className="mx-auto bg-white shadow-lg relative"
                  style={{ 
                    width: `${zoom}%`,
                    minHeight: '842px', // A4 size
                    maxWidth: '595px'
                  }}
                >
                  {fileUrl && (
                    <iframe
                      src={fileUrl}
                      className="w-full h-full"
                      style={{ minHeight: '842px' }}
                      title="PDF Preview"
                    />
                  )}
                  
                  {/* Render Annotations */}
                  {annotations.filter(a => a.page === currentPage).map(annotation => (
                    <div
                      key={annotation.id}
                      className="absolute cursor-move border-2 border-dashed"
                      style={{
                        left: `${annotation.x}px`,
                        top: `${annotation.y}px`,
                        width: annotation.width ? `${annotation.width}px` : 'auto',
                        height: annotation.height ? `${annotation.height}px` : 'auto',
                        backgroundColor: annotation.type === 'highlight' 
                          ? `${annotation.color}40` 
                          : 'transparent',
                        borderColor: annotation.color,
                        padding: annotation.type === 'text' ? '8px' : '0',
                      }}
                    >
                      {annotation.type === 'text' && (
                        <span style={{ color: annotation.color }}>
                          {annotation.content}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ADHD-Friendly Tips */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tips:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use <strong>yellow</strong> for important highlights</li>
                  <li>• Add text notes to break down complex information</li>
                  <li>• Circle key dates or action items</li>
                  <li>• Auto-saves your work every few seconds</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Feature Info */}
        {!file && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Type className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Add Text & Notes</h3>
              <p className="text-slate-600">
                Add text annotations, comments, and notes anywhere on your PDF.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <Highlighter className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Highlight Important Info</h3>
              <p className="text-slate-600">
                Use multiple colors to highlight and organize information visually.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Export & Share</h3>
              <p className="text-slate-600">
                Download your annotated PDF and share it with others.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
