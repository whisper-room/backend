import multer from 'multer';
export const profileUpload = multer({ dest: 'uploads/profiles' });
export const chatroomUpload = multer({ dest: 'uploads/roomimgs' });
