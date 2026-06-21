"use client";

const news = [
  {
    title: "World Blood Donor Day 2026",
    description: "Global campaign promoting voluntary blood donation.",
    link: "https://www.who.int/campaigns/world-blood-donor-day/2026",
  },
  {
    title: "One Drop of Humanity. Give Blood. Save Lives.",
    description: "Official WHO World Blood Donor Day 2026 event.",
    link: "https://www.who.int/news-room/events/detail/2026/06/14/default-calendar/world-blood-donor-day-2026-one-drop-of-humanity-give-blood-save-lives",
  },
  {
    title: "WHO South-East Asia Blood Donation Initiative",
    description: "Regional efforts to improve blood donation and safety.",
    link: "https://www.who.int/southeastasia/news/detail/13-06-2026-world-blood-donor-day-2026",
  },
  {
    title: "World Blood Donor Day Bangladesh",
    description: "Blood donation awareness in Bangladesh.",
    link: "https://www.who.int/bangladesh/news/feature-stories/item/give-blood-give-hope-together-we-save-lives-world-blood-donor-day-2025",
  },
  {
    title: "WHO Blood Safety and Availability",
    description: "Facts about global blood safety and supply.",
    link: "https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability",
  },
  {
    title: "NHS Blood and Transplant News",
    description: "Latest updates from NHS Blood Services.",
    link: "https://www.blood.co.uk/news-and-campaigns/news-and-statements/",
  },
  {
    title: "WHO Campaign Key Messages",
    description: "Important blood donation awareness messages.",
    link: "https://www.who.int/campaigns/world-blood-donor-day/2026/key-messages",
  },
  {
    title: "WHO Campaign Overview",
    description: "Learn more about the World Blood Donor Day campaign.",
    link: "https://www.who.int/campaigns/world-blood-donor-day/2026/about",
  },
  {
    title: "One Blood Network Initiative",
    description: "Blood donor network development and awareness.",
    link: "https://www.tbsnews.net/bangladesh/health/govt-plans-one-blood-network-reduce-hassle-finding-donors-1164706",
  },
  {
    title: "Blood Donation Myths and Facts",
    description: "Common myths and facts about blood donation.",
    link: "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/world-blood-donor-day-who-can-donate-blood-myths-and-facts-to-know/articleshow/121850702.cms",
  },
  {
    title: "Global Blood Safety Report",
    description: "WHO report on blood safety and availability.",
    link: "https://www.who.int/publications",
  },
  {
    title: "WHO Western Pacific Blood Donor Day",
    description: "Regional blood donor awareness activities.",
    link: "https://www.who.int/westernpacific/newsroom/events/overview/item/2026/06/14/western-pacific-events/world-blood-donor-day-2026",
  },
  {
  title: "American Red Cross News",
  description: "Latest blood donation campaigns and donor stories.",
  link: "https://www.redcross.org/about-us/news-and-events.html",
},
{
  title: "AABB News",
  description: "News from the Association for the Advancement of Blood & Biotherapies.",
  link: "https://www.aabb.org/news-resources",
},
{
  title: "International Federation of Red Cross",
  description: "Global humanitarian and blood donation updates.",
  link: "https://www.ifrc.org/news",
},
{
  title: "NHS Give Blood Campaigns",
  description: "UK blood donation campaigns and announcements.",
  link: "https://www.blood.co.uk",
},
{
  title: "World Health Organization News",
  description: "Global health and blood safety updates.",
  link: "https://www.who.int/news-room",
},
{
  title: "Centers for Disease Control and Prevention",
  description: "Blood safety and donation information.",
  link: "https://www.cdc.gov/blood-safety",
},
{
  title: "MedlinePlus Blood Donation",
  description: "Educational resources about blood donation.",
  link: "https://medlineplus.gov/blooddonationandtransfusion.html",
},
{
  title: "Johns Hopkins Medicine",
  description: "Research and awareness about blood donation.",
  link: "https://www.hopkinsmedicine.org",
},
{
  title: "Mayo Clinic Health News",
  description: "Health news and blood donation information.",
  link: "https://newsnetwork.mayoclinic.org",
},
{
  title: "Stanford Blood Center News",
  description: "Blood donor stories and community updates.",
  link: "https://stanfordbloodcenter.org/news",
},
{
  title: "Canadian Blood Services News",
  description: "Blood donation campaigns and national updates.",
  link: "https://www.blood.ca/en/about-us/media",
},
{
  title: "Australian Red Cross Lifeblood",
  description: "Blood donation news and donor information.",
  link: "https://www.lifeblood.com.au/news-and-stories",
},
{
  title: "European Blood Alliance",
  description: "European blood service developments.",
  link: "https://europeanbloodalliance.eu/news",
},
{
  title: "Blood Centers of America",
  description: "Community blood center news and initiatives.",
  link: "https://www.bloodcenters.org/news",
},
{
  title: "Global Blood Fund News",
  description: "International blood transfusion support updates.",
  link: "https://www.globalbloodfund.org/news",
}
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            Blood Donation News & Updates
          </h1>
          <p className="text-lg">
            Stay informed about blood donation campaigns, awareness programs,
            and healthcare updates from trusted sources.
          </p>
        </div>
      </div>

      {/* News Cards */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-bold mb-3 text-red-600">
                {item.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {item.description}
              </p>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Become a Blood Donor Today
          </h2>

          <p className="text-gray-600 mb-6">
            Every donation can save lives. Join our mission and help patients
            in need.
          </p>

          <a
            href="/request/form"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Request Blood
          </a>
        </div>
      </div>
    </div>
  );
}