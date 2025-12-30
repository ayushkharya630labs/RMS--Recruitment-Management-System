// src/pages/submission/EmailDraft.tsx
import { useState } from "react";
import { FaArrowLeft, FaPaperPlane, FaFilePdf, FaFileExcel } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmailDraft = () => {
  const navigate = useNavigate();

  const [to, setTo] = useState("hr@clientcompany.com");
  const [cc, setCc] = useState("delivery@rms-agency.in");
  const [subject, setSubject] = useState("Shortlisted Candidates — Senior Backend Developer");
  const [body, setBody] = useState(
`Dear Hiring Team,

Please find attached the shortlisted candidates for the Senior Backend Developer position.

• Total shortlisted: 3 candidates
• Average Match Score: 87%
• Branded anonymized CVs and shortlist Excel summary are attached for your review.

Kindly let us know suitable interview slots.

Warm Regards,
RMS Recruitment Team
India Delivery Unit`
  );

  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-6">
        Candidate Submission — Step 3: Email Draft & Attachments
      </h1>

      {/* Steps */}
      <div className="flex gap-3 mb-6">
        <div className="px-4 py-2 bg-gray-700 rounded-lg">1 Branding</div>
        <div className="px-4 py-2 bg-gray-700 rounded-lg">2 Excel</div>
        <div className="px-4 py-2 bg-blue-600 rounded-lg">3 Email</div>
      </div>

      {/* Email Panel */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 className="text-xl text-blue-400 font-semibold mb-4">
          Final Submission Email — Review & Send
        </h2>

        <div className="space-y-3 mb-5">
          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
            value={to} onChange={e => setTo(e.target.value)} placeholder="To" />

          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
            value={cc} onChange={e => setCc(e.target.value)} placeholder="CC" />

          <input className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
            value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" />
        </div>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full h-48 bg-gray-800 border border-gray-700 rounded-lg p-4 text-gray-200 mb-6"
        />

        {/* Attachments */}
        <div className="flex gap-3 mb-6">
          <span className="px-3 py-2 bg-gray-800 rounded-lg flex items-center gap-2">
            <FaFilePdf /> 3 Branded CVs Attached
          </span>

          <span className="px-3 py-2 bg-gray-800 rounded-lg flex items-center gap-2">
            <FaFileExcel /> Shortlist Summary Excel
          </span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            className="px-6 py-3 bg-gray-700 rounded-lg flex items-center gap-2"
            onClick={() => navigate("/submission/excel")}
          >
            <FaArrowLeft /> Back
          </button>

          <button
            className="px-8 py-3 bg-blue-600 rounded-lg flex items-center gap-2 text-lg font-semibold"
          >
            <FaPaperPlane />
            Send Submission to Client
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailDraft;
