import type { Response } from "express";
import { ObjectId } from "mongodb";
import { AppDataSource } from "@/config/data-source";
import { List } from "@/entities/List";
import type { AuthenticatedRequest } from "@/middlewares/authMiddleware";

const listRepository = AppDataSource.getMongoRepository(List);

export const createListController = async (req: AuthenticatedRequest, res: Response) => {
  const { title, urls } = req.body;
  const userId = req.userId!;

  if (!title || !Array.isArray(urls)) {
    return res.status(400).json({ message: "Título e um array de URLs são obrigatórios" });
  }

  try {
    const list = listRepository.create({ title, urls, userId });
    await listRepository.save(list);
    return res.status(201).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar lista" });
  }
};

export const getListsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const lists = await listRepository.find({ where: { userId: req.userId! } });
    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar listas" });
  }
};

export const addUrlToListController = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL é obrigatória" });
  }

  try {
    const list = await listRepository.findOneBy({
      _id: new ObjectId(id),
      userId: req.userId!,
    });

    if (!list) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }

    list.urls.push(url);
    await listRepository.save(list);

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao adicionar URL à lista" });
  }
};

export const deleteListController = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;

  try {
    const result = await listRepository.delete({
      _id: new ObjectId(id),
      userId: req.userId!,
    });

    if (result.affected === 0) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }

    return res.status(200).json({ message: "Lista removida com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    return res.status(500).json({ message: "Erro ao deletar lista" });
  }
};