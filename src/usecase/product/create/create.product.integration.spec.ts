import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequilize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequilize/product.repository";
import CreateProductUseCase from "./create.product.usacase";
import Product from "../../../domain/product/entity/product";



describe("Test update product use case", () => {
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
    it('should create a product', async () => {


      const productRepository = new ProductRepository();
      const usecase = new CreateProductUseCase(productRepository);
  
      const product = new Product("123", "pc",200);

      const input = {
        id: product.id,
        name: "pc",
        price: 200
      };
    
      
  
     // await productRepository.create(product);
   
  
      
  
      const result = await usecase.execute(input);
      expect(result).toEqual(input);





    })
  })

     
  
 