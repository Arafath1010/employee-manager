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
  const { id } = req.query;
  const employees = loadEmployees();
  const employee = employees.find(emp => emp.id === id);

  if (req.method === 'GET') {
    // Handle GET request - return the employee data
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } else if (req.method === 'PUT') {
    // Handle PUT request - update the employee data
    const index = employees.findIndex(emp => emp.id === id);
    if (index > -1) {
      employees[index] = { ...employees[index], ...req.body };
      saveEmployees(employees);
      res.status(200).json(employees[index]);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } else if (req.method === 'DELETE') {
    // Handle DELETE request - delete the employee
    const index = employees.findIndex(emp => emp.id === id);
    if (index > -1) {
      employees.splice(index, 1);
      saveEmployees(employees);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
