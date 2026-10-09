import { Document, Page, Text, StyleSheet, View } from '@react-pdf/renderer';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return 'N/A';

  return parsedDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Invoice = ({ order }) => {
  if (!order) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Invoice unavailable</Text>
          <Text style={styles.muted}>
            Order information could not be found.
          </Text>
        </Page>
      </Document>
    );
  }

  const products = order.products || [];
  const payment = order.paymentIntent || {};
  const amountPaid = Number(payment.amount || 0) / 100;

  return (
    <Document
      title={`SHOPLY Invoice ${payment.id || ''}`}
      author="SHOPLY"
      subject="Order Invoice"
    >
      <Page size="A4" style={styles.page} wrap>
        {/* Brand and invoice heading */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.brand}>SHOPLY</Text>
            <Text style={styles.brandCaption}>EVERYDAY, REFINED.</Text>
          </View>

          <View style={styles.invoiceLabel}>
            <Text style={styles.invoiceLabelText}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{payment.id || 'PENDING'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Invoice introduction */}
        <View style={styles.headingSection}>
          <Text style={styles.eyebrow}>ORDER DOCUMENT</Text>
          <Text style={styles.title}>Order invoice.</Text>
          <Text style={styles.subtitle}>
            A summary of your purchase and payment.
          </Text>
        </View>

        {/* Order metadata */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>ORDER DATE</Text>
            <Text style={styles.infoValue}>
              {formatDate(
                payment.created ? payment.created * 1000 : order.createdAt
              )}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>ORDER STATUS</Text>
            <Text style={styles.infoValue}>
              {order.orderStatus || 'Processing'}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>PAYMENT STATUS</Text>
            <Text style={styles.infoValue}>{payment.status || 'Paid'}</Text>
          </View>
        </View>

        {/* Product table */}
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>ITEMS PURCHASED</Text>
          <Text style={styles.itemCount}>
            {products.length} {products.length === 1 ? 'ITEM' : 'ITEMS'}
          </Text>
        </View>

        <View style={styles.table}>
          {/* Table header */}
          <View style={[styles.tableRow, styles.tableHeaderRow]} fixed>
            <Text style={[styles.tableHeader, styles.productColumn]}>
              PRODUCT
            </Text>
            <Text style={[styles.tableHeader, styles.brandColumn]}>BRAND</Text>
            <Text style={[styles.tableHeader, styles.colorColumn]}>COLOR</Text>
            <Text style={[styles.tableHeader, styles.quantityColumn]}>QTY</Text>
            <Text style={[styles.tableHeader, styles.priceColumn]}>PRICE</Text>
          </View>

          {/* Product rows */}
          {products.map((item, index) => {
            const product = item.product || {};

            return (
              <View
                style={styles.tableRow}
                key={item._id || product._id || index}
                wrap={false}
              >
                <View style={styles.productColumn}>
                  <Text style={styles.productName}>
                    {product.title || 'Product'}
                  </Text>
                  <Text style={styles.productId}>
                    {product._id ? `SKU: ${product._id}` : ''}
                  </Text>
                </View>

                <Text style={[styles.tableCell, styles.brandColumn]}>
                  {product.brand || '—'}
                </Text>

                <Text style={[styles.tableCell, styles.colorColumn]}>
                  {product.color || '—'}
                </Text>

                <Text style={[styles.tableCell, styles.quantityColumn]}>
                  {item.quantity || 0}
                </Text>

                <Text style={[styles.tableCell, styles.priceColumn]}>
                  {formatCurrency(product.price)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Payment summary */}
        <View style={styles.summaryContainer} wrap={false}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items</Text>
            <Text style={styles.summaryValue}>
              {products.reduce(
                (total, item) => total + (Number(item.quantity) || 0),
                0
              )}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.totalRow}>
            <View>
              <Text style={styles.totalLabel}>TOTAL PAID</Text>
              <Text style={styles.totalCaption}>
                Amount charged for this order
              </Text>
            </View>

            <Text style={styles.totalAmount}>{formatCurrency(amountPaid)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <View style={styles.footerDivider} />

          <View style={styles.footerRow}>
            <View>
              <Text style={styles.footerBrand}>SHOPLY</Text>
              <Text style={styles.footerText}>
                Thank you for shopping with us.
              </Text>
            </View>

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#F6F5F1',
    paddingTop: 42,
    paddingBottom: 78,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    color: '#171717',
    fontSize: 10,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  brand: {
    fontSize: 23,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
  },

  brandCaption: {
    fontSize: 7,
    letterSpacing: 1.5,
    color: '#77766F',
    marginTop: 5,
  },

  invoiceLabel: {
    alignItems: 'flex-end',
  },

  invoiceLabelText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 2,
  },

  invoiceNumber: {
    fontSize: 7,
    color: '#77766F',
    marginTop: 6,
    maxWidth: 220,
  },

  divider: {
    height: 1,
    backgroundColor: '#BDBBB3',
  },

  headingSection: {
    marginTop: 32,
    marginBottom: 27,
  },

  eyebrow: {
    fontSize: 8,
    letterSpacing: 1.8,
    color: '#77766F',
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontFamily: 'Helvetica',
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 10,
    color: '#77766F',
    marginTop: 9,
  },

  infoGrid: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#D3D2CC',
    paddingVertical: 17,
    marginBottom: 30,
  },

  infoBlock: {
    flex: 1,
    paddingRight: 8,
  },

  infoLabel: {
    fontSize: 7,
    letterSpacing: 1,
    color: '#77766F',
    marginBottom: 8,
  },

  infoValue: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
  },

  sectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.4,
  },

  itemCount: {
    fontSize: 7,
    color: '#77766F',
    letterSpacing: 1,
  },

  table: {
    width: '100%',
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 43,
    borderBottomWidth: 1,
    borderBottomColor: '#D3D2CC',
    paddingVertical: 9,
  },

  tableHeaderRow: {
    minHeight: 28,
    backgroundColor: '#ECEBE5',
    borderTopWidth: 1,
    borderTopColor: '#D3D2CC',
    borderBottomColor: '#BDBBB3',
  },

  tableHeader: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.7,
    color: '#55544F',
    paddingHorizontal: 4,
  },

  tableCell: {
    fontSize: 8,
    color: '#55544F',
    paddingHorizontal: 4,
  },

  productColumn: {
    width: '34%',
    paddingRight: 5,
  },

  brandColumn: {
    width: '19%',
  },

  colorColumn: {
    width: '14%',
  },

  quantityColumn: {
    width: '10%',
    textAlign: 'center',
  },

  priceColumn: {
    width: '23%',
    textAlign: 'right',
  },

  productName: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    lineHeight: 1.4,
  },

  productId: {
    fontSize: 6.5,
    color: '#89877F',
    marginTop: 4,
  },

  summaryContainer: {
    marginTop: 22,
    marginLeft: '45%',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  summaryLabel: {
    fontSize: 9,
    color: '#77766F',
  },

  summaryValue: {
    fontSize: 9,
  },

  summaryDivider: {
    height: 1,
    backgroundColor: '#D3D2CC',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
  },

  totalLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
  },

  totalCaption: {
    fontSize: 7,
    color: '#77766F',
    marginTop: 5,
  },

  totalAmount: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },

  footer: {
    position: 'absolute',
    left: 42,
    right: 42,
    bottom: 27,
  },

  footerDivider: {
    height: 1,
    backgroundColor: '#D3D2CC',
    marginBottom: 12,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  footerBrand: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1.5,
  },

  footerText: {
    fontSize: 7,
    color: '#77766F',
    marginTop: 5,
  },

  pageNumber: {
    fontSize: 7,
    color: '#77766F',
  },

  muted: {
    marginTop: 12,
    color: '#77766F',
    fontSize: 10,
  },
});

export default Invoice;
