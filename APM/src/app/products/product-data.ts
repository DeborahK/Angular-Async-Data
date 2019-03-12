import { Product } from './product';

export class ProductData {

  static products: Product[] = [
    {
      'id': 1,
      'productName': 'Leaf Rake',
      'productCode': 'GDN-0011',
      'description': 'Leaf rake with 48-inch wooden handle',
      'price': 19.95,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png',
      'categoryId': 1,
      'tags': ['rake', 'leaf', 'yard', 'home']
    },
    {
      'id': 2,
      'productName': 'Garden Cart',
      'productCode': 'GDN-0023',
      'description': '15 gallon capacity rolling garden cart',
      'price': 32.99,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png',
      'categoryId': 1,
    },
    {
      'id': 5,
      'productName': 'Hammer',
      'productCode': 'TBX-0048',
      'description': 'Curved claw steel hammer',
      'price': 8.9,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png',
      'categoryId': 3,
      'tags': ['tools', 'hammer', 'construction']
    },
    {
      'id': 8,
      'productName': 'Saw',
      'productCode': 'TBX-0022',
      'description': '15-inch steel blade hand saw',
      'price': 11.55,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png',
      'categoryId': 3,
    },
    {
      'id': 10,
      'productName': 'Video Game Controller',
      'productCode': 'GMG-0042',
      'description': 'Standard two-button video game controller',
      'price': 35.95,
      'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png',
      'categoryId': 5,
    }
  ];
}
