import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";


 
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
   
    const {
      _id,
      name,
      email,
      
    } = user;

    res.json({
      _id,
      name,
      email,
    
      token: generateToken(_id),
    });
  } else {
    res.status(401);
    throw new Error("Wrong Email or Password");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already Exists");
  } else {
    
    const user = await User.create({
      name,
      email,
      password,
     
    });

    if (user) {
      const {
        _id,
        name,
        email,
      } = user;

      res.status(201).json({
        _id,
        name,
        email,
        token: generateToken(_id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
   res.json({ users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});



export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (user) {
    const { _id, name, email, friends } =
      user;

    res.json({
      _id, 
      name,
      email,
      friends
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const addFriend = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");;
 

    const {name} = req.body
    
    if (user) {
      
    user.friends.push(name);
      await user.save();

      res.status(201).json({ message: 'Added Friend' });
      
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.friends = req.body.friends || user.friends;

    if (req.body.password) {
      user.password = req.body.password;
    }

    
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      friends: updatedUser.friends,
      
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

