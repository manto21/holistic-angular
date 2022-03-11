import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, map, of } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { AppData } from '../app-data/app-data.interface';
import { DbService } from '../app-data/db.service';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';

@Component({
  template: `
    <select (click)="selectedOption($event)">
      <!-- 2. TODO implement a select to filter orders by customer name -->
      <option [selected]=""></option>
      <option *ngFor="let customer of dbData.customers" [value]="customer.name">{{customer.name}}</option>
    </select>
    <table>
      <thead>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Product Name</th>
      </thead>
      <tbody>
        <!-- 1. TODO display a list of orders here. -->
        <tr *ngFor="let order of ordersList">
          <td>{{order.id}}</td>
          <td>{{order.customerName}}</td>
          <td>{{order.date | date: 'dd/MM/yyyy'}}</td>
          <td>{{order.productName}}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles:['th, td {border: 1px solid;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersPageComponent implements OnInit {
  dbData: AppData = {
    customers: [],
    products: [],
    orders: []
  };
  orders: any = [];
  ordersList: any = [];
  products: Product[] = [];
  customers: Customer[] = [];
  order: Order[] = [];
  constructor(private dbService: DbService, private appDataApiService: AppDataApiService, private changeDetection: ChangeDetectorRef) {}

  ngOnInit() {
    this.dbData = this.dbService.createDb(); 
    this.dbData.orders.forEach((element: any) => {
        this.orders.push({
          id: element.id,
          date: element.date,
          customerName: this.dbData.customers.filter((item: Customer) => item.id === element.customerId)[0].name,
          productName: this.dbData.products.filter((item: Product) => item.id === element.productId)[0].name,
        });
      });
    this.ordersList = this.dbService.getCustomer() ? this.orders.filter((value: any) => value.customerName == this.dbService.getCustomer()) : this.orders;
    this.dbService.setCustomer("");
    this.changeDetection.detectChanges();
  }

  selectedOption(event: any) {
    if (event.target.value) {
      this.ordersList = this.orders.filter((value: any) => value.customerName == event.target.value);
      this.dbService.setCustomer(event.target.value);
    } else {
      this.ordersList = this.orders;
    }
  }
}
