import { ProductData } from '@/utils/product';
import mongoose, { Schema, models } from 'mongoose';

const productSchema = new Schema(
  {
    nama_produk: String,
    keterangan: String,
    harga: Number,
    jumlah: Number,
  },
  { timestamps: true }
);

const products =
  models.products || mongoose.model<ProductData>('products', productSchema);

export default products;
