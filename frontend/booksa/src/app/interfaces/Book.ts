export default interface Book {
  id?: string;
  _id?:string;
  published?:string;
  author?:string;
  name?: string;
  description?: string;
  isbn?: string;
  editorial?: string;
  image?: string;
  price?: number;
  stock?: number;
  category?: number;
  categories?: string[];
  genres?: string[];
}
