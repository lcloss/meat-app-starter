import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()

  rates: number[] = [1, 2, 3, 4, 5]
  rate: number = 0
  previousRate: number

  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number): void {
    this.rate = rate
    this.previousRate = rate
    this.rated.emit(this.rate)
  }

  setTemporaryRate(rate: number): void {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate
    }

    this.rate = rate
  }

  clearTemporaryRate(): void {
    this.rate = this.previousRate
  }
}
