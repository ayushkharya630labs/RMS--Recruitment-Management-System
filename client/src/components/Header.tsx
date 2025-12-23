const Header = () => {
  return (
    <header className="h-16 w-full border-b border-gray-700 bg-gray-800 flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-white">Welcome to RMS</h2>

      <div className="flex gap-4 items-center">
        <span className="text-gray-300 text-sm">Ayush Kharya</span>

        <img
          src="https://ui-avatars.com/api/?name=Ayush Kharya"
          className="rounded-full w-10 h-10 border border-gray-600"
        />
      </div>
    </header>
  );
};

export default Header;
