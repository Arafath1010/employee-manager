import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Employee = () => {
  // State to manage employee data and view mode (list or grid)
  const [employees, setEmployees] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

  // Fetch employees when the component mounts
  React.useEffect(() => {
    fetchEmployees();
  }, []);

  // Function to fetch employees from the API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  // Function to delete an employee
  const deleteEmployee = async (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`/api/employee/${id}`);
        fetchEmployees(); // Refresh employee list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Employee List</h1>
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Switch to {viewMode === 'list' ? 'Grid' : 'List'} View
        </button>
        <Link href="add">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
            Add Employee
          </button>
        </Link>
      </div>

      {/* Display employees in the selected view mode */}
      {viewMode === 'list' ? (
        <ul className="space-y-4">
          {employees.map(employee => (
            <li
              key={employee.id}
              className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-xl font-semibold text-gray-700">
                  {employee.first_name} {employee.last_name}
                </p>
                <p className="text-gray-500">{employee.email}</p>
              </div>
              <div className="flex space-x-3">
                <Link href={`edit/${employee.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {employees.map(employee => (
            <div
              key={employee.id}
              className="bg-white p-4 rounded-md shadow-md text-center"
            >
              <img
                src={employee.photo}
                alt={`${employee.first_name} ${employee.last_name}`}
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <p className="text-xl font-semibold text-gray-700">
                {employee.first_name} {employee.last_name}
              </p>
              <p className="text-gray-500">{employee.email}</p>
              <div className="mt-4 flex justify-center space-x-3">
                <Link href={`edit/${employee.id}`}>
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-200">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => deleteEmployee(employee.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Employee;
