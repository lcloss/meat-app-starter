class Order {
    constructor(
        public address: string,
        public port_number: string,
        public complement: string,
        public paymentMethod: string,
        public orderItems: OrderItem[],
        public id?: string
    ) { }

}

class OrderItem {
    constructor(public quantity: number, public menuId: string) {}
}

export { Order, OrderItem }