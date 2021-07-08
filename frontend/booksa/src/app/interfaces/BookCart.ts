export default interface BookCart {
  id?: string;
  name?: string;
  isbn?: string;
  editorial?: string;
  image?: string;
  price: number;
  quantity: number;
  categories?: string[];
}
