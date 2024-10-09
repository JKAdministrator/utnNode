import { mongoose } from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    categoria: {
      type: String,
      required: true,
      enum: [
        "Electrónica",
        "Fotografía",
        "Tecnología",
        "Accesorios",
        "Mobiliario",
      ],
    },
    detalle: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);
ProductSchema.index({ title: "text" });

const Product = mongoose.model("Productos", ProductSchema);
export default Product;
