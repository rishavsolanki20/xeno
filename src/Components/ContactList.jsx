import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addContact = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/contacts', {
        name,
        email,
        phone,
      });
      getContacts();
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/contacts/${id}`);
      getContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const startEditingContact = (contact) => {
    setEditingContact(contact);
    setName(contact.name);
    setEmail(contact.email);
    setPhone(contact.phone);
  };

  const cancelEditing = () => {
    setEditingContact(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  const saveContact = async () => {
    try {
      await axios.put(`http://localhost:8000/contacts/${editingContact._id}`, {
        name,
        email,
        phone,
      });
      getContacts();
      setEditingContact(null);
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error(error);
    }
  };

  const searchContacts = () => {
    if (searchTerm.trim() === '') {
      getContacts();
    } else {
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setContacts(filteredContacts);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    getContacts();
  };

  return (
    <div>
      <h1>Contact List</h1>
      {editingContact ? (
        <div>
          <h2>Edit Contact</h2>
          <form>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="button" onClick={saveContact}>Save</button>
            <button type="button" onClick={cancelEditing}>Cancel</button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Add Contact</h2>
          <form onSubmit={addContact}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit">Add Contact</button>
          </form>
        </div>
      )}
      <div className='search'>
        <h2>Search Contacts</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={searchContacts}>Search</button>
        <button onClick={resetSearch}>Reset</button>
      </div>
      <h2>Contacts</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            {contact.name} - {contact.email} - {contact.phone}
              <div>
                <button onClick={() => deleteContact(contact._id)}>Delete</button>
                <button onClick={() => startEditingContact(contact)}>Edit</button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;