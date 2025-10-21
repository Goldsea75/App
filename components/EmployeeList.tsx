
import React from 'react';
import { Employee } from '../types';
import EmployeeCard from './EmployeeCard';
import { AddUserIcon } from './icons';

interface EmployeeListProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onEdit, onDelete, onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách Nhân viên</h2>
        <button
          onClick={onAdd}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <AddUserIcon className="w-5 h-5" />
          <span>Thêm Mới</span>
        </button>
      </div>
      {employees.length > 0 ? (
        <div className="space-y-4">
          {employees
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={onEdit}
                onDelete={onDelete}
              />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">Chưa có nhân viên nào trong danh sách.</p>
      )}
    </div>
  );
};

export default EmployeeList;
