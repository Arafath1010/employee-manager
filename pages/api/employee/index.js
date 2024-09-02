import fs from 'fs';
import path from 'path';

// Path to the employees.json file
const filePath = path.join(process.cwd(), 'data', 'employees.json');

// Function to load employees data
const loadEmployees = () => {
  const fileData = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

// Function to save employees data
const saveEmployees = (employees) => {
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request - return the list of employees
    try {
      const employees = loadEmployees();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error loading employees data' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request - add a new employee
    try {
      const employees = loadEmployees();
      const newEmployee = { ...req.body, id: Date.now().toString() }; // Assign a new ID
      employees.push(newEmployee);
      saveEmployees(employees);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ message: 'Error saving employee data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
