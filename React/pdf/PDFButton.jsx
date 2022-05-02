import React from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from './templates/Invoice';
import Basic from './templates/Basic';
import Sessions from './templates/Sessions';
import Workshop from './templates/Workshop';
import classNames from 'classnames';
import './css/pdf-icon.css';

const handlePdfClicked = (data, type) => {
    let pdfElement = null;
    switch (type) {
        case 'invoice':
            pdfElement = <Invoice data={data} />;
            break;
        case 'session':
            pdfElement = <Sessions data={data} />;
            break;
        case 'workshop':
            pdfElement = <Workshop data={data} />;
            break;
        default:
            pdfElement = <Basic data={data} />;
    }
    return pdfElement;
};

//If you need a more specific Pdf, create one in templates folder and add it to the switch case.
const handleFileName = (data, type) => {
    let fileName = '';
    switch (type) {
        case 'invoice':
            fileName = `Invoice ${data.invoice}`;
            break;
        case 'session':
            fileName = `Sessions Table`;
            break;
        case 'workshop':
            fileName = `${data.name} Workshop`;
            break;
        default:
            fileName = 'Template';
    }
    return fileName;
};

function PDFButton(props) {
    const iconSize = () => {
        if (props.size === 'lg') {
            return 'icon-large';
        } else if (props.size === 'sm') {
            return 'icon-sm';
        } else {
            return 'icon-med';
        }
    };
    return (
        <PDFDownloadLink
            fileName={handleFileName(props.data, props.type)}
            document={handlePdfClicked(props.data, props.type)}>
            {({ loading }) =>
                loading ? (
                    <i className={classNames('mdi', 'mdi-cancel', iconSize())} style={{ color: '#d54e69' }} />
                ) : (
                    <i className={classNames('mdi', 'mdi-download', iconSize())} style={{ color: '#0acf97' }} />
                )
            }
        </PDFDownloadLink>
    );
}

PDFButton.propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({})), PropTypes.shape({})]).isRequired,
    type: PropTypes.string.isRequired,
    size: PropTypes.string,
};

export default PDFButton;
