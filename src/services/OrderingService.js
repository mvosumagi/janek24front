export default {
    submit(order) {
        return new Promise((resolve, reject) => {
            console.log("OrderService received order:", order);
            setTimeout(() => resolve(), 1000);
        });
    }
};