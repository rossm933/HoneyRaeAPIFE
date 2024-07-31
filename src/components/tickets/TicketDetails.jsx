import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { getServiceTicketById, updateServiceTicket } from "../../data/serviceTicketsData";
import { getEmployee } from "../../data/employeeData";

export default function TicketDetails() {
  const { id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [employees, setEmployees] = useState([]);

  //add useEffect here to get the ticket details from the API

  useEffect(() => {
   getServiceTicketById(id).then(setTicket);
   getEmployee().then(setEmployees);
  }, [id, ticket ]);

  if (!ticket) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const payload = {
      ...ticket,
      [name]: value,
    };
    updateServiceTicket(id, payload)
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{ticket.customer.name}</td>
        </tr>
        <tr>
          <th scope="row">Description</th>
          <td>{ticket.description}</td>
        </tr>
        <tr>
          <th scope="row">Emergency</th>
          <td>{ticket.emergency ? "yes" : "no"}</td>
        </tr>
        <tr>
          <th scope="row">Employee</th>
          <td>{ticket.employee?.name || (
            <Form>
                  <FormGroup>
                  <Label for="employeeId"></Label>
                  <Input
                    id="employeeId"
                    type="select"
                    name="employeeId"
                    value={"Select an Employee"}
                    onChange={handleChange}
                  >
                    <option value="">Select an Employee</option>
                    {employees.map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))};
                  </Input>
                </FormGroup>
                </Form>
          )}
          </td>
        </tr>
        <tr>
          <th scope="row">Completed?</th>
          <td>{ticket.dateCompleted?.split("T")[0] || "Incomplete"}</td>
        </tr>
      </tbody>
    </Table>
  );
}
