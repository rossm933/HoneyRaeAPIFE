import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { getServiceTickets, deleteServiceTicket, completeServiceTicket } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const deleteThisTicket = (id) => {
    if (window.confirm("Delete this ticket?")) {
    deleteServiceTicket(id).then(() => {
      getServiceTickets().then(setTickets);
    });
  }
  };
  const completeThisTicket = (id) => {
    if (window.confirm("Complete this ticket?")) {
    completeServiceTicket(id)
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
            <Button variant="danger" style={{ background: '#8b0000', border: 'solid 1px black' }} onClick={() => deleteThisTicket(t.id)} className="m-2">
            DELETE
          </Button>
          {t.dateCompleted ? '' :  <Button  style={{ background: 'green', border: 'solid 1px black' }} onClick={() => completeThisTicket(t.id)} className="m-2">
            COMPLETE
          </Button>}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
