import {
  create,
  login,
  getOne,
  update,
  remove,
  authenticate
} from "./userController";
import passport from "passport";

export default function(router) {
  router.post("/register", create);
  router.get("/login", login);
  router.get("/getUser/:id", getOne);
  router.put("/updateUser/:id", update);
  router.delete("/deleteUser/:id", remove);
  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }, (req, res) => {
      res.json({ msg: "Success" });
    })
  );
}
