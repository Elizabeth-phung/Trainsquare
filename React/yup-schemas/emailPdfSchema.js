import * as Yup from "yup";

const emailPdfSchema = Yup.object().shape({
    to: Yup.string().email("Must be a valid email.").required('Please enter an email.'),
    subject: Yup.string().required('Please enter a subject.'),
    body: Yup.string().required('Please enter a message.'),
})

export default emailPdfSchema;