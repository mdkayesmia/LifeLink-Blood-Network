import Link from "next/link";
import {
  FaTint,
  FaHandHoldingHeart,
  FaUserPlus,
  FaSearch,
  FaHospital,
  FaAmbulance,
} from "react-icons/fa";

export default function ServicesPage() {
  const services = [
    {
      title: "Blood Donation",
      icon: <FaTint size={40} />,
      path:"/donar/register",
      description:
        "Donate blood and help save lives. Your donation can make a difference for patients in need.",
    },
    {
      title: "Blood Request",
      icon: <FaHandHoldingHeart size={40} />,
      path:"/request",
      description:
        "Submit blood requests quickly and connect with available donors nearby.",
    },
    {
      title: "Donor Registration",
      icon: <FaUserPlus size={40} />,
      path:"/donar/register",
      description:
        "Register as a donor and become part of our lifesaving community.",
    },
    {
      title: "Blood Search",
      icon: <FaSearch size={40} />,
       path:"/dashboard",
      description:
        "Search donors by blood group and location to find the right match.",
    },
    {
      title: "Hospital Support",
      icon: <FaHospital size={40} />,
       path:"",
      description:
        "Collaborate with hospitals and healthcare organizations for better blood management.",
    },
    {
      title: "Emergency Service",
      icon: <FaAmbulance size={40} />,
       path:"",
      description:
        "Get urgent blood support during emergencies with fast donor connections.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl mx-auto text-lg">
          We provide reliable blood donation and blood request services to
          connect donors and recipients efficiently.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link href={service.path} key={service.title}>
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="text-red-600 mb-4">{service.icon}</div>

              <h2 className="text-2xl font-bold mb-3">
                {service.title}
              </h2>

              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
            
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">
            Become a Lifesaver Today
          </h2>

          <p className="text-gray-600 mb-6">
            Join our community of blood donors and help patients in need.
            Every donation can save multiple lives.
          </p>

          <a
            href="/request/form"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Request Blood
          </a>
        </div>
      </div>
    </div>
  );
}