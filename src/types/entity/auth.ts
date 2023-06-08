export type SignUp<T> = {
  nama: string;
  email: string;
  no_telp: string;
  alamat: string;
  provinsi_id?: T;
  kabupaten_id: T;
  password: string;
};

export type LogIn = {
  email: string;
  password: string;
};
