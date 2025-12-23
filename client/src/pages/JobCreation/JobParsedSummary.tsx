import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { createJob } from "../../api/jobCreationApi";

const JobParsedSummary = () => {

  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("parsedJD");
    if (!stored) navigate("/jobs/create");
    setData(JSON.parse(stored!));
  }, []);

  if (!data) return null;

  // -------------------------
  // SAVE PARSED DATA TO DB 
  // -------------------------
  const handleSaveJob = async () => {

    setSaving(true);

    const payload = {
      title: data.title,
      description: "Auto Imported from AI", // later editable

      experienceMin: Number(data.experienceRange?.match(/\d+/)?.[0]),
      experienceMax: Number(data.experienceRange?.match(/-(\d+)/)?.[1]),

      salaryMin: Number(data.salaryRange?.match(/\d+/)?.[0]),
      salaryMax: Number(data.salaryRange?.match(/-(\d+)/)?.[1]),

      location: data.location,
      educationLevel: data.education,

      // save skillsRequired as comma string
      skillsRequired: data.skillsMustHave.join(", "),

      // saving job_skills table
      skills: [
        ...data.skillsMustHave.map((s: string) => ({
          name: s,
          type: "must",
        })),
        ...data.skillsNiceToHave.map((s: string) => ({
          name: s,
          type: "nice",
        }))
      ],

      // sourcing_keywords table
      keywords: data.keywords,
    };

    try {
      await createJob(payload);

      setSaving(false);

      // clear memory
      localStorage.removeItem("parsedJD");

      navigate("/jobs/list");

    } catch (err: any) {
      alert("Saving failed!");
      setSaving(false);
    }
  };

  return (
    <div className="text-white pb-20">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl mb-10 font-bold">Parsed Summary</h1>

        <button
          onClick={() => alert("Edit feature coming soon")}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center gap-2"
        >
          <FaEdit /> Edit Fields
        </button>
      </div>

      {/* JOB TITLE */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-2 font-semibold">Job Title</h2>
        <p className="text-2xl font-bold text-white">{data.title}</p>
      </section>

      {/* MUST HAVE SKILLS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Must-Have Skills
        </h2>

        <div className="flex gap-3 flex-wrap">
          {data.skillsMustHave?.map((s: string, i: number) => (
            <span key={i} className="px-4 py-2 bg-blue-600 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* NICE TO HAVE SKILLS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Nice-to-Have Skills
        </h2>

        <div className="flex gap-3 flex-wrap">
          {data.skillsNiceToHave?.map((s: string, i: number) => (
            <span key={i} className="px-4 py-2 bg-gray-700 rounded-full">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* GRID INFO */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Experience</h3>
          <p>{data.experienceRange}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Location</h3>
          <p>{data.location}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Salary Range</h3>
          <p>{data.salaryRange}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-blue-300 mb-2">Education</h3>
          <p>{data.education}</p>
        </div>
      </div>

      {/* KEYWORDS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mt-6 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">Keywords</h2>

        <div className="flex gap-2 flex-wrap">
          {data.keywords?.map((k: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-gray-800 rounded-md text-sm">
              {k}
            </span>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Technical Stack
        </h2>

        <div className="flex gap-2 flex-wrap">
          {data.technicalStack?.map((t: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-green-700 rounded-md text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* SOFT SKILLS */}
      <section className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-10">
        <h2 className="text-xl text-blue-400 mb-4 font-semibold">
          Soft Skills
        </h2>

        <div className="flex gap-2 flex-wrap">
          {data.softSkills?.map((t: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-purple-700 rounded-md text-sm">
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSaveJob}
        className="
          mt-10 bg-blue-600 hover:bg-blue-500 
          text-xl px-10 py-5 rounded-lg 
          flex items-center gap-3 font-semibold 
          transition
        "
      >
        <FaCheckCircle />
        {saving ? "Saving..." : "Save & Create Job"}
      </button>

      {/* NEXT STEPS */}
      <div className="mt-14 text-gray-400 border-t border-gray-700 pt-6">
        <h2 className="text-2xl mb-4 text-blue-400 font-semibold">
          Next Steps After Job Creation
        </h2>

        <ul className="space-y-2 text-lg">
          <li>• Upload CVs in bulk</li>
          <li>• Fetch from LinkedIn postings</li>
          <li>• AI-powered search inside Ajyal DB</li>
          <li>• Import from Naukri postings</li>
        </ul>
      </div>

    </div>
  );
};

export default JobParsedSummary;
