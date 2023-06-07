export type Manga = {
  id: number;
  volume: number;
  jumlah_tersedia: number;
  harga_sewa: number;
  seri_id: number;
  created_at: string;
  updated_at: string;
  DeletedAt: null | string;
};

export type Penulis = {
  id: number;
  nama_depan: string;
  nama_belakangang: string;
  peran: string;
  created_at: string;
  updated_at: string;
  DeletedAt: null | string;
};

export type Genre = {
  id: number;
  nama: string;
  created_at: string;
  updated_at: string;
  DeletedAt: null | string;
};

export type Seri = {
  id: number;
  judul: string;
  sinopsis: string;
  tahun_terbit: string;
  skor: string;
  total_penilai: string;
  total_pembaca: string;
  foto: string;
  penerbit_id: number;
  manga: Manga[];
  penulis: Penulis[];
  genre: Genre[];
};
