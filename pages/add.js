import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('M');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!firstName.match(/^[A-Za-z]{6,10}$/)) {
      newErrors.firstName = 'First name must be 6-10 alphabets';
    }
    if (!lastName.match(/^[A-Za-z]{6,10}$/)) {
      newErrors.lastName = 'Last name must be 6-10 alphabets';
    }
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Invalid email address';
    }
    if (!number.match(/^(\+94)?[0-9]{9}$/)) {
      newErrors.number = 'Invalid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post('/api/employee', { firstName, lastName, email, number, gender });
        router.push('/employee'); // Redirect to employee list after adding
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Add Employee</h1>
      <form onSubmit={handleSubmit} className="shadow-lg p-5 rounded bg-white">
        <div className="form-group mb-4">
          <label className="form-label">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          />
          {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          />
          {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className={`form-control ${errors.number ? 'is-invalid' : ''}`}
          />
          {errors.number && <div className="invalid-feedback">{errors.number}</div>}
        </div>
        <div className="form-group mb-4">
          <label className="form-label">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="form-select"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
