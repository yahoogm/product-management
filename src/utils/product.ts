export type ProductData = {
  _id?: string;
  nama_produk: string;
  keterangan: string;
  harga: number;
  jumlah: number;
};

export type Params = {
  id: string;
};

export const formatToRupiah = (amount: number) => {
  return amount.toLocaleString('id-ID', { minimumFractionDigits: 0 });
};

export const formatNumber = (total: number) => {
  return total.toLocaleString('en-US');
};
