import { useEffect, useState } from "react";
import { deleteService, fetchServiceApi } from "@/api/Route";
import { AddServices } from "../../components/admin_components/add_services/AddServices";
import { ServiceProps } from "./type";
import { EditServices } from "@/components/admin_components/editservices/EditServices";

const MAX_DESCRIPTION_LENGTH = 100;

const Service = () => {
  const [services, setServices] = useState<ServiceProps[] | []>([]);
  const [selectedService, setSelectedService] = useState<ServiceProps | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchServices = async () => {
    try {
      const response = await fetchServiceApi();
      console.log(response, "response");

      if (response?.status === 200) {
        setServices(response.data);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const handleDelete = async (serviceid: number) => {
    try {
      const response = await deleteService(serviceid);
      console.log(response);

      if (response?.status === 204) {
        fetchServices();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const openModal = (service: ServiceProps) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <div className="flex justify-end mb-5">
        <AddServices onServiceAdded={fetchServices} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="h-40">
              <img
                className="w-full h-full object-cover"
                src={service.image}
                alt={service.name}
              />
            </div>
            <h3 className="text-lg font-semibold my-2">{service.name}</h3>
            <p>
              {service?.description &&
              service?.description?.length > MAX_DESCRIPTION_LENGTH
                ? `${service?.description?.slice(0, MAX_DESCRIPTION_LENGTH)}...`
                : service.description}
            </p>
            {service.description &&
              service.description.length > MAX_DESCRIPTION_LENGTH && (
                <button
                  className="text-blue-600 underline mt-2"
                  onClick={() => openModal(service)}
                >
                  View More
                </button>
              )}
            <div className="flex justify-end mt-4 space-x-2">
              <EditServices
                serviceId={service.id}
                onServiceAdded={fetchServices}
              />
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDelete(service.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-screen overflow-y-auto">
            <div className="relative w-full h-48">
              {selectedService.image ? (
                <img
                  src={selectedService.image}
                  alt={selectedService.name || "Service Image"}
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
                {selectedService.name || "Untitled Service"}
              </h2>
              <p className="text-gray-700">{selectedService.description}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
