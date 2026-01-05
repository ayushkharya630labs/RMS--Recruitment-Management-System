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
import { useNavigate } from "react-router-dom";

const CvParsedResult = () => {
    const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [scoreModal, setScoreModal] = useState<any>(null);
  const [profileModal, setProfileModal] = useState<any>(null);
  const [sortBy, setSortBy] = useState("score");

  useEffect(() => {
    const stored = sessionStorage.getItem("aiCvResults");

    if (!stored) return;

    // Normalized → { candidate, analysis }
    const parsed = JSON.parse(stored).map((r: any, i: number) => ({
      id: r.candidate?.id ?? i + 1,
      candidate: r.candidate || {},
      analysis: r.analysis || {},
    }));

    setRows(parsed);
  }, []);

  const sorted = [...rows].sort((a, b) =>
    sortBy === "score"
      ? (b.analysis?.overallScore ?? 0) - (a.analysis?.overallScore ?? 0)
      : (b.analysis?.skillMatch ?? 0) - (a.analysis?.skillMatch ?? 0)
  );

  const toggleSelect = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
  if (selected.length === 0) return alert("Select at least one candidate");

  const payload = {
    jobId: rows?.[0]?.analysis?.jobId || null, // fallback if missing
    candidates: selected.map(id => ({ candidateId: id })),
    candidateDetails: rows.filter(r => selected.includes(r.id)),
  };

  sessionStorage.setItem("submissionPayload", JSON.stringify(payload));

  navigate("/submission/branding");
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

      {/* CARDS */}
      {sorted.map((row) => {
        const { candidate, analysis } = row;
        const isSelected = selected.includes(row.id);

        return (
          <div
            key={row.id}
            onClick={() => toggleSelect(row.id)}
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
                  <h2 className="text-2xl font-semibold">
                    {candidate.name || "Unknown Candidate"}
                  </h2>

                  <p className="text-sm text-blue-400">
                    {analysis?.recommendation || "Analyzed"}
                  </p>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-400">
                {analysis?.overallScore ?? 0}%
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300 mb-4">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                {candidate.location || "—"}
              </p>

              <p className="flex items-center gap-2">
                <FaBriefcase className="text-gray-500" />
                {(candidate.totalExperience ?? 0) + " yrs"}
              </p>

              <p className="flex items-center gap-2">
                <FaGraduationCap className="text-gray-500" />
                {candidate.education?.[0]?.degree || "—"}
              </p>

              <p className="flex items-center gap-2">
                <FaChartLine className="text-gray-500" />
                Skill Match: {analysis?.skillMatch ?? 0}%
              </p>
            </div>

            {/* SKILLS */}
            <div className="flex gap-2 flex-wrap mb-5">
              {(candidate.skills || []).map((s: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-gray-700/70 rounded-full text-sm">
                  {s}
                </span>
              ))}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4">

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setScoreModal(analysis);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                <FaInfoCircle />
                Explain Score
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setProfileModal(candidate);
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

      {/* SUBMIT BUTTON */}
    <button
  disabled={selected.length === 0}
  onClick={handleProceed}
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


      {/* MODALS */}
      {scoreModal && (
        <ScoreExplanationModal
          cv={scoreModal}
          onClose={() => setScoreModal(null)}
        />
      )}

      {profileModal && (
        <CvProfileModal
          cv={profileModal}
          onClose={() => setProfileModal(null)}
        />
      )}
    </div>
  );
};

export default CvParsedResult;
