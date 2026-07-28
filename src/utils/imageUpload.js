import axios from "axios";

export const uploadImageToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  // Attempt 1: ImgBB Public Key
  try {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "6d2578514971362e4a06535bc074e637";
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
    if (res?.data?.success) {
      return res.data.data.display_url || res.data.data.url;
    }
  } catch (err1) {
    console.warn("ImgBB attempt 1 failed, trying fallback 2...", err1);
  }

  // Attempt 2: Backup ImgBB Key
  try {
    const backupKey = "83232870bb7850a581452613dca7c1e5";
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${backupKey}`, formData);
    if (res?.data?.success) {
      return res.data.data.display_url || res.data.data.url;
    }
  } catch (err2) {
    console.warn("ImgBB backup key failed, trying Cloudinary...", err2);
  }

  // Attempt 3: Cloudinary Unsigned Upload
  try {
    const cloudFormData = new FormData();
    cloudFormData.append("file", imageFile);
    cloudFormData.append("upload_preset", "docs_upload_example_us_preset");

    const cloudRes = await axios.post(
      "https://api.cloudinary.com/v1_1/demo/image/upload",
      cloudFormData
    );
    if (cloudRes?.data?.secure_url) {
      return cloudRes.data.secure_url;
    }
  } catch (err3) {
    console.warn("Cloudinary fallback failed...", err3);
  }

  // Attempt 4: Base64 Data URL Fallback
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
