import React, { useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';

const people = [
    { id: 1, name: 'Durward Reynolds', unavailable: false },
    { id: 2, name: 'Kenton Towne', unavailable: false },
    { id: 3, name: 'Therese Wunsch', unavailable: false },
    { id: 4, name: 'Benedict Kessler', unavailable: true },
    { id: 5, name: 'Katelyn Rohan', unavailable: false },
];

function Listbox() {
    const [selectedPerson, setSelectedPerson] = useState(people[0]);

    return (
        <HListBox
            as="div"
            className={cls.ListBox}
            value={selectedPerson}
            onChange={setSelectedPerson}
        >
            <HListBox.Button
                className={cls.trigger}

            >
                <Button>
                    {selectedPerson.name}

                </Button>
            </HListBox.Button>
            <HListBox.Options className={cls.options}>
                {people.map((person) => (
                    <HListBox.Option
                        key={person.id}
                        value={person}
                        disabled={person.unavailable}
                        as={React.Fragment}
                    >
                        {({ active, selected }) => (
                            <li
                                className={classNames(cls.option, { [cls.active]: active }, [])}
                            >
                                {selected && '!!!'}
                                {person.name}

                            </li>
                        )}
                    </HListBox.Option>

                ))}
            </HListBox.Options>
        </HListBox>
    );
}
