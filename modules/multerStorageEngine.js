import multer from "multer";
const tripStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = Object.values(req.params)[0];
    console.log(folder);
    cb(null, `database/images/${folder}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const tripStorageEngine = multer({ storage: tripStorage });
