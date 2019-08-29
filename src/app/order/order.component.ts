import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { tap } from 'rxjs/operators';

import { RadioOption } from '../shared/radio/radio-option.model'
import { OrderService } from './order.service'
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model'
import { Order, OrderItem } from './order.model'

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  orderId: string

  delivery: number = 7.25

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: "MON"},
    {label: 'Multibanco', value: "MB"},
    {label: 'Cartão de Refeição', value: "REF"},
  ]

  constructor( private orderService: OrderService
             , private router: Router
             , private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)],
        updateOn: 'blur'
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      email_confirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      port_number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      complement: this.formBuilder.control(''),
      payment_option: this.formBuilder.control('', [Validators.required])
    }, {validators: [OrderComponent.equalsTo], updateOn: 'blur'})
  }

  static equalsTo(group: AbstractControl): {[Key: string]: boolean} {
    const email = group.get('email')
    const emailConfirmation = group.get('email_confirmation')

    if (!email || !emailConfirmation) {
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      return {emailsNotMatch: true}
    }

    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }
  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem): void {
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem): void {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem): void {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
                    .pipe(
                      tap( (orderId: string) => {
                            this.orderId = orderId
                          })
                      ).subscribe(( orderId: string ) => {
                        this.orderService.clear()
                        this.router.navigate(['/order-summary'])
                      })
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }
}
