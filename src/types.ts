export enum TimeType {
  Second,
  Minute,
  Hour,
  DayMonth,
}

export enum MaxTimeValues {
  Seconds = 60,
  Minutes = 60,
  Hours = 24,
  Days = 31,
  Months = 12,
}

export interface useCronParserOptions {
  /**
   * Flag to skip/or not validation.
   * Set to 'true' if you're sure that cron expression passed to the hook is always valid.
   */
  skipValidation: boolean;
}

export interface CronInput {
  nextOccurrence: Date;
  type: TimeType;
  expression: string;
  current: number;
  maxValue: number;
  prevCronVal?: CronValue;
}

export interface CronValue {
  value: number;
  every: boolean;
  timePassed: boolean;
  maxValue: number;
  incrementor: number;
}

export interface NextCronValue {
  secondsIncrementor: number;
}
