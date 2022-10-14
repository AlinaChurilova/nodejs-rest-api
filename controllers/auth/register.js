const bcrypt = require('bcryptjs');
const { User } = require('../../models/users');
const { RequestError } = require('../../helpers');
const gravatar = require('gravatar');

const register = async (req, res, next) => {
    const { email, password, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use!")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ email, password: hashPassword, subscription, avatarURL });
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    })
}

module.exports = register;