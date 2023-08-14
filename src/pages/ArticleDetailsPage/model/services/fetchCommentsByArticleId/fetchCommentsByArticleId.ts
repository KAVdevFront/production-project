import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string | undefined, ThunkConfig<string>>(
    'articleDetails/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        if (!articleId) {
            return thunkApi.rejectWithValue('error');
        }
        try {
            const response = await thunkApi.extra.api.get<Comment[]>('/comments', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return thunkApi.rejectWithValue('error');
        }
    },
);