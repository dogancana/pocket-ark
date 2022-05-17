import { MongoClient } from 'mongodb';

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

export enum MongoDbNames {
  Public = 'pocket_ark_public',
}

export enum MongoDbCollections {
  PricingSource = 'pricing_source',
}

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${MongoDbNames.Public}?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);
