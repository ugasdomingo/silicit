//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/axios';
import { useUserStore } from './user-store';

//Define the store
export const usePlatziStore = defineStore('platzi', () => {
    //General states
    const userStore = useUserStore();
    const platzi_group = ref('');

    //General methods
    const get_platzi_group = async () => {
        const user_in_platzi = userStore.user_history?.points_won.find(
            (point) => point.reason === 'Unirse a un Grupo para Platzi Family'
        );

        if (user_in_platzi) {
            const response = await api({
                method: 'GET',
                url: '/group/user',
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            });
            return (platzi_group.value = response.data.data.number);
        } else {
            return (platzi_group.value = '');
        }
    };

    const join_platzi_group = async () => {
        const user_in_platzi = userStore.user_history?.points_won.find(
            (point) => point.reason === 'Unirse a un Grupo para Platzi Family'
        );

        if (!user_in_platzi) {
            const response = await api({
                method: 'POST',
                url: '/group/add-member',
                headers: {
                    Authorization: `Bearer ${userStore.token}`
                }
            });
            return (platzi_group.value = response.data.data.number);
        } else {
            return (platzi_group.value = '');
        }
    };

    //Return the states and methods
    return {
        platzi_group,
        get_platzi_group,
        join_platzi_group
    };
});
