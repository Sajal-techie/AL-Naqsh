import React, { useState } from "react";
import { motion } from "framer-motion";
import { serviceCardProps } from "./type"; // Adjust the path if necessary
import Modal from "../service_modal/ServiceModal";

const MAX_DESCRIPTION_LENGTH = 200;

const gridSqureVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ServiceCard: React.FC<serviceCardProps> = ({
  imgSrc,
  title,
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shortDescription =
    description && description.length > MAX_DESCRIPTION_LENGTH
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
        variants={gridSqureVariants}
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
          <p className="text-gray-700">
            {shortDescription || "No description available for this service."}
          </p>
        </div>
        {description && description.length > MAX_DESCRIPTION_LENGTH && (
          <div className="p-6">
            <button onClick={openModal} className="text-blue-600 underline">
              View Details
            </button>
          </div>
        )}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        imgSrc={imgSrc}
        title={title}
        description={description}
      />
    </>
  );
};
export default ServiceCard;
