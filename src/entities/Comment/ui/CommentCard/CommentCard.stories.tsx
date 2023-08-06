import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { CommentCard } from './CommentCard';

export default {
    title: 'entities/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;
const comment = {
    id: '1',
    text: 'some comment',
    user: { id: '1', username: 'Vasya' },
};

export const Normal = Template.bind({});
Normal.args = {
    comment,
};

export const Loading = Template.bind({});
Loading.args = {
    comment,
    isLoading: true,
};
