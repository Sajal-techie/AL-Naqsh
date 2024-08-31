import { useState } from "react";
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
import { AddServicesSchema } from "@/yup/validation";
import { useFormik } from "formik";
import { addServiceApi } from "@/api/Route";
import { valuesProps } from "./type";

interface AddServicesProps {
  onServiceAdded: () => void;
}

export function AddServices({ onServiceAdded }: AddServicesProps) {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialValues: valuesProps = {
    name: "",
    description: "",
    image: null,
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: AddServicesSchema,
    onSubmit: async (values: valuesProps) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        if (values.image) {
          formData.append("image", values.image);
        }

        const response = await addServiceApi(formData);
        if (response?.status === 201) {
          resetForm();
          setImagePreview(null);
          onServiceAdded();
          setOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

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
          className="bg-black hover:bg-black"
          onClick={() => setOpen(true)}
        >
          Add service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-4/6 overflow-auto ">
        <form action="" onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
            <DialogDescription>
              Fill in the details below to add a new service. Click save when
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
                className="border border-gray-300 rounded-md !border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              {touched.description && errors.description && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.description}
                </p>
              )}
            </div>
            {imagePreview ? (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Selected Preview"
                  className="w-full h-auto rounded-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  title="remove"
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
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
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label htmlFor="image">Upload image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border border-gray-300 rounded-md !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                />
                {touched.image && errors.image && (
                  <p className="pt-2 text-xs italic text-red-500">
                    {errors.image}
                  </p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
