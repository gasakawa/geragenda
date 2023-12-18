export type ErrorWrapper = {
  type: string;
  message: string | string[];
  stackTrace?: string;
  data?: {
    [key: string]: any;
  };
};

export class ErrorResponse {
  errors: ErrorWrapper[];
}
