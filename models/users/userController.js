import User from "./User";
import _ from "lodash";

export async function create(req, res) {
  console.log("********************Post************************");
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

export async function getOne(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "id cannot be empty"
      });

    const user = await User.findById({
      _id: req.params.id
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function update(req, res) {
  try {
    if (!req.params.id)
      return res.status(400).json({
        error: "id cannot be empty"
      });
    if (!req.body.name)
      return res.status(400).json({
        error: "Name is required !"
      });
    if (!req.body.email)
      return res.status(400).json({
        error: "email is required !"
      });
    if (!req.body.password)
      return res.status(400).json({
        error: "password is required !"
      });

    const user = await User.findOne({
      _id: req.params.id
    });
    if (!user)
      return res.status(401).json({
        error: "user not found !"
      });

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    await user.save();

    await User.update({ _id: req.params.id }, { $set: user });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function remove(req, res) {
  try {
    if (!req.params.id) return res.status(400).end();

    await User.remove({
      _id: req.params.id
    });

    return res.status(204).end();
  } catch (error) {
    return res.status(500).end();
  }
}
