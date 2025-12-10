import React from "react";

const StudentDashboardPage = () => {
  return (
    <div>
      {/* My Tuition */}
      <li>
        <Link
          to={"/dashboard/myTuitions"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Tuition"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">My Tuition</span>
        </Link>
      </li>

      {/* Post New Tuitions */}
      <li>
        <Link
          to={"/dashboard/tuitionPost"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Post New Tuitions"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Post New Tuitions</span>
        </Link>
      </li>

      {/* Applied Tutors */}
      <li>
        <Link
          to={"/dashboard/appliedTutors"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Applied Tutors"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Applied Tutors</span>
        </Link>
      </li>

      {/* Payments */}
      <li>
        <Link
          to={"/dashboard/payments"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Payments"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Payments</span>
        </Link>
      </li>

      {/* Profile Settings */}
      <li>
        <Link
          to={"/dashboard/profileSettings"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Profile Settings"
        >
          <img src="" alt="" className="w-12" />
          <span className="is-drawer-close:hidden">Profile Settings</span>
        </Link>
      </li>
    </div>
  );
};

export default StudentDashboardPage;
