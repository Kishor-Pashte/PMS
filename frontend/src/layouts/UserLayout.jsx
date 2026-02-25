import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <div>
        <Link to={"/user/my-vehicle"}> My Vehicles</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
