import { FaBuilding, FaMapMarkerAlt, FaMoneyBill } from "react-icons/fa";

interface Props {
  job: any;
  onClose: () => void;
}

const JobViewModal = ({ job, onClose }: Props) => {
  const toLPA = (v?: number) => {
    if (!v || isNaN(v)) return "-";
    return (v / 100000).toFixed(1).replace(/\.0$/, "") + " LPA";
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 
      w-[900px] h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold">{job.title}</h2>
            <p className="text-blue-400 text-lg flex items-center gap-2">
              <FaBuilding /> {job.companyName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            Close
          </button>
        </div>

        {/* META GRID */}
        <div className="grid grid-cols-2 gap-4 text-gray-300 mb-6">
          <p><b>Location:</b> {job.location || "-"}</p>
          <p><b>Experience:</b> {job.experienceMin} — {job.experienceMax} yrs</p>
          <p><b>Salary:</b> {toLPA(job.salaryMin)} — {toLPA(job.salaryMax)}</p>
          <p><b>Education:</b> {job.educationLevel || "-"}</p>
          <p><b>Priority:</b> {job.priority || "medium"}</p>
          <p><b>Source:</b> {job.jdSource || "-"}</p>
        </div>

        {/* SKILLS */}
        {job.JobSkills?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl text-blue-400 mb-2">Skills</h3>

            <div className="flex gap-2 flex-wrap">
              {job.JobSkills.map((s: any, i: number) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm ${
                    s.type === "must" ? "bg-blue-600" : "bg-gray-700"
                  }`}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* KEYWORDS */}
        {job.SourcingKeywords?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xl text-blue-400 mb-2">Keywords</h3>

            <div className="flex gap-2 flex-wrap">
              {job.SourcingKeywords.map((k: any, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-800 rounded-md text-sm"
                >
                  {k.word}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* FULL JD */}
        <div>
          <h3 className="text-xl text-blue-400 mb-2">Job Description</h3>
          <p className="text-gray-300 whitespace-pre-line">
            {job.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default JobViewModal;
