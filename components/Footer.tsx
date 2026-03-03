import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">⛪</span>
              </div>
              <span className="font-bold text-xl">Campus Outreach</span>
            </div>
            <p className="text-gray-400">
              Empowering Christian fellowships across Ethiopian campuses to measure and maximize their gospel impact.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#mission" className="hover:text-sky-400 transition">Mission</Link></li>
              <li><Link href="#impact" className="hover:text-sky-400 transition">Impact</Link></li>
              <li><Link href="#contact" className="hover:text-sky-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Addis Ababa, Ethiopia</li>
              <li>info@campusoutreach.et</li>
              <li>+251 11 123 4567</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Campus Outreach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}