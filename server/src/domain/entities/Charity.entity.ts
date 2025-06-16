import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CharityName } from '../value-objects/CharityName';
import { CharityDescription } from '../value-objects/CharityDescription';
import { CharityImageUrl } from '../value-objects/CharityImageUrl';

@Entity()
export class Charity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'varchar', length: 1000 })
  public description: string;

  @Column({ type: 'varchar', name: 'image_url', nullable: true })
  public imageUrl: string;

  @CreateDateColumn()
  private createdAt: Date;

  @UpdateDateColumn()
  private updatedAt: Date;

  // Getters
  getId(): number {
    return this.id;
  }

  getName(): CharityName {
    return new CharityName(this.name);
  }

  getDescription(): CharityDescription {
    return new CharityDescription(this.description);
  }

  getImageUrl(): CharityImageUrl {
    return new CharityImageUrl(this.imageUrl);
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
