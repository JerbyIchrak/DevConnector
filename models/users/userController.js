import User from "./User";
import _ from "lodash";

export async function create(req, res) {
  console.log("********************************************");
  try {
    if (!req.body.email)
      return res.status(400).json({
        error: "email is required !"
      });
    User.findOne({ email: req.body.email }).then(async user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists !" });
      } else {
        if (!req.body.name)
          return res.status(400).json({
            error: "name is required !"
          });
        if (!req.body.password)
          return res.status(400).json({
            error: "password is required !"
          });

        let user = _.pick(req.body, "name", "email");
        user.password = req.body.password;

        user = await User.create(user);

        return res.json(user);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
