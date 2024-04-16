interface ExpressErrorInterface extends Error {
  errors: string;
  status: number;
  stack: string | undefined;
  errorData?: object | null;
}

interface ErrorResponseInterface {
  error: string;
  stack?: string;
  status: number;
  message: string;
  payload?: object | null;
  errorData?: object | null;
}
