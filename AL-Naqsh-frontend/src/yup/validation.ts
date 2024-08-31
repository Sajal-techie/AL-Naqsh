import * as Yup from "yup";

export const AddServicesSchema = Yup.object({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your service name"),
  description: Yup.string()
    .min(10, "Too Short!")
    .required("Please enter your service description"),
  image: Yup.mixed().required("Please upload an image"),
});

export const EditServicesSchema = (isImage: boolean) =>
  Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please enter your service name"),
    description: Yup.string()
      .min(10, "Too Short!")
      .required("Please enter your service description"),
    image: Yup.mixed()
      .nullable()
      .test("image", "Please upload an image", function (value) {
        if (isImage) {
          return true;
        }
        return value != null;
      }),
  });
