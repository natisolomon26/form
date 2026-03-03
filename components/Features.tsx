export function Features() {
  return (
    <section className="py-24 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-16">
          Platform Features
        </h3>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            title="Custom Outreach Forms"
            description="Create flexible forms tailored for different campuses and outreach campaigns."
          />
          <FeatureCard
            title="Real-Time Analytics"
            description="View impact metrics by campus, region, and time period."
          />
          <FeatureCard
            title="Secure Data Collection"
            description="Centralized, protected data storage with controlled admin access."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: any) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <h4 className="text-xl font-semibold mb-4">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}