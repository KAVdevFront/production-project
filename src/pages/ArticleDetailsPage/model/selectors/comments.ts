import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleCommentsIsLoading = (state:StateSchema) => state.artilceDetailsComments?.isLoading;
export const getArticleCommentsError = (state:StateSchema) => state.artilceDetailsComments?.error;
