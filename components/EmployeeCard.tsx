
import React from 'react';
import { Employee } from '../types';
import { EditIcon, DeleteIcon } from './icons';

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between transition-transform transform hover:scale-105">
      <div className="flex items-center space-x-4">
        <img
          className="w-16 h-16 rounded-full object-cover"
          src={`https://picsum.photos/seed/${employee.id}/200`}
          alt={employee.name}
        />
        <div>
          <p className="font-bold text-lg text-gray-800">{employee.name}</p>
          <p className="text-gray-600">{employee.position}</p>
          <p className="text-sm text-gray-500">{formatDate(employee.birthdate)}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button onClick={() => onEdit(employee)} className="p-2 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors">
          <EditIcon className="w-5 h-5" />
        </button>
        <button onClick={() => onDelete(employee.id)} className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors">
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
