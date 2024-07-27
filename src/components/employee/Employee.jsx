import { Link, Outlet } from "react-router-dom";
import { Button } from "reactstrap";

export default function Employee() {
  return (
    <>
      <h2>Employees</h2>
      <Link to="/employee/create">Add</Link>
      <Outlet />
    </>
  );
}
