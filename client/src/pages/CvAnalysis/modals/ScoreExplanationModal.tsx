interface Props {
  cv: any;
  onClose: () => void;
}

const ScoreExplanationModal = ({ cv, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-[650px]">

        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          AI Score Explanation
        </h2>

        <p className="mb-4 text-gray-300">
          <b>Candidate:</b> {cv.name}
        </p>

        <div className="space-y-5">

          {/* SKILL MATCH */}
          <div>
            <h3 className="text-blue-300 mb-1">Skill Match ({cv.skillMatch}%)</h3>
            <p className="text-gray-400">
              Matched Skills:
              <span className="text-green-400"> {cv.matchedSkills.join(", ")}</span>
            </p>
            <p className="text-gray-400">
              Missing Skills:
              <span className="text-red-400"> {cv.missingSkills.join(", ")}</span>
            </p>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h3 className="text-blue-300 mb-1">
              Experience Match ({cv.experienceMatch}%)
            </h3>
            <p className="text-gray-400">
              Experience aligns with job requirement.
            </p>
          </div>

          {/* OVERALL */}
          <div>
            <h3 className="text-blue-300 mb-1">
              Overall Score ({cv.overallScore}%)
            </h3>
            <p className="text-gray-400">
              Score calculated using weighted AI model:
              <br />
              Skills (50%), Experience (30%), Education (20%)
            </p>
          </div>

          {/* RECOMMENDATION */}
          <div>
            <h3 className="text-blue-300 mb-1">AI Recommendation</h3>
            <p className="text-white font-semibold">
              {cv.recommendation} — Suitable for next hiring stage.
            </p>
          </div>

        </div>

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

export default ScoreExplanationModal;
