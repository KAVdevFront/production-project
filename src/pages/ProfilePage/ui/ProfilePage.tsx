import { EditableProfileCard } from 'features/editableProfileCard';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';

interface ProfilePageProps {
    className?:string
}

const ProfilePage = memo(({ className }:ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const { id } = useParams<{id:string}>();

    if (!id) {
        return (
            <Text text={t('Профиль не найден')} />
        );
    }

    return (
        <Page className={classNames('', {}, [className])}>
            <VStack max gap="16">
                <EditableProfileCard id={id} />
            </VStack>
        </Page>

    );
});

export default ProfilePage;
