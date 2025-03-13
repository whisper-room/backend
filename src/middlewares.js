import multer from 'multer';
export const uploadFiles = multer({ dest: 'uploads/' });
