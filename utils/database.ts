import { Db, MongoClient } from 'mongodb'


let mongoClient: MongoClient

let db: Db

interface ConnectType {
  db: Db
  mongoClient: MongoClient
}

const client = new MongoClient(process.env.DATABASE_URL);

export default async function connect(): Promise<ConnectType> {
  if (mongoClient && db) {
    return { db, mongoClient }
  }

  mongoClient = await client.connect()

  db = client.db('teach-other')

  return { db, mongoClient }
}
