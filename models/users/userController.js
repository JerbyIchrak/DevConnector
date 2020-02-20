import User from "./User";
import _ from "lodash";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import jwt from "jsonwebtoken";
import { secretOrKey } from "../../config/keys";
import passport from "passport";

export async function authenticate(req, res) {
  try {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(req.user);
        res.json(200).send({ msg: "Success here !!" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

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

        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        let user = _.pick(req.body, "name", "email");
        user.password = req.body.password;
        user.avatar = avatar;

        user = await User.create(user);

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });

        return res.json(user);
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}

export async function login(req, res) {
  try {
    if (!req.body.email) {
      return res.status(400).json("email is required !");
    }
    if (!req.body.password) {
      return res.status(400).json("password is required !");
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        return res.status(404).json({ email: "user not found !" });
      }
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          //user matched
          //create jwt payload
          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          //sign Token
          jwt.sign(payload, secretOrKey, { expiresIn: 18000 }, (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          });
        } else {
          return res.status(400).json({ password: "password is incorrect !" });
        }
      });
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
