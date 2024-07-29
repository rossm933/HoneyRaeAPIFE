import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getServiceTickets, deleteServiceTicket } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function TicketsList(ticketObj, onUpdate) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const deleteThisTicket = () => {
    if (window.confirm(`Delete ${ticketObj.name}?`)) {
      deleteServiceTicket(ticketObj.id).then(() => onUpdate());
    }
  };
  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
            <Button variant="danger" style={{ background: '#8b0000', border: 'solid 1px black' }} onClick={deleteThisTicket} className="m-2">
            DELETE
          </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
