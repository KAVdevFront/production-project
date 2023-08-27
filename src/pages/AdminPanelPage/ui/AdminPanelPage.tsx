import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?:string
}

const AdminPanelPage = ({ className }:AdminPanelPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.AdminPanelPage, {}, [className])} />
    );
};

export default AdminPanelPage;
