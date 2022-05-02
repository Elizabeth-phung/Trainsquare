import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { getById } from '../../services/workShopService';
import Basic from './templates/Basic';
import Sessions from './templates/Sessions';
import WorkShop from './templates/Workshop';
import EmailPdfButton from './EmailPdf';
import Invoice from './templates/Invoice';
import PDFButton from './PDFButton';
import sessionFunctions from '../../services/sessionService';
import './css/pdf.css';

import debug from 'sabio-debug';
const _logger = debug.extend('PdfExample');

function Example() {
    const [workShopData10, setWorkShopData10] = useState();
    const [sessions, setSessions] = useState();
    const [invoiceData] = useState({
        data: {
            invoice: 10,
            discount: 20,
            tax: 7.25,
            fees: 20,
            billTo: {
                firstName: 'Liz',
                lastName: 'Phung',
                email: 'fake@gmail.com',
                street: '101 Fake Street',
                city: 'Fake City',
                zipCode: '12345',
                state: 'CA',
                phoneNumber: '(111) 111-1111',
                appartmentNumber: '12a',
            },
            shipTo: {
                firstName: 'Biz',
                lastName: 'Lee',
                email: 'fake@yahoo.com',
                street: '404 Fake Lane',
                city: 'A City',
                zipCode: '67894',
                state: 'CA',
                phoneNumber: '(222) 222-2222',
            },
            dataTable: [
                { item: 'Workshop License', quantity: 1, price: 100 },
                { item: 'Venue Rental', quantity: 2, price: 250 },
                { item: 'Workshop Supply Rental', quantity: 3, price: 200 },
            ],
        },
    });

    const [basicData] = useState({
        data: {
            user: {
                firstName: 'Liz',
                lastName: 'Phung',
                email: 'eliphu1997@gmail.com',
            },
            title: 'Basic PDF Document',
            heading: 'Heading',
            subheading: 'Subheading',
            text: 'Text Text Text',
            image: 'https://sabio-training.s3-us-west-2.amazonaws.com/0f4f0eef-3fd8-4343-90a8-56cd7863e7fc_Gear-Rant-Game-Family-Plans-1334436001.png',
            dataTable: {
                primaryColor: '#39afd1',
                secondColor: '#a1e6ff',
                heading: 'Example table',
                rowHeader: ['col1', 'col2', 'col3'],
                rows: [
                    ['item1', 'item2', 'item3'],
                    ['item1', 'item2', 'item3'],
                    ['item1', 'item2', 'item3'],
                ],
            },
        },
    });

    useEffect(() => {
        getById(10).then(onWorkShopSuccess10).catch(onWorkshopError);
        sessionFunctions.paginate(0, 10).then(onSessionSuccess).catch(onSessionError);
    }, []);

    const onWorkShopSuccess10 = (resp) => {
        let temp = resp.item;
        setWorkShopData10(temp);
    };

    const onSessionSuccess = (resp) => {
        setSessions(resp.data.item.pagedItems);
    };

    const onWorkshopError = (er) => {
        _logger(er);
    };

    const onSessionError = (er) => {
        _logger(er);
    };

    return (
        <React.Fragment>
            <h1>PDF Examples</h1>

            <div className="row">
                <div className="col">
                    <h3 className="col-lg-3">Invoice</h3>
                    <PDFButton type="invoice" data={invoiceData.data} size="lg" />
                    <EmailPdfButton size="lg" type="invoice" data={invoiceData.data} />
                </div>
                <PDFViewer className="pdf-container">
                    <Invoice data={invoiceData.data} />
                </PDFViewer>
            </div>

            {workShopData10 && (
                <div className="row">
                    <div className="col">
                        <h3 className="col-lg-3">Workshop</h3>
                        <PDFButton type="workshop" data={workShopData10} />
                        <EmailPdfButton type="workshop" data={workShopData10} />
                    </div>
                    <PDFViewer className="pdf-container">
                        <WorkShop data={workShopData10} />
                    </PDFViewer>
                </div>
            )}

            <div className="row">
                <div className="col">
                    <h3 className="col-lg-3">Basic</h3>

                    <PDFButton type="basic" data={basicData.data} />

                    <EmailPdfButton type="basic" data={basicData.data} />
                </div>
                <PDFViewer className="pdf-container">
                    <Basic data={basicData.data} />
                </PDFViewer>
            </div>

            {sessions && (
                <div className="row">
                    <div className="col">
                        <h3 className="col-lg-3">Sessions</h3>
                        <PDFButton type="session" data={sessions} />
                        <EmailPdfButton type="session" data={sessions} />
                    </div>
                    <PDFViewer className="pdf-container">
                        <Sessions data={sessions} />
                    </PDFViewer>
                </div>
            )}
        </React.Fragment>
    );
}

export default Example;
