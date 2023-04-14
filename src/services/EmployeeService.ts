import http from "../http-common";
import IEmployeeData from "../types/Employee";

const getEmployees = (pageNumber,limit) => {
  return http.get<Array<IEmployeeData>>(`/employees?page=${pageNumber * limit}&limit=${limit}`);
};

const getDeletedEmployees = (pageNumber,limit) => {
  return http.get<Array<IEmployeeData>>(`/employees?page=${pageNumber * limit}&limit=${limit}`);
};

const get = (id: any) => {
  return http.get<IEmployeeData>(`/employees/id/${id}`);
};

const create = (data: IEmployeeData) => {
  return http.post<IEmployeeData>("/employees", data);
};

const update = (id: any, data: IEmployeeData) => {
  return http.patch<any>(`/employees/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/employees/soft-delete/${id}`);
};


const EmployeeService = {
  getEmployees,
  getDeletedEmployees,
  get,
  create,
  update,
  remove,
};

export default EmployeeService;
