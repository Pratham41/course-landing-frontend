"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const react_toastify_1 = require("react-toastify");
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
const SignupModal = ({ isOpen, onClose }) => {
    if (!isOpen)
        return null;
    const handleSubmit = (values_1, _a) => __awaiter(void 0, [values_1, _a], void 0, function* (values, { setSubmitting }) {
        console.log(values);
        const dataToSend = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone: values.phone,
            dob: values.dob,
        };
        try {
            const response = yield fetch("http://localhost:5000/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            if (!response.ok) {
                react_toastify_1.toast.error("Registration Failed!", { position: "top-center" });
                throw new Error("Registration failed");
            }
            react_toastify_1.toast.success("Registration Successful!", { position: "top-center" });
            setSubmitting(false);
        }
        catch (error) {
            react_toastify_1.toast.error("Registration Failed!", { position: "top-center" });
            setSubmitting(false);
        }
        finally {
            setSubmitting(false);
        }
        onClose();
    });
    return (<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4">Register</h2>
        <formik_1.Formik initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            dob: "",
            phone: "",
        }} validationSchema={SignupSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (<formik_1.Form>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <formik_1.Field autoFocus={true} type="text" id="firstName" name="firstName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"/>
                <formik_1.ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1"/>
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <formik_1.Field type="text" id="lastName" name="lastName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"/>
                <formik_1.ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1"/>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <formik_1.Field type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"/>
                <formik_1.ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1"/>
              </div>
              <div className="mb-4">
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                  DOB
                </label>
                <formik_1.Field type="date" id="dob" name="dob" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"/>
                <formik_1.ErrorMessage name="dob" component="div" className="text-red-500 text-xs mt-1"/>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <formik_1.Field type="text" id="phone" name="phone" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 outline-none"/>
                <formik_1.ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1"/>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </formik_1.Form>)}
        </formik_1.Formik>
        <button onClick={onClose} className="mt-4 text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
          Cancel
        </button>
      </div>
    </div>);
};
exports.default = SignupModal;
