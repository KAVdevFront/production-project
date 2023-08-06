import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
    value: string
    content:string
}

interface SelectProps {
    className?:string
    label?:string
    options?: SelectOption[]
    value?:string
    onChange?:(value:string)=>void
    readonly?:boolean
}

export const Select = memo(({
    className, label, options, onChange, value, readonly,
}:SelectProps) => {
    const mods:Mods = {};

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHandler = (e:ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && (<span className={cls.label}>{`${label}>`}</span>)}
            <select
                value={value}
                onChange={onChangeHandler}
                className={cls.select}
                disabled={readonly}
            >
                {optionsList}
            </select>
        </div>
    );
});
