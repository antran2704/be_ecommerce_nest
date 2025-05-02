const getFilePath = (filename: string) => {
  return filename.replace("uploads", "");
};

const getFullFilePath = (filename: string) => {
  const path = process.env.MULTER_HOST + filename;
  return path;
};

const getFilePathToSave = (filename: string) => {
  const path = filename.replaceAll(process.env.MULTER_HOST, "");
  return path;
};

export { getFullFilePath, getFilePath, getFilePathToSave };
