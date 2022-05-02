import React from 'react';
import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import PdfTable from '../PdfTable';
import PropTypes from 'prop-types';

function Basic(props) {
    const dataTable = props.data.dataTable;

    const styles = StyleSheet.create({
        page: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 30,
            fontWeight: 'extrabold',
            marginBottom: 10,
            paddingTop: 20,
            textTransform: 'uppercase',
            textAlign: 'center',
        },
        image: {
            marginVertical: 10,
            marginHorizontal: 100,
            padding: 20,
            maxHeight: '100%',
            maxWidth: '100%',
        },
        text: {
            margin: 5,
            fontSize: 15,
            textAlign: 'justify',
        },
        heading: {
            fontSize: 25,
            marginBottom: 5,
            paddingTop: 5,
            textAlign: 'center',
        },
        subheading: {
            fontSize: 20,
            paddingTop: 5,
            fontStyle: 'italic',
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
        },
    });
    return (
        <Document
            title="Basic PDF Document"
            author={`${props.data.user.firstName} ${props.data.user.lastName}`}
            subject="PDF Example Template"
            keywords="Pdf, template">
            <Page style={styles.page} wrap>
                {props.data && (
                    <View>
                        <Text style={styles.title}>{props.data.title}</Text>
                        <Text style={styles.heading}>{props.data.heading}</Text>
                        <Image style={styles.image} src={props.data.image} />
                        <Text style={styles.subheading}>{props.data.subheading}</Text>
                        <Text style={styles.text}>{props.data.text}</Text>
                    </View>
                )}

                <PdfTable
                    primaryColor={dataTable.primaryColor}
                    secondColor={dataTable.secondColor}
                    rowHeader={dataTable.rowHeader}
                    rows={dataTable.rows}
                    heading={dataTable.heading}
                />

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
}

Basic.propTypes = {
    data: PropTypes.shape({
        user: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
        }),
        title: PropTypes.string.isRequired,
        heading: PropTypes.string.isRequired,
        subheading: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        dataTable: PropTypes.shape({
            primaryColor: PropTypes.string,
            secondColor: PropTypes.string,
            heading: PropTypes.string,
            rowHeader: PropTypes.arrayOf(PropTypes.string).isRequired,
            rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
                .isRequired,
        }).isRequired,
    }),
};

export default Basic;
