
import React, { useState } from 'react';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import BirthdaySection from './components/BirthdaySection';
import EmployeeModal from './components/EmployeeModal';
import { useEmployees } from './hooks/useEmployees';
import { Employee } from './types';

const App: React.FC = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleSaveEmployee = (employeeData: Omit<Employee, 'id'> | Employee) => {
    if ('id' in employeeData) {
      updateEmployee(employeeData as Employee);
    } else {
      addEmployee(employeeData);
    }
  };
  
  const handleDeleteEmployee = (id: string) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        deleteEmployee(id);
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <EmployeeList
              employees={employees}
              onAdd={handleOpenAddModal}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteEmployee}
            />
          </div>
          <div className="lg:col-span-1">
            <BirthdaySection employees={employees} />
          </div>
        </div>
      </main>
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEmployee}
        employeeToEdit={editingEmployee}
      />
    </div>
  );
};

export default App;
