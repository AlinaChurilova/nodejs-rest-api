const { RequestError } = require("../../helpers");
const {addSchema}  = require('../../models/contacts');
const { Contact } = require('../../models/contacts');

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
   if (error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  
}

module.exports = addContact;