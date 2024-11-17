//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IEvent } from '@/interfaces/IEvent';
import { IJob } from '@/interfaces/IJobs';

//Define the store
export const useUtilStore = defineStore('utils', () => {
    //General states
    const loading = ref(false);
    const membership_register = ref('Free');

    //Display Messages states
    const message = ref('');
    const message_type = ref('');
    const show_notification = ref(false);
    const show_modal = ref(false);
    const modal_type = ref('');
    const modal_data = ref<IEvent | IJob | null>(null);

    //General methods
    const start_loading = () => {
        loading.value = true;
    };

    const stop_loading = () => {
        loading.value = false;
    };

    const open_modal = (type: string, data?: IEvent | IJob) => {
        show_modal.value = true;
        modal_type.value = type;
        modal_data.value = data || null;
    };

    const close_modal = () => {
        show_modal.value = false;
        modal_type.value = '';
        modal_data.value = null;
    };

    const display_notification = (information: string, type: string) => {
        message.value = information;
        message_type.value = type;
        show_notification.value = true;
        setTimeout(() => {
            show_notification.value = false;
        }, 6500);
    };

    //Return the states and methods
    return {
        loading,
        membership_register,
        message,
        message_type,
        show_notification,
        show_modal,
        modal_type,
        modal_data,
        start_loading,
        stop_loading,
        open_modal,
        close_modal,
        display_notification
    };
});
