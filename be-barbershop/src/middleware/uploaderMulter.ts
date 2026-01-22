import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const filetypes = /jpeg|jpg|png|gif/;
const maxSize = 5 * 1024 * 1024;

const fileFilter = (req: any, file: any, cb: any) => {
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase(),
  );

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Image uploaded is not of type jpeg/jpg/png/gif.");
  }
};

export const uploadFile = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter,
});
