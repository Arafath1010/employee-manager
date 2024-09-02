import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`/api/employee/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!employee.first_name.match(/^[A-Za-z]{6,10}$/)) {
      newErrors.firstName = 'First name must be 6-10 alphabets';
    }
    if (!employee.last_name.match(/^[A-Za-z]{6,10}$/)) {
      newErrors.lastName = 'Last name must be 6-10 alphabets';
    }
    if (!employee.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = 'Invalid email address';
    }
    if (!employee.number.match(/^(\+94)?[0-9]{9}$/)) {
      newErrors.number = 'Invalid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.put(`/api/employee/${id}`, employee);
        router.push('/employee'); // Redirect to employee list after editing
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
        <div className="form-group mb-3">
          <label>First Name</label>
          <input
            type="text"
            value={employee.first_name || ''}
            onChange={(e) => setEmployee({ ...employee, first_name: e.target.value })}
            className="form-control"
          />
          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
        </div>
        <div className="form-group mb-3">
          <label>Last Name</label>
          <input
            type="text"
            value={employee.last_name || ''}
            onChange={(e) => setEmployee({ ...employee, last_name: e.target.value })}
            className="form-control"
          />
          {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
        </div>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            value={employee.email || ''}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            className="form-control"
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="form-group mb-3">
          <label>Phone Number</label>
          <input
            type="text"
            value={employee.number || ''}
            onChange={(e) => setEmployee({ ...employee, number: e.target.value })}
            className="form-control"
          />
          {errors.number && <small className="text-danger">{errors.number}</small>}
        </div>
        <div className="form-group mb-3">
          <label>Gender</label>
          <select
            value={employee.gender || ''}
            onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
            className="form-control"
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
