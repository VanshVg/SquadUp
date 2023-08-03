const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
function isValidEmail(email) {
    return emailRegex.test(email);
}
module.exports = isValidEmail;