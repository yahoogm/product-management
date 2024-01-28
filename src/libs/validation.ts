import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  nama_produk: Yup.string()
    .min(3, 'Min 3 characters!')
    .max(25, 'Max 25 characters!')
    .required('Isi nama produk'),
  keterangan: Yup.string()
    .min(5, 'Min 5 characters!')
    .max(250, 'Max 250 characters!')
    .required('Isi keterangan produk'),
  harga: Yup.number().required('Isi harga produk'),
  jumlah: Yup.number().required('Isi jumlah produk'),
});
