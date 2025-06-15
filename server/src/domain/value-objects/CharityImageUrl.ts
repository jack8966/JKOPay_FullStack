import { ValueObject } from './ValueObject';

export class CharityImageUrl extends ValueObject {
  private readonly value: string;

  constructor(url: string) {
    super();
    this.validateUrl(url);
    this.value = url;
  }

  private validateUrl(url: string): void {
    if (!url) {
      throw new Error('Charity image URL cannot be empty');
    }

    try {
      new URL(url);
    } catch (error) {
      throw new Error('Invalid URL format');
    }
  }

  getValue(): string {
    return this.value;
  }

  equals(other: CharityImageUrl): boolean {
    return this.value === other.value;
  }
}
