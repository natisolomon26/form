export function Impact() {
  return (
    <section className="py-24 bg-primary text-white px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-3xl font-bold mb-12">
          Empowering Campus Leadership
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <Stat number="10+" label="Campuses Supported" />
          <Stat number="1,000+" label="Outreach Encounters Tracked" />
          <Stat number="100+" label="Active Student Participants" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: any) {
  return (
    <div>
      <h4 className="text-4xl font-bold">{number}</h4>
      <p className="mt-2 opacity-80">{label}</p>
    </div>
  );
}