import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../api/jobCreationApi";
import { FaTrash, FaEye, FaBuilding, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";
import JobViewModal from "./Modal/JobViewModal";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewJob, setViewJob] = useState<any>(null);

  useEffect(() => { loadJobs(); }, []);

  const loadJobs = async () => {
    try {
      setJobs(await getJobs());
    } catch {
      setError("Failed to load jobs.");
    }
    setLoading(false);
  };
  
  const toLPA = (v?: number) => {
    if (!v || isNaN(v)) return "-";
    return (v / 100000).toFixed(1).replace(/\.0$/, "") + " LPA";
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this job permanently?")) return;
    await deleteJob(id);
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  if (loading) return <div className="text-white text-xl animate-pulse">Loading jobs...</div>;

  return (
    <div className="text-white">

      <h1 className="text-3xl mb-6 font-bold">Job Creation History</h1>

      {error && <p className="text-red-400 mb-4">{error}</p>}

      <table className="w-full bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Job Title</th>
            <th className="p-4 text-left">Location</th>
            <th className="p-4 text-left">Experience</th>
            <th className="p-4 text-left">Salary</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((j, i) => (
            <tr key={j.id} className="border-b border-gray-800 hover:bg-gray-800 transition">
              <td className="p-4 font-semibold">{i + 1}</td>

              <td className="p-4 flex items-center gap-2">
                <FaBuilding className="text-blue-400" /> <b>{j.companyName}</b>
              </td>

              <td className="p-4 font-semibold">{j.title}</td>

              <td className="p-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-400" />
                {j.location || "-"}
              </td>

              <td className="p-4">
                {j.experienceMin ?? "-"} — {j.experienceMax ?? "-"} yrs
              </td>

              <td className="p-4 flex items-center gap-2">
                <FaMoneyBill className="text-green-400" />
                {toLPA(j.salaryMin)} — {toLPA(j.salaryMax)}
              </td>

              <td className="p-4">
                <button
                  onClick={() => setViewJob(j)}
                  className="text-blue-400 hover:text-blue-200 mr-1"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => handleDelete(j.id)}
                  className="text-red-400 hover:text-red-200 ms-3"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {viewJob && (
        <JobViewModal job={viewJob} onClose={() => setViewJob(null)} />
      )}
    </div>
  );
};

export default JobList;
