import { useEffect, useState } from "react";
import { FaUserTie, FaArrowRight, FaShieldAlt, FaInbox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createSubmissionApi } from "../../api/submissionApi";

const SubmissionBranding = () => {
  const navigate = useNavigate();

  const [candidates, setCandidates] = useState<any[]>([]);
  const [jobId, setJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("submissionPayload");

    if (stored) {
      const parsed = JSON.parse(stored);

      setCandidates(parsed.candidateDetails || []);
      setJobId(parsed.jobId || null);
    }

    setLoaded(true);
  }, []);

  const handleNext = async () => {
    if (!candidates.length || !jobId) return;

    setLoading(true);

    try {
      const payload = {
        jobId,
        clientName: "Default Client",
        subject: "Shortlisted Candidates Submission",
        candidates: candidates.map((c: any) => ({
          candidateId: c.candidate.id,
        })),
      };

      const submission = await createSubmissionApi(payload);

      // Save submission data for next steps
      sessionStorage.setItem(
        "activeSubmission",
        JSON.stringify(submission)
      );

      navigate("/submission/excel");
    } catch (err) {
      console.error("Submission create error", err);
      alert("Failed to create submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-6">
        Candidate Submission — Step 1: Branding & Privacy Template
      </h1>

      {/* Steps Bar */}
      <div className="flex gap-3 mb-6">
        <div className="px-4 py-2 bg-blue-600 rounded-lg">1 Branding</div>
        <div className="px-4 py-2 bg-gray-700 rounded-lg">2 Excel</div>
        <div className="px-4 py-2 bg-gray-700 rounded-lg">3 Email</div>
      </div>

      {/* Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <p className="text-gray-300">
          CVs are converted into a <b>branded & anonymized format</b>.
          Personal details are removed and a secure <b>Candidate ID</b>
          is used for client submission.
        </p>
      </div>

      {/* EMPTY STATE */}
      {loaded && candidates.length === 0 && (
        <div className="
          bg-gray-900 border border-gray-800 rounded-2xl p-10
          flex flex-col items-center text-center
        ">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <FaInbox className="text-gray-400 text-3xl" />
          </div>

          <h2 className="text-2xl font-semibold mb-2">No Candidates Selected</h2>

          <p className="text-gray-400 mb-6 max-w-xl">
            Please go back to CV Analysis and select shortlisted candidates.
          </p>

          <button
            onClick={() => navigate("/cv-analysis/parsed")}
            className="px-6 py-3 bg-blue-600 rounded-lg"
          >
            Go Back & Select Candidates
          </button>
        </div>
      )}

      {/* CANDIDATE LIST */}
      {candidates.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

          <h2 className="text-xl text-blue-400 font-semibold mb-3">
            Shortlisted Candidates ({candidates.length})
          </h2>

          {candidates.map((r: any) => (
            <div key={r.id}
              className="border border-gray-700 rounded-lg p-4 mb-3 flex justify-between"
            >
              <div>
                <p className="text-lg font-semibold flex items-center gap-2">
                  <FaUserTie className="text-blue-400" /> {r.candidate?.name}
                </p>

                <p className="text-gray-400 text-sm">
                  {r.candidate?.currentRole || "—"} •
                  {(r.candidate?.totalExperience ?? 0)} yrs •
                  {r.candidate?.location || "India"} •
                  Score {r.analysis?.overallScore ?? 0}%
                </p>

                <p className="text-gray-400 text-xs">
                  Skills: {(r.candidate?.skills || []).join(", ")}
                </p>
              </div>

              <span className="text-gray-400 flex items-center gap-2">
                <FaShieldAlt />
                RMS-{String(r.id).padStart(5, "0")}
              </span>
            </div>
          ))}

          <div className="mt-6 flex justify-end">
            <button
              disabled={loading}
              onClick={handleNext}
              className={`px-8 py-3 flex items-center gap-2 rounded-lg
              ${loading ? "bg-gray-700" : "bg-blue-600 hover:bg-blue-500"}`}
            >
              {loading ? "Creating Submission..." : "Next — Excel Consolidation"}
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionBranding;
