import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

function PdfTRow(props) {
    const row = props.row;
    const width = (1 / row.length) * 100;
    const secondColor = props.secondColor;
    const styles = StyleSheet.create({
        tr: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            backgroundColor: secondColor,
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',
        },
        td: {
            width: `${width}%`,
            textAlign: 'center',
            fontSize: '12',
        },
    });

    const mapTd = (td, index) => {
        return (
            <Text key={`${td}_${index}`} style={styles.td}>
                {td}
            </Text>
        );
    };
    return <View style={styles.tr}>{row.map(mapTd)}</View>;
}

PdfTRow.propTypes = {
    row: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
    secondColor: PropTypes.string,
};
export default PdfTRow;
