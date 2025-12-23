import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../../api/jobCreationApi";
import { FaTrash } from "react-icons/fa";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs.");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {

    if (!window.confirm("Delete this job permanently?")) return;

    await deleteJob(id);

    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  if (loading) {
    return (
      <div className="text-white text-xl animate-pulse">
        Loading jobs...
      </div>
    );
  }

  return (
    <div className="text-white">

      <h1 className="text-3xl mb-6 font-bold">Job Creation History</h1>

      <table className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700">
        
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="p-4 text-left font-medium">#</th>
            <th className="p-4 text-left font-medium">Title</th>
            <th className="p-4 text-left font-medium">Location</th>
            <th className="p-4 text-left font-medium">Experience</th>
            <th className="p-4 text-left font-medium">Salary</th>
            <th className="p-4 text-left font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>

          {jobs.map((j, index) => (
            <tr
              key={j.id}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="p-4 font-semibold">{index+1}</td>
              <td className="p-4 font-semibold">{j.title}</td>
              <td className="p-4">{j.location}</td>
              <td className="p-4">
                {j.experienceMin}-{j.experienceMax} yrs
              </td>
              <td className="p-4">
                {j.salaryMin}L - {j.salaryMax}L
              </td>

              <td className="p-4">
                <button
                  onClick={() => handleDelete(j.id)}
                  className="text-red-400 hover:text-red-200 transition"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default JobList;
