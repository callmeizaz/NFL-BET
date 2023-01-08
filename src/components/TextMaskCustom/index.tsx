import React from "react";

import MaskedInput from "react-text-mask";

import { TextMaskCustomProps } from "./interfaces";

const TextMaskCustom = (props: TextMaskCustomProps) => {
  const { inputRef, defaultValue, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      guide
      keepCharPositions
      mask={defaultValue}
      placeholderChar={"\u2000"}
      showMask
    />
  );
};
export default TextMaskCustom;
