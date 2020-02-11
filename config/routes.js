import express from "express";
import usersRoute from "../models/users/usersRoutes";
import profilesRoute from "../models/users/profilesRoutes";
import postsRoute from "../models/users/postsRoutes";

const router = express.Router();

usersRoute(router);
postsRoute(router);
profilesRoute(router);

export default router;
