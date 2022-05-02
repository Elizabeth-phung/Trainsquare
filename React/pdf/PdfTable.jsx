import React from 'react';
import { StyleSheet, View, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';
import PdfTHead from './PdfTHead';
import PdfTRow from './PdfTRow';

function PdfTable(props) {
    const primaryColor = props.primaryColor;
    const secondColor = props.secondColor;
    const rowHeader = props.rowHeader;
    const rows = props.rows;
    const heading = props.heading;

    const styles = StyleSheet.create({
        table: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderWidth: 1,
        },
        heading: {
            fontSize: 20,
            paddingTop: 20,
            textTransform: 'uppercase',
            textAlign: 'center',
        },
    });

    const mapRows = (row, index) => {
        return <PdfTRow key={index} row={row} secondColor={secondColor} />;
    };
    return (
        <React.Fragment>
            <Text style={styles.heading}>{heading}</Text>
            <View wrap={false} style={styles.table}>
                <PdfTHead primaryColor={primaryColor} rowHeader={rowHeader} />
                {rows.map(mapRows)}
            </View>
        </React.Fragment>
    );
}

PdfTable.propTypes = {
    primaryColor: PropTypes.string,
    secondColor: PropTypes.string,
    heading: PropTypes.string,
    rowHeader: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};
export default PdfTable;
