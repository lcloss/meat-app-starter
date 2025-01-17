import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'
import { map } from 'rxjs/operators';

import { MEAT_API } from '../app.api'

import { ShoppingCartService } from '../restaurant-detail/shopping-cart/shopping-cart.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Order } from './order.model'

@Injectable()
export class OrderService {

    constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

    cartItems(): CartItem[] {
        return this.cartService.items
    }

    increaseQty(item: CartItem): void {
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem): void {
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem): void {
        this.cartService.removeItem(item)
    }

    itemsValue(): number {
        return this.cartService.total()
    }

    checkOrder(order: Order): Observable<string> {
        return this.http.post<Order>( `${MEAT_API}/orders`, order )
                        .pipe(map( order => order.id ))
    }

    clear(): void {
        this.cartService.clear()
    }

}