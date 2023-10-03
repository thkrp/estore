export const triggerLoaderHandler = <T>(state: T, isLoading: boolean) => ({
    ...state,
    isLoading
});

export const triggerStatePropertyLoaderHandler = <T>(
    state: T,
    { isLoading, element }: { isLoading: boolean; element: keyof T }
) => ({
    ...state,
    [element]: {
        ...state[element],
        isLoading
    }
});
