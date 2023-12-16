import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({
  name: 'plans',
  schema: 'config',
})
export class PlanEntity extends BaseEntity {
  @Column({
    type: 'text',
  })
  name: string;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'monthly_price',
    type: 'numeric',
    scale: 2,
    precision: 18,
  })
  monthlyPrice: number;

  @Column({
    name: 'discount_first_month',
    type: 'numeric',
    scale: 2,
    precision: 18,
  })
  discountFirstMount: number;

  @Column({
    name: 'annually_price',
    type: 'numeric',
    scale: 2,
    precision: 18,
  })
  annuallyPrice: number;

  @Column({
    name: 'discount_first_year',
    type: 'numeric',
    scale: 2,
    precision: 18,
  })
  discountFirstYear: number;

  @Column({
    name: 'max_staff',
    type: 'int4',
    default: 0,
  })
  maxStaff: number;

  @Column({
    name: 'max_sms',
    type: 'int4',
    default: 0,
  })
  maxSMS: number;

  @Column({
    name: 'max_email',
    type: 'int4',
    default: 0,
  })
  maxEmail: number;
}
