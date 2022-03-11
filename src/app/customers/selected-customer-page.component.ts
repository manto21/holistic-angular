import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DbService } from '../app-data/db.service';
import { Customer } from '../models/customer.interface';

@Component({
  template: `
    <!-- 3. TODO Display the properties of the selected customer -->
    <ul>
      <li>Customer Id: {{selectedCustomer[0]?.id}}</li>
      <li>Customer Name: {{selectedCustomer[0]?.name}}</li>
      <li>Customer Address: {{selectedCustomer[0]?.address}}</li>
      <li>Customer City: {{selectedCustomer[0]?.city}}</li>
      <li>Customer Country: {{selectedCustomer[0]?.country}}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedCustomerPageComponent implements OnInit {
  selectedCustomer: any = {};
  constructor(private dbService: DbService) {}

  ngOnInit() {
    this.selectedCustomer = this.dbService.createDb().customers.filter(item => item.name === this.dbService.getCustomer());
  }
}
