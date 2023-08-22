import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/addCommentForm';

import { Page } from 'shared/ui/Page/Page';
import { getArticleRecommendations }
    from '../../model/slices/articleDetailsPageRecommendationSlice';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleComments } from '../../model/slices/articleDetailsCommentSlice';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading }
    from '../../model/selectors/recommendations';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    className?:string
}

const reducers:ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }:ArticleDetailsPageProps) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id:string}>();
    const comments = useSelector(getArticleComments.selectAll);
    const commenstIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    // const recommendationsError = useSelector(getArticleRecommendationsError);

    const dispatch = useAppDispatch();

    const onSendComment = useCallback((text:string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text size={TextSize.L} title={t('Рекомендуем')} className={cls.recommendations} />
                <ArticleList target="_blank" articles={recommendations} isLoading={recommendationsIsLoading} />
                <Text size={TextSize.L} title={t('Комментарии')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList comments={comments} isLoading={commenstIsLoading} />
            </Page>
        </DynamicModuleLoader>

    );
};

export default memo(ArticleDetailsPage);
