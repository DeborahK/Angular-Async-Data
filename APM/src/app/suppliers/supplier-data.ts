import { Supplier } from './supplier';

export class SupplierData {

    static suppliers: Supplier[] = [
        {
            'id': 1,
            'name': 'Acme Gardening Supply',
            'supplierProducts': [
                { 'productId': 1, 'cost': 16.95, 'minQuantity': 12 },
                { 'productId': 2, 'cost': 12, 'minQuantity': 6 }
            ]
        },
        {
            'id': 2,
            'name': 'Standard Gardening',
            'supplierProducts': [
                { 'productId': 1, 'cost': 15.95, 'minQuantity': 24 }
            ]
        },

        {
            'id': 3,
            'name': 'Acme General Supply',
            'supplierProducts': [
                { 'productId': 2, 'cost': 25, 'minQuantity': 2 },
                { 'productId': 5, 'cost': 2, 'minQuantity': 24 },
                { 'productId': 8, 'cost': 7, 'minQuantity': 6 },
                { 'productId': 10, 'cost': 12, 'minQuantity': 12 }
            ]
        },
        {
            'id': 4,
            'name': 'Acme Tool Supply',
            'supplierProducts': [
                { 'productId': 5, 'cost': 4, 'minQuantity': 12 },
                { 'productId': 8, 'cost': 4, 'minQuantity': 12 }
            ]
        },
        {
            'id': 5,
            'name': 'Tools Are Us',
            'supplierProducts': [
                { 'productId': 8, 'cost': 8, 'minQuantity': 8 }
            ]
        },
        {
            'id': 6,
            'name': 'Acme Game Supply',
            'supplierProducts': [
                { 'productId': 10, 'cost': 20, 'minQuantity': 6 }
            ]
        }
    ];
}
