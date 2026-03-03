export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">
          Fellowship Outreach
        </h1>

        <a
          href="/admin/login"
          className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-blue-800 transition"
        >
          Admin Login
        </a>
      </div>
    </nav>
  );
}