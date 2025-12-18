import React from "react";
import { Link } from "react-router";
import { BookOpen, Plus, Users, CreditCard, Settings } from "lucide-react";

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
          <BookOpen className="size-4" />
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
          <Plus className="size-4" />
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
          <Users className="size-4" />
          <span className="is-drawer-close:hidden">Applied Tutors</span>
        </Link>
      </li>

      {/* Payments */}
      <li>
        <Link
          to={"/dashboard/paymentHistory"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Payments"
        >
          <CreditCard className="size-4" />
          <span className="is-drawer-close:hidden">Payments</span>
        </Link>
      </li>

      {/* Profile Settings */}
      <li>
        <Link
          to={"/profileSettings"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Profile Settings"
        >
          <Settings className="size-4" />
          <span className="is-drawer-close:hidden">Profile Settings</span>
        </Link>
      </li>
    </div>
  );
};

export default StudentDashboardPage;
