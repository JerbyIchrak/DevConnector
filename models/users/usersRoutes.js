import { create, login, getOne, update, remove } from "./userController";

export default function(router) {
  router.post("/register", create);
  router.get("/login", login);
  router.get("/getUser/:id", getOne);
  router.put("/updateUser/:id", update);
  router.delete("/deleteUser/:id", remove);
}
