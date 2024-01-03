import prisma from '../../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const user = await prisma.user.findMany()
  console.log(user)

  res.status(200).json({ status: 1, user })
}
