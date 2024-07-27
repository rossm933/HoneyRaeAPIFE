import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getCustomer } from "../../data/customerData";
import { Link } from "react-router-dom";

export default function CustomerList() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    getCustomer().then(setCustomer);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customer.map((c) => (
          <tr key={`customer-${c.id}`}>
            <th scope="row">{c.id}</th>
            <td>{c.name}</td>
            <td>{c.address}</td>
            <td>
              <Link to={`${c.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
