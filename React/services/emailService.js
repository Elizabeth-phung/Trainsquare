import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const emailPdf = payload => {
    const config = {
        method: 'POST',
        url: `${API_HOST_PREFIX}/api/emails/sendpdf`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { emailPdf };
