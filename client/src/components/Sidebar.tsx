import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaBriefcase, 
  FaChevronDown,
  FaUserCheck, 
  FaUserTie, 
  FaDatabase, 
  FaCog 
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {

  const [openJobMenu, setOpenJobMenu] = useState(false);

  return (
    <aside className="w-76 h-screen bg-gray-900 border-r border-gray-700 p-6">

      {/* LOGO */}
      <h1 className="text-3xl font-extrabold mb-12 text-blue-500 tracking-tight">
        RMS
      </h1>

      {/* MAIN MENU */}
      <nav className="flex flex-col gap-3">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base transition-all ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <FaHome /> Dashboard
        </NavLink>

        {/* JOB MENU */}
        <div>
          <button
            className="flex items-center justify-between w-full text-gray-300 hover:bg-gray-800 p-3 rounded-lg"
            onClick={() => setOpenJobMenu(!openJobMenu)}
          >
            <span className="flex items-center gap-3">
              <FaBriefcase /> Job Creation & Sourcing
            </span>
            <FaChevronDown
              className={`transition-transform ${openJobMenu ? "rotate-180" : ""}`}
            />
          </button>

          {openJobMenu && (
            <div className="ml-10 mt-2 flex flex-col gap-2">
              
              <NavLink
                to="/jobs/create"
                className="text-gray-400 hover:text-white transition"
              >
                ➤ Create Job
              </NavLink>

              <NavLink
                to="/jobs/list"
                className="text-gray-400 hover:text-white transition"
              >
                ➤ All Jobs
              </NavLink>

            </div>
          )}
        </div>

        <NavLink
          to="/cv-analysis/upload"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base transition-all ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <FaUserTie /> CV Analysis & Scoring
        </NavLink>

        <NavLink
          to="/submission"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base transition-all ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <FaUserCheck /> Candidate Submission
        </NavLink>

        <NavLink
          to="/candidates"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base transition-all ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <FaDatabase /> Candidate Database
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg text-base transition-all ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
            }`
          }
        >
          <FaCog /> Settings
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;
