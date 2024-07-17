import { Router } from 'express';
import { get_upload_url, getUser, postTrack, upload_media, upload_music } from '../api/udio.api.js';
import { upload } from '../utils/multer.middleware.js';

const router = Router();

router.route("/user").get(getUser)

router.route("/upload").post(upload.single("data"), upload_media)
// router.route("/upload_music").get(upload.single("data"), upload_music)

export default router;