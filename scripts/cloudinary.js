
export const CLOUD = { cloud: "dsnyytphm", preset: "karteji", folder:"karteji" };
export async function uploadToCloudinary(file){
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", CLOUD.preset);
  fd.append("folder", CLOUD.folder);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD.cloud}/upload`, { method:"POST", body:fd });
  const json = await res.json();
  if (!json.secure_url) throw new Error(json.error?.message || "Upload gagal");
  return json.secure_url;
}
