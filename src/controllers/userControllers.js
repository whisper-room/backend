import User from '../models/User';

export const join = async (req, res) => {
  const { username, email, password, password2 } = req.body;

  if (password != password2) {
    return res.status(400).json({ message: '비밀번호가 틀립니다.' });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).json({ message: '닉네임이나 이메일이 이미 존재합니다.' });
  }
  try {
    await User.create({
      username,
      email,
      password,
    });
    return res.status(200).json({ message: '회원가입 성공!' });
  } catch (error) {
    return res.status(400).json({ message: '서버 오류' });
  }
};
