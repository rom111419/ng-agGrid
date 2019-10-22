import { Subscription } from 'rxjs';


export class SubscriptionStorage {
  [key: string]: any;

  unsubscribe(): void {
    Object.keys(this).forEach(subscriptionName => {
      // tslint:disable
      <Subscription>this[subscriptionName].unsubscribe();
    });
  }
}
