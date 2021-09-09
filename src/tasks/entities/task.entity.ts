import {
  Column,
  Model,
  Table,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table
export class Task extends Model {
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id: string;

  @AllowNull(false)
  @Column
  name: string;

  @Column
  description: string;

  @AllowNull(false)
  @Column({ defaultValue: false })
  checked: boolean;

  @AllowNull(false)
  @Column
  priority: string;

  @CreatedAt
  @Column
  created_at: Date;

  @UpdatedAt
  @Column
  updated_at: Date;

  @DeletedAt
  @Column
  deleted_at: Date;
}
