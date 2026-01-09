import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaMagic, FaBuilding, FaUserTie } from "react-icons/fa";
import { parseJD } from "../../api/jobCreationApi";

const JobCreate = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState("");
  const [hiringManagerName, setHiringManagerName] = useState("");
  const [hiringManagerEmail, setHiringManagerEmail] = useState("");
  const [jdSource, setJdSource] = useState("email");
  const [priority, setPriority] = useState("medium");

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    if (!companyName.trim()) return alert("Enter Client / Company name");
    if (!text.trim()) return alert("Paste Job Description first");

    try {
      setLoading(true);

      const parsed = await parseJD(text);

      const payload = {
        companyName,
        hiringManagerName,
        hiringManagerEmail,
        jdSource,
        priority,
        rawJD: text,
        parsed,
      };

      localStorage.setItem("parsedJD", JSON.stringify(payload));

      navigate("/jobs/parsed-summary");
    } catch (err) {
      alert("AI parsing failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-4xl mb-6 font-bold">Job Creation & Sourcing</h1>

      <div className="grid grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">

          <h2 className="text-xl mb-4 font-semibold text-blue-400">
            Client & Job Details
          </h2>

          {/* Company */}
          <div className="mb-4">
            <label className="text-gray-300 flex items-center gap-2 mb-1">
              <FaBuilding /> Company / Client Name
            </label>
            <input
              className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Example: Flipkart, TCS, Deloitte"
            />
          </div>

          {/* Hiring Manager */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-300 flex items-center gap-2 mb-1">
                <FaUserTie /> Hiring Manager Name
              </label>
              <input
                className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
                value={hiringManagerName}
                onChange={e => setHiringManagerName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">Hiring Manager Email</label>
              <input
                className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
                value={hiringManagerEmail}
                onChange={e => setHiringManagerEmail(e.target.value)}
              />
            </div>
          </div>

          {/* JD Meta */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-gray-300 mb-1 block">JD Source</label>
              <select
                className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
                value={jdSource}
                onChange={e => setJdSource(e.target.value)}
              >
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="portal">Client Portal</option>
                <option value="internal">Internal</option>
              </select>
            </div>

            <div>
              <label className="text-gray-300 mb-1 block">Priority</label>
              <select
                className="w-full bg-gray-800 p-3 rounded-lg border border-gray-700"
                value={priority}
                onChange={e => setPriority(e.target.value)}
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          {/* JD Upload */}
          <h2 className="text-xl mt-6 mb-2 font-semibold text-blue-400">
            Upload / Paste Job Description
          </h2>

          <div className="
            w-full h-40 bg-gray-800 border-2 border-dashed border-gray-700
            rounded-xl flex flex-col justify-center items-center
            text-gray-400 mb-4
          ">
            <FaCloudUploadAlt size={55} className="mb-3 text-gray-500" />
            Drag & Drop or Upload JD (optional)
          </div>

          <textarea
            placeholder="Paste job description here..."
            className="w-full h-40 bg-gray-800 p-4 rounded-lg border border-gray-700"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            onClick={handleParse}
            disabled={loading}
            className="w-full mt-6 py-4 rounded-lg bg-blue-600 hover:bg-blue-500 
            flex items-center justify-center gap-3 text-lg font-semibold"
          >
            <FaMagic />
            {loading ? "Processing..." : "Parse JD with AI"}
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            What AI will extract
          </h2>

          <ul className="space-y-3 text-gray-300 text-lg">
            <li>• Job Title & Role Summary</li>
            <li>• Must-have & Nice-to-have Skills</li>
            <li>• Experience Range</li>
            <li>• Tech Stack & Tools</li>
            <li>• Keywords for sourcing</li>
            <li>• Responsibilities & Deliverables</li>
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
