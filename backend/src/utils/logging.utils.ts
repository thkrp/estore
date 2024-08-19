const paramLoggingBlacklist = ['token'];

export const sanitizeLoggingSearchParams = (originalUrl: string, path: string) => {
    const queryString = originalUrl.replace(path, '');
    const searchParams = new URLSearchParams(queryString);
    paramLoggingBlacklist.forEach(param => {
        searchParams.delete(param);
    });
    const sanitizedLoggingSearchParams: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
        sanitizedLoggingSearchParams[key] = value;
    }
    return sanitizedLoggingSearchParams;
};
