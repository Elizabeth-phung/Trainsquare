import React from 'react';
import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    page: {
        paddingTop: 50,
        paddingBottom: 65,
        paddingHorizontal: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'extrabold',
        textTransform: 'uppercase',
        textAlign: 'left',
        color: '#3264a8',
    },
    text: {
        fontSize: 12,
        textAlign: 'left',
    },
    bill: {
        fontSize: 20,
        textAlign: 'left',
    },
    billCol: {
        marginTop: 75,
        flexDirection: 'column',
    },
    invoiceCol: {
        flexDirection: 'column',
        textAlign: 'right',
        right: '0px',
        width: 200,
        marginVertical: 30,
        position: 'absolute',
        fontSize: 20,
    },
    shipCol: {
        marginTop: 75,
        flexDirection: 'column',
        marginLeft: 50,
    },
    table: {
        marginTop: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#959696',
    },
    thead: {
        flexDirection: 'row',
        borderBottomColor: '#39afd1',
        backgroundColor: '#a1e6ff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    item: {
        width: `50%`,
    },
    qty: {
        width: `10%`,
    },
    price: {
        width: `20%`,
    },
    total: {
        width: `20%`,
    },
    tr: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
        textAlign: 'center',
        borderBottomColor: '#d1f4ff',
    },
    td: {
        textAlign: 'center',
        fontSize: '12',
    },
    final: {
        flexDirection: 'row',
        fontSize: 30,
        textAlign: 'right',
        right: '0px',
        width: 200,
        position: 'absolute',
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

function Invoice(props) {
    const dataTable = props.data.dataTable;
    const data = props.data;
    const billTo = props.data.billTo;
    const shipTo = props.data.shipTo;

    let itemTtl = [];
    let subTtl = 0;

    dataTable.forEach((element) => {
        let temp = element.quantity * element.price;
        itemTtl.push(temp);
        subTtl += temp;
    });
    let afterTax = ((subTtl + data.fees - data.discount) * data.tax) / 100;
    let ttl = subTtl + afterTax;

    const mapRow = (row, ind) => {
        return (
            <View wrap={false} style={styles.tr} key={row.item}>
                <Text style={styles.item}>{row.item}</Text>
                <Text style={styles.qty}>{row.quantity}</Text>
                <Text style={styles.price}>{`${row.price} AED`}</Text>
                <Text style={styles.total}>{`${itemTtl[ind]} AED`}</Text>
            </View>
        );
    };
    return (
        <Document title={`Invoice# ${data.invoice}`} author="Trainsquare" subject="Invoice" keywords="Invoice">
            <Page style={styles.page} wrap>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.col}>
                        <Text style={styles.title}>Trainsquare</Text>
                        <Text style={styles.text}>Trainsquare Phone #</Text>
                        <Text style={styles.text}>Trainsquare Email</Text>
                        <Text style={styles.text}>Trainsquare Address</Text>
                    </View>
                    <View style={styles.invoiceCol}>
                        <Text>{`Invoice# ${data.invoice}`}</Text>
                        <Text>{`Order Date: ${new Date().toLocaleDateString()}`}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.billCol}>
                        <Text style={styles.bill}>Bill To:</Text>
                        <Text style={styles.text}>{`${billTo.firstName} ${billTo.lastName}`}</Text>
                        <Text style={styles.text}>
                            {billTo.street}
                            {billTo.appartmentNumber && `, ${billTo.appartmentNumber}`}
                        </Text>
                        <Text style={styles.text}>{`${billTo.city}, ${billTo.state} ${billTo.zipCode}`}</Text>
                        <Text style={styles.text}>{billTo.phoneNumber}</Text>
                        <Text style={styles.text}>{`${billTo.email}`}</Text>
                    </View>
                    <View style={styles.shipCol}>
                        <Text style={styles.bill}>Ship To:</Text>
                        <Text style={styles.text}>{`${shipTo.firstName} ${shipTo.lastName}`}</Text>
                        <Text style={styles.text}>
                            {shipTo.street}
                            {shipTo.appartmentNumber && `, ${shipTo.appartmentNumber}`}
                        </Text>
                        <Text style={styles.text}>{`${shipTo.city}, ${shipTo.state} ${shipTo.zipCode}`}</Text>
                        <Text style={styles.text}>{shipTo.phoneNumber}</Text>
                        <Text style={styles.text}>{`${shipTo.email}`}</Text>
                    </View>
                </View>

                <View style={styles.table}>
                    <View wrap={false} style={styles.thead}>
                        <Text style={styles.item}>Item</Text>
                        <Text style={styles.qty}>Qty</Text>
                        <Text style={styles.price}>Price</Text>
                        <Text style={styles.total}>Total</Text>
                    </View>
                    {dataTable.map(mapRow)}

                    <View wrap={false} style={styles.tr}>
                        <Text style={{ width: '100%' }}></Text>
                    </View>
                    <View wrap={false} style={styles.tr}>
                        <Text style={styles.item}></Text>
                        <Text style={styles.qty}></Text>
                        <Text style={styles.price}>SubTotal</Text>
                        <Text style={styles.total}>{`${subTtl} AED`}</Text>
                    </View>
                    <View wrap={false} style={styles.tr}>
                        <Text style={styles.item}></Text>
                        <Text style={styles.qty}></Text>
                        <Text style={styles.price}>Discount</Text>
                        <Text style={styles.total}>{`(${data.discount}) AED`}</Text>
                    </View>
                    <View wrap={false} style={styles.tr}>
                        <Text style={styles.item}></Text>
                        <Text style={styles.qty}></Text>
                        <Text style={styles.price}>Fees</Text>
                        <Text style={styles.total}>{`${data.fees} AED`}</Text>
                    </View>
                    <View wrap={false} style={styles.tr}>
                        <Text style={styles.item}></Text>
                        <Text style={styles.qty}></Text>
                        <Text style={styles.price}>{`Tax (${data.tax}%)`}</Text>
                        <Text style={styles.total}>{`${afterTax} AED`}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.final}>
                        <Text>Total</Text>
                        <Text style={{ paddingLeft: 10 }}>{`${ttl} AED`}</Text>
                    </View>
                </View>

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
}
Invoice.propTypes = {
    data: PropTypes.shape({
        invoice: PropTypes.number.isRequired,
        billTo: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            appartmentNumber: PropTypes.string,
            phoneNumber: PropTypes.string.isRequired,
        }).isRequired,
        shipTo: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            zipCode: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            appartmentNumber: PropTypes.string,
            phoneNumber: PropTypes.string.isRequired,
        }).isRequired,
        discount: PropTypes.number.isRequired,
        tax: PropTypes.number.isRequired,
        fees: PropTypes.number.isRequired,
        dataTable: PropTypes.arrayOf(
            PropTypes.shape({
                item: PropTypes.string,
                quantity: PropTypes.number,
                price: PropTypes.number,
            })
        ).isRequired,
    }),
};

export default Invoice;
