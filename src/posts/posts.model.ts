import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface PostAttrs {
  title: string;
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<PostAttrs> {
  @ApiProperty({ example: '12345', description: 'Unique identificator' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'image_1', description: 'name' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRgA',
    description: 'blob',
  })
  @Column({ type: DataType.STRING })
  image: string;
}