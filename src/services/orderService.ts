import { BaseService } from "@/src/api/baseService";

export class ClassService<T> extends BaseService<T> {
  constructor(endpoint: string) {
    super(endpoint);
  }

}

const classService = new ClassService<any>("/order/");
export default classService;