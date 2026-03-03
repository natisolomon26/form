export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Measuring Gospel Impact
          <span className="block text-primary mt-2">
            Across Ethiopian Campuses
          </span>
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          A centralized outreach data platform for Christian fellowship
          students and supervisors to track, analyze, and grow
          campus impact.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#mission"
            className="px-6 py-3 rounded-2xl bg-primary text-white font-medium hover:bg-blue-800 transition"
          >
            Learn More
          </a>

          <a
            href="/admin/login"
            className="px-6 py-3 rounded-2xl border border-gray-300 font-medium hover:bg-gray-100 transition"
          >
            Admin Access
          </a>
        </div>
      </div>
    </section>
  );
}