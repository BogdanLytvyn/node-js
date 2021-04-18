const fs = require('fs');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');


function listContacts () {
 fs.readFile(contactsPath, 'utf-8', (error, data) => {
  if (error) console.log(error);
  const contacts = JSON.parse(data);
  console.table(contacts);
 });
}

function getContactById (contactId) {
 fs.readFile(contactsPath, 'utf-8', (error, data) => {
  if (error) console.log(error);

  const contacts = JSON.parse(data);
  const contact = contacts.find(contact => contact.id === Number(contactId));
  contact === undefined ? console.log('Contact not found'): console.log(contact)});
}

function removeContact(contactId) {
 fs.readFile(contactsPath, 'utf-8', (error, data) => {
  if (error) console.log(error);
  const prevContacts = JSON.parse(data);
  const newContacts = prevContacts.filter(contact => {
   if (Number(contactId) === contact.id) {
    console.log(`Removal contact ${contact.name} will be successful`);
   }
   return Number(contactId) !== contact.id;
  });

  fs.writeFile(contactsPath, JSON.stringify(newContacts), error => {
   if (error) console.log(error);
  });
 });
}

function addContact(name, email, phone) {
 fs.readFile(contactsPath, 'utf-8', (error, data) => {
  if (error) console.log(error);

  const contacts = JSON.parse(data);
  contacts.push({
   id: contacts.length + 1,
   name: name,
   email: email,
   phone: phone,
  });

  console.log('Contact added successfully! New contacts list: ');
  console.table(contacts);

  fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
   if (error) console.log(error);
  });
 });
}

module.exports = {
 listContacts,
 getContactById,
 removeContact,
 addContact,
};