const { Contact } = require('../../models/contacts');

const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite = true } = req.query;
    console.log(req.query);
    const skip = (page - 1) * limit; 
    const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", { skip, limit, favorite })
        .populate("owner", "email");
    res.json( result );
}

module.exports = getAll;