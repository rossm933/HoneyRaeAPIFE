import { Link, Outlet } from "react-router-dom";
import { Button } from "reactstrap";

export default function Customer() {
  return (
    <>
      <h2>Customer</h2>
      <Link to="/customer/create">Add</Link>
      <Outlet />
    </>
  );
}
