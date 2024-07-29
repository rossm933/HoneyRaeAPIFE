import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getCustomer } from "../../data/customerData";
import { getEmployee } from "../../data/employeeData";
import { createServiceTicket } from '../../data/serviceTicketsData';
import { useNavigate } from "react-router-dom";

const initialState = {
  description: '',
  emergency: false,
  employeeId: '',
  customerId: '',
};

export default function CreateTicket() {

  const [formInput, setFormInput] = useState(initialState);
  const [employees, setEmployee] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCustomer().then(setCustomers);
    getEmployee().then(setEmployee);

  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    createServiceTicket(payload)
    .then(navigate("/tickets"));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="mt-5">Create a Service Ticket</h2>

      <FormGroup>
        <Label for="description">Issue Description</Label>
        <Input
          id="description"
          type="text"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label for="employeeId"></Label>
        <Input
          id="employeeId"
          type="select"
          name="employeeId"
          value={formInput.employeeId}
          onChange={handleChange}
        >
          <option value="" disabled>Select an Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>{employee.name}</option>
          ))};
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="customerId"></Label>
        <Input
          id="customerId"
          type="select"
          name="customerId"
          value={formInput.customerId}
          onChange={handleChange}
        >
          <option value="" disabled>Select a Customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))};
        </Input>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input type="checkbox" name="emergency" onChange={handleChange} checked={formInput.emergency} />
          Emergency?
        </Label>
      </FormGroup><br></br>
      <Button type="submit">Create Service Ticket</Button>
    </Form>
  );
}

CreateTicket.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    emergency: PropTypes.bool,
    employeeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }),
};

CreateTicket.defaultProps = {
  obj: initialState
};
