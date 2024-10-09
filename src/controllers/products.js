import Product from "../models/mongoDB/Product.js";
export const ProductController = {
  //create
  async createOne(req, res) {
    const { nombre, precio, categoria, detalle, stock } = req.body;
    try {
      const newProduct = new Product({
        nombre,
        precio,
        categoria,
        detalle,
        stock,
      });
      const savedProduct = await newProduct.save();
      return res.status(200).json({
        succes: true,
        message: "Producto grabado en la base de datos",
        data: savedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: `${error}`,
      });
    }
  },

  //delete
  async deleteOne(req, res) {
    console.log(req.params);
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product)
        return res.status(404).json({
          succes: false,
          message: `Producto con id ${req.params.id} no encontrado`,
        });

      return res.status(200).json({
        succes: true,
        message: `Producto eliminado de la base de datos`,
      });
    } catch (e) {
      return res.status(500).json({
        succes: false,
        message: `${e}`,
      });
    }
  },

  //update
  async updateOne(req, res) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({
          succes: false,
          message: `Producto no encontrado`,
        });

      return res.status(200).json({
        succes: true,
        message: `Producto actualizado`,
      });
    } catch (e) {
      return res.status(500).json({
        succes: false,
        message: `${e}`,
      });
    }
  },

  //read
  async getAll(req, res) {
    const {
      titulo,
      precioDesde,
      precioHasta,
      categoria,
      detalle,
      stockDesde,
      stockHasta,
    } = req.query;

    let filtros = {};
    if (titulo) filtros.titulo = { $regex: titulo };
    if (categoria) filtros.categoria = categoria;
    if (detalle) filtros.detalle = { $regex: detalle, $options: "i" };
    if (precioDesde || precioHasta) {
      filtros.price = {};
      if (precioDesde) filtros.price.$gte = Number(precioDesde);
      if (precioHasta) filtros.price.$lte = Number(precioHasta);
    }
    if (stockDesde || stockHasta) {
      filtros.stock = {};
      if (stockDesde) filtros.stock.$gte = Number(stockDesde); // Stock mayor o igual
      if (stockHasta) filtros.stock.$lte = Number(stockHasta); // Stock menor o igual
    }

    try {
      const productos = await Product.find(filtros);

      if (!productos || productos.length == 0) {
        return res
          .status(404)
          .json({ succes: false, message: `No se encontraron productos` });
      }
      return res.status(200).json({
        succes: true,
        message: `PRoductos encontrados`,
        result: productos,
      });
    } catch (e) {
      return res.status(500).json({
        succes: false,
        message: `${e}`,
      });
    }
  },
};
