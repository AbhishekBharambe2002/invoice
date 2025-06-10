import { useEffect, useState,useCallback  } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem('token');

   const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, [token]);

  const createUser = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
        name,
        email,
        password,
        role,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setName('');
      setEmail('');
      setPassword('');
      setRole('USER');
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { userIds: [id] },
      });
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

 useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#4a90e2' }}>User Dashboard</h2>

      <div style={{ marginBottom: '20px', backgroundColor: '#f0f4f8', padding: '20px', borderRadius: '8px' }}>
        <input
          style={{ margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          style={{ margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          style={{ margin: '5px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px' }}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <select
          style={{ margin: '5px', padding: '10px', borderRadius: '6px' }}
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="USER">User</option>
          <option value="UNIT MANAGER">Unit Manager</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '10px 20px',
            margin: '5px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
          onClick={createUser}
        >
          Create User
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {Array.isArray(users) && users.length > 0 ? (
          users.map(user => (
            <div
              className="card"
              key={user._id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '10px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#333' }}>{user.name}</div>
              <div style={{ fontSize: '14px', color: '#777' }}>{user.role}</div>
              <button
                onClick={() => deleteUser(user._id)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            marginRight: '10px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Prev
        </button>
        <span style={{ fontSize: '16px' }}>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '8px 16px',
            marginLeft: '10px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
