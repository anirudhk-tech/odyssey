import React, { useId } from "react";
import styled from "styled-components";

export type Option<V = string> = {
  label: string;
  value: V;
  disabled?: boolean;
};

export type DropDownProps<V = string> = {
  options: Option<V>[];
  value: V | undefined;
  onChange: (value: V) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
  className?: string;
};

const Wrapper = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  line-height: 1.5;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const DropDown = <V = string,>({
  options,
  value,
  onChange,
  label,
  placeholder = "Select…",
  disabled,
  selectProps,
  className,
}: DropDownProps<V>): JSX.Element => {
  const id = useId();
  const selected =
    value !== undefined && value !== null ? String(value) : "__placeholder";

  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select
        id={id}
        disabled={disabled}
        value={selected}
        onChange={(e) => {
          const picked = options.find(
            (o) => String(o.value) === e.target.value
          );
          if (picked) onChange(picked.value);
        }}
        {...selectProps}
      >
        <option disabled value="__placeholder">
          {placeholder}
        </option>
        {options.map(({ label, value, disabled: optDisabled }) => (
          <option
            key={String(value)}
            value={String(value)}
            disabled={optDisabled}
          >
            {label}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};
