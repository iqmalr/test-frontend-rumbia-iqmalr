export interface Variation {
  nama: string;
  sku: string;
  harga_jual: number;
}

export interface Product {
  id: number;
  nama: string;
  sku: string;
  gambar: string;
  brand: string;
  deskripsi: string;
  variations: Variation[];
}