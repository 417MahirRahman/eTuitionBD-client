import React from "react";
import { Link } from "react-router";
import { FileText, Clock, TrendingUp } from "lucide-react";

const TutorDashboardPage = () => {
  return (
    <div>
      {/* My Application */}
      <li>
        <Link to={"/dashboard/myApplication"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Application"
        >
            <FileText className="size-4" />
          <span className="is-drawer-close:hidden">My Application</span>
        </Link>
      </li>

      {/* Ongoing Tuitions */}
      <li>
        <Link to={"/dashboard/onGoingTuition"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Ongoing Tuitions"
        >
            <Clock className="size-4" />
          <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
        </Link>
      </li>

      {/* Revenue History */}
      <li>
        <Link to={"/dashboard/revenueHistory"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Revenue History"
        >
          <TrendingUp className="size-4" />
          <span className="is-drawer-close:hidden">Revenue History</span>
        </Link>
      </li>
    </div>
  );
};

export default TutorDashboardPage;
