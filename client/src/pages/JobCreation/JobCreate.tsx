import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaMagic } from "react-icons/fa";
import { parseJD } from "../../api/jobCreationApi";

const JobCreate = () => {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleParse = async () => {
    if (!text.trim()) return alert("Enter JD first!");

    try {
      setLoading(true);

      const parsed = await parseJD(text);

      localStorage.setItem("parsedJD", JSON.stringify(parsed));

      navigate("/jobs/parsed-summary");
    } 
    catch (err) {
      alert("AI parsing failed!");
    }

    setLoading(false);
  };

  return (
    <div className="text-white">

      <h1 className="text-4xl mb-6 font-bold">Job Creation & Sourcing</h1>

      <div className="grid grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-800">

          <h2 className="text-xl mb-4 font-semibold text-blue-400">
            Upload Job Specification
          </h2>

          <div
            className="
              w-full h-56 bg-gray-800 border-2 border-dashed border-gray-700
              rounded-xl flex flex-col justify-center items-center
              hover:border-blue-500 hover:bg-gray-700 transition cursor-pointer 
              text-gray-400 text-center
            "
          >
            <FaCloudUploadAlt size={70} className="mb-3 text-gray-500" />
            <p className="text-lg font-medium">Drag & Drop or Click to upload</p>
            <small className="text-sm opacity-70">Supports PDF, Word, Text</small>
          </div>

          <div className="mt-6 mb-3 text-center text-gray-500">OR</div>

          <textarea
            placeholder="Paste job description text here..."
            className="w-full h-48 bg-gray-800 p-4 rounded-lg text-white 
            outline-none border border-gray-700 focus:border-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleParse}
            disabled={loading}
            className="
              w-full mt-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 
              transition text-lg font-semibold flex justify-center 
              items-center gap-3
            "
          >
            <FaMagic />
            {loading ? "Processing AI..." : "Parse Job with AI"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl">

          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            What AI will extract
          </h2>

          <ul className="space-y-3 text-gray-300 text-lg">
            <li>• Job title</li>
            <li>• Must-have & Nice-to-have Skills</li>
            <li>• Experience Range</li>
            <li>• Location</li>
            <li>• Salary Range</li>
            <li>• Certifications Required</li>
            <li>• Keywords for sourcing</li>
          </ul>
        </div>

      </div>

      {loading && (
        <div 
          className="
            fixed top-0 left-0 w-full h-full bg-black/70 
            flex flex-col items-center justify-center z-50
          "
        >
          <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
          <p className="mt-6 text-2xl font-semibold text-white">
            AI Reading Job Description...
          </p>
        </div>
      )}

    </div>
  );
};

export default JobCreate;
