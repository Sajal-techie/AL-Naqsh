import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { editServiceApi, fetchSingleServiceApi } from "@/api/Route";
import { valuesProps } from "../add_services/type";
import { useFormik } from "formik";
import { EditServicesSchema } from "@/yup/validation";

interface EditServicesProps {
  serviceId: number;
  onServiceAdded: () => void;
}

export function EditServices({ serviceId, onServiceAdded }: EditServicesProps) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState<valuesProps | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fetchSingleservice = async () => {
    const response = await fetchSingleServiceApi(serviceId);
    if (response?.status === 200) {
      setService(response.data);
      setImagePreview(response.data.image);
    }
  };

  useEffect(() => {
    if (serviceId) {
      fetchSingleservice();
    }
  }, [serviceId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: service?.name || "",
      description: service?.description || "",
      image: null,
    },
    validationSchema: EditServicesSchema(!!imagePreview),
    onSubmit: async (values: valuesProps) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }
        const response = await editServiceApi(serviceId, formData);
        console.log(response);
        if (response?.status === 200) {
          resetForm();
          onServiceAdded();
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  const {
    resetForm,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    handleSubmit,
    touched,
    errors,
  } = formik;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFieldValue("image", null);
    setImagePreview(null);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-700"
          onClick={() => setOpen(true)}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-5/6 overflow-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Edit the details below to update the service. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Enter service name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border border-gray-300 rounded-md !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              {touched.name && errors.name && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Enter service description</label>
              <textarea
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                className="border border-gray-300 rounded-md !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              {touched.description && errors.description && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Upload image</label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Service"
                    className="w-full h-auto mb-2"
                  />
                  <Button
                    variant="destructive"
                    className="absolute top-0 right-0 mt-2 mr-2"
                    onClick={removeImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </Button>
                </div>
              ) : (
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-md !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                />
              )}
              {touched.image && errors.image && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.image}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
