import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Listbox } from 'shared/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
    className?:string
    value?: Country;
    onChange?:(value:Country)=>void
    readonly?:boolean
}

const options = [
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Kazahstan, content: Country.Kazahstan },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
];

export const CountrySelect = memo(({
    className, onChange, value, readonly,
}:CountrySelectProps) => {
    const { t } = useTranslation('profile');

    const onChangeHandler = useCallback((value:string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Listbox
            onChange={onChangeHandler}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')}
            readonly={readonly}
            value={value}
            items={options}
            className={classNames('', {}, [className])}
            direction="top right"
        />
    );

    // return (

    // <Select
    //     className={classNames('', {}, [className])}
    //     onChange={onChangeHandler}
    //     value={value}
    //     readonly={readonly}
    //     label={t('Укажите страну')}
    //     options={options}
    // />
    // );
});
