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
                        loginToManage: 'Login to manage organization',
                        logout: 'Logout',
                        search: 'Search FPFs...',
                        kick: 'Remove',
                        promote: 'Promote',
                        email: 'Email',
                        name: 'Name',
                        enterName: 'Enter Name',
                        address: 'Address',
                        enterAddress: 'Enter Address',
                        role: 'Role',
                        organization: 'Organization',
                        searchUserProfile: 'Search User Profile',
                        noProfilesFound: 'No profiles found',
                        addUser: 'Add User',
                        noUserSelected: 'No user selected',
                        addSelectedUser: 'Add Selected User',
                        usersAdded: ' users have been added',
                        addFpf: 'Add FPF',
                        addOrganization: 'Create Organization',
                        createOrganization: 'Create new Organization',
                        public: 'Public',
                        private: 'Private',
                        yesDelete: 'Yes, delete',
                        cancel: 'Cancel',
                        confirmDialog: 'This action cannot be undone. Do you want to proceed with deleting this growing cycle?',
                        table: {
                            name: 'Name',
                            planted: 'Planted on',
                            harvested: 'Harvested on',
                            notes: 'Notes'
                        }
                    },
                    button: {
                        loginToManage: 'Login to manage organization',
                        create: 'Create',
                        add: 'Add'
                    },
                    label: {
                        organizationName: 'Organization Name',
                        setPublic: 'Set Public'
                    },
                    placeholder: {
                        enterOrganizationName: 'Enter organization name'
                    },
                    error: {
                        organizationNameTaken: 'Organization Name already taken'
                    }
                },
            },
            de: {
                translation: {
                    header: {
                        title: 'FARMINSIGHT',
                        loginToManage: 'Einloggen, um Organisation zu verwalten',
                        logout: 'Abmelden',
                        search: 'FPFs durchsuchen...',
                        kick: 'Entfernen',
                        promote: 'Befördern',
                        email: 'E-Mail-Adresse',
                        name: 'Name',
                        enterName: 'Name eingeben',
                        address: 'Adresse',
                        enterAddress: 'Adresse eingeben',
                        role: 'Rolle',
                        organization: 'Organisation',
                        searchUserProfile: 'Nutzerprofil suchen',
                        addUser: 'Benutzer hinzufügen',
                        noProfilesFound: 'Keine Profile gefunden',
                        noUserSelected: 'Kein Benutzer ausgewählt',
                        addSelectedUser: 'Ausgewählten Benutzer hinzufügen',
                        usersAdded: ' Benutzer wurden hinzugefügt',
                        addFpf: 'FPF hinzufügen',
                        addOrganization: 'Organisation erstellen',
                        createOrganization: 'Neue Organisation erstellen',
                        public: 'Öffentlich',
                        private: 'Privat',
                        yesDelete: 'Ja, löschen',
                        cancel: 'Abbrechen',
                        confirmDialog: 'Diese Aktion kann nicht rückgängig gemacht werden. Möchten Sie diesen Wachstumszyklus wirklich löschen?',
                        table: {
                            name: 'Name',
                            planted: 'Gepflanzt am',
                            harvested: 'Geerntet am',
                            notes: 'Bemerkungen'
                        }
                    },
                    button: {
                        loginToManage: 'Einloggen, um Organisation zu verwalten',
                        create: 'Erstellen',
                        add: 'Hinzufügen'
                    },
                    label: {
                        organizationName: 'Organisationsname',
                        setPublic: 'Öffentlich einstellen'
                    },
                    placeholder: {
                        enterOrganizationName: 'Geben Sie den Organisationsnamen ein'
                    },
                    error: {
                        organizationNameTaken: 'Organisationsname bereits vergeben'
                    }
                },
            },
            fr: {
                translation: {
                    header: {
                        title: 'FARMINSIGHT',
                        loginToManage: 'Se connecter pour gérer l’organisation',
                        logout: 'Se déconnecter',
                        search: 'Rechercher des FPF...',
                        kick: 'Retirer',
                        promote: 'Promouvoir',
                        email: 'Adresse e-mail',
                        name: 'Nom',
                        address: 'Adresse',
                        enterAddress: 'Entrez l’adresse',
                        enterName: 'Entrez le nom',
                        role: 'Rôle',
                        organization: 'Organisation',
                        searchUserProfile: 'Rechercher un profil utilisateur',
                        noProfilesFound: 'Aucun profil trouvé',
                        addUser: 'Ajouter un utilisateur',
                        noSelectedUser: 'Aucun utilisateur sélectionné',
                        addSelectedUser: 'Ajouter l’utilisateur sélectionné',
                        usersAdded: ' utilis ateurs ont été ajoutés',
                        addFpf: 'Ajouter un FPF',
                        addOrganization: 'Créer une organisation',
                        createOrganization: 'Créer une nouvelle organisation',
                        public: 'Public',
                        private: 'Privé',
                        yesDelete: 'Oui, supprimer',
                        cancel: 'Annuler',
                        confirmDialog: 'Cette action est irréversible. Voulez-vous vraiment supprimer ce cycle de croissance ?',
                        table: {
                            name: 'Nom',
                            planted: 'Planté le',
                            harvested: 'Récolté le',
                            notes: 'Remarques'
                        }
                    },
                    button: {
                        loginToManage: 'Se connecter pour gérer l’organisation',
                        create: 'Créer'
                    },
                    label: {
                        organizationName: 'Nom de l’organisation',
                        setPublic: 'Définir comme public'
                    },
                    placeholder: {
                        enterOrganizationName: 'Entrez le nom de l’organisation'
                    },
                    error: {
                        organizationNameTaken: 'Le nom de l’organisation est déjà pris'
                    }
                },
            },
            it: {
                translation: {
                    header: {
                        title: 'FARMINSIGHT',
                        loginToManage: 'Accedi per gestire l’organizzazione',
                        logout: 'Disconnettersi',
                        search: 'Cerca FPF...',
                        kick: 'Rimuovere',
                        promote: 'Promuovere',
                        email: 'Indirizzo email',
                        name: 'Nome',
                        address: 'Indirizzo',
                        enterAddress: 'Inserisci l’indirizzo',
                        enterName: 'Inserisci il nome',
                        role: 'Ruolo',
                        organization: 'Organizzazione',
                        searchUserProfile: 'Cerca profilo utente',
                        noProfilesFound: 'Nessun profilo trovato',
                        addUser: 'Aggiungi utente',
                        noUserSelected: 'Nessun utente selezionato',
                        addSelectedUser: 'Aggiungi l’utente selezionato',
                        usersAdded: ' utenti sono stati aggiunti',
                        addFpf: 'Aggiungi FPF',
                        addOrganization: 'Crea organizzazione',
                        createOrganization: 'Crea una nuova organizzazione',
                        public: 'Pubblico',
                        private: 'Privato',
                        yesDelete: 'Sì, elimina',
                        cancel: 'Annulla',
                        confirmDialog: 'Questa azione non può essere annullata. Sei sicuro di voler eliminare questo ciclo di crescita?',
                        table: {
                            name: 'Nome',
                            planted: 'Pianta il',
                            harvested: 'Raccolto il',
                            notes: 'Annotazioni'
                        }
                    },
                    button: {
                        loginToManage: 'Accedi per gestire l’organizzazione',
                        create: 'Crea',
                        add: 'Aggiungi'
                    },
                    label: {
                        organizationName: 'Nome dell’organizzazione',
                        setPublic: 'Imposta come pubblico'
                    },
                    placeholder: {
                        enterOrganizationName: 'Inserisci il nome dell’organizzazione'
                    },
                    error: {
                        organizationNameTaken: 'Il nome dell’organizzazione è già preso'
                    }
                },
            },
            zh: {
                translation: {
                    header: {
                        title: '农场洞察',
                        loginToManage: '登录以管理组织',
                        logout: '退出登录',
                        search: '搜索 FPF...',
                        kick: '移除',
                        promote: '提升',
                        email: '电子邮箱',
                        name: '名称',
                        address: '地址',
                        enterAddress: '输入地址',
                        enterName: '输入名称',
                        role: '角色',
                        organization: '组织',
                        searchUserProfile: '搜索用户资料',
                        noProfilesFound: '未找到任何资料',
                        addUser: '添加用户',
                        noUserSelected: '未选择用户',
                        addSelectedUser: '添加选定用户',
                        usersAdded: ' 位用户已添加',
                        addFpf: '添加 FPF',
                        addOrganization: '创建组织',
                        createOrganization: '创建新组织',
                        public: '公开',
                        private: '私人',
                        yesDelete: '是的，删除',
                        cancel: '取消',
                        confirmDialog: '此操作无法撤销。您确定要删除此种植周期吗？',
                        table: {
                            name: '名称',
                            planted: '种植时间',
                            harvested: '收获时间',
                            notes: '备注'
                        }
                    },
                    button: {
                        loginToManage: '登录以管理组织',
                        create: '创建',
                        add: '添加'
                    },
                    label: {
                        organizationName: '组织名称',
                        setPublic: '设置公开'
                    },
                    placeholder: {
                        enterOrganizationName: '输入组织名称'
                    },
                    error: {
                        organizationNameTaken: '组织名称已被占用'
                    }
                },
            },
            ru: {
                translation: {
                    header: {
                        title: 'FARMINSIGHT',
                        loginToManage: 'Войти для управления организацией',
                        logout: 'Выйти',
                        search: 'Искать FPF...',
                        kick: 'Удалить',
                        promote: 'Повысить',
                        email: 'Электронная почта',
                        name: 'Имя',
                        address: 'Адрес',
                        enterAddress: 'Введите адрес',
                        enterName: 'Введите имя',
                        role: 'Роль',
                        organization: 'Организация',
                        searchUserProfile: 'Поиск профиля пользователя',
                        noProfilesFound: 'Профили не найдены',
                        addUser: 'Добавить пользователя',
                        noUserSelected: 'Пользователь не выбран',
                        addSelectedUser: 'Добавить выбранного пользователя',
                        usersAdded: ' пользователей было добавлено',
                        addFpf: 'Добавить FPF',
                        addOrganization: 'Создать организацию',
                        createOrganization: 'Создать новую организацию',
                        public: 'Общедоступный',
                        private: 'Приватный',
                        yesDelete: 'Да, удалить',
                        cancel: 'Отмена',
                        confirmDialog: 'Это действие нельзя отменить. Вы уверены, что хотите удалить этот цикл роста?',
                        table: {
                            name: 'Имя',
                            planted: 'Дата посадки',
                            harvested: 'Дата сбора',
                            notes: 'Примечания'
                        }
                    },
                    button: {
                        loginToManage: 'Войти для управления организацией',
                        create: 'Создать',
                        add: 'Добавить'
                    },
                    label: {
                        organizationName: 'Название организации',
                        setPublic: 'Установить как публичное'
                    },
                    placeholder: {
                        enterOrganizationName: 'Введите название организации'
                    },
                    error: {
                        organizationNameTaken: 'Название организации уже занято'
                    }
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
