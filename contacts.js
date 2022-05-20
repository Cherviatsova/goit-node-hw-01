const fs = require('fs').promises;
const path = require('path');
const { uuid } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removedContact = allContacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuid.v4(), name, email, phone };
  const updatedContacts = JSON.stringify([...contacts, newContact]);
  await fs.writeFile(contactsPath, updatedContacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
