import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    header: {
                        title: 'FARMINSIGHT',
                        logout: 'Logout',
                        search: 'Search FPFs...',
                        kick: 'Remove',
                        promote: 'Promote',
                        email: 'Email',
                        name: 'Name',
                        role: 'Role',
                        organization: 'Organization',
                        addUser: 'Add User',
                        addSelectedUser: 'Add Selected User',
                        addFpf: 'Add FPF',
                    },
                },
            },
            de: {
                translation: {
                    header: {
                        title: 'BAUERNHOFEINSICHT',
                        logout: 'Rausschalten',
                        search: 'Suche FPFs...',
                        kick: 'Entfernen',
                        promote: 'Befördern',
                        email: 'Email',
                        name: 'Name',
                        role: 'Rolle',
                        organization: 'Organisation',
                        addUser: 'Benutzer hinzufügen',
                        addSelectedUser: 'Ausgewählt Benutzer hinzufügen',
                        addFpf: 'FPF hinzufügen',
                    },
                },
            },
            fr: {
                translation: {
                    header: {
                        title: 'VUE DE LA FERME',
                        logout: 'Se déconnecter',
                        search: 'Rechercher FPFs...',
                        kick: 'Retirer',
                        promote: 'Promouvoir',
                        email: 'Email',
                        name: 'Nom',
                        role: 'Rôle',
                        organization: 'Organisation',
                        addUser: 'Ajouter un utilisateur',
                        addSelectedUser: 'Ajouter un utilisateur sélectionné',
                        addFpf: 'Ajouter FPF',
                    },
                },
            },
            it: {
                translation: {
                    header: {
                        title: 'VISTA DELLA FATTORIA',
                        logout: 'Disconnettersi',
                        search: 'Cerca FPFs...',
                        kick: 'Rimuovere',
                        promote: 'Promuovere',
                        email: 'Email',
                        name: 'Nome',
                        role: 'Ruolo',
                        organization: 'Organizzazione',
                        addUser: 'Aggiungi utente',
                        addSelectedUser: 'Aggiungi utente selezionato',
                        addFpf: 'Aggiungi FPF',
                    },
                },
            },
            zh: {
                translation: {
                    header: {
                        title: '农场洞察',
                        logout: '登出',
                        search: '搜索 FPF...',
                        kick: '删除',
                        promote: '晋升',
                        email: '电子邮件',
                        name: '名称',
                        role: '角色',
                        organization: '组织',
                        addUser: '添加用户',
                        addSelectedUser: '添加 选定的用户',
                        addFpf: '添加 FPF',
                    },
                },
            },
            ru: {
                translation: {
                    header: {
                        title: 'ФЕРМЕРСКИЙ АНАЛИЗ',
                        logout: 'Выйти',
                        search: 'Поиск FPF...',
                        kick: 'Удалить',
                        promote: 'Повысить',
                        email: 'Электронная почта',
                        name: 'Имя',
                        role: 'Роль',
                        organization: 'Организация',
                        addUser: 'Добавить пользователя',
                        addSelectedUser: 'Добавить выбранного пользователя',
                        addFpf: 'Добавить FPF',
                    },
                },
            },
        },
        lng: navigator.language.split('-')[0],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
