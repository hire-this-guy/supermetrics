export interface TypedResponse<T> extends Response {
	parsedBody?: T;
}
