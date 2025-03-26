
"use client"
import React, { useState } from "react";
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
      staggerChildren: 0.2, // Animerar barnen med en fördröjning på 0.2 sekunder
    },
  },
};

const Kontakt = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact", // Ange typen som "contact"
          firstName: name.split(" ")[0], // Dela upp namnet i för- och efternamn
          lastName: name.split(" ")[1] || "", // Om det inte finns något efternamn, använd en tom sträng
          email,
          message,
        }),
      });

      if (response.ok) {
        setSubmitMessage("Tack för ditt meddelande! Vi återkommer så snart som möjligt.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        const errorData = await response.json();
        setSubmitMessage(`Något gick fel: ${errorData.error}`);
      }
    } catch (error) {
      setSubmitMessage("Något gick fel vid skickande av meddelandet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="bg-white text-black py-">
           {/* Hero-sektion */}
      <div className="relative h-[400px] md:h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/image/tand12.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Kontakta Oss
            </h1>
            <p className="text-lg md:text-xl text-white mb-8">
            Här hittar du alla våra kontaktuppgifter. Kontakta oss via telefon eller e-post.
            </p>
            
          </motion.div>
        </div>
      </div>
           
      <div className="container mx-auto px-6">
        
        {/* Rubrik */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#007bff] mb-8">
          
        </h2>

        {/* Kontaktinformation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Adres och öpettider */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#007bff] mb-4">
              Besök Oss
            </h3>
            <p className="text-gray-700">
              <strong>Adress:</strong> Frykmans väg 1, 653 46 Karlstad
            </p>
            <p className="text-gray-700 mt-2">
              <strong>Telefon:</strong> 054 771 64 64
            </p>
            <p className="text-gray-700 mt-2">
              <strong>E-post:</strong> info@tandkompaniet.com
            </p>

            <h3 className="text-xl font-semibold text-[#007bff] mt-6 mb-4">
              Öppettider
            </h3>
            <p className="text-gray-700">Mån - Fre: 07.50 - 16.30</p>
            <p className="text-gray-700">Lördag: Stängt</p>
            <p className="text-gray-700">Söndag: Stängt</p> <br />
            <a
              href="/boka"
              className="bg-[#007bff] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#0056b3] transition "
            >
              Boka en tid
            </a>
          </div>

          {/* Kontaktformlär */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-[#007bff] mb-4">
              Skicka ett Meddelande
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Namn
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  placeholder="Ditt namn"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  E-post
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  placeholder="Din e-postadress"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Meddelande
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007bff]"
                  rows={5}
                  placeholder="Ditt meddelande"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#007bff] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#0056b3] transition"
              >
                {isSubmitting ? "Skickar..." : "Skicka Meddelande"}
              </button>
              {submitMessage && (
                <p className="text-center text-gray-700 mt-4">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Karta */}
        <div id="hita-hit" className="mt-12">
          <h3 className="text-xl font-semibold text-[#007bff] mb-4">
            Hitta Hit
          </h3>
          <div className="overflow-hidden rounded-lg shadow-md">
            <motion.iframe
            variants={fadeInUp}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2038.1234567890123!2d13.123456789012345!3d59.12345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDA3JzI0LjQiTiAxM8KwMDcnMjQuNCJF!5e0!3m2!1ssv!2sse!4v1234567890123!5m2!1ssv!2sse"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></motion.iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kontakt;


