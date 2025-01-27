const { RequestError } = require("../../helpers");
const { Contact } = require('../../models/contacts');
const {addSchema}  = require('../../models/contacts');

const updateContact = async (req, res, next) => {
 
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
}

module.exports = updateContact;