import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaDatabase,
  FaSortAmountDown,
  FaTrash,
} from "react-icons/fa";
import {
  getAllCandidatesApi,
  deleteCandidateApi,
} from "../../api/cvAnalysisApi";

const CandidateList = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const data = await getAllCandidatesApi();
      setCandidates(data);
    } catch (err) {
      console.error("Failed to load candidates", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      "Delete this candidate & all related CV-analysis records?"
    );
    if (!confirm) return;

    await deleteCandidateApi(id);
    setCandidates(prev => prev.filter(c => c.id !== id));
  };

  const sorted = [...candidates].sort((a, b) =>
    sortBy === "experience"
      ? (b.experienceYears ?? 0) - (a.experienceYears ?? 0)
      : (a.name || "").localeCompare(b.name || "")
  );

  if (loading)
    return <p className="text-gray-400 text-lg">Loading candidates...</p>;

  return (
    <div className="text-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <FaDatabase className="text-blue-400" />
          Candidate Database
        </h1>

        <div className="flex items-center gap-3">
          <FaSortAmountDown className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
          >
            <option value="name">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
      </div>

      {/* LIST */}
      {sorted.map((c) => (
        <div
          key={c.id}
          className="
            mb-6 rounded-2xl p-6
            bg-gradient-to-br from-gray-900 to-gray-800
            border border-gray-700 hover:border-blue-400
            transition-all
          "
        >
          {/* TOP */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                <FaUser className="text-blue-400" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold">{c.name}</h2>
                <p className="text-sm text-gray-400">
                  Added on {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-lg text-blue-400 font-semibold">
                {c.experienceYears ?? 0} yrs exp
              </div>

              <button
                onClick={() => handleDelete(c.id)}
                className="p-2 bg-red-600/20 border border-red-600 rounded-lg hover:bg-red-600/40"
              >
                <FaTrash className="text-red-400" />
              </button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300 mb-4">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-gray-500" />
              {c.email || "—"}
            </p>
            <p className="flex items-center gap-2">
              <FaPhone className="text-gray-500" />
              {c.phone || "—"}
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              {c.location || "—"}
            </p>
            <p className="flex items-center gap-2">
              <FaGraduationCap className="text-gray-500" />
              {c.education || "—"}
            </p>
          </div>

          {/* SKILLS */}
          <div className="flex gap-2 flex-wrap mb-4">
            {(c.skills || []).map((s: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-700/70 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <FaBriefcase className="text-gray-500" />
              Candidate ID: {c.id}
            </span>

            <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg">
              View Profile
            </button>
          </div>
        </div>
      ))}

      {sorted.length === 0 && (
        <p className="text-gray-400 mt-6">No candidates found.</p>
      )}
    </div>
  );
};

export default CandidateList;
