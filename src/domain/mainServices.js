import axios from 'axios';
import http from '../infrastructures/httpApi';

export default {
    getCategory() {
        return http.get('category');
    },
    getImgProductbyId(id) {
        return http.get(`product/get-img-url/${id}`);
    },
    getAllProduct(index, value) {
        return http.get('search/home-page', {
            params: {
                page: index,
                size: value,
            },
        });
    },
    getProductbyCategory(id, index, value) {
        return http.get(`product/get-product-by-category/${id}`, {
            params: {
                page: index,
                size: value,
            },
        });
    },
    getProductbyId(id) {
        return http.get(`product/${id}`);
    },
    getProductOfSeller(index, value) {
        return http.get('product/get-product-by-seller-seller', {
            params: {
                page: index,
                size: value,
            },
        });
    },
    getProductSoldOutSeller() {
        return http.get('product/get-product-sold-out');
    },
    getSearchProduct(value) {
        return http.get('search', {
            params: {
                q: value,
            },
        });
    },
    getSearchPageProduct(value, index, size) {
        return http.get('search', {
            params: {
                q: value,
                page: index,
                size,
            },
        });
    },
    getSearchOrderProduct(value, order, index, size) {
        return http.get('search', {
            params: {
                q: value,
                type: 'price',
                order: order,
                page: index,
                size,
            },
        });
    },
    getSearchPriceProduct(value, min, max, index, size) {
        return http.get('search', {
            params: {
                q: value,
                minPrice: min,
                maxPrice: max,
                page: index,
                size,
            },
        });
    },
    addInfoProduct(data) {
        return http.post('product', data);
    },
    getImg() {
        return http.get('storage/uploads/signedUrl');
    },
    addImgProduct(id, filename) {
        return http.post('product/save-img/', null, {
            params: {
                productId: id,
                filename: filename,
            },
        });
    },

    addAssortmentProduct(data) {
        return http.post('assortment/add-assortment-value', data);
    },

    updateInfoProduct(id) {
        return http.get(`product/get-full-in4-product/${id}`);
    },
    updateImgProduct(id) {
        return http.get(`product/get-full-in4-product/${id}`);
    },
    updateAssortmentProduct(id) {
        return http.get(`product/get-full-in4-product/${id}`);
    },
    deleteImgProduct(filename) {
        return http.delete(`product/delete-image/${filename}`);
    },
    deleteProduct(id) {
        return http.delete(`product/${id}`);
    },

    addToCart(data) {
        return http.post('cart/add-product-cart', data);
    },
    getItemCart() {
        return http.get('cart/all');
    },
    deleteCartItem(data) {
        return http.delete('cart/remove-items', {
            data: data,
        });
    },
    updateCartItem(data) {
        return http.put('cart/update-items', data);
    },
    addToOrder(data) {
        return http.post('order/addtoOrder', data);
    },
    getPreOrder(id) {
        return http.get(`order/preOrder/${id}`);
    },
    checkOrder(id) {
        return http.get('order/preOrder/status', {
            params: {
                orderId: id,
            },
        });
    },
    getTotalCost(id, data) {
        return http.post('shipping/totalcost', data, {
            params: {
                shippingContribute: 'GHN',
                orderId: id,
            },
        });
    },
    payment(id, total_cost) {
        return http.post(
            'payments/create_payment_url',
            {
                vnp_version: null,
                vnp_command: null,
                vnp_tmn_code: null,
                vnp_amount: total_cost,
                vnp_bank_code: null,
                vnp_create_date: null,
                vnp_curr_code: null,
                vnp_ip_addr: null,
                vnp_locale: null,
                vnp_order_info: null,
                vnp_order_type: null,
                vnp_return_url: null,
                vnp_expire_date: null,
                vnp_txn_ref: null,
                vnp_secure_hash: null,
            },
            {
                params: {
                    orderId: id,
                },
            }
        );
    },
    getAllOrderItem() {
        return http.get('order/preOrder');
    },
};
