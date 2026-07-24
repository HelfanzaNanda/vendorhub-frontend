import dayjs, { Dayjs } from "dayjs";

export class DateUtil {
    static today(): dayjs.Dayjs {
        return dayjs();
    }

    static plusYears(years: number): dayjs.Dayjs {
        return dayjs().add(years, 'years');
    }

    static formatDate(value: string | Date, format = 'DD MMM YYYY'): string {
        return dayjs(value).format(format);
    }

    static minusYears(years: number): dayjs.Dayjs {
        return dayjs().subtract(years, 'years');
    }

    static toDayjs(value: unknown): Dayjs | null {
        if (value == null) {
            return null;
        }

        if (dayjs.isDayjs(value)) {
            return value;
        }

        if ( value instanceof Date || typeof value === 'string' || typeof value === 'number' ) {
            return dayjs(value);
        }
        return null;
    }
}
