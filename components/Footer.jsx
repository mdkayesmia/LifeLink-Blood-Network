import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center">

        <p>
          © {new Date().getFullYear()} Blood Management System
        </p>

        <Link
          href="https://portfolio-lemon-six-0yo3b4hy6l.vercel.app/"
          target="_blank"
          className="inline-block"
        >
          <p className="text-red-400 mt-2 hover:text-red-300 transition">
            Developed by Md. Kayes Mia
          </p>
        </Link>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-4">

          <Link
            href="https://www.facebook.com/mdkayesmia01/"
            target="_blank"
            className="text-2xl text-blue-500 hover:scale-110 transition"
          >
            <FaFacebook className="text-white" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/mdkayesmia/"
            target="_blank"
            className="text-2xl text-blue-400 hover:scale-110 transition"
          >
            <FaLinkedin className="text-white" />
          </Link>

        </div>

      </div>
    </footer>
  );
}

export default Footer;