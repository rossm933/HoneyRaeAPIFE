const _apiUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

//export a function here that gets a ticket by id
export const getServiceTicketById = (ticketId) => {
  const apiUrl = `${_apiUrl}/${ticketId}`;
  return fetch(apiUrl).then((r) => r.json());
}

export const createServiceTicket = (payload) => new Promise((resolve, reject) => {
  fetch(_apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const deleteServiceTicket = (ticketId) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${ticketId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});
