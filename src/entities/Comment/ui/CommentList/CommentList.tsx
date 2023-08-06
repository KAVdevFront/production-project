import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { memo } from 'react';
import cls from './CommentList.module.scss';
import { Comment } from '../../model/types/comment';
import { CommentCard } from '../CommentCard/CommentCard';

interface CommentListProps {
    className?:string
    comments?:Comment[]
    isLoading?:boolean
}

export const CommentList = memo(({ className, comments, isLoading }:CommentListProps) => {
    if (isLoading) {
        return (
            <div className={classNames(cls.CommentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        );
    }

    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.length
                ? comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} className={cls.comment} isLoading={isLoading} />
                ))
                : <Text text="Комментарии отсутствуют" />}
        </div>
    );
});
