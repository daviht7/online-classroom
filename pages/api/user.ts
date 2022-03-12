import { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

type ErrorResponseType = {
  error: string
}

type SuccessResponseType = {
  _id?: string
  name: string
  email: string
  cellphone: string
  teacher: string
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SuccessResponseType>
): Promise<void> => {
  if (req.method === 'POST') {
    const { name, email, cellphone, teacher } = req.body

    if (!name || !email || !cellphone || !teacher) {
      return res.status(400).json({ error: 'Missing body params' })
    }

    const { db } = await connect();

    const obj = {
      name,
      email,
      cellphone,
      teacher,
    }

    await db.collection('users').insertOne(obj)

    return res.status(200).json(obj)
  }
  return res.status(404).json({ error: 'Wrong request method.' })
}
