import { useState, useEffect, useCallback } from 'react';
import { Employee } from '../types';

const STORAGE_KEY = 'employees_list';

// Data from the user's CSV file
const getInitialData = (): Employee[] => {
    return [
      { id: '1', name: 'Hoàng Diệu Mơ', position: 'Nhân viên', birthdate: '1980-08-20' },
      { id: '2', name: 'Nguyễn Hoàng Quân', position: 'Nhân viên', birthdate: '1972-11-08' },
      { id: '3', name: 'Nguyễn Ngọc Tân', position: 'Nhân viên', birthdate: '1984-05-01' },
      { id: '4', name: 'Chu Thị Hà', position: 'Nhân viên', birthdate: '1987-06-22' },
      { id: '5', name: 'Nguyễn Ngọc Thương', position: 'Nhân viên', birthdate: '1984-11-06' },
      { id: '6', name: 'Trần Mạnh Hòa', position: 'Nhân viên', birthdate: '1992-10-06' },
      { id: '7', name: 'Đỗ Thu Hằng', position: 'Nhân viên', birthdate: '1987-11-20' },
      { id: '8', name: 'Trinh Xuân Tiệp', position: 'Nhân viên', birthdate: '1991-04-10' },
      { id: '9', name: 'Nguyễn Thị Huyền Trang', position: 'Nhân viên', birthdate: '1994-01-22' },
      { id: '10', name: 'Lê Anh Dũng', position: 'Nhân viên', birthdate: '1995-11-16' },
      { id: '11', name: 'Đỗ Thị Vân Anh', position: 'Nhân viên', birthdate: '1990-10-11' },
      { id: '12', name: 'Đinh Trung Khánh', position: 'Nhân viên', birthdate: '1984-09-07' },
      { id: '13', name: 'Nguyễn Trung Kiên', position: 'Nhân viên', birthdate: '1991-05-03' },
      { id: '14', name: 'Nguyễn Thị Phương Thảo', position: 'Nhân viên', birthdate: '1991-10-22' },
      { id: '15', name: 'Trần Mạnh Tiến', position: 'Nhân viên', birthdate: '1993-09-30' },
      { id: '16', name: 'Nguyễn Ngọc Quang', position: 'Nhân viên', birthdate: '1984-07-05' },
      { id: '17', name: 'Trần Thị Thu Hà', position: 'Nhân viên', birthdate: '1994-11-20' },
      { id: '18', name: 'Lê Thị Hồng Nhung', position: 'Nhân viên', birthdate: '1980-09-20' },
      { id: '19', name: 'Trần Thu Hương', position: 'Nhân viên', birthdate: '1982-03-16' },
      { id: '20', name: 'Vũ Thị Mai', position: 'Nhân viên', birthdate: '1985-08-06' },
      { id: '21', name: 'Nguyễn Hồng Trang', position: 'Nhân viên', birthdate: '1988-10-21' },
      { id: '22', name: 'Vũ Mạnh Thành', position: 'Nhân viên', birthdate: '1983-10-31' },
      { id: '23', name: 'Hoàng Trung Nghĩa', position: 'Nhân viên', birthdate: '1979-04-29' },
      { id: '24', name: 'Vũ Hoàng Dương', position: 'Nhân viên', birthdate: '1975-08-04' },
      { id: '25', name: 'Lê thị thu Thảo', position: 'Nhân viên', birthdate: '1983-07-23' },
      { id: '27', name: 'Nguyễn Hoàng Quỳnh', position: 'Nhân viên', birthdate: '1984-11-20' },
      { id: '28', name: 'Nguyễn Thị Thu Trang', position: 'Nhân viên', birthdate: '1983-09-25' },
      { id: '29', name: 'Nguyễn Huy Việt', position: 'Nhân viên', birthdate: '1984-09-06' },
      { id: '30', name: 'Lê Thị Huyền', position: 'Nhân viên', birthdate: '1984-06-13' }
    ];
};

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const storedEmployees = window.localStorage.getItem(STORAGE_KEY);
      return storedEmployees ? JSON.parse(storedEmployees) : getInitialData();
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return getInitialData();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [employees]);

  const addEmployee = useCallback((employee: Omit<Employee, 'id'>) => {
    setEmployees(prev => [...prev, { ...employee, id: new Date().toISOString() }]);
  }, []);

  const updateEmployee = useCallback((updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  }, []);

  return { employees, addEmployee, updateEmployee, deleteEmployee };
};