import type { Dayjs } from 'dayjs';

export type FieldProps = {
    minDate?: Date | string | Dayjs;
    maxDate?: Date | string | Dayjs;
} & Record<string, unknown>
