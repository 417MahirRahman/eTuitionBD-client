import React from "react";
import { Link } from "react-router";

const AdminDashboardPage = () => {
  return (
    <div>
      {/* Report and Analytics */}
      <li>
        <Link
          to={"/dashboard/reportAnalytics"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Tuition"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">My Tuition</span>
        </Link>
      </li>

      {/* Users Management Page */}
      <li>
        <Link
          to={"/dashboard/usersManagement"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Post New Tuitions"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Post New Tuitions</span>
        </Link>
      </li>

      {/* Tuition Management Page */}
      <li>
        <Link
          to={"/dashboard/tuitionManagement"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Applied Tutors"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Applied Tutors</span>
        </Link>
      </li>
    </div>
  );
};

export default AdminDashboardPage;
