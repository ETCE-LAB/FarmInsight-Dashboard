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
                    },
                },
            },
        },
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
    });

export default i18n;
