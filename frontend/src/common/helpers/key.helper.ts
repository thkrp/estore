export const transformToKey = (index: number, str?: string) => `${index.toString()}_${str || ''}`;
