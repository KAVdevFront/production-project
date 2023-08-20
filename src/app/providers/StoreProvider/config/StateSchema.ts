import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from 'entities/Counter';
import { ProfileSchema } from 'entities/Profile';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { NavigateOptions } from 'react-router';
import { To } from 'history';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsCommentSchema } from 'pages/ArticleDetailsPage';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ScrollSaveSchema } from 'features/ScrollSave';

export interface StateSchema{
    counter:CounterSchema;
    user:UserSchema;
    scrollSave:ScrollSaveSchema
    // async reducers
    loginForm?: LoginSchema
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema
    artilceDetailsComments?:ArticleDetailsCommentSchema
    addCommentForm?:AddCommentFormSchema
    articlesPage?:ArticlesPageSchema
}

export type StateSchemaKey = keyof StateSchema
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>
export interface ReducerManager {
    getReducerMap: ()=> ReducersMapObject<StateSchema>
    reduce: (state: StateSchema, action: AnyAction) =>CombinedState<StateSchema>;
    add:(key: StateSchemaKey, reducer: Reducer)=>void ;
    remove: (key:StateSchemaKey) =>void;

    getMountedReducers:()=>MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema

}
