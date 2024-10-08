import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";




describe("Test list products use case", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should list products", async () => {
      const productRepository = new ProductRepository();
      const usecase = new ListProductUseCase(productRepository);
  
      const product = new Product("123", "pc",200);
      const product2 = new Product("124", "pc2",200);
      
  
      await productRepository.create(product);
      await productRepository.create(product2);
  
      
  
      const result = await usecase.execute({});
  
      expect(result.products.length).toBe(2);
      expect(result.products[0].id).toBe(product.id);
      expect(result.products[0].name).toBe(product.name);
      expect(result.products[0].price).toBe(product.price);
      expect(result.products[1].id).toBe(product2.id);
      expect(result.products[1].name).toBe(product2.name);
      expect(result.products[1].price).toBe(product2.price);
    });
  });