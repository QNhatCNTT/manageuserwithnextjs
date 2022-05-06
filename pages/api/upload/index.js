import { executeQuery } from "../../../config/db";
import nc from "next-connect";
import fs from "fs";
import multer from "multer";

const handler = nc({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "./public/images/"),
  filename: (req, file, callback) => callback(null, file.originalname),
});

const upload = multer({
  storage: storage,
});

const uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post((req, res) => {
  let url = "http://" + req.headers.host;
  let filename = req.file.filename;
  console.log(url);
  console.log(filename);
  res.status(200).json({
    data: "Update successful",
    url: url + "/images/" + req.file.filename,
  });
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
