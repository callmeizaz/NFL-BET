export interface ValidationErrors {
  errorMessage: string;
  field_errors: Record<string, string>;
}

export interface FullFilterInterface {
  filter: {
    where?: {
      [key: string]: any;
    };
    include?: object[] | string[];
  };
}

export interface FilterInterface {
  where?: {
    [key: string]: any;
  };
  include?: object[] | string[];
}
