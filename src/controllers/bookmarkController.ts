import type { Response } from "express";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";
import { AppDataSource } from "@/config/data-source";
import { Bookmark } from "@/entities/Bookmark";
import type { AuthenticatedRequest } from "@/middlewares/authMiddleware";

const bookmarkRepository = AppDataSource.getMongoRepository(Bookmark);

export const createBookmarkController = async (req: AuthenticatedRequest, res: Response) => {
  const { title, items } = req.body;
  const userId = req.userId!;

  if (!title) {
    return res.status(400).json({ message: "O título da pasta é obrigatório" });
  }

  try {
    const formattedItems = Array.isArray(items)
      ? items.map((item) => ({ ...item, _id: item._id || randomUUID() }))
      : [];

    const bookmarkFolder = bookmarkRepository.create({
      title,
      items: formattedItems,
      userId,
    });
    
    await bookmarkRepository.save(bookmarkFolder);
    return res.status(201).json(bookmarkFolder);
  } catch (error) {
    console.error("Erro ao criar pasta de bookmark:", error);
    return res.status(500).json({ message: "Erro ao criar pasta de bookmark" });
  }
};

export const addItemToBookmarkController = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: "O campo 'data' é obrigatório" });
  }

  try {
    const bookmarkFolder = await bookmarkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: req.userId!,
    });

    if (!bookmarkFolder) {
      return res.status(404).json({ message: "Pasta de bookmark não encontrada" });
    }

    if (!Array.isArray(bookmarkFolder.items)) {
      bookmarkFolder.items = [];
    }

    const newItem = {
      ...data,
      _id: randomUUID(),
    };

    bookmarkFolder.items.push(newItem);
    await bookmarkRepository.save(bookmarkFolder);

    return res.status(200).json(bookmarkFolder);
  } catch (error) {
    console.error("Erro ao adicionar item ao bookmark:", error);
    return res.status(500).json({ message: "Erro ao adicionar item ao bookmark" });
  }
};

export const removeItemFromBookmarkController = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({ message: "O 'itemId' é obrigatório para remoção" });
  }

  try {
    const bookmarkFolder = await bookmarkRepository.findOneBy({
      _id: new ObjectId(id),
      userId: req.userId!,
    });

    if (!bookmarkFolder) {
      return res.status(404).json({ message: "Pasta de bookmark não encontrada" });
    }

    if (!Array.isArray(bookmarkFolder.items)) {
      return res.status(404).json({ message: "Nenhum item encontrado nesta pasta" });
    }

    const initialLength = bookmarkFolder.items.length;
    bookmarkFolder.items = bookmarkFolder.items.filter((item: any) => item._id !== itemId);

    if (bookmarkFolder.items.length === initialLength) {
      return res.status(404).json({ message: "Item não encontrado com o ID fornecido" });
    }

    await bookmarkRepository.save(bookmarkFolder);

    return res.status(200).json({
      message: "Item removido com sucesso",
      items: bookmarkFolder.items,
    });
  } catch (error) {
    console.error("Erro ao remover item do bookmark:", error);
    return res.status(500).json({ message: "Erro ao remover item do bookmark" });
  }
};

export const getBookmarksController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const bookmarks = await bookmarkRepository.find({ where: { userId: req.userId! } });
    return res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Erro ao buscar bookmarks:", error);
    return res.status(500).json({ message: "Erro ao buscar bookmarks" });
  }
};

export const deleteBookmarkController = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id as string;

  try {
    const result = await bookmarkRepository.delete({
      id: new ObjectId(id),
      userId: req.userId!,
    });

    if (result.affected === 0) {
      return res.status(404).json({ message: "Bookmark não encontrado" });
    }

    return res.status(200).json({ message: "Bookmark deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar bookmark:", error);
    return res.status(500).json({ message: "Erro ao deletar bookmark" });
  }
};