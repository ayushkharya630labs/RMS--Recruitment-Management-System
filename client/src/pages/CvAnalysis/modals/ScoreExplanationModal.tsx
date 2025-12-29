interface Props {
  cv: any;   // analysis object
  onClose: () => void;
}

const ScoreExplanationModal = ({ cv, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-[650px]">

        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          AI Score Explanation
        </h2>

        <div className="space-y-5 text-gray-300">

          <p><b>Recommendation:</b> {cv.recommendation}</p>

          <div>
            <h3 className="text-blue-300 mb-1">
              Skill Match ({cv.skillMatch}%)
            </h3>
            <p>
              <span className="text-green-400">
                Matched: {cv.matchedSkills?.join(", ") || "—"}
              </span>
            </p>
            <p>
              <span className="text-red-400">
                Missing: {cv.missingSkills?.join(", ") || "—"}
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-blue-300 mb-1">
              Experience Match ({cv.experienceMatch}%)
            </h3>
          </div>

          <div>
            <h3 className="text-blue-300 mb-1">
              Overall Score ({cv.overallScore}%)
            </h3>
            <p>{cv.explanation || "AI evaluation summary unavailable."}</p>
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
