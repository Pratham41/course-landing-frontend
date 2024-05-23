import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  phone: string;
}

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  dob: Yup.date().required("Date of Birth is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
});

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = async (
    values: SignupFormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log(values);
    const dataToSend = {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone,
      dob: values.dob,
    };
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (!response.ok) {
        toast.error("Registration Failed!",{position:"top-center"});
        throw new Error("Registration failed");
      }
      toast.success("Registration Successful!",{position:"top-center"});
      setSubmitting(false);
    } catch (error) {
      toast.error("Registration Failed!",{position:"top-center"});
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Register</h2>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            phone: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  autoFocus={true}
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-gray-700"
                >
                  DOB
                </label>
                <Field
                  type="date"
                  id="dob"
                  name="dob"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="dob"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignupModal;
