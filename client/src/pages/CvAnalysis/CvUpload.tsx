import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaBrain, FaFileAlt } from "react-icons/fa";
import { getJobs } from "../../api/jobCreationApi";
import { analyzeCVsApi } from "../../api/cvAnalysisApi";

interface Job {
  id: number;
  title: string;
  experienceMin?: number;
  experienceMax?: number;
}

const CvUpload = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
      if (data.length > 0) setSelectedJobId(data[0].id);
    } catch {
      console.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

 const handleAnalyze = async () => {
  if (!selectedJobId) return alert("Please select a job first");
  if (files.length === 0) return alert("Please upload at least one CV");

  setAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("jobId", String(selectedJobId));

    files.forEach(file => {
      formData.append("cvs", file);
    });

    const result = await analyzeCVsApi(formData);

    sessionStorage.setItem("aiCvResults", JSON.stringify(result.data));

    navigate("/cv-analysis/parsed");
 } catch (err: any) {
  console.error("CV Upload Error >>>", err);
  alert(err?.response?.data?.message || "AI CV Analysis failed");
  } finally {
    setAnalyzing(false);
  }
};

  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold mb-8">
        CV Analysis & Scoring
      </h1>

      <div className="grid grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">

          <h2 className="text-xl text-blue-400 mb-4 font-semibold">
            Select Job
          </h2>

          {loading ? (
            <div className="text-gray-400">Loading jobs...</div>
          ) : (
            <select
              value={selectedJobId ?? ""}
              onChange={(e) => setSelectedJobId(Number(e.target.value))}
              className="w-full bg-gray-800 p-4 rounded-lg border border-gray-700 mb-6"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} | {job.experienceMin ?? "?"}-
                  {job.experienceMax ?? "?"} yrs
                </option>
              ))}
            </select>
          )}

          <h2 className="text-xl text-blue-400 mb-4 font-semibold">
            Upload Candidate CV(s)
          </h2>

          <label
            className="
              h-56 border-2 border-dashed border-gray-700 rounded-xl
              flex flex-col items-center justify-center
              text-gray-400 hover:border-blue-500 transition cursor-pointer
            "
          >
            <FaUpload size={60} />
            <p className="mt-3 text-lg">Upload CVs (PDF / DOC)</p>

            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                  <FaFileAlt className="text-blue-400" />
                  {file.name}
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className={`
              mt-6 w-full py-4 rounded-lg flex justify-center items-center gap-3
              text-lg font-semibold transition
              ${analyzing
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500"}
            `}
          >
            <FaBrain />
            {analyzing ? "AI Analyzing CVs..." : "Analyze CVs with AI"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-xl">
          <h2 className="text-xl text-blue-400 mb-4 font-semibold">
            What AI will do
          </h2>

          <ul className="space-y-3 text-gray-300 text-lg">
            <li>• Parse candidate details</li>
            <li>• Extract skills & experience</li>
            <li>• Match CV vs selected job</li>
            <li>• Generate AI score</li>
            <li>• Recommend shortlist / reject</li>
          </ul>
        </div>
      </div>

      {/* AI Analyzing Overlay */}
      {analyzing && (
        <div className="
          fixed top-0 left-0 w-full h-full bg-black/70
          flex flex-col items-center justify-center z-50
        ">
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
          <p className="mt-6 text-2xl font-semibold text-white">
            AI Analyzing CVs against Job Requirements...
          </p>
        </div>
      )}
    </div>
  );
};

export default CvUpload;
