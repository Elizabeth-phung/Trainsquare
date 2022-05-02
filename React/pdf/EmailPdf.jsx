import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Invoice from './templates/Invoice';
import Basic from './templates/Basic';
import Sessions from './templates/Sessions';
import Workshop from './templates/Workshop';
import { emailPdf } from '../../services/emailService';
import toastr from '../../utils/toastr';
import { pdf } from '@react-pdf/renderer';
import classNames from 'classnames';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './css/pdf-icon.css';
import emailPdfSchema from '../../schema/emailPdfSchema';

function EmailPdfButton({ data, type, size }) {
    const [emailForm] = useState({
        to: '',
        subject: '',
        body: '',
    });

    //If you need a more specific Pdf, create one in templates folder and add it to the switch case.
    const handlePdfClicked = async (data, type, values) => {
        let pdfElement = null;
        let fileName = '';
        switch (type) {
            case 'invoice':
                fileName = 'Invoice';
                pdfElement = <Invoice data={data} />;
                break;
            case 'session':
                fileName = 'Sessions';
                pdfElement = <Sessions data={data} />;
                break;
            case 'workshop':
                fileName = data.name;
                pdfElement = <Workshop data={data} />;
                break;
            default:
                fileName = 'Template';
                pdfElement = <Basic data={data} />;
        }
        const blob = await pdf(pdfElement).toBlob();
        email(blob, fileName, values);
    };

    const email = (pdf, fileName, values) => {
        let temp = {
            to: values.to,
            subject: values.subject,
            body: values.body,
        };
        const aBlob = new Blob([JSON.stringify(temp)], { type: 'application/json' });
        let form = new FormData();
        form.append('pdf', pdf, `${fileName}.pdf`);
        form.append('requestModel', aBlob);
        emailPdf(form).then(onSuccess).catch(onError);
    };

    const onSuccess = () => {
        toastr.success('An email will be sent to you shortly.');
    };

    const onError = () => {
        toastr.error('Something went wrong. Please try again later.');
    };

    const iconSize = (size) => {
        if (size === 'lg') {
            return 'icon-large';
        } else if (size === 'sm') {
            return 'icon-sm';
        } else {
            return 'icon-med';
        }
    };

    const onSubmit = (values) => {
        handlePdfClicked(data, type, values);
    };

    const pop = (
        <Popover>
            <Popover.Header>Email your PDF</Popover.Header>
            <Popover.Body>
                <Formik
                    enableReinitialize={true}
                    initialValues={emailForm}
                    onSubmit={onSubmit}
                    validationSchema={emailPdfSchema}>
                    <Form>
                        <label htmlFor="to">Send To:</label>
                        <Field name="to" type="email" className="form-control" />
                        <ErrorMessage name="to" component="div" style={{ color: 'red' }} />

                        <label htmlFor="subject">Subject</label>
                        <Field name="subject" type="text" className="form-control" />
                        <ErrorMessage name="subject" component="div" style={{ color: 'red' }} />

                        <label htmlFor="body">Message</label>
                        <Field name="body" type="text" className="form-control" />
                        <ErrorMessage name="body" component="div" style={{ color: 'red' }} />

                        <button type="submit" className="btn btn-primary mt-2">
                            Send
                        </button>
                    </Form>
                </Formik>
            </Popover.Body>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="click" placement="right" overlay={pop}>
            <i className={classNames('mdi', 'mdi-email', iconSize(size))} style={{ color: '#0acf97' }} />
        </OverlayTrigger>
    );
}

EmailPdfButton.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.shape({
            name: PropTypes.string,
        }),
        PropTypes.arrayOf(PropTypes.shape({})),
    ]),
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
};
export default EmailPdfButton;
