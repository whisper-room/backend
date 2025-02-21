import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, reqruied: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: String, default: '' },
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});
const User = mongoose.model('User', userSchema);
export default User;
