import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PostAttrs {
  title: string;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING })
  image: string;
}
