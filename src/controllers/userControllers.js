import User from '../models/User';
import bcrypt from 'bcrypt';

export const join = async (req, res) => {
  const { username, email, password } = req.body;
  const profile = req.file ? req.file.path : '';

  console.log('Uploaded file path:', profile);

  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).json({ message: '닉네임이나 이메일이 이미 존재합니다.' });
  }
  try {
    await User.create({
      username,
      email,
      password,
      profile,
    });
    return res.status(200).json({ message: '회원가입 성공!' });
  } catch (error) {
    return res.status(400).json({ message: '서버 오류' });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'email이 존재하지 않습니다.' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ message: '비밀번호가 틀립니다.' });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.status(200).json({ message: '로그인 성공!' });
};
export const session = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ loggedIn: true, user: req.session.user });
  }
  return res.status(200).json({ loggedIn: false });
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: '로그아웃 실패' });
    }
    res.status(200).json({ message: '로그아웃 성공!' });
  });
};
