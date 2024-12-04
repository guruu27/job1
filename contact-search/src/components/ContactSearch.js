import React, { useState, useEffect } from 'react';
import 'G:\\VSCODE\\bandit\\AssignmentFrontend\\contact-search\\src\\styles.css';

const ContactSearch = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  // Fetch contacts from JSON file
  useEffect(() => {
    fetch('/contacts.json')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setFilteredContacts(data);
      });
  }, []);

  // Handle input changes for search filters
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  // Filter contacts based on search criteria
  const handleSearch = () => {
    const filtered = contacts.filter((contact) => {
      return (
        (searchFilters.firstName === '' ||
          contact.firstName.toLowerCase().includes(searchFilters.firstName.toLowerCase())) &&
        (searchFilters.lastName === '' ||
          contact.lastName.toLowerCase().includes(searchFilters.lastName.toLowerCase())) &&
        (searchFilters.dob === '' || contact.dob.includes(searchFilters.dob)) &&
        (searchFilters.email === '' ||
          contact.email.toLowerCase().includes(searchFilters.email.toLowerCase())) &&
        (searchFilters.phone === '' || contact.phone.includes(searchFilters.phone)) &&
        (searchFilters.address === '' || contact.address.toLowerCase().includes(searchFilters.address.toLowerCase())) &&
        (searchFilters.city === '' || contact.city.toLowerCase().includes(searchFilters.city.toLowerCase())) &&
        (searchFilters.state === '' || contact.state.toLowerCase().includes(searchFilters.state.toLowerCase())) &&
        (searchFilters.zip === '' || contact.zip.includes(searchFilters.zip))
      );
    });
    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredContacts.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle contact selection
  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="container">
      <h1>Choose a Contact</h1>
      <div className="form-container">
        <div className="form-group">
          <input type="text" name="firstName" placeholder="First name" onChange={handleInputChange} />
          <input type="text" name="lastName" placeholder="Last name" onChange={handleInputChange} />
          <input type="date" name="dob" placeholder="Date of birth" onChange={handleInputChange} />
          <input type="email" name="email" placeholder="Email address" onChange={handleInputChange} />
          <input type="text" name="phone" placeholder="Phone number" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <input type="text" name="address" placeholder="Street address" onChange={handleInputChange} />
          <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
          <input type="text" name="state" placeholder="State" onChange={handleInputChange} />
          <input type="text" name="zip" placeholder="Zip code" onChange={handleInputChange} />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Results Table */}
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((contact) => (
            <tr key={contact.id}>
              <td><input type="radio" name="selectContact" onClick={() => handleContactSelect(contact)} /></td>
              <td>{`${contact.firstName} ${contact.lastName}`}</td>
              <td>{contact.dob}</td>
              <td>{contact.address}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zip}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {filteredContacts.length > resultsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredContacts.length / resultsPerPage) }, (_, i) => (
            <button key={i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Selected Contact Details */}
      {selectedContact && (
        <div className="selected-contact">
          <h3>Selected Contact</h3>
          <p><strong>Name:</strong> {`${selectedContact.firstName} ${selectedContact.lastName}`}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Address:</strong> {`${selectedContact.address}, ${selectedContact.city}, ${selectedContact.state}, ${selectedContact.zip}`}</p>
        </div>
      )}
    </div>
  );
};

export default ContactSearch;