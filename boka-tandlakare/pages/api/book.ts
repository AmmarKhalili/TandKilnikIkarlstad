import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('tandlakare');
  const collection = db.collection('bokningar');

  if (req.method === 'POST') {
    // Hämta alla fält fron request body
    const { firstName, lastName, email, phone, personalId, date, time, treatmentType } = req.body;

    // Kombinera firstName och lastName till ett name-fält 
    const name = `${firstName} ${lastName}`;

    try {
      // Spara bokningen i databasen med alla fält
      const result = await collection.insertOne({
        name, // Sparar kombinerat namn
        firstName,
        lastName,
        email,
        phone,
        personalId,
        date,
        time,
        treatmentType,
      });

      res.status(200).json({ message: 'Bokning sparad', result });
    } catch (error) {
      console.error('Error saving booking:', error);
      res.status(500).json({ error: 'Kunde inte spara bokning' });
    }
  } else if (req.method === 'GET') {
    try {
      const bookings = await collection.find({}).toArray();

      // Skapa en objekt med bokade tider per datum
      const bookedTimes: Record<string, string[]> = {};
      bookings.forEach((booking) => {
        if (!bookedTimes[booking.date]) {
          bookedTimes[booking.date] = [];
        }
        bookedTimes[booking.date].push(booking.time);
      });

      res.status(200).json({ bookedTimes });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({ error: 'Kunde inte hämta bokningar' });
    }
  } else {
    res.status(405).json({ message: 'Metod inte tillåten' });
  }
}