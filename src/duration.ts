export class Duration {
  constructor(private readonly milliseconds: number) {}

  /**
   * Creates a Duration from milliseconds.
   */
  static fromMilliseconds(milliseconds: number): Duration {
    return new Duration(milliseconds);
  }

  /**
   * Creates a Duration from seconds.
   */
  static fromSeconds(seconds: number): Duration {
    return new Duration(seconds * 1000);
  }

  /**
   * Creates a Duration from minutes.
   */
  static fromMinutes(minutes: number): Duration {
    return new Duration(minutes * 60 * 1000);
  }

  /**
   * Creates a Duration from hours.
   */
  static fromHours(hours: number): Duration {
    return new Duration(hours * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from days.
   */
  static fromDays(days: number): Duration {
    return new Duration(days * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from weeks.
   */
  static fromWeeks(weeks: number): Duration {
    return new Duration(weeks * 7 * 24 * 60 * 60 * 1000);
  }

  /**
   * Creates a Duration from years.
   */
  static fromYears(years: number): Duration {
    return new Duration(years * 365 * 24 * 60 * 60 * 1000);
  }

  /**
   * Converts the duration to milliseconds.
   */
  toMilliseconds(): number {
    return this.milliseconds;
  }

  /**
   * Converts the duration to seconds.
   */
  toSeconds(): number {
    return this.milliseconds / 1000;
  }

  /**
   * Converts the duration to minutes.
   */
  toMinutes(): number {
    return this.milliseconds / (60 * 1000);
  }

  /**
   * Converts the duration to hours.
   */
  toHours(): number {
    return this.milliseconds / (60 * 60 * 1000);
  }

  /**
   * Converts the duration to days.
   */
  toDays(): number {
    return this.milliseconds / (24 * 60 * 60 * 1000);
  }

  /**
   * Converts the duration to weeks.
   */
  toWeeks(): number {
    return this.milliseconds / (7 * 24 * 60 * 60 * 1000);
  }

  /**
   * Converts the duration to years.
   */
  toYears(): number {
    return this.milliseconds / (365 * 24 * 60 * 60 * 1000);
  }
}
