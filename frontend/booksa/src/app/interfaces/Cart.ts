export default interface Cart {
  id?: string;
  subtotal?: number;
  discount?: number;
  shipping?: number;
  books?: any[];
}
