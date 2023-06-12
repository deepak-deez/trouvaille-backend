import { log } from "console";
import multer from "multer";
import path from "path";


const setFileName = (file) => {
  return `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
};

const featureStorage = multer.diskStorage({
  destination: `./database/images/features`,
  filename: (req, file, cb) => {
    return cb(null, setFileName(file));
  },
});

const packageStorage = multer.diskStorage({
  destination: `./database/images/packages`,
  filename: (req, file, cb) => {
    console.log("STORE FILES :",file);
    return cb(null, setFileName(file));
  },
});

const userProfileStorage = multer.diskStorage({
  destination: `./database/images/profileImages`,
  filename: (req, file, cb) => {
    return cb(null, setFileName(file));
  },
});

export const featureStorageEngine = multer({ storage: featureStorage });
export const packageStorageEngine = multer({ storage: packageStorage });
export const profileStorageEngine = multer({ storage: userProfileStorage });
