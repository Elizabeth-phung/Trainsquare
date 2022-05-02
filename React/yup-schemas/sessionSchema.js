import * as Yup from "yup";

const sessionValid = Yup.object().shape({
    totalSlots: Yup.number().min(0, "Total slots must be greater than 0"),
    openSlots: Yup.number().min(0, "Total slots must be greater than 0").max(Yup.ref('totalSlots'), 'Open slots cannot be greater than total slots.'),
    date: Yup.date().required('Please pick a date'),
    startTime: Yup.string().required('Please pick a start time.'),
    endTime: Yup.string().required('Please pick an end time.')
})

export default sessionValid;