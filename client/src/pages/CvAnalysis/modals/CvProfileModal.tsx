interface Props {
  cv: any;
  onClose: () => void;
}

const CvProfileModal = ({ cv, onClose }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-8 w-[700px] max-h-[90vh] overflow-auto">

        <h2 className="text-2xl font-bold text-blue-400 mb-4">
          Candidate Profile
        </h2>

        <div className="space-y-3 text-gray-300">
          <p><b>Name:</b> {cv.name}</p>
          <p><b>Location:</b> {cv.location}</p>
          <p><b>Experience:</b> {cv.experience}</p>
          <p><b>Education:</b> {cv.education}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-blue-400 mb-2 font-semibold">Skills</h3>
          <div className="flex gap-2 flex-wrap">
            {cv.skills.map((s: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                {s}
              </span>
            ))}
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

export default CvProfileModal;
