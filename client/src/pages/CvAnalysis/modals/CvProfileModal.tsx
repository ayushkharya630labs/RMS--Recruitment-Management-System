interface Props {
  cv: any;   // candidate object
  onClose: () => void;
}

const CvProfileModal = ({ cv, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-[750px] max-h-[90vh] overflow-auto">

        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Candidate Profile
        </h2>

        {/* BASIC INFO */}
        <div className="space-y-2 text-gray-300 mb-4">
          <p><b>Name:</b> {cv.name || "—"}</p>
          <p><b>Email:</b> {cv.email || "—"}</p>
          <p><b>Phone:</b> {cv.phone || "—"}</p>
          <p><b>Location:</b> {cv.location || "—"}</p>
          <p><b>Current Role:</b> {cv.currentRole || "—"}</p>
          <p><b>Total Experience:</b> {(cv.totalExperience ?? 0) + " yrs"}</p>
        </div>

        {/* SUMMARY */}
        {cv.summary && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Summary</h3>
            <p className="text-gray-300">{cv.summary}</p>
          </div>
        )}

        {/* SKILLS */}
        <div className="mb-4">
          <h3 className="text-blue-400 font-semibold mb-1">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {(cv.skills || []).map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        {cv.experience?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Experience</h3>

            {cv.experience.map((exp: any, i: number) => (
              <div key={i} className="p-3 bg-gray-800 rounded-lg mb-2">
                <p className="text-white font-semibold">{exp.role} — {exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.duration}</p>
                <p className="text-gray-300 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* EDUCATION */}
        {cv.education?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Education</h3>

            {cv.education.map((edu: any, i: number) => (
              <div key={i} className="p-3 bg-gray-800 rounded-lg mb-2">
                <p className="text-white font-semibold">{edu.degree}</p>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {/* CERTIFICATIONS */}
        {cv.certifications?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Certifications</h3>
            <ul className="list-disc ml-6 text-gray-300">
              {cv.certifications.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        )}

        {/* PROJECTS */}
        {cv.projects?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Projects</h3>
            {cv.projects.map((p: any, i: number) => (
              <div key={i} className="p-3 bg-gray-800 rounded-lg mb-2">
                <p className="text-white font-semibold">{p.title}</p>
                <p className="text-gray-300">{p.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {cv.achievements?.length > 0 && (
          <div className="mb-4">
            <h3 className="text-blue-400 font-semibold mb-1">Achievements</h3>
            <ul className="list-disc ml-6 text-gray-300">
              {cv.achievements.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {/* RAW TEXT (fallback) */}
        {cv.rawText && (
          <details className="mt-4">
            <summary className="cursor-pointer text-blue-400">
              View Raw CV Text
            </summary>
            <pre className="mt-2 text-gray-300 whitespace-pre-wrap">
              {cv.rawText}
            </pre>
          </details>
        )}

        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CvProfileModal;
