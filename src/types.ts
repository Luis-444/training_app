//User
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    password_confirmation?: string;
}
export const defaultUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
}

//Procedures
export interface Procedure {
    id: number;
    acm_number: string;
    name: string;
}
export const defaultProcedure: Procedure = {
    id: 0,
    acm_number: '',
    name: '',
}

//Departmets
export interface Department {
    id: number;
    name: string;
    abbreviation: string;
    procedure_id: number;
    procedure: Procedure;
}
export const defaultDepartment: Department = {
    id: 0,
    name: '',
    abbreviation: '',
    procedure_id: 0,
    procedure: defaultProcedure
}

//Employees
export interface Employee {
    id: number;
    name: string;
    initials: string;
    employee_number: number;
    department_id: number;
    procedure_id: number;
    department: Department;
    procedures: Procedure[];
}
export const defaultEmployee: Employee = {
    id: 0,
    name: '',
    initials: '',
    employee_number: 0,
    department_id: 0,
    procedure_id: 0,
    procedures: [],
    department: defaultDepartment
}