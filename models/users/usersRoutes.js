import { create } from "./userController";

export default function(router) {
  router.post("/register", create);
}
