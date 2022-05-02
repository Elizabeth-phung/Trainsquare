import React from 'react';
import { Document, Image, Page, StyleSheet, Text, Link } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        paddingTop: 20,
        textTransform: 'uppercase',
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
        padding: 20,
        maxHeight: '50%',
        maxWidth: '50%',
    },
    text: {
        margin: 12,
        fontSize: 18,
        textAlign: 'justify',
    },
});

function Workshop(props) {
    return (
        <Document
            title={props.data.name}
            author={`${props.data.host.firstName} ${props.data.host.lastName}`}
            subject={props.data.name}
            keywords="Workshop">
            <Page style={styles.page} wrap>
                <Text style={styles.title}>{`${props.data.name} Id#${props.data.id} `}</Text>
                {props.data.imageUrl && <Image style={styles.image} src={props.data.imageUrl} />}
                <Text style={styles.text}>{`Hosted By: ${props.data.host.firstName} ${props.data.host.lastName}`}</Text>
                <Text style={styles.text}>{`Summary: ${props.data.summary}`}</Text>
                <Text style={styles.text}>{`Short Description: ${props.data.shortDescription}`}</Text>
                <Text style={styles.text}>{`This workshop ${props.data.isFree ? 'is free' : 'has a fee.'}`}</Text>
                <Text style={styles.text}>{`Date Start: ${new Date(props.data.dateStart).toLocaleDateString()}`}</Text>
                <Text style={styles.text}>{`Date End: ${new Date(props.data.dateEnd).toLocaleDateString()}`}</Text>
                <Text style={styles.text}>{`Max Sessions: ${
                    props.data.numberOfSessions === 0 ? 'N/A' : props.data.numberOfSessions
                }`}</Text>
                <Link src={props.data.externalSiteUrl}>Link</Link>
            </Page>
        </Document>
    );
}

Workshop.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        summary: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        numberOfSessions: PropTypes.number,
        dateStart: PropTypes.string.isRequired,
        dateEnd: PropTypes.string.isRequired,
        externalSiteUrl: PropTypes.string.isRequired,
        host: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
        isFree: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Workshop;
