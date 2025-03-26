"use client";
import React from "react";
import { motion } from "framer-motion";

// Animationer
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animerar barnen med en fördröjning på 0.2 sekunder .
    },
  },
};

const About = () => {
  return (
    <div className="bg-white text-gray-800">

           {/* Hero-sektion */}
      <div className="relative h-[400px] md:h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/image/Herobild.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bästa tandvården i Hela Karlstad
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
              Din pålitliga tandklinik i Karlstad
            </p>
            <a
              href="#om-oss"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Läs Mer
            </a>
          </motion.div>
        </div>
      </div>
    

      {/* Om oss-sektion */}
      <div id="om-oss" className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-4xl font-bold text-center text-blue-600 mb-12"
        >
         Om oss
        </motion.h2>

        {/* Om oss-informtion med animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Bildsektion */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Stora bild (50% höjd) */}
            <div className="h-[50%] bg--100 p-6 rounded-lg  overflow-hidden">
              <img
                src="/image/bild1.jpg" 
                alt="Om oss bild"
                className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Två små bildar (25% bredd var) */}
            <div className="flex gap-6">
              <div className="w-1/2 bg--100 p-4 rounded-lg  overflow-hidden">
                <img
                  src="/image/Herobild.jpg" 
                  alt=""
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="w-1/2 bg-gray-100 p-4 rounded-lg  overflow-hidden">
                <img
                  src="/image/tand1.jpg" 
                  alt=""
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Text med animation */}
          <motion.div
            variants={fadeInUp}
            className="bg-gray-100 p-8 rounded-lg shadow-md"
          >
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-semibold text-blue-600 mb-6"
            >
              Vår Historia
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 mb-4 leading-relaxed"
            >
              Välkommen till Tandkompaniet, din pålitliga tandklinik i Karlstad.
              Vi har varit en del av samhället i över 20 år och har hjälpt
              tusentals patienter att uppnå och behålla ett friskt leende.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 mb-4 leading-relaxed"
            >
              Vår filosofi är att varje patient förtjänar den bästa möjliga
              vården. Vi strävar efter att skapa en avslappnad och bekväm miljö
              där du kan känna dig trygg och omhändertagen.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 mb-4 leading-relaxed"
            >
              Vårt team av erfarna och certifierade tandläkare och tandhygienister
              är dedikerade till att erbjuda högkvalitativ tandvård med fokus på
              prevention och patientutbildning.
            </motion.p>
            <motion.h3
              variants={fadeInUp}
              className="text-2xl font-semibold text-blue-600 mt-8 mb-6"
            >
              Vår Vision
            </motion.h3>
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 leading-relaxed"
            >
              Vår vision är att vara ledande inom tandvård genom att erbjuda
              innovativa och patientcentrerade lösningar. Vi vill vara ditt första
              val när det gäller tandvård för hela familjen.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Teamet som jobbar i klinik med animation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-3xl font-semibold text-blue-600 mb-12 text-center"
          >
            Vårt Team
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* personal  1 */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src="/image/D4.jpg" 
                alt="Teammedlem 1"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-blue-600">
                Dr. Anna Svensson
              </h4>
              <p className="text-gray-700">Tandläkare</p>
            </motion.div>

            {/* personal 2 */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src="/image/D2.jpg" 
                alt="Teammedlem 2"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-blue-600">
                Dr. Erik Johansson
              </h4>
              <p className="text-gray-700">Tandläkare</p>
            </motion.div>

            {/* personal  3 */}
            <motion.div
              variants={fadeInUp}
              className="bg-gray-100 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src="/image/D3.jpg" // Lägg till sökvägen till din bild här
                alt="Teammedlem 3"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-blue-600">
                Sara Karlsson
              </h4>
              <p className="text-gray-700">Tandhygienist</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;