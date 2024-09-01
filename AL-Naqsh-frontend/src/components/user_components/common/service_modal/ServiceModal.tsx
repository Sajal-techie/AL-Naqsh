import React from "react";
import { motion } from "framer-motion";
import { ModalProps } from "./type";
import { useNavigate } from "react-router-dom";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imgSrc,
  title,
  description,
}) => {
  const navigate = useNavigate()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        className="bg-white rounded-lg p-8 max-w-lg w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-full h-48">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={title || "Service Image"}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">
            {title || "Untitled Service"}
          </h2>
          <p className="text-gray-700">{description}</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={()=>navigate('/contact')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Contact
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
