import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaDownload } from "react-icons/fa";

const FileMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const mergeFiles = () => {
    // Mock merge functionality
    alert("Files merged successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
        <FaFileAlt /> File Merger
      </h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      />
      {files.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selected files:</p>
          <ul className="text-sm">
            {files.map((file, idx) => (
              <li key={idx} className="text-gray-800">{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={mergeFiles}
        disabled={files.length === 0}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FaDownload /> Merge Files
      </motion.button>
    </motion.div>
  );
};

export default FileMerger;