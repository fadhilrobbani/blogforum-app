import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import { createResponse } from '../../../utils/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  switch (requestMethod) {
    //find all users
    case 'GET':
      try {
        const users = await prisma.users.findMany();

        res.status(200).json(
          createResponse({
            success: true,
            payload: users,
            message: 'OK',
          })
        );
      } catch (error) {
        const json = createResponse({
          success: false,
          message: 'failed get users',
        });
        res.status(400).json(json);
      }
      break;

    //create new user
    case 'POST':
      try {
        await prisma.users.create({
          data: {
            email: req.body.email,
            password: req.body.password,
          },
        });

        res.status(200).json(
          createResponse({
            success: true,
            message: 'success create new user',
          })
        );
      } catch (error) {
        res
          .status(400)
          .json(
            createResponse({ success: false, message: 'failed create user' })
          );
      }
      break;

    //delete user by email
    case 'DELETE':
      try {
        await prisma.users.delete({
          where: {
            email: req.body.email,
          },
        });
        res
          .status(200)
          .json(
            createResponse({ success: true, message: 'success delete user' })
          );
      } catch (error) {
        res
          .status(400)
          .json(
            createResponse({ success: false, message: 'failed delete user' })
          );
      }
  }
};

export default handler;
