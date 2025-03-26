"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false, // Inaktivera SSR för react-calendar
});

type Booking = {
  
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  personalId: string; // Personnummer (12 siffror)
  date: string;
  time: string;
  treatmentType: string;
};

type Professional = {
  id: number;
  name: string;
  image: string;
  availableTimes: string[]; // Tillgängliga tider för denna professionell
};

const dentists: Professional[] = [
  { id: 1, name: "Dr. Anna Svensson", image: "/image/D2.jpg", availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00"] },
  { id: 2, name: "Dr. Ali saleh", image: "/image/Dr1.jpg", availableTimes: ["12:00", "13:00", "15:00", "16:00", "17:00"] },
];

const hygienists: Professional[] = [
  { id: 1, name: "Mohammad S", image: "/image/D3.jpg", availableTimes: ["10:00", "11:00", "12:00", "14:00", "15:00"] },
  { id: 2, name: "Emma Nilsson", image: "/image/D4.jpg", availableTimes: ["09:00", "10:00", "13:00", "16:00", "17:00"] },
];

const getAvailableTimes = (date: Date, bookedTimes: Record<string, string[]>): string[] => {
  const day = date.getDay();
  const allTimes = day === 0 || day === 6
    ? ["10:00", "11:00", "12:00", "13:00", "14:00"]
    : ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const dateKey = date.toISOString().split("T")[0]; // vi Användar ISO-format för att undvika missmatch
  const bookedForDay = bookedTimes[dateKey] || [];
  return allTimes.filter(time => !bookedForDay.includes(time));
};

export default function BokaTid() {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [personalId, setPersonalId] = useState<string>("");
  const [treatmentType, setTreatmentType] = useState<string>("tandläkare");
  const [bookedTimes, setBookedTimes] = useState<Record<string, string[]>>({});
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [consent, setConsent] = useState<boolean>(false); // Samtycke
  const [step, setStep] = useState<number>(1); // Steg för att hantera flödet
  const [bookingCompleted, setBookingCompleted] = useState<boolean>(false); // Ny state för att hantera om bokningen är klar

  // Hämta bokade tider när sidan laddas.
  useEffect(() => {
    const fetchBookedTimes = async () => {
      try {
        const response = await fetch('/api/book');
        if (response.ok) {
          const data = await response.json();
          setBookedTimes(data.bookedTimes);
        } else {
          console.error("Kunde inte hämta bokade tider.");
        }
      } catch (error) {
        console.error("Error fetching booked times:", error);
      }
    };

    fetchBookedTimes();
  }, []);

  const handleTimeClick = (t: string, professional: Professional) => {
    // Spara den valda tiden och professionellen
    setTime(t);
    setSelectedProfessional(professional);
  };

  const handleNextStep = () => {
    // Validera formulärdata innan du går vidare
    if (!firstName || !lastName || !email || !phone || !personalId || !time || !selectedProfessional) {
      alert("Fyll i alla fält innan du går vidare.");
      return;
    }

    if (!email.includes("@")) {
      alert("Ange en giltig e-postadress.");
      return;
    }

    if (!/^\d{10,12}$/.test(phone)) {
      alert("Ange ett giltigt telefonnummer (10-12 siffror).");
      return;
    }

    if (!/^\d{12}$/.test(personalId)) {
      alert("Ange ett giltigt personnummer (12 siffror).");
      return;
    }

    // Gå till nästa steg
    setStep(2);
  };

  const handleSubmit = async () => {
    if (!consent) {
      alert("Du måste godkänna att dina uppgifter sparas.");
      return;
    }
  
    const dateKey = date.toISOString().split("T")[0]; // Använd ISO-format för att undvika missmatch
    const newBooking: Booking = {
      firstName,
      lastName,
      email,
      phone,
      personalId,
      date: dateKey,
      time,
      treatmentType,
    };
  
    try {
      // Skicka bokningen till servern
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking),
      });
  
      if (response.ok) {
        // Uppdatera bokade tider lokalt
        setBookedTimes((prev) => ({
          ...prev,
          [dateKey]: [...(prev[dateKey] || []), time],
        }));
  
        // Skicka e-postbekräftelse
        const emailResponse = await fetch('/api/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: "booking", 
            firstName,
            lastName,
            email,
            date: date.toLocaleDateString("sv-SE"), //  lokal datumformatering
            time,
            treatmentType,
            professionalName: selectedProfessional?.name || "Okänd",
          }),
        });
  
        if (emailResponse.ok) {
          //  bokningen som klar ska markera
          setBookingCompleted(true);
        } else {
          const errorData = await emailResponse.json();
          console.error("Kunde inte skicka e-post:", errorData.error);
        }
      } else {
        const errorData = await response.json();
        alert(`Något gick fel: ${errorData.error || "Okänt fel"}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Något gick fel vid bokningen.');
    }
  };

  // Hämta tillgängliga tidar för den valda behandlingstypen
  const professionals = treatmentType === "tandläkare" ? dentists : hygienists;
  const availableTimes = getAvailableTimes(date, bookedTimes);

  // Skapa en lista med alla tillgängliga tider och deras professionella
  const timeSlots: { time: string; professional: Professional }[] = [];
  professionals.forEach((professional) => {
    professional.availableTimes.forEach((t) => {
      if (availableTimes.includes(t)) {
        timeSlots.push({ time: t, professional });
      }
    });
  });

  // Sortera tiderna i kronologisk ordning
  timeSlots.sort((a, b) => a.time.localeCompare(b.time));

  // om bokningen är klar ska visas en bekräftelsesida
  if (bookingCompleted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header
          className="bg-cover bg-center py-20 text-white text-center"
          style={{ backgroundImage: "url('/image/Herobild.jpg')" }}
        >
          <h1 className="text-4xl font-bold">Tack för din bokning!</h1>
          <p className="text-lg mt-2">Vi ser fram emot att träffa dig.</p>
        </header>

        <main className="flex-grow p-5">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-700">
              Din bokning är nu klar. Du kommer att få en bekräftelse via e-post.
            </p>
            <button
              onClick={() => {
                setBookingCompleted(false); // Återställ för att göra en ny bokning
                setStep(1); // Återgå till första steget
              }}
              className="mt-6 w-full py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition"
            >
              Gör en ny bokning
            </button>
          </div>
        </main>

        
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero-sektion  */}
      <header
        className="bg-cover bg-center py-20 text-white text-center"
        style={{ backgroundImage: "url('/image/Herobild.jpg')" }}
      >
        <h1 className="text-4xl font-bold">Boka en tid</h1>
        <p className="text-lg mt-2">Välkommen till vår onlinebokning</p>
      </header>

      {/* Huvudinnehåll */}
      <main className="flex-grow p-5">
        <div className="max-w-4xl mx-auto">
          {/* behandlingtyp */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Välj behandlingstyp</h2>
            <select
              value={treatmentType}
              onChange={(e) => {
                setTreatmentType(e.target.value);
                setSelectedProfessional(null); // Återställ vald professionell vid ändring av behandlingstyp
                setTime(""); // Återställ vald tid
              }}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tandläkare">Tandläkare</option>
              <option value="tandhygienist">Tandhygienist</option>
            </select>
          </div>

          {/* Kalender */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Välj ett datum</h2>
            <Calendar
              onChange={(value) => {
                setDate(value as Date);
                setTime("");
                setSelectedProfessional(null); // Återställ vald professionell vid datumändring
              }}
              value={date}
              className="custom-calendar"
            />
          </div>

          {/* Valda datum och tider */}
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <p className="text-lg font-semibold text-gray-700 mb-4">
              Valt datum: <span className="text-blue-500">{date.toDateString()}</span>
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Välj en tid:</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {timeSlots.length > 0 ? (
                timeSlots.map((slot) => (
                  <div
                    key={`${slot.professional.id}-${slot.time}`}
                    onClick={() => handleTimeClick(slot.time, slot.professional)}
                    className={`p-4 rounded-lg text-center cursor-pointer transition ${
                      time === slot.time && selectedProfessional?.id === slot.professional.id
                        ? "bg-blue-600 text-white"
                        : "bg-blue-100 hover:bg-blue-200"
                    }`}
                  >
                    <p className="font-semibold">{slot.time}</p>
                    <img
                      src={slot.professional.image}
                      alt={slot.professional.name}
                      className="w-16 h-16 rounded-full mx-auto mt-2"
                    />
                    <p className="text-sm mt-2">{slot.professional.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-red-500 font-semibold">Inga tider kvar denna dag!</p>
              )}
            </div>
          </div>

          {/* Steg 1: Bokningsformulär */}
          {step === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bokningsformulär</h2>
              <div className="space-y-4">
                {/* Förnamn och Efternamn */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Förnamn:</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Efternamn:</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* E-post */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-post:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                </div>

                {/* Telefonnummer och Personnummer */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Telefonnummer:</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      pattern="\d{10,12}"
                      title="Ange ett telefonnummer med 10-12 siffror."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Personnummer (12 siffror):</label>
                    <input
                      type="text"
                      value={personalId}
                      onChange={(e) => setPersonalId(e.target.value)}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      pattern="\d{12}"
                      title="Ange ett personnummer med exakt 12 siffror."
                    />
                  </div>
                </div>

                {/* Nästa-knapp */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="w-full py-3 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition"
                >
                  Nästa
                </button>
              </div>
            </div>
          )}

          {/* Steg 2: Sammanfattning och bekräftelse */}
          {step === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sammanfattning</h2>
              <div className="space-y-4">
                {/* Visa användarens uppgifter */}
                <div>
                  <p className="text-gray-700"><strong>Förnamn:</strong> {firstName}</p>
                  <p className="text-gray-700"><strong>Efternamn:</strong> {lastName}</p>
                  <p className="text-gray-700"><strong>E-post:</strong> {email}</p>
                  <p className="text-gray-700"><strong>Telefonnummer:</strong> {phone}</p>
                  <p className="text-gray-700"><strong>Personnummer:</strong> {personalId}</p>
                  <p className="text-gray-700"><strong>Datum:</strong> {date.toDateString()}</p>
                  <p className="text-gray-700"><strong>Tid:</strong> {time}</p>
                  <p className="text-gray-700"><strong>Behandlingstyp:</strong> {treatmentType}</p>
                  <p className="text-gray-700"><strong>Professionell:</strong> {selectedProfessional?.name}</p>
                </div>

                {/* Samtycke */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mr-2"
                    required
                  />
                  <label className="text-gray-700">Jag godkänner att mina uppgifter sparas.</label>
                </div>

                {/* Boka-knapp */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-lg font-semibold text-white bg-green-500 hover:bg-green-600 transition"
                >
                  Boka
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

     
    </div>
  );
}