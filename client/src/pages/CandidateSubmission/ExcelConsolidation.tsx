// src/pages/submission/ExcelConsolidation.tsx
import { FaFileExcel, FaArrowLeft, FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ExcelConsolidation = () => {
  const navigate = useNavigate();

  const rows = [
    { id: "RMS-IND-2401", name: "Rahul Verma", exp: "5 yrs", score: 88, skills: "Node.js, AWS, MongoDB", location: "Bangalore" },
    { id: "RMS-IND-2402", name: "Priya Sharma", exp: "4 yrs", score: 82, skills: "React, TypeScript, Redux", location: "Pune" },
    { id: "RMS-IND-2403", name: "Arjun Mehta", exp: "7 yrs", score: 91, skills: "Node.js, React, Docker", location: "Gurugram" }
  ];

  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-6">
        Candidate Submission — Step 2: Excel Consolidation
      </h1>

      {/* Steps Bar */}
      <div className="flex gap-3 mb-6">
        <div className="px-4 py-2 bg-gray-700 rounded-lg">1 Branding</div>
        <div className="px-4 py-2 bg-blue-600 rounded-lg">2 Excel</div>
        <div className="px-4 py-2 bg-gray-700 rounded-lg">3 Email</div>
      </div>

      {/* Purpose Panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <p className="text-gray-300 leading-relaxed">
          In this step, shortlisted candidates are consolidated into a
          <b> client-ready Excel summary sheet</b>. This format allows hiring managers to
          compare profiles, evaluate scores and track interview progress easily.
        </p>
      </div>

      {/* Excel Preview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 className="text-xl text-blue-400 font-semibold mb-3">
          Shortlist Summary — Excel Preview
        </h2>

        <table className="w-full text-sm border border-gray-700 rounded-lg overflow-hidden mb-5">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="p-3 text-left">Candidate ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Experience</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Key Skills</th>
              <th className="p-3 text-left">Location</th>
            </tr>
          </thead>

          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-gray-700">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.exp}</td>
                <td className="p-3 text-blue-400 font-semibold">{r.score}%</td>
                <td className="p-3">{r.skills}</td>
                <td className="p-3">{r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">

          <button
            className="px-6 py-3 bg-gray-700 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/submission/branding")}
          >
            <FaArrowLeft /> Back
          </button>

          <div className="flex gap-3">
            <button className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg flex items-center gap-2">
              <FaDownload /> Download Excel
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
    </div>
  );
};

export default ExcelConsolidation;
