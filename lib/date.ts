import { differenceInDays, differenceInMonths, differenceInWeeks, isToday, isYesterday } from "date-fns";
import { format } from "date-fns";

export const formatMessageDate = (date: Date) => {
    const now = new Date();
    const days = differenceInDays(now, date);
    const weeks = differenceInWeeks(now, date);
    const months = differenceInMonths(now, date);

    if (isToday(date)) {
        return `Today at ${format(date, "h:mm a")}`;
    } else if (isYesterday(date)) {
        return `Yesterday at ${format(date, "h:mm a")}`;
    } else if (days < 7) {
        return `${days} days ago at ${format(date, "h:mm a")}`;
    } else if (weeks === 1) {
        return `1 week ago at ${format(date, "h:mm a")}`;
    } else if (weeks < 4) {
        return `${weeks} weeks ago at ${format(date, "h:mm a")}`;
    } else if (months === 1) {
        return `1 month ago at ${format(date, "h:mm a")}`;
    } else if (months < 12) {
        return `${months} months ago at ${format(date, "h:mm a")}`;
    } else {
        return format(date, "MMM d, yyyy h:mm a");
    }
};
