// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReducerHandlers<State> = Record<string, (state: State, payload: any) => State>;
