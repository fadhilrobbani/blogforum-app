import api from '../../../utils/api';
import { prisma } from '../../../utils/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'GET':
      try {
        const user = await prisma.users.findUnique({
          where: {
            id: userId as string,
          },
        });

        if (user) {
          res.status(200).json(
            api.createResponse({
              success: true,
              payload: user,
              message: 'success get user',
            })
          );
        } else {
          res.status(400).json(
            api.createResponse({
              success: false,
              message: 'user not found',
            })
          );
        }
      } catch (error) {
        res
          .status(500)
          .json(
            api.createResponse({ success: false, message: 'failed get user' })
          );
      }
      break;
  }
};

export default handler;
