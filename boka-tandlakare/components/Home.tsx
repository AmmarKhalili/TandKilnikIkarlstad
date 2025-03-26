"use client";
import Link from "next/link";
import Image from "next/image"; // Next.js Image för optimering
import { motion } from "framer-motion"; // Framer Motion för animationer

// data för tjänster
const services = [
  { id: 1, title: "Allmänt Tandvård", description: "Grundläggande tandbehandlingar och undersökningar." },
  { id: 2, title: "Tandblekning", description: "Få ett vitare leende med våra tandblekningstjänster." },
  { id: 3, title: "Akut Tandvård", description: "Snabb hjälp vid tandvärk och andra nödsituationer." },
  { id: 4, title: "Implantat", description: "Vi erbjuder tandimplantat for en långsiktig lösning." },
  { id: 5, title: "Tandreglering", description: "Rätta till tänder och bett med hjälp av tandreglering." },
  { id: 6, title: "Estetisk Tandvård", description: "Förbittra dit leende med estetisk tandvård." },
];

// data för teammedlemmar
const team = [
  { id: 1, name: "Dr. Ali sh", title: "Tandläkare", image: "/image/Dr1.jpg" },
  { id: 2, name: "Dr. Erik Karlsson", title: "Tandläkare", image: "/image/D2.jpg" },
  { id: 3, name: "Dr. Lisa Andersson", title: "Specialist", image: "/image/D4.jpg" },
  { id: 4, name: "Dr. Mohammad Berg", title: "Ortodontist", image: "/image/D3.jpg" },
];

// data för recensioner
const reviews = [
  { id: 1, name: "Anna P.", rating: 5, comment: "Fantastisk service och mycket professionellt personal!" },
  { id: 2, name: "Erik L.", rating: 4, comment: "Snabb och effektiv behandling. Rekommenderas!" },
  { id: 3, name: "Ammar Kh.", rating: 4, comment: "Snabb och effektiv behandling. Rekommenderas!" }
];




// data för "Varför välja oss?"
const whyChooseUs = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-[#007bff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Erfarenhet ",
    description: "Vårt team har många års erfarenhet och är specialister inom olika områden av tandvård.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-[#007bff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Modern teknik",
    description: "Vi använder senaste tekniken för att säkerställa att du får den bästa möjliga vården.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-[#007bff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
    ),
    title: "Bekväm och trygg ",
    description: "Vår klinik är utformad för att ge dig en avslappnad och bekväm upplevelse.",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-[#007bff]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    title: "Personlig vård",
    description: "Vi skräddarsyr varje behandling efter dina behov och önskemål.",
  },
];

const Home: React.FC = () => {
  return (
    <div className="w-full ">
      {/* HERO SEKTION */}
      <div
        className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/image/tand10.jpg')" }} // Ersätt med din egen bild
      >
        {/* Mörk overlay för bättre text */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Innehåll i Hero-sektionen */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
          {/* Rubrik */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
          >
            Tandklinik i Karlstad
          </motion.h1>

          {/* Undertitel */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl"
          >
         En privat tandläkare med lång erfarenhet. Wälkomen!
          </motion.p>

          {/* Knappar och telefonnummer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 items-center"
          >
            {/* Knapp för att boka tid */}
            <Link href="/boka">
              <button className="bg-[#007bff] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0056b3] hover:shadow-xl transition flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg font-semibold">Boka tid</span>
              </button>
            </Link>

            {/* Knapp för att hitta  kliniken */}
            <Link href="/kontakt/#hita-hit">
              <button className="bg-white text-[#007bff] px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-lg font-semibold">Hitta hit</span>
              </button>
            </Link>

            {/* Telefonnummr */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-lg font-semibold">08-123 456 78</span>
            </div>
          </motion.div>
        </div>
      </div>




      {/* Tjänster-sektion */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#007bff] mb-12"
          >
            Våra Tjänster
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <h4 className="text-xl font-bold text-[#007bff] mb-4">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TRÄFFA GÄNGET (personal som jobbar i kliniken)  */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#007bff] mb-12"
          >
            Träffa Gänget
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group text-center"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={250}
                    height={300}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <p className="text-white text-lg font-semibold">{member.title}</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-[#007bff] mt-4">{member.name}</h4>
                <p className="text-gray-600">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

       {/*  Varför välja oss? */}
       <section className="py-16 bg-gradient-to-r from-[#007bff] to-[#0056b3]">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Varför välja oss 
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl text-center"
              >
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-[#007bff] mb-4">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sektion med bilden och text */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Text i vänster side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#007bff] mb-6">
                Tandvård med kvalitet och omtanke
              </h3>
              <p className="text-gray-700 text-lg mb-8">
                Vi är en modern tandvårdsklinik som erbjuder allt från förebyggande vård till avancerade behandlingar. 
                Med vår erfarenhet och kompetens ser vi till att du får den bästa möjliga tandvården i en trygg och 
                avslappnad miljö.
              </p>
              <Link href="/kontakt">
                <button className="bg-[#007bff] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#0056b3] hover:shadow-xl transition">
                  Kontakta oss
                </button>
              </Link>
            </motion.div>

            {/* Bild i höger sida */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/image/bild1.jpg"
                  alt="Tandläkarklinik"
                  width={500}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Recensionar och Omdömen. */}
      <section className="py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-[#007bff] mb-12"
          >
            Vad säger våra patienter?
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-2xl ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <p className="text-gray-600 font-semibold">- {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     

      
    </div>
  );
};

export default Home;