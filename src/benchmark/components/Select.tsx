import React, { ChangeEvent, ReactElement, useCallback } from 'react';

export interface ISelectItem {
  value: string;
  label?: string;
}

export interface ISelectProps {
  $label: string;
  items: ISelectItem[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function Select({ $label, items, value, onChange }: ISelectProps): ReactElement {
  const $onChange = useCallback((ev: ChangeEvent<HTMLSelectElement>) => onChange?.(ev.target.value), [onChange]);

  return (
    <div className={'select'}>
      <label className={'select__label'}>{$label}</label>
      <select className={'select__input'} value={value} onChange={$onChange}>
        {items.map(({ value, label = value }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}