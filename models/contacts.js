const fs = require('fs/promises');

const { nanoid } = require("nanoid");
 const listContacts = async() => {
      const data = await fs.readFile("./models/contacts.json");
      return JSON.parse(data);
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const idContact = String(contactId);
    const result = contacts.find(item => item.id === idContact);
    return result || null;
}

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newItem = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newItem);
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts, null, 2));
    return newItem;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idContact = String(contactId);
    const index = contacts.findIndex(item => item.id === idContact);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts, null, 2));
    return result;
}

const updateContact = async (contactId, {name, email, phone}) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1) {
        return null;
    }
    contacts[index] = {contactId, name, email, phone};
    await fs.writeFile("./models/contacts.json", JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
