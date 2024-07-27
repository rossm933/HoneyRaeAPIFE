const _apiUrl = "/api/employee";

export const getEmployee = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id
export const getEmployeeById = (employeeId) => {
  const apiUrl = `${_apiUrl}/${employeeId}`;
  return fetch(apiUrl).then((r) => r.json());
}
