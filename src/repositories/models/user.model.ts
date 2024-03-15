import { Model, Column, Table, UpdatedAt, CreatedAt, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(() => uuidv4())
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({ type: DataType.CHAR(64), allowNull: false })
  name: string;

  @Column({ type: DataType.CHAR(64), allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.CHAR(64), allowNull: false })
  phone: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
