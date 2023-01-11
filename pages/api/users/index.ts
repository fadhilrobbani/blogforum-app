import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../utils/prisma';
import api from '../../../utils/api';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const requestMethod = req.method;
  switch (requestMethod) {
    //find all users
    case 'GET':
      try {
        const users = await prisma.users.findMany();
        res.status(200).json(
          api.createResponse({
            success: true,
            payload: users,
            message: 'OK',
          })
        );
      } catch (error) {
        res.status(400).json(
          api.createResponse({
            success: false,
            message: 'failed get users',
          })
        );
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
          api.createResponse({
            success: true,
            message: 'success create new user',
          })
        );
      } catch (error) {
        res.status(400).json(
          api.createResponse({
            success: false,
            message: 'failed create user',
          })
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
        res.status(200).json(
          api.createResponse({
            success: true,
            message: 'success delete user',
          })
        );
      } catch (error) {
        res.status(400).json(
          api.createResponse({
            success: false,
            message: 'failed delete user',
          })
        );
      }
      break;
  }
};

export default handler;
