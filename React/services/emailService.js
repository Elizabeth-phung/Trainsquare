import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const sendMeetingLink = (payload) => {
    const config = {
        method: 'POST',
        url: `${API_HOST_PREFIX}/api/emails/zoomlink`,
        withCredentials: true,
        crossdomain: true,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

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

export { sendMeetingLink, emailPdf };
