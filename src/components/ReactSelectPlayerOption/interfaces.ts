export interface OptionProps {
  innerProps: any;
  isDisabled: boolean;
  getStyles: Function;
  data: {
    label: string;
    value: {
      id: string;
      name: string;
      photoUrl: string;
    };
    
  };
}
