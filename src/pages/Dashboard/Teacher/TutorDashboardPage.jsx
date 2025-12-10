import React from "react";
import myApplication from "../../../assets/application.png";
import ongoingTask from "../../../assets/ongoingTask.png";
import revenue from "../../../assets/revenue.png";
import { Link } from "react-router";

const TutorDashboardPage = () => {
  return (
    <div>
      {/* My Application */}
      <li>
        <Link to={"/dashboard/myApplication"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Application"
        >
            <img src={myApplication} alt="" className="w-12" />
          <span className="is-drawer-close:hidden">My Application</span>
        </Link>
      </li>

      {/* Ongoing Tuitions */}
      <li>
        <Link to={"/dashboard/onGoingTuition"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Ongoing Tuitions"
        >
            <img src={ongoingTask} alt="" className="w-12"/>
          <span className="is-drawer-close:hidden">Ongoing Tuitions</span>
        </Link>
      </li>

      {/* Revenue History */}
      <li>
        <Link to={"/dashboard/revenueHistory"}
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Revenue History"
        >
          <img src={revenue} alt="" className="w-12"/>
          <span className="is-drawer-close:hidden">Revenue History</span>
        </Link>
      </li>
    </div>
  );
};

export default TutorDashboardPage;
