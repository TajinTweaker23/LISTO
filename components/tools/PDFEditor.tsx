import React, { useState, useRef } from 'react';
// @ts-ignore
import { Document, Page, pdfjs } from 'react-pdf';
import { HexColorPicker } from 'react-colorful';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [color, setColor] = useState<string>('#000000');
  const [mode, setMode] = useState<'crop' | 'draw' | 'editText' | 'insertText' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [actions, setActions] = useState<any[]>([]); // Undo/redo stack
  const [redoStack, setRedoStack] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawPoints, setDrawPoints] = useState<{x:number,y:number}[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const [insertPos, setInsertPos] = useState<{x:number,y:number}|null>(null);
  // For crop, store crop box
  const [cropBox, setCropBox] = useState<{x:number,y:number,w:number,h:number}|null>(null);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // --- Drawing Logic ---
  function handleCanvasMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (mode === 'draw') {
      setIsDrawing(true);
      setDrawPoints([{x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}]);
    }
    if (mode === 'insertText') {
      setInsertPos({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
    }
    if (mode === 'crop') {
      setCropBox({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY, w: 0, h: 0});
    }
  }

  function handleCanvasMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isDrawing && mode === 'draw') {
      setDrawPoints(prev => [...prev, {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}]);
    }
    if (mode === 'crop' && cropBox) {
      setCropBox(box => box ? {...box, w: e.nativeEvent.offsetX - box.x, h: e.nativeEvent.offsetY - box.y} : null);
    }
  }

  function handleCanvasMouseUp() {
    if (isDrawing && mode === 'draw') {
      setIsDrawing(false);
      setActions(prev => [...prev, {type: 'draw', points: drawPoints, color}]);
      setDrawPoints([]);
      setRedoStack([]);
    }
    if (mode === 'crop' && cropBox) {
      setActions(prev => [...prev, {type: 'crop', box: cropBox}]);
      setRedoStack([]);
    }
  }

  // --- Undo/Redo ---
  function handleUndo() {
    if (actions.length > 0) {
      setRedoStack([actions[actions.length-1], ...redoStack]);
      setActions(actions.slice(0, -1));
    }
  }
  function handleRedo() {
    if (redoStack.length > 0) {
      setActions([...actions, redoStack[0]]);
      setRedoStack(redoStack.slice(1));
    }
  }

  // --- Text Edit/Insert ---
  function handleInsertText() {
    if (insertPos && textInput) {
      setActions(prev => [...prev, {type: 'insertText', text: textInput, pos: insertPos, color}]);
      setTextInput("");
      setInsertPos(null);
      setRedoStack([]);
    }
  }

  // --- Export/Download ---
  async function handleExport() {
    if (!file) return;
    const { PDFDocument } = await import('pdf-lib');
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    // Apply actions to PDF
    for (const action of actions) {
      if (action.type === 'insertText') {
        const page = pdfDoc.getPage(pageNumber-1);
        page.drawText(action.text, {
          x: action.pos.x,
          y: 700-action.pos.y, // invert y for PDF
          color: action.color,
          size: 18,
        });
      }
      // Crop, draw, editText can be implemented here (draw/crop would require rendering to image and embedding)
    }
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'edited.pdf';
    link.click();
  }

  // --- Canvas Rendering ---
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    // Draw actions
    actions.forEach(action => {
      if (action.type === 'draw') {
        ctx!.strokeStyle = action.color;
        ctx!.beginPath();
        action.points.forEach((pt, i) => {
          if (i === 0) ctx!.moveTo(pt.x, pt.y);
          else ctx!.lineTo(pt.x, pt.y);
        });
        ctx!.stroke();
      }
      if (action.type === 'insertText') {
        ctx!.fillStyle = action.color;
        ctx!.font = '18px sans-serif';
        ctx!.fillText(action.text, action.pos.x, action.pos.y);
      }
      if (action.type === 'crop' && action.box) {
        ctx!.strokeStyle = 'red';
        ctx!.strokeRect(action.box.x, action.box.y, action.box.w, action.box.h);
      }
    });
    // Draw current crop box
    if (mode === 'crop' && cropBox) {
      ctx!.strokeStyle = 'blue';
      ctx!.strokeRect(cropBox.x, cropBox.y, cropBox.w, cropBox.h);
    }
    // Draw current drawing
    if (isDrawing && drawPoints.length > 0) {
      ctx!.strokeStyle = color;
      ctx!.beginPath();
      drawPoints.forEach((pt, i) => {
        if (i === 0) ctx!.moveTo(pt.x, pt.y);
        else ctx!.lineTo(pt.x, pt.y);
      });
      ctx!.stroke();
    }
  }, [actions, drawPoints, color, mode, cropBox, isDrawing]);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4 flex gap-4 items-center">
        <input type="file" accept="application/pdf" onChange={onFileChange} />
        <button onClick={() => setMode('crop')} className={mode==='crop'?"bg-sage-500 text-white px-3 py-1 rounded":"px-3 py-1 rounded border"}>Crop</button>
        <button onClick={() => setMode('draw')} className={mode==='draw'?"bg-sage-500 text-white px-3 py-1 rounded":"px-3 py-1 rounded border"}>Draw</button>
        <button onClick={() => setMode('editText')} className={mode==='editText'?"bg-sage-500 text-white px-3 py-1 rounded":"px-3 py-1 rounded border"}>Edit Text</button>
        <button onClick={() => setMode('insertText')} className={mode==='insertText'?"bg-sage-500 text-white px-3 py-1 rounded":"px-3 py-1 rounded border"}>Insert Text</button>
        <HexColorPicker color={color} onChange={setColor} />
        <button onClick={handleUndo} disabled={actions.length===0} className="px-3 py-1 rounded border">Undo</button>
        <button onClick={handleRedo} disabled={redoStack.length===0} className="px-3 py-1 rounded border">Redo</button>
        <button onClick={handleExport} className="px-3 py-1 rounded border bg-blue-500 text-white">Export PDF</button>
      </div>
      <div className="flex gap-4">
        <div>
          {file && (
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF...</div>}
            >
              <Page pageNumber={pageNumber} width={500} />
            </Document>
          )}
          <div className="mt-2 flex gap-2">
            <button disabled={pageNumber<=1} onClick={()=>setPageNumber(pageNumber-1)}>Prev</button>
            <span>Page {pageNumber} of {numPages}</span>
            <button disabled={pageNumber>=numPages} onClick={()=>setPageNumber(pageNumber+1)}>Next</button>
          </div>
        </div>
        <div style={{position:'relative'}}>
          <canvas 
            ref={canvasRef} 
            width={500} 
            height={700} 
            style={{border:'1px solid #ccc'}} 
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
          />
          {mode==='insertText' && insertPos && (
            <div style={{position:'absolute', left:insertPos.x, top:insertPos.y, background:'#fff', border:'1px solid #ccc', padding:'2px'}}>
              <input 
                type="text" 
                value={textInput} 
                onChange={e=>setTextInput(e.target.value)} 
                onBlur={handleInsertText}
                autoFocus
                style={{width:'120px'}}
              />
              <button onClick={handleInsertText}>Insert</button>
            </div>
          )}
        </div>
      </div>
      {/* --- PICKUP POINT FOR NEXT PHASE --- */}
      {/* Next: Multi-page editing, collaborative features, annotation/signature, enhanced UI/UX */}
    </div>
  );
}
