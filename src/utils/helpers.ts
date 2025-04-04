/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Truncate a string to a specified length
 */
export function truncateString(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

/**
 * Delay execution for a specified time
 */
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce a function to limit how often it can be called
 * @param fn The function to debounce
 * @param wait The time in milliseconds to wait before calling the function
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    wait: number
): {
    (...args: Parameters<T>): void;
    cancel: () => void;
} {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const debounced = function (...args: Parameters<T>): void {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            fn(...args);
            timeout = null;
        }, wait);
    };

    debounced.cancel = function () {
        if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
        }
    };

    return debounced;
}


