import { Customer, Order } from '../types';

export const gasService = {
  async fetchData() {
    const res = await fetch('/api/data');
    return res.json();
  },

  async fetchOrders(): Promise<Order[]> {
    const res = await fetch('/api/orders');
    return res.json();
  },

  async fetchAnalytics() {
    const res = await fetch('/api/analytics');
    return res.json();
  },

  async fetchCustomer(phone: string): Promise<Customer | null> {
    const res = await fetch(`/api/customer/${phone}`);
    if (res.ok) return res.json();
    return null;
  },

  async fetchOrderById(orderId: string): Promise<any | null> {
    const res = await fetch(`/api/order/${orderId}`);
    if (res.ok) return res.json();
    return null;
  },

  async submitOrder(orderData: any) {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return res.json();
  }
};
