import { ValueObject } from './ValueObject';

export class CharityDescription extends ValueObject {
  private readonly value: string;

  constructor(description: string) {
    super();
    this.validateDescription(description);
    this.value = description;
  }

  private validateDescription(description: string): void {
    if (description.length < 10) {
      throw new Error('Charity description must be at least 10 characters long');
    }
    if (description.length > 1000) {
      throw new Error('Charity description must not exceed 1000 characters');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CharityDescription): boolean {
    return this.value === other.value;
  }
}
