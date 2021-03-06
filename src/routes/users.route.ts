import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/database.error.model";
import userRepository from "../repositories/user.repository";

// get /users
// get /user/:uuid
// post /users
// put / users/:uuid
// delete /users/:uuid

const usersRoute = Router();

//READ
usersRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers['authorization'])
    const users = await userRepository.findAllUsers();
    res.status(StatusCodes.OK).send(users);
  }
);

usersRoute.get(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid;
      const user = await userRepository.findById(uuid);
      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

//CREATE / ISNERT
usersRoute.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(StatusCodes.CREATED).send(uuid);
  }
);

// UPDATE
usersRoute.put(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;

    modifiedUser.uuid = uuid;

    await userRepository.update(modifiedUser);
    res.status(StatusCodes.OK).send();
  }
);

//DELETE
usersRoute.delete(
  "/users/:uuid",
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(StatusCodes.OK);
  }
);

export default usersRoute;
