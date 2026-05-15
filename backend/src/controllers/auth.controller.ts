import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { Prisma } from "../generated/prisma/client";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    if(
        error instanceof Prisma.PrismaClientKnownRequestError && 
        error.code === "P2002"
    ){
        res.status(409).json({error: "Email already registered"});
        return;
    }
    console.error("Signup error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });

  } catch (error) {
    console.error("Login error: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try{
        const userId = (req as any).userId;
        
        const user = await prisma.user.findUnique({
            where: {id: userId},
            select: {id: true, email: true, name: true, createdAt: true},
        });

        if(!user){
            res.status(404).json({error: "User not found"});
            return;
        }

        res.json({user});
    }catch (error){
        console.error("GetMe error: ", error);
        res.status(500).json({error: "Internal server error"});
    }
}