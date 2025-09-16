import React from "react";
import { motion, useDragControls } from "framer-motion";
import { FaGripVertical } from "react-icons/fa";

interface UniversalGrabBoxProps {
  children: React.ReactNode;
}

const UniversalGrabBox: React.FC<UniversalGrabBoxProps> = ({ children }) => {
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragControls={controls}
      dragMomentum={false}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 cursor-move"
    >
      <div
        onPointerDown={(e) => controls.start(e)}
        className="flex items-center gap-2 mb-4 text-gray-400 hover:text-gray-600"
      >
        <FaGripVertical />
        <span className="text-sm">Drag me</span>
      </div>
      {children}
    </motion.div>
  );
};

export default UniversalGrabBox;