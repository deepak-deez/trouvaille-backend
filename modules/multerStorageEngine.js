import multer from "multer";
import path from "path";

//Set the file name which will received by multer storage engine
const setFileName = (file) => {
  return `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
};

// Features Storage engine
const featureStorage = multer.diskStorage({
  destination: `./database/images/features`,
  filename: (req, file, cb) => {
    return cb(null, setFileName(file));
  },
});

// Trip package storage engine
const packageStorage = multer.diskStorage({
  destination: `./database/images/packages`,
  filename: (req, file, cb) => {
    return cb(null, setFileName(file));
  },
});

// User profile storage engine
const userProfileStorage = multer.diskStorage({
  destination: `./database/images/profileImages`,
  filename: (req, file, cb) => {
    return cb(null, setFileName(file));
  },
});

export const featureStorageEngine = multer({ storage: featureStorage });
export const packageStorageEngine = multer({ storage: packageStorage });
export const profileStorageEngine = multer({ storage: userProfileStorage });
