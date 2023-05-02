import multer from "multer";
const tripStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "database/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const tripStorageEngine = multer({ storage: tripStorage });
