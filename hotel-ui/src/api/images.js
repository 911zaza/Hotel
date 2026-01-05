import api from './client';

export const uploadProfileImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/auth/upload-profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const uploadRoomImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/rooms/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
