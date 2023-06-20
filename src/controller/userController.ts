import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response, RequestHandler } from 'express';
import User, { IUser } from '../models/User';

export const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { username, password, isAdmin } = req.body;

  try {
    const existingUser: IUser | null = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }
    const hashedPassword: string = await bcrypt.hash(String(password), 10);
    const newUser: IUser = new User({ username, password: hashedPassword, isAdmin });
    await newUser.save();

    return res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

export const login: RequestHandler = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid: boolean = await bcrypt.compare(String(password), user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token: string = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: '48h',
    });

    return res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    return res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

export const logout: RequestHandler = async (req: Request, res: Response) => {
  try {
    localStorage.removeItem('token');
    res.json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
    return res.status(500).json({ error: 'Error al cerrar la sesión' });
  }
};

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await User.find();
    return res.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, isAdmin } = req.body;

  try {
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      id,
      { username, password, isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedUser: IUser | null = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};