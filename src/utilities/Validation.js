export const PasswordValidation = (password) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  if (!passwordPattern.test(password)) {
    return `1.Password must be at least 6       characters long
            2.At least one uppercase and lowercase letter.`;
  }
  return "";
};
