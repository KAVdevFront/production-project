import { Mods, classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country, CountrySelect } from 'entities/Country';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?:string
    data?:Profile
    error?:string
    isLoading? : boolean
    readonly?:boolean
    onChangeFirstname?:(value?:string)=>void
    onChangeLastname?:(value?:string)=>void
    onChangeAge?:(value?:string)=>void
    onChangeCity?:(value?:string)=>void
    onChangeUsername?:(value?:string)=>void
    onChangeAvatar?:(value?:string)=>void
    onChangeCurrency?:(currency:Currency)=>void
    onChangeCountry?:(country:Country)=>void
}

export const ProfileCard = ({
    className,
    data,
    error,
    isLoading,
    onChangeFirstname,
    onChangeLastname,
    readonly,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
}:ProfileCardProps) => {
    const { t } = useTranslation('profile');

    const mods:Mods = {
        [cls.editing]: !readonly,
    };

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, { }, [className, cls.error])}>
                <Text
                    title={t('Ошибка загрузки профиля')}
                    theme={TextTheme.ERROR}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>

            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar src={data?.avatar} alt="avatar" />
                    </div>
                )}
                <Input
                    value={data?.first}
                    placeholder={t('Ваше имя')}
                    className={cls.input}
                    onChange={onChangeFirstname}
                    readonly={readonly}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Ваша фамилия')}
                    className={cls.input}
                    onChange={onChangeLastname}
                    readonly={readonly}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Ваш возраст')}
                    className={cls.input}
                    onChange={onChangeAge}
                    readonly={readonly}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    className={cls.input}
                    onChange={onChangeCity}
                    readonly={readonly}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    className={cls.input}
                    onChange={onChangeUsername}
                    readonly={readonly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Аватар')}
                    className={cls.input}
                    onChange={onChangeAvatar}
                    readonly={readonly}
                />
                <CurrencySelect
                    className={cls.input}
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    readonly={readonly}
                    className={cls.input}
                    value={data?.country}
                    onChange={onChangeCountry}
                />
            </div>
        </div>
    );
};
