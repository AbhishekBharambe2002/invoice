import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [financialYear, setFinancialYear] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');

  const fetchInvoices = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/invoices?page=${page}&limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInvoices(res.data.invoices);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    }
  }, [page, token]);

  const createInvoice = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/invoices`,
        { number, amount, date, financialYear },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNumber('');
      setAmount('');
      setDate('');
      setFinancialYear('');
      fetchInvoices();
    } catch (err) {
      console.error('Error creating invoice:', err);
      alert(err.response?.data?.message || 'Error creating invoice');
    }
  };

  const deleteInvoice = async (invoiceNumber) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/invoices`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { numbers: [invoiceNumber] },
      });
      fetchInvoices();
    } catch (err) {
      console.error('Error deleting invoice:', err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const styles = {
    container: {
      maxWidth: '700px',
      margin: '40px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      color: '#2c3e50',
    },
    input: {
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#3498db',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginTop: '10px',
    },
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      padding: '15px',
      marginBottom: '15px',
    },
    deleteBtn: {
      backgroundColor: '#e74c3c',
      color: '#fff',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    pagination: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🧾 Invoice Dashboard</h2>

      <input
        placeholder="Invoice Number"
        type="number"
        value={number}
        onChange={e => setNumber(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={styles.input}
      />
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Financial Year (e.g., 2024-25)"
        value={financialYear}
        onChange={e => setFinancialYear(e.target.value)}
        style={styles.input}
      />
      <button onClick={createInvoice} style={styles.button}>Create Invoice</button>

      <div style={{ marginTop: '30px' }}>
        {Array.isArray(invoices) && invoices.length > 0 ? (
          invoices.map(inv => (
            <div style={styles.card} key={inv.number}>
              <div>
                <strong>#{inv.number}</strong> - ₹{inv.amount} - {new Date(inv.date).toLocaleDateString()}<br />
                <small>FY: {inv.financialYear} | Created by: {inv.createdBy}</small>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => deleteInvoice(inv.number)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No invoices found.</p>
        )}
      </div>

      <div style={styles.pagination}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{ ...styles.button, backgroundColor: '#95a5a6' }}
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{ ...styles.button, backgroundColor: '#2ecc71' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceDashboard;
