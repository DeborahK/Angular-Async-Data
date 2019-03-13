import { Product } from './product';

export class ProductData {

  static products: Product[] = [
    {
      'id': 1,
      'productName': 'Leaf Rake',
      'productCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'categoryId': 1,
      'tags': ['rake', 'leaf', 'yard', 'home']
    },
    {
      'id': 2,
      'productName': 'Garden Cart',
      'productCode': 'GDN-0023',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'categoryId': 1
    },
    {
      'id': 5,
      'productName': 'Hammer',
      'productCode': 'TBX-0048',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'categoryId': 3,
      'tags': ['tools', 'hammer', 'construction'],
    },
    {
      'id': 8,
      'productName': 'Saw',
      'productCode': 'TBX-0022',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'categoryId': 3
    },
    {
      'id': 10,
      'productName': 'Video Game Controller',
      'productCode': 'GMG-0042',
      'description': 'Standard two-button video game controller',
      'price': 35.95,
      'categoryId': 5
    }
  ];
}
