import { FaSuitcase, FaUsers, FaIdBadge, FaStar, FaPaperPlane, FaCheck } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="text-white w-full h-full">

      {/* PAGE TITLE */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1 text-sm">
            AI Recruitment Performance Overview
          </p>
        </div>
      </div>

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

        <DashCard 
          icon={<FaSuitcase />} 
          label="Active Jobs"
          number="12"
          gradient="from-blue-600 to-blue-400"
        />

        <DashCard 
          icon={<FaUsers />} 
          label="Total Candidates"
          number="540"
          gradient="from-green-600 to-green-400"
        />

        <DashCard 
          icon={<FaIdBadge />} 
          label="CVs Sourced"
          number="850"
          gradient="from-yellow-600 to-yellow-400"
        />

        <DashCard 
          icon={<FaStar />} 
          label="AI Scored"
          number="410"
          gradient="from-purple-600 to-purple-400"
        />

        <DashCard 
          icon={<FaPaperPlane />} 
          label="Submitted"
          number="42"
          gradient="from-orange-600 to-orange-400"
        />

        <DashCard 
          icon={<FaCheck />} 
          label="Hired"
          number="6"
          gradient="from-red-600 to-red-400"
        />

      </div>

    </div>
  );
};


// CARD COMPONENT
const DashCard = ({ icon, label, number, gradient }) => {
  return (
    <div 
      className={`bg-gray-900 px-8 py-10 rounded-xl 
      shadow-lg shadow-black/30 border border-gray-800
      hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-800/20
      transition-all duration-300 group cursor-pointer relative overflow-hidden`}
    >
      
      {/* ICON CIRCLE */}
      <div  style={{ width: "4.3rem"}}
        className={`text-white text-3xl mb-6 p-5 rounded-full bg-gradient-to-br ${gradient} 
        shadow-md group-hover:scale-110 transition`}
      >
        {icon}
      </div>

      {/* NAME */}
      <p className="text-gray-400 text-md uppercase tracking-wide">
        {label}
      </p>

      {/* NUMBER */}
      <h2 className="text-5xl font-extrabold mt-2">
        {number}
      </h2>

    </div>
  );
};

export default Dashboard;
