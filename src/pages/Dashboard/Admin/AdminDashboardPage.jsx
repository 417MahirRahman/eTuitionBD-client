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
          data-tip="Report and Analytics"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Report and Analytics</span>
        </Link>
      </li>

      {/* Users Management Page */}
      <li>
        <Link
          to={"/dashboard/usersManagement"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Users Management Page"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Users Management</span>
        </Link>
      </li>

      {/* Tuition Management Page */}
      <li>
        <Link
          to={"/dashboard/tuitionManagement"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Tuition Management Page"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Tuition Management</span>
        </Link>
      </li>
    </div>
  );
};

export default AdminDashboardPage;
