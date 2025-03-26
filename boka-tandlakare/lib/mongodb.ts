
import { MongoClient, MongoClientOptions } from 'mongodb';

// Deklarera global typ för TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {};

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // I development-läge, använd global variabel för att förhindra multipla instanser
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // I produktion, skapa ny klient
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;