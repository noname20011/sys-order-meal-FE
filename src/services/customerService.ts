import { BaseService } from "@/api/baseService";

export class CustomerService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

  public async getCustomerById(phone: string): Promise<T | null> {
    try {
      const customer = await this.getById(`?phoneNumber=${phone}`);
      return customer;
    } catch (error) {
      console.error("Error fetching customer:", error);
      return null;
    }
  }
}

const customerService = new CustomerService<any>("/customer");
export default customerService;
