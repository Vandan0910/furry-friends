import React, { useState } from 'react';
import './Appointments.css';

const Appointments = () => {
  const [petName, setPetName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [contact, setContact] = useState('');
  const [service, setService] = useState('Grooming');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token')); // Assuming you store the token in localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct appointment data
    const appointmentData = {
      petName,
      ownerName,
      contact,
      service,
      appointmentDate,
      appointmentTime
    };

    try {
      // Replace this URL with your backend endpoint
      const response = await fetch('http://localhost:4000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Send the token in the Authorization header
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        setConfirmationMessage('Your appointment has been booked successfully!');
      } else {
        setConfirmationMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setConfirmationMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="appointments-container">
      <div className="heading-section">
        <h6 className="text-primary text-uppercase">Book an Appointment</h6>
        <h1 className="display-5 text-uppercase mb-0">Reserve a Spot for Your Furry Friend!</h1>
      </div>
      
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Pet Name"
          required
        />
        
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder="Owner Name"
          required
        />
        
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Contact Number"
          required
        />
        
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="Grooming">Grooming</option>
          <option value="Bath">Bath</option>
          <option value="Nail Trim">Nail Trim</option>
        </select>
        
        <input
          type="date"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        
        <input
          type="time"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        
        <button type="submit">Book Appointment</button>
      </form>

      {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
    </div>
  );
};

export default Appointments;
