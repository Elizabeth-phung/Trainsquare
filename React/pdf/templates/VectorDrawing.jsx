import React from 'react';
import { Document, Canvas, Page, StyleSheet, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    text: {
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    canvas: {
        height: 500,
        width: 500,
    },
});

function VectorDrawing(props) {
    const drawCircle = (pen) => {
        for (let i = 0; i < 150; i++) {
            pen.circle(250, 250, 25)
                .rotate(1 * i, { origin: [250, 200] })
                .stroke('black');
        }
    };
    return (
        <Document title={props.title} author={props.author} subject={props.subject} keywords={props.keywords}>
            <Page style={styles.page} wrap>
                <Text style={styles.text}>Everything Bagel</Text>
                <Canvas style={styles.canvas} paint={drawCircle} />
            </Page>
        </Document>
    );
}

VectorDrawing.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string,
    subject: PropTypes.string,
    keywords: PropTypes.string,
};

export default VectorDrawing;
