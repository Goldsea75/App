
import React, { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Omit<Employee, 'id'> | Employee) => void;
  employeeToEdit: Employee | null;
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onSave, employeeToEdit }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setPosition(employeeToEdit.position);
      setBirthdate(employeeToEdit.birthdate);
    } else {
      setName('');
      setPosition('');
      setBirthdate('');
    }
    setError('');
  }, [employeeToEdit, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    if (!name || !position || !birthdate) {
      setError('Vui lòng điền đầy đủ tất cả các trường.');
      return;
    }

    const employeeData = { name, position, birthdate };
    if (employeeToEdit) {
      onSave({ ...employeeData, id: employeeToEdit.id });
    } else {
      onSave(employeeData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {employeeToEdit ? 'Chỉnh sửa Thông tin Nhân viên' : 'Thêm Nhân viên Mới'}
        </h2>
        
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và Tên</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Nguyễn Văn A"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">Chức vụ</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Lập trình viên"
            />
          </div>
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Ngày sinh</label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
