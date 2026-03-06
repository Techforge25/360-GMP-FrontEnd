// Automatically switch backend URL based on environment
export const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const axiosOptions = { withCredentials: true };

export const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cloudinaryUploadPreset =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export const secretKey = process.env.SECRET_KEY