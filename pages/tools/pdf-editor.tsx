import dynamic from 'next/dynamic';
import React from 'react';

const PDFEditor = dynamic(() => import('../../components/tools/PDFEditor'), { ssr: false });

export default function PDFEditorPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">PDF Editor</h1>
      <PDFEditor />
    </div>
  );
}
