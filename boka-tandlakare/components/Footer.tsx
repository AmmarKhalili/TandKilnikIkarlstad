import Link from "next/link";
import Image from "next/image";
import { FaTooth, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#007bff] to-[#0056b3] text-white py-12 mt-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sektion 1: Logo och företagsinfo */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-4">
            <Link href="/" className="flex items-center">
              <div className="text-white mr-2">
                <FaTooth size={30} />
              </div>{/* Tand-ikon */}
              <div className="text-2xl font-bold">
                <span className="text-white">Tand</span>
                <span className="text-white">kliniken</span>
              </div>
            </Link>
          </div>
          <p className="text-gray-200 text-center md:text-left">
            Kliniken är ansluten till Försäkringskassan och är en del av Privattandläkarna.
          </p>
          <div className="flex space-x-4 mt-4">
            <Image src="/image/Försäkning.jpg" alt="Försäkringskassan" width={120} height={50} className="rounded-lg" />
            <Image src="/image/privata.jpg" alt="Privattandläkarna" width={120} height={50} className="rounded-lg" />
          </div>
        </div>

        {/* Sektion 2: Länker */}
        <div className="flex justify-center">
          <div>
            <h3 className="text-lg font-semibold mb-4">Länkar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline hover:text-gray-300 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/om-oss" className="hover:underline hover:text-gray-300 transition-colors duration-300">
                  Om oss
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:underline hover:text-gray-300 transition-colors duration-300">
                  Kontakta
                </Link>
              </li>
              <li>
                <Link href="/boka" className="hover:underline hover:text-gray-300 transition-colors duration-300">
                  Boka en tid
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Sektion3: Kontaktuppgifter och öppettider */}
        <div className="flex justify-center">
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontaktuppgifter</h3>
            <p className="text-gray-200"><strong>Telefon:</strong> 054 771 64 64</p>
            <p className="text-gray-200"><strong>E-post:</strong> info@tandkompaniet.com</p>
            <p className="text-gray-200"><strong>Adress:</strong> Frykmans väg 1, 653 46 Karlstad</p>
            
            <h3 className="text-lg font-semibold mt-6">Öppettider</h3>
            <p className="text-gray-200">Mån - Fre: 07.50 - 16.30</p>
            <p className="text-gray-200">Lördag: Stängt</p>
            <p className="text-gray-200">Söndag: Stängt</p>

            {/* Sociala medier-ikoner */}
            <div className="flex space-x-4 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;