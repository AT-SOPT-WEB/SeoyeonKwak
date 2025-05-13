export const validateId = (id: string) => {
  if (!id) return "";
  if (id.length > 20) return "아이디는 20자 이하로 입력해주세요.";
  return "";
};

export const validatePassword = (pw: string, confirm: string) => {
  if (!pw || !confirm) return "";
  if (pw.length > 20 || confirm.length > 20)
    return "비밀번호는 20자 이하로 입력해주세요.";
  if (pw !== confirm) return "비밀번호가 일치하지 않습니다.";
  return "";
};
