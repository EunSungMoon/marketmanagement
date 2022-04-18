import { validateValues } from '../hooks/useSignup';

export default function validate({ username, password, passwordCheck }: validateValues) {
  const errors = {
    username,
    password,
    passwordCheck,
  };

  if (!username) {
    errors.username = '*이메일이 입력되지 않았습니다.';
  }
  if (!password) {
    errors.password = '*비밀번호가 입력되지 않았습니다.';
  }

  if (!passwordCheck) {
    errors.passwordCheck = '*비밀번호가 입력되지 않았습니다.';
  }

  return errors;
}
