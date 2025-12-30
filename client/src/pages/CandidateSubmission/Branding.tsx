// src/pages/submission/SubmissionBranding.tsx
import { FaUserTie, FaArrowRight, FaIdCard, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SubmissionBranding = () => {
  const navigate = useNavigate();

  const candidates = [
    {
      id: "RMS-IND-2401",
      name: "Rahul Verma",
      exp: 5,
      score: 88,
      role: "Senior Backend Developer",
      location: "Bangalore",
      skills: ["Node.js", "Express", "MongoDB", "AWS"]
    },
    {
      id: "RMS-IND-2402",
      name: "Priya Sharma",
      exp: 4,
      score: 82,
      role: "Frontend React Engineer",
      location: "Pune",
      skills: ["React", "TypeScript", "Redux", "Tailwind"]
    },
    {
      id: "RMS-IND-2403",
      name: "Arjun Mehta",
      exp: 7,
      score: 91,
      role: "Full-Stack Engineer",
      location: "Gurugram",
      skills: ["Node.js", "React", "PostgreSQL", "Docker"]
    }
  ];

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

      {/* Purpose Info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <p className="text-gray-300 leading-relaxed">
          Before submitting candidates to the client, CVs are converted into a
          <b> branded & anonymized format</b>. Personal contact details are removed and
          each profile is assigned a <b>trackable Candidate ID</b> to maintain
          confidentiality and agency submission security.
        </p>
      </div>

      {/* Template Preview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">

        <h2 className="text-xl text-blue-400 font-semibold mb-3">
          RMS Branded CV Template — Preview
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* Original */}
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-red-300 mb-2">
              Before — Raw Candidate CV
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              Rahul Verma<br />
              Email: rahul.verma@gmail.com<br />
              Phone: +91 9876543210<br />
              LinkedIn: linkedin.com/in/rahul-verma
            </p>
          </div>

          {/* Branded */}
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="font-semibold text-green-300 mb-2">
              After — RMS Branded & Anonymized Profile
            </p>

            <p className="text-gray-300 text-sm leading-relaxed">
              Candidate ID: <b>RMS-IND-2401</b><br />
              Senior Backend Developer — Bangalore<br />
              5 Years Experience<br /><br />
              Key Skills: Node.js • AWS • MongoDB • Microservices
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate("/submission/excel")}
            className="px-8 py-3 flex items-center gap-2 bg-blue-600 rounded-lg"
          >
            Next — Excel Consolidation <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Candidate List */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

        <h2 className="text-xl text-blue-400 font-semibold mb-3">
          Shortlisted Candidates ({candidates.length})
        </h2>

        {candidates.map(c => (
          <div key={c.id}
            className="border border-gray-700 rounded-lg p-4 mb-3 flex justify-between"
          >
            <div>
              <p className="text-lg font-semibold flex items-center gap-2">
                <FaUserTie className="text-blue-400" /> {c.name}
              </p>

              <p className="text-gray-400 text-sm">
                {c.role} • {c.exp} yrs • {c.location} • Score {c.score}%
              </p>

              <p className="text-gray-400 text-xs">
                Skills: {c.skills.join(", ")}
              </p>
            </div>

            <span className="text-gray-400 flex items-center gap-2">
              <FaShieldAlt /> {c.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubmissionBranding;
