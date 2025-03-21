import multer from 'multer';
export const profileUpload = multer({ dest: 'uploads/profiles' });
export const chatroomUpload = multer({ dest: 'uploads/roomimgs' });
export const chatUpload = multer({ dest: 'uploads/img_url' });
