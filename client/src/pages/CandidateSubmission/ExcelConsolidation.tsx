import { FaFileExcel, FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ExcelConsolidation = () => {
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("activeSubmission");
    if (stored) setSubmission(JSON.parse(stored));
  }, []);

  const rows = submission?.SubmissionCandidates || [];

  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-6">
        Candidate Submission — Step 2: Excel Consolidation
      </h1>

      <div className="flex gap-3 mb-6">
        <div className="px-4 py-2 bg-gray-700 rounded-lg">1 Branding</div>
        <div className="px-4 py-2 bg-blue-600 rounded-lg">2 Excel</div>
        <div className="px-4 py-2 bg-gray-700 rounded-lg">3 Email</div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 className="text-xl text-blue-400 font-semibold mb-3">
          Shortlist Summary — Excel Preview
        </h2>

        {!rows?.length && (
          <p className="text-gray-400">No submission data found.</p>
        )}

        {rows?.length > 0 && (
          <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden mb-5">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="p-3 text-left">Candidate</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Experience</th>
                <th className="p-3 text-left">Location</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r: any) => (
                <tr key={r.id} className="border-t border-gray-700">
                  <td className="p-3">{r.Candidate?.name}</td>
                  <td className="p-3">{r.overallScore ?? "-"}</td>
                  <td className="p-3">{r.Candidate?.totalExperience ?? "-"} yrs</td>
                  <td className="p-3">{r.Candidate?.location ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex justify-between">
          <button
            className="px-6 py-3 bg-gray-700 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/submission/branding")}
          >
            <FaArrowLeft /> Back
          </button>

          <button
            className="px-6 py-3 bg-blue-600 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/submission/email")}
          >
            Next — Email Draft <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExcelConsolidation;
