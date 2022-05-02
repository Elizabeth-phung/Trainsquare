import React from 'react';
import { Document, Page, StyleSheet } from '@react-pdf/renderer';
import PdfTable from '../PdfTable';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
});

function Sessions(props) {
    var rowArrays = [];
    const rowHeaderArray = ['Date', 'Start', 'End', 'Total', 'Open'];

    let temp = props.data;
    temp.forEach((element) => {
        let tempStart = new Date();
        tempStart.setHours(element.startTime.slice(0, 2), element.startTime.slice(3, 5), element.startTime.slice(6));
        let tempEnd = new Date();
        tempEnd.setHours(element.endTime.slice(0, 2), element.endTime.slice(3, 5), element.endTime.slice(6));

        let newDate = new Date(element.date).toLocaleDateString();
        let newStart = tempStart.toLocaleTimeString();
        let newEnd = tempEnd.toLocaleTimeString();

        rowArrays.push([newDate, newStart, newEnd, element.totalSlots, element.openSlots]);
    });

    return (
        <Document title="Sessions" author="Trainsquare" subject="Sessions" keywords="Sessions, PDF">
            <Page style={styles.page} wrap>
                <PdfTable
                    primaryColor="#39afd1"
                    secondColor="#a1e6ff"
                    rowHeader={rowHeaderArray}
                    rows={rowArrays}
                    heading="Sessions"
                />
            </Page>
        </Document>
    );
}

Sessions.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            totalSlots: PropTypes.number.isRequired,
            openSlots: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
        })
    ),
};

export default Sessions;
