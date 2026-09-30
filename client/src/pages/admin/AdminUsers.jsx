import React, { useState, useEffect } from 'react';
import { Search, Shield, User } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminService.getUsers({ search });
      if (res.data?.users) setUsers(res.data.users);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleRoleToggle = async (userId, currentRole) => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!window.confirm(`Change role to ${nextRole}?`)) return;
    try {
      await adminService.updateUserRole(userId, nextRole);
      fetchUsers();
    } catch (err) {
      alert(err.message || 'Error updating user role');
    }
  };

  if (loading && !search) return <LoadingSpinner text="Fetching User Accounts..." />;

  return (
    <div className="admin-users-page">
      <div className="filter-bar glass-card" style={{ padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#181c28', padding: '0.4rem 0.8rem', borderRadius: '8px', width: '300px' }}>
          <Search size={18} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'none', border: 'none', color: '#fff', outline: 'none', width: '100%' }}
          />
        </div>
        <span>Total Registered Users: {users.length}</span>
      </div>

      <div className="glass-card table-card" style={{ padding: '1.5rem' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders / Courses</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="font-bold">{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>{u._count?.orders || 0} Orders / {u._count?.enrollments || 0} Courses</td>
                <td>
                  <span className={`role-chip ${u.role === 'ADMIN' ? 'admin' : 'user'}`}>
                    {u.role}
                  </span>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleRoleToggle(u.id, u.role)} className="role-btn">
                    Set as {u.role === 'ADMIN' ? 'USER' : 'ADMIN'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .role-chip { padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 800; }
        .role-chip.admin { background: rgba(255, 0, 85, 0.2); color: var(--accent-red); border: 1px solid var(--accent-red); }
        .role-chip.user { background: rgba(0, 240, 255, 0.15); color: var(--accent-cyan); }
        .role-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); color: #fff; padding: 0.3rem 0.6rem; border-radius: 6px; font-size: 0.8rem; }
      `}</style>
    </div>
  );
};
