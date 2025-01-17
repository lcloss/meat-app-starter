import { MenuItem } from '../menu-item/menu-item.model'
import { CartItem } from './cart-item.model'
import { Injectable } from '@angular/core';
import { NotificationService } from 'app/shared/messages/notification.service';

@Injectable()
export class ShoppingCartService {
    items: CartItem[] = []

    constructor(private notificationService: NotificationService) {

    }

    clear() {
        this.items = []
    }

    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)

        if ( foundItem ) {
            this.increaseQty(foundItem)
        } else {
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`Foi adicionado o item ${item.name}`)
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Foi removido o item ${item.menuItem.name}`)
    }

    increaseQty(item: CartItem) {
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem) {
        if (item.quantity > 1) {
            item.quantity = item.quantity - 1
        } else {
            this.removeItem(item)
        }
    }

    total(): number {
        return this.items.map(item => item.value())
                         .reduce((prev, value) => prev + value, 0)
    }
}