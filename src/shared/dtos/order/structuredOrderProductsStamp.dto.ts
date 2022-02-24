import { ProductStamp } from '@shared/entities/productStamp/productStamp.entity';

export class structuredOrderProductStampDTO {
  public products: ProductStamp[];

  public total: string;
}
