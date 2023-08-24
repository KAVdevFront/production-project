import React, { ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { HStack } from '../Stack/HStack/HStack';
import { DropdownDirection } from '../../types/ui';

interface ListBoxItem{
    value:string
    content:ReactNode
    disabled?:boolean

}

interface ListBoxProps {
    items?:ListBoxItem[]
    className?:string
    value?:string
    defaultValue?:string
    onChange:(value: string)=>void
    readonly?:boolean
    direction?:DropdownDirection
    label?:string

}

const mapDirectionClass:Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

export function Listbox(props:ListBoxProps) {
    const {
        items, defaultValue, value, className, onChange, readonly, direction = 'bottom left', label,
    } = props;
    const [selectedPerson, setSelectedPerson] = useState();
    const optionsClasses = [
        mapDirectionClass[direction],
    ];
    return (
        <HStack>
            {label && <span className={cls.label}>{`${label}>`}</span>}

            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [cls.className])}
                value={value}
                onChange={onChange}
            >

                <HListBox.Button
                    className={cls.trigger}

                >
                    <Button disabled={readonly}>
                        {value ?? defaultValue}

                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={React.Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.option,
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {selected && '!!!'}
                                    {item.content}

                                </li>
                            )}
                        </HListBox.Option>

                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}
