import React from 'react';
import { Text, StyleSheet, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

function PdfTHead(props) {
    const row = props.rowHeader;
    const width = (1 / row.length) * 100;
    const primaryColor = props.primaryColor;

    const styles = StyleSheet.create({
        thead: {
            flexDirection: 'row',
            borderBottomColor: primaryColor,
            backgroundColor: primaryColor,
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            textAlign: 'center',
            fontStyle: 'bold',
            flexGrow: 1,
        },
        th: {
            width: `${width}%`,
        },
    });

    const mapTh = (th, index) => {
        return (
            <Text key={`${th}_${index}`} style={styles.th}>
                {th}
            </Text>
        );
    };

    return <View style={styles.thead}>{row.map(mapTh)}</View>;
}

PdfTHead.propTypes = {
    rowHeader: PropTypes.arrayOf(PropTypes.string).isRequired,
    primaryColor: PropTypes.string,
};

export default React.memo(PdfTHead);
