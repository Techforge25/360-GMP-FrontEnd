// Simple toaster message implementation
// In a real app, integrate with sonner, react-hot-toast, or similar
import { toast } from "react-toastify";

export const showSuccess = (message) => {
  // console.log("Success:", message);
  toast.success(message);
};

export const showError = (message) => {
  console.error("Error:", message);
  toast.error(message);
};
