const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter a strong password");
    }
};

const validateEditProfileData = (req) => {
    const allowedEditField = [
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "age",
        "gender",
        "skills",
        "about"
    ];

    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditField.includes(field)
    );

    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};
