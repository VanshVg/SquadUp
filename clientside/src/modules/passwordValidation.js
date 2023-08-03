const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,15}$/;
function isValidPassword(password) {
  return passwordRegex.test(password);
}
module.exports = isValidPassword;
