import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usacase";
import ProductRepository from "../../product/repository/sequilize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.format({
    json: async () => res.send(output),
   
  });
});