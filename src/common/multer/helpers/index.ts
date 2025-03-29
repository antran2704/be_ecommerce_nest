const getImagePath = (filename: string) => {
  return filename.replace("uploads", "");
};

const getFullImagePath = (filename: string) => {
  const path = process.env.MULTER_HOST + filename;
  return path;
};

export { getFullImagePath, getImagePath };
