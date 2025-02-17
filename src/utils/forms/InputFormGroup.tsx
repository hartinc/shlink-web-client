import { FC, PropsWithChildren } from 'react';
import { InputType } from 'reactstrap/types/lib/Input';
import { LabeledFormGroup } from './LabeledFormGroup';
import { useDomId } from '../helpers/hooks';

export type InputFormGroupProps = PropsWithChildren<{
  value: string;
  onChange: (newValue: string) => void;
  type?: InputType;
  required?: boolean;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
}>;

export const InputFormGroup: FC<InputFormGroupProps> = (
  { children, value, onChange, type, required, placeholder, className, labelClassName },
) => {
  const id = useDomId();

  return (
    <LabeledFormGroup label={<>{children}:</>} className={className ?? ''} labelClassName={labelClassName} id={id}>
      <input
        id={id}
        className="form-control"
        type={type ?? 'text'}
        value={value}
        required={required ?? true}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledFormGroup>
  );
};
