import Link from "next/link";
import {
  FaShieldAlt,
  FaClock,
  FaCog,
  FaUsers,
  FaHospital,
  FaExchangeAlt,
  FaChartBar
} from "react-icons/fa";

export default function Hero() {
  return (
    <section className="bg-gray-50">

      <div className="max-w-7xl mx-auto px-8 py-20 grid lg:grid-cols-2 gap-10 items-center">

        <div>
          <p className="text-red-600 font-bold uppercase">
            Save Blood. Save Lives.
          </p>

          <h1 className="text-6xl font-bold mt-4">
            Blood Management
            <span className="text-red-600 block">
              System
            </span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            A complete digital solution to manage blood donations,
            inventory, and transfusions efficiently.
          </p>

          <div className="flex gap-5 mt-8">
            <Link href={'/login'}>
            <button className="bg-red-600 cursor-pointer text-white px-8 py-4 rounded-full">
              Find Blood
            </button>
            </Link>

            <button className="border cursor-pointer border-red-600 text-red-600 px-8 py-4 rounded-full">
            <Link href={"/donar/register"}>  Become a Donor</Link>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div>
              <FaShieldAlt className="text-red-600 text-3xl mb-3" />
              <h3 className="font-semibold">Secure & Reliable</h3>
            </div>

            <div>
              <FaClock className="text-red-600 text-3xl mb-3" />
              <h3 className="font-semibold">Real-time Tracking</h3>
            </div>

            <div>
              <FaCog className="text-red-600 text-3xl mb-3" />
              <h3 className="font-semibold">Easy Management</h3>
            </div>

          </div>
        </div>

        <div className="relative">
          <div className="bg-red-600 rounded-[40px] p-10 relative">

            <img
              src="/blood-bag.png"
              alt=""
              className="mx-auto w-[300] absolute top-10 left-75"
            />

            <div className="space-y-8 text-white mt-8">

              <div className="flex gap-4">
                <FaUsers size={24} />
                <div>
                  <h4 className="font-bold">
                    Donor Management
                  </h4>
                  <p className="text-sm">
                    Manage donor profiles and history
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FaHospital size={24} />
                <div>
                  <h4 className="font-bold">
                    Inventory Management
                  </h4>
                </div>
              </div>

              <div className="flex gap-4">
                <FaExchangeAlt size={24} />
                <div>
                  <h4 className="font-bold">
                    Request & Allocation
                  </h4>
                </div>
              </div>

              <div className="flex gap-4">
                <FaChartBar size={24} />
                <div>
                  <h4 className="font-bold">
                    Reports & Analytics
                  </h4>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </section>
  );
}