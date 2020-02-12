import express from "express";
import usersRoute from "../models/users/usersRoutes";
import profilesRoute from "../models/profile/profilesRoutes";
import postsRoute from "../models/posts/postsRoutes";

const router = express.Router();

usersRoute(router);
postsRoute(router);
profilesRoute(router);

export default router;
