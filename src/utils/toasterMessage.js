// Simple toaster message implementation
// In a real app, integrate with sonner, react-hot-toast, or similar

export const showSuccess = (message) => {
  // console.log("Success:", message);
  // Optional: alert(message);
};

export const showError = (message) => {
  console.error("Error:", message);
  // Optional: alert(message);
};
