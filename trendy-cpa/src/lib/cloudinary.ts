export const cloudinaryUploadUrl = "https://api.cloudinary.com/v1_1/" + (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "") + "/upload";

export async function uploadToCloudinary(file: File, uploadPreset: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(cloudinaryUploadUrl, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Cloudinary upload failed");
  }

  return response.json();
}
