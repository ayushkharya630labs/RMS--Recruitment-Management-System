import { useEffect, useState } from "react";
import {
  FaUser,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaChartLine,
  FaInfoCircle,
  FaIdCard,
  FaSortAmountDown,
} from "react-icons/fa";
import ScoreExplanationModal from "./modals/ScoreExplanationModal";
import CvProfileModal from "./modals/CvProfileModal";

const CvParsedResult = () => {
  const [cvs, setCvs] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [scoreModal, setScoreModal] = useState<any>(null);
  const [profileModal, setProfileModal] = useState<any>(null);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const stored = sessionStorage.getItem("aiCvResults");
    if (stored) setCvs(JSON.parse(stored));
  }, []);

  const sortedCVs = [...cvs].sort((a, b) =>
    sortBy === "score"
      ? b.overallScore - a.overallScore
      : b.skillMatch - a.skillMatch
  );

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Parsed CV Results <span className="text-blue-400">(AI Analyzed)</span>
        </h1>

        <div className="flex items-center gap-3">
          <FaSortAmountDown className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg"
          >
            <option value="score">Overall Score</option>
            <option value="skill">Skill Match</option>
          </select>
        </div>
      </div>

      {/* CV CARDS */}
      {sortedCVs.map((cv) => {
        const isSelected = selected.includes(cv.id);

        return (
          <div
            key={cv.id}
            onClick={() => toggleSelect(cv.id)}
            className={`
              mb-6 cursor-pointer rounded-2xl p-6 transition-all
              bg-gradient-to-br from-gray-900 to-gray-800
              border ${isSelected ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-gray-700"}
              hover:border-blue-400
            `}
          >
            {/* TOP */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={isSelected} readOnly />
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <FaUser className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold">{cv.name}</h2>
                  <p className={`text-sm ${cv.statusColor}`}>
                    {cv.recommendation}
                  </p>
                </div>
              </div>

              <div className={`text-3xl font-bold ${cv.statusColor}`}>
                {cv.overallScore}%
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300 mb-4">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                {cv.location}
              </p>
              <p className="flex items-center gap-2">
                <FaBriefcase className="text-gray-500" />
                {cv.experience}
              </p>
              <p className="flex items-center gap-2">
                <FaGraduationCap className="text-gray-500" />
                {cv.education}
              </p>
              <p className="flex items-center gap-2">
                <FaChartLine className="text-gray-500" />
                {cv.jobFit}
              </p>
            </div>

            {/* SKILLS */}
            <div className="flex gap-2 flex-wrap mb-5">
              {cv.skills?.map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-gray-700/70 rounded-full text-sm">
                  {s}
                </span>
              ))}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setScoreModal(cv);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                <FaInfoCircle />
                Explain Score
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileModal(cv);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                <FaIdCard />
                View Full Profile
              </button>
            </div>
          </div>
        );
      })}

      {/* SAVE BUTTON */}
      <button
        disabled={selected.length === 0}
        className={`
          mt-10 px-10 py-4 rounded-xl text-xl font-semibold
          flex items-center gap-3 transition
          ${selected.length === 0
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"}
        `}
      >
        <FaCheckCircle />
        Proceed to Submission ({selected.length})
      </button>

      {scoreModal && <ScoreExplanationModal cv={scoreModal} onClose={() => setScoreModal(null)} />}
      {profileModal && <CvProfileModal cv={profileModal} onClose={() => setProfileModal(null)} />}
    </div>
  );
};

export default CvParsedResult;
