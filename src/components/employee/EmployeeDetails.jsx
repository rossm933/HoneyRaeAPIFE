import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getEmployeeById } from "../../data/employeeData";

export default function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  //add useEffect here to get the ticket details from the API
  const getEmployeeDetails = () => {
    getEmployeeById(id).then(setEmployee);
  }
  
  useEffect(() => {
    getEmployeeDetails();
  }, [id]);

  if (!employee) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Id</th>
          <td>{employee.id}</td>
        </tr>
        <tr>
          <th scope="row">Name</th>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <th scope="row">Specialty</th>
          <td>{employee.specialty}</td>
        </tr>
      </tbody>
    </Table>
  );
}
