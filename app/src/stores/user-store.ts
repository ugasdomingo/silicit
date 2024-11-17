//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/axios';
import { useUtilStore } from './util-store';
import { IHistory } from '@/interfaces/IHistory';
import { IGoal } from '@/interfaces/IGoal';
import { IUser } from '@/interfaces/IUser';

//Define the store
export const useUserStore = defineStore('user', () => {
    //Activate tools
    const utilStore = useUtilStore();
    const router = useRouter();

    //General states
    const token = ref('');
    const user_name = ref('');
    const user_role = ref('');
    const user_history = ref<IHistory | null>(null);
    const all_goals = ref<IGoal[]>([]);

    //Admin states
    const users = ref<IUser[]>([]);
    const users_in_group = ref<IUser[]>([]);

    //Helper methods
    const handle_response = (response: any) => {
        token.value = response.data.data.token;
        user_name.value = response.data.data.user_name;
        user_role.value = response.data.data.user_role;
        user_history.value = response.data.data.user_history;
    };

    //General methods
    const register = async (
        name: string,
        email: string,
        phone: string,
        password: string,
        policy_accepted: boolean,
        membership_type: string
    ) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/register',
                data: {
                    name,
                    email,
                    phone,
                    password,
                    policy_accepted,
                    membership_type
                }
            });

            if (response.status === 200) {
                handle_response(response);
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
                router.push('/dashboard');
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
            utilStore.display_notification(error.message, 'error');
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/login',
                data: {
                    email,
                    password
                }
            });

            if (response.status === 200) {
                handle_response(response);
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
                router.push('/dashboard');
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
            utilStore.display_notification(error.message, 'error');
        }
    };

    const logout = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/logout',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                token.value = '';
                user_name.value = '';
                user_role.value = '';
                user_history.value = null;

                utilStore.display_notification(
                    response.data.message,
                    'success'
                );

                router.push('/');
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const refresh_token = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/refresh',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                handle_response(response);
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const forgot_password = async (email: string) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/forgot-password',
                data: {
                    email
                }
            });

            if (response.status === 200) {
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const change_password = async (
        new_password: string,
        user_id: string,
        reset_token: string,
        old_password?: string
    ) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/change-password',
                headers: {
                    Authorization: `Bearer ${token.value}`
                },
                data: {
                    new_password,
                    user_id,
                    reset_token,
                    old_password
                }
            });

            if (response.status === 200) {
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const get_users = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/auth/users',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                users.value = response.data.data;
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const get_user_by_group_id = async (group_id: string) => {
        try {
            const response = await api({
                method: 'GET',
                url: `/auth/users/${group_id}`,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                users_in_group.value = response.data.data;
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    //Support methods
    const get_all_goals = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/goal',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                all_goals.value = response.data.data;
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    const renew_membership = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/membership/renew',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            if (response.status === 200) {
                utilStore.display_notification(
                    response.data.message,
                    'success'
                );
                router.push('/dashboard');
            } else {
                utilStore.display_notification(response.data.message, 'error');
            }
        } catch (error: any) {
            console.error(error);
        }
    };

    //Return the states and methods
    return {
        token,
        user_name,
        user_role,
        user_history,
        all_goals,
        register,
        login,
        logout,
        refresh_token,
        forgot_password,
        change_password,
        get_users,
        get_user_by_group_id,
        get_all_goals,
        renew_membership
    };
});
