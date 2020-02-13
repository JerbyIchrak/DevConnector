import { create, getOne, update, remove } from "./userController";

export default function(router) {
  router.post("/register", create);
  router.get("/getUser/:id", getOne);
  router.put("/updateUser/:id", update);
  router.delete("/deleteUser/:id", remove);
}
