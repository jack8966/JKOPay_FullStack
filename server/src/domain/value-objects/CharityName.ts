import { ValueObject } from './ValueObject';

export class CharityName extends ValueObject {
  private readonly value: string;

  constructor(name: string) {
    super();
    this.validateName(name);
    this.value = name;
  }

  private validateName(name: string): void {
    if (name.length < 2) {
      throw new Error('Charity name must be at least 2 characters long');
    }
    if (name.length > 100) {
      throw new Error('Charity name must not exceed 100 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CharityName): boolean {
    return this.value === other.value;
  }
}
