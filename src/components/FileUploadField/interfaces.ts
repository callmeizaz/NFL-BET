export interface FileUploadProps {
  setFieldValue: Function;
  label?: string;
  defaultValue?: string;
  disabled?: boolean;
  field: {
    name: string;
  };
  form: {
    setFieldValue: Function;
    errors: {
      [name: string]: string;
    };
    touched: {
      [name: string]: string;
    };
  };
}
