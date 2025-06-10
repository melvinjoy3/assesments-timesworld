export const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8;

  if (!isLongEnough) return "Password must be at least 8 characters long";
  if (!hasUpperCase) return "Password must contain at least one capital letter";
  if (!hasNumber) return "Password must contain at least one number";
  if (!hasSymbol) return "Password must contain at least one symbol";
  return "";
};
