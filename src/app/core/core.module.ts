import { NgModule } from '@angular/core'
import { RestaurantsService } from 'app/restaurants/restaurants.service';
import { ShoppingCartService } from 'app/restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderService } from 'app/order/order.service';

@NgModule({
    providers: [
        ShoppingCartService,
        RestaurantsService,
        OrderService
    ]
})

export class CoreModule {
    
}