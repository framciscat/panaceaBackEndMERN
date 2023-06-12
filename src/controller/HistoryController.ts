import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import History from "../models/History";

// Crear historial médico
const createHistory = (req: Request, res: Response, next: NextFunction) => {
  const { symptoms, medicalApp, drugs } = req.body;

  const history = new History({
    _id: new mongoose.Types.ObjectId(),
    symptoms,
    medicalApp,
    drugs,
  });

  return history
    .save()
    .then((history) => res.status(201).json({ history }))
    .catch((error) => res.status(500).json({ error }));
};

// Ver historial médico
const readHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findById(historyId)
    .then((history) =>
      history
        ? res.status(200).json({ history })
        : res.status(404).json({ message: "No se ha encontrado" })
    )
    .catch((error) => res.status(500).json({ error }));
};

// Ver todos los historiales médicos
const readAllHistories = (req: Request, res: Response, next: NextFunction) => {
  return History.find()
    .then((histories) => res.status(200).json({ histories }))
    .catch((error) => res.status(500).json({ error }));
};

// Actualizar historial médico
const updateHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findById(historyId)
    .then((history) => {
      if (history) {
        history.set(req.body);

        return history
          .save()
          .then((history) => res.status(201).json({ history }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "No se han encontrado" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// Eliminar historial médico
const deleteHistory = (req: Request, res: Response, next: NextFunction) => {
  const historyId = req.params.historyId;

  return History.findByIdAndDelete(historyId)
    .then((history) =>
      history
        ? res.status(201).json({ history, message: "Eliminado" })
        : res.status(404).json({ message: "No se ha encontrado" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createHistory,
  readHistory,
  readAllHistories,
  updateHistory,
  deleteHistory,
};
