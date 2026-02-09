// Automatically switch backend URL based on environment
export const backendURL =
  process.env.NODE_ENV === "production"
    ? "https://gmp-backend.techforgeinnovations.com/api/v1"
    : "http://localhost:8000/api/v1";

export const axiosOptions = { withCredentials: true };

export const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cloudinaryUploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
