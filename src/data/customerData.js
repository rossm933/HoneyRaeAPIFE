const _apiUrl = "/api/customer";

export const getCustomer = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id
export const getCustomerById = (customerId) => {
  const apiUrl = `${_apiUrl}/${customerId}`;
  return fetch(apiUrl).then((r) => r.json());
}
