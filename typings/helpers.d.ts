export interface HttpExceptionInterface {
  status: number;
  message: string;
  payload?: object;
  errorTag?: string;
  stack?: string | undefined;
  isPublic?: boolean | undefined;
  errorData?: Record<string, any>;
}

export interface ResponseInterface {
  status: number;
  message?: string;
  payload?: object | null;
}

export type ExpressResponseInterface = Promise<void | Response<
  any,
  Record<string, any>
>>;
