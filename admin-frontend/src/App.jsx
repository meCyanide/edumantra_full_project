import { useEffect, useMemo, useState } from 'react';
import './App.css';
import AuthPage from './AuthPage';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const API_BASE = `${import.meta.env.VITE_API_BASE_URL || 'http://3.111.191.254:8080'}/api`;
const AUTH_COOKIE_NAME = 'edumantra_user';

function readAuth() {
  try {
    const saved = localStorage.getItem('edumantra_user');
    if (saved) return JSON.parse(saved);

    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${AUTH_COOKIE_NAME}=`));

    if (!cookieValue) return null;
    const encoded = cookieValue.split('=')[1];
    return encoded ? JSON.parse(decodeURIComponent(encoded)) : null;
  } catch {
    return null;
  }
}

function clearAuthCookie() {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

function App() {
  const [auth, setAuth] = useState(readAuth);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [dashboard, setDashboard] = useState(null);
  const [classes, setClasses] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [classModal, setClassModal] = useState({ isOpen: false, data: null });
  const [userModal, setUserModal] = useState({ isOpen: false, data: null });
  const [overviewDays] = useState(30);

  const [urlShortenForm, setUrlShortenForm] = useState({ originalUrl: '', customAlias: '' });
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const role = auth?.role?.toLowerCase();
  const type = auth?.type?.toLowerCase();
  const isSuperUser = type === 'superuser';
  const isAdminRole = role === 'admin' || role === 'superadmin' || isSuperUser;
  const canEditClasses = isAdminRole || role === 'teacher';
  const canEditUsers = isSuperUser || role === 'admin' || role === 'superadmin';

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4500);
  };

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.token}`,
  });

  const handleLogout = () => {
    localStorage.removeItem('edumantra_user');
    clearAuthCookie();
    setAuth(null);
    setDashboard(null);
    setClasses([]);
    setPendingUsers([]);
  };

  const goToSignIn = () => {
    localStorage.removeItem('edumantra_user');
    clearAuthCookie();
    setAuth(null);
    setDashboard(null);
    setClasses([]);
    setPendingUsers([]);
  };

  const loadData = async () => {
    if (!auth?.token) return;
    try {
      if (isAdminRole) {
        const res = await fetch(`${API_BASE}/admin/dashboard`, { headers: authHeaders() });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to load dashboard');
        setDashboard(data);
        setClasses(data.classes || []);
      } else {
        const classRes = await fetch(`${API_BASE}/classdetails`, { headers: authHeaders() });
        const classData = await classRes.json();
        if (!classRes.ok) throw new Error(classData.error || 'Failed to load classes');
        setClasses(classData);
      }
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const loadPending = async () => {
    if (!auth?.token || !isAdminRole) return;
    try {
      const res = await fetch(`${API_BASE}/admin/pending`, { headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load pending users');
      setPendingUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  useEffect(() => {
    if (!auth?.token) return;
    const id = setTimeout(() => {
      loadData();
      loadPending();
    }, 0);
    return () => clearTimeout(id);
  }, [auth?.token, role]);

  const saveClass = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));
    payload.classTime = new Date(payload.classTime).toISOString();
    const isEdit = Boolean(classModal.data);
    const url = isEdit ? `${API_BASE}/classdetails/${classModal.data.classid}` : `${API_BASE}/classdetails`;
    try {
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save class');
      showMessage('Class saved');
      setClassModal({ isOpen: false, data: null });
      loadData();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const deleteClass = async (id) => {
    if (!window.confirm('Delete this class schedule?')) return;
    const res = await fetch(`${API_BASE}/classdetails/${id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) {
      showMessage('Class deleted');
      loadData();
    } else {
      const data = await res.json();
      showMessage(data.error || 'Delete failed', 'error');
    }
  };

  const saveUser = async (event) => {
    event.preventDefault();
    const payload = Object.fromEntries(new FormData(event.target));
    if (!userModal.data) return;
    const userType = userModal.data.type?.toLowerCase();
    const url = `${API_BASE}/admin/users/${userType}/${userModal.data.id}`;
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save user');
      showMessage('User updated');
      setUserModal({ isOpen: false, data: null });
      loadData();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.role} ${user.name}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE}/admin/users/${user.type.toLowerCase()}/${user.id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed');
      showMessage(data.message || 'User deleted');
      loadData();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const approveUser = async (user) => {
    try {
      const res = await fetch(`${API_BASE}/admin/approve/${user.type}/${user.id}`, {
        method: 'POST',
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Approval failed');
      showMessage(data.message || 'User approved');
      loadPending();
      loadData();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const rejectUser = async (user) => {
    if (!window.confirm(`Reject and delete the pending account for ${user.name}?`)) return;
    try {
      const res = await fetch(`${API_BASE}/admin/reject/${user.type}/${user.id}`, {
        method: 'POST',
        headers: authHeaders(),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Rejection failed');
      showMessage(data.message || 'User rejected');
      loadPending();
      loadData();
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const handleUrlShorten = (e) => {
    e.preventDefault();
    const shortUrl = 'https://edu.m/' + (urlShortenForm.customAlias || Math.random().toString(36).substring(7));
    setShortenedUrls([{ original: urlShortenForm.originalUrl, short: shortUrl }, ...shortenedUrls]);
    setUrlShortenForm({ originalUrl: '', customAlias: '' });
    showMessage('URL Shortened Successfully');
  };

  const rows = useMemo(() => {
    const q = (searchQuery || '').toLowerCase();
    const users = [...(dashboard?.superusers || []), ...(dashboard?.users || [])].map(u => {
      if (u.userid) return { id: u.userid, name: u.username, emailid: u.useremailid, phonenumber: u.userphonenumber, role: u.userrole, activeflag: u.useractiveFlag, createdate: u.usercreateTs, type: 'user' };
      if (u.superusersid) return { id: u.superusersid, name: u.superusersname, emailid: u.superusersemailid, phonenumber: u.superusersphoneno, role: u.superusersrole, activeflag: u.superusersactiveflag, createdate: u.superusersrequestdate, type: 'superuser' };
      return u;
    });

    const source = { users, classes }[activeTab] || [];

    return source.filter((item) => {
      if (q && !JSON.stringify(item).toLowerCase().includes(q)) return false;
      if (activeTab === 'users') {
        if (filters.role && filters.role !== 'all' && String(item.role || '').toLowerCase() !== filters.role) return false;
      }
      if (activeTab === 'classes') {
        if (filters.teacher && filters.teacher !== 'all' && String(item.teacherName || '').toLowerCase() !== filters.teacher) return false;
        if (filters.dateFrom) {
          const d = new Date(item.classTime).toISOString().slice(0, 10);
          if (d < filters.dateFrom) return false;
        }
        if (filters.dateTo) {
          const d = new Date(item.classTime).toISOString().slice(0, 10);
          if (d > filters.dateTo) return false;
        }
      }
      return true;
    });
  }, [activeTab, classes, dashboard, searchQuery, filters]);

  // ── Not authenticated ────────────────────────────────────────────────────

  if (!auth) {
    return <AuthPage setAuth={setAuth} />;
  }

  // ── Authenticated ────────────────────────────────────────────────────────

  return (
    <div className="portal-layout">
      <header className="glass-panel main-header">
        <div className="header-logo"><span className="logo-icon">EM</span><h1>Edumantra Services</h1></div>
        <div className="header-profile">
          <div className="profile-info">
            <span className="username">{auth.name}</span>
            <span className={`badge badge-${role}`}>{role}</span>
            {pendingUsers.length > 0 && isAdminRole && (
              <span
                className="badge badge-admin"
                style={{ background: '#f59e0b', color: '#fff', cursor: 'pointer' }}
                onClick={() => setActiveTab('approvals')}
                title="Pending approvals"
              >
                {pendingUsers.length} Pending
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={goToSignIn} className="btn btn-secondary logout-btn">Back</button>
            <button onClick={handleLogout} className="btn btn-secondary logout-btn">Log Out</button>
          </div>
        </div>
      </header>
      <main className="portal-content animate-fade-in">
        {message.text && <div className={`alert-box alert-${message.type}`}>{message.text}</div>}
        {isAdminRole && dashboard?.stats && <Stats stats={dashboard.stats} onPendingClick={() => setActiveTab('approvals')} />}
        <div className="dashboard-controls">
          <div className="tabs-container glass-panel">
            {isAdminRole && <Tab id="overview" activeTab={activeTab} setActiveTab={setActiveTab}>Overview</Tab>}
            {isAdminRole && <Tab id="users" activeTab={activeTab} setActiveTab={setActiveTab}>Users</Tab>}
            <Tab id="classes" activeTab={activeTab} setActiveTab={setActiveTab}>Classes</Tab>
            {isAdminRole && <Tab id="approvals" activeTab={activeTab} setActiveTab={setActiveTab}>
              Approvals{pendingUsers.length > 0 && <span style={{ marginLeft: 6, background: '#f59e0b', color: '#fff', borderRadius: '9999px', fontSize: '0.7rem', padding: '1px 7px' }}>{pendingUsers.length}</span>}
            </Tab>}
            {isAdminRole && <Tab id="urlshorten" activeTab={activeTab} setActiveTab={setActiveTab}>URL Shorten</Tab>}
          </div>
          <div className="actions-row">
            {(activeTab === 'users' || activeTab === 'classes') && (
              <Filters activeTab={activeTab} searchQuery={searchQuery} setSearchQuery={setSearchQuery} filters={filters} setFilters={setFilters} classes={classes} />
            )}
            {canEditClasses && activeTab === 'classes' && <button className="btn btn-primary" onClick={() => setClassModal({ isOpen: true, data: null })}>Add Class</button>}
          </div>
        </div>
        <section className="glass-panel data-card">
          {activeTab === 'overview' && <ActivityView dashboard={dashboard} days={overviewDays} classes={classes} />}
          {activeTab === 'users' && <Users rows={rows} role={role} canEdit={canEditUsers} onEdit={(data) => setUserModal({ isOpen: true, data })} onDelete={deleteUser} />}
          {activeTab === 'classes' && <Classes rows={rows} canEdit={canEditClasses} canDelete={isAdminRole} onEdit={(data) => setClassModal({ isOpen: true, data })} onDelete={deleteClass} />}
          {activeTab === 'approvals' && <Approvals rows={pendingUsers} onApprove={approveUser} onReject={rejectUser} />}
          {activeTab === 'urlshorten' && (
            <div className="url-shorten-container">
              <div className="url-shortener-card">
                <div className="url-shortener-header">
                  <div>
                    <p className="eyebrow">Tools</p>
                    <h2>URL Shortener</h2>
                  </div>
                  <div className="chip">Fast links</div>
                </div>
                <form onSubmit={handleUrlShorten} className="url-shortener-form">
                  <input type="url" placeholder="Paste your long URL here" required className="form-input url-input" value={urlShortenForm.originalUrl} onChange={e => setUrlShortenForm({ ...urlShortenForm, originalUrl: e.target.value })} />
                  <input type="text" placeholder="Custom Alias (optional)" className="form-input alias-input" value={urlShortenForm.customAlias} onChange={e => setUrlShortenForm({ ...urlShortenForm, customAlias: e.target.value })} />
                  <button type="submit" className="btn btn-primary shorten-btn">Shorten</button>
                </form>
              </div>
              <div className="table-container">
                <table className="portal-table">
                  <thead><tr><th>Original URL</th><th>Shortened URL</th><th>Action</th></tr></thead>
                  <tbody>
                    {shortenedUrls.map((url, i) => (
                      <tr key={i}>
                        <td><a href={url.original} target="_blank" rel="noreferrer" style={{ color: '#6366f1' }}>{url.original}</a></td>
                        <td><a href={url.short} target="_blank" rel="noreferrer" style={{ color: '#10b981', fontWeight: 'bold' }}>{url.short}</a></td>
                        <td><button className="btn btn-secondary btn-sm" onClick={() => { navigator.clipboard.writeText(url.short); showMessage('Copied!'); }}>Copy</button></td>
                      </tr>
                    ))}
                    {shortenedUrls.length === 0 && <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>No URLs shortened yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
      {classModal.isOpen && <ClassModal data={classModal.data} onClose={() => setClassModal({ isOpen: false, data: null })} onSave={saveClass} />}
      {userModal.isOpen && <UserModal data={userModal.data} onClose={() => setUserModal({ isOpen: false, data: null })} onSave={saveUser} />}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────

function Tab({ id, activeTab, setActiveTab, children }) {
  return <button className={`tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => setActiveTab(id)}>{children}</button>;
}

function Stats({ stats, onPendingClick }) {
  const items = [
    ['Total Users', stats.totalUsers],
    ['Superusers', stats.totalSuperusers],
    ['Classes', stats.totalClassDetails],
    ['Pending Approvals', stats.pendingApprovals],
  ];
  return (
    <div>
      <div className="stats-header">Dashboard</div>
      <div className="stats-grid">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="glass-panel stat-card"
            onClick={label === 'Pending Approvals' && value > 0 ? onPendingClick : undefined}
            style={label === 'Pending Approvals' && value > 0 ? { cursor: 'pointer', borderColor: '#f59e0b' } : {}}
          >
            <span>{label}</span>
            <strong style={label === 'Pending Approvals' && value > 0 ? { color: '#f59e0b' } : {}}>{value || 0}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityView({ dashboard, days, classes }) {
  if (!dashboard) return <p className="no-data">Loading dashboard...</p>;
  return (
    <div>
      <OverviewCharts dashboard={dashboard} days={days} classes={classes} />
      <h3 className="section-title">Recent Classes</h3>
      <JsonTable rows={classes.slice(0, 10).map(c => ({ id: c.classid, subject: c.subjectName, teacher: c.teacherName, time: new Date(c.classTime).toLocaleString() }))} empty="No classes yet." />
    </div>
  );
}

function OverviewCharts({ dashboard, days = 30, classes = [] }) {
  const stats = dashboard.stats || {};

  const datesMap = {};
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days + 1);
  classes.forEach((c) => {
    const dt = new Date(c.classTime);
    if (isNaN(dt) || dt < cutoff) return;
    const d = dt.toISOString().slice(0, 10);
    datesMap[d] = (datesMap[d] || 0) + 1;
  });
  const dateLabels = Object.keys(datesMap).sort();
  const classesLine = {
    labels: dateLabels.length ? dateLabels : ['No recent classes'],
    datasets: [{
      label: 'Classes per day',
      data: dateLabels.length ? dateLabels.map((d) => datesMap[d] || 0) : [0],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.2)',
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  return (
    <div className="chart-card glass-panel">
      <div className="chart-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h4>Classes Over Time</h4>
        </div>
        <div className="chip">{stats.totalClassDetails || 0} classes</div>
      </div>
      <Line data={classesLine} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { color: '#94a3b8' } }, x: { ticks: { color: '#94a3b8' } } } }} />
    </div>
  );
}

function Users({ rows, canEdit, onEdit, onDelete }) {
  if (!rows.length) return <p className="no-data">No users found.</p>;
  return (
    <div className="table-container">
      <table className="portal-table">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Type</th><th>Active</th><th>Action</th></tr></thead>
        <tbody>
          {rows.map((u) => (
            <tr key={`${u.type}-${u.id}`}>
              <td>#{u.id}</td><td>{u.name}</td><td>{u.emailid}</td><td>{u.phonenumber}</td>
              <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
              <td><span className="badge badge-superadmin">{u.type}</span></td>
              <td>{u.activeflag}</td>
              <td>
                <div className="actions-cell">
                  {canEdit && <button className="btn btn-primary btn-sm" onClick={() => onEdit(u)}>Edit</button>}
                  {canEdit && <button className="btn btn-danger btn-sm" onClick={() => onDelete(u)}>Delete</button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Classes({ rows, canEdit, canDelete, onEdit, onDelete }) {
  if (!rows.length) return <p className="no-data">No class schedules found.</p>;
  return (
    <div className="table-container">
      <table className="portal-table">
        <thead><tr><th>ID</th><th>Subject</th><th>Teacher</th><th>Days</th><th>Time</th><th>Link</th>{canEdit && <th>Actions</th>}</tr></thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.classid}>
              <td>#{c.classid}</td><td>{c.subjectName}</td><td>{c.teacherName}</td><td>{c.classDays}</td>
              <td>{new Date(c.classTime).toLocaleString()}</td>
              <td>{c.classJoinlink ? <div className="flex gap-2 items-center"><a href={c.classJoinlink} target="_blank" rel="noreferrer">{c.classJoinlink}</a><a href={c.classJoinlink} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm ml-2">Open</a></div> : '-'}</td>
              {canEdit && <td><div className="actions-cell"><button className="btn btn-secondary btn-sm" onClick={() => onEdit(c)}>Edit</button>{canDelete && <button className="btn btn-danger btn-sm" onClick={() => onDelete(c.classid)}>Delete</button>}</div></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Approvals({ rows, onApprove, onReject }) {
  if (!rows.length) return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
      <p className="no-data">No pending approvals. All caught up!</p>
    </div>
  );
  return (
    <div>
      <h3 className="section-title" style={{ marginBottom: '1rem' }}>Pending Account Approvals</h3>
      <div className="table-container">
        <table className="portal-table">
          <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Requested Role</th><th>Requested On</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={`pending-${u.id}`}>
                <td>#{u.id}</td>
                <td>{u.name}</td>
                <td>{u.emailid}</td>
                <td>{u.phonenumber}</td>
                <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                <td>{u.createdate ? new Date(u.createdate).toLocaleString() : '-'}</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => onApprove(u)}
                      style={{ background: '#10b981', borderColor: '#10b981' }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onReject(u)}
                    >
                      ✕ Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function JsonTable({ rows, empty }) {
  if (!rows.length) return <p className="no-data">{empty}</p>;
  const keys = Object.keys(rows[0]).filter((k) => typeof rows[0][k] !== 'object');
  return (
    <div className="table-container">
      <table className="portal-table">
        <thead><tr>{keys.map((k) => <th key={k}>{k}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={row.id || index}>{keys.map((k) => <td key={k}>{String(row[k] ?? '')}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function Filters({ activeTab, searchQuery, setSearchQuery, filters, setFilters, classes }) {
  const handle = (k, v) => setFilters((p) => ({ ...p, [k]: v }));
  const clear = () => { setSearchQuery(''); setFilters({}); };
  const teacherOptions = Array.from(new Set((classes || []).map((c) => (c.teacherName || '').toLowerCase()))).filter(Boolean);

  return (
    <div className="filters-row">
      <input className="form-input search-bar" placeholder={`Search ${activeTab}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {activeTab === 'users' && (
        <select className="form-select" value={filters.role || 'all'} onChange={(e) => handle('role', e.target.value)}>
          <option value="all">All roles</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      )}
      {activeTab === 'classes' && (
        <>
          <select className="form-select" value={filters.teacher || 'all'} onChange={(e) => handle('teacher', e.target.value)}>
            <option value="all">All teachers</option>
            {teacherOptions.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <input className="form-input" type="date" value={filters.dateFrom || ''} onChange={(e) => handle('dateFrom', e.target.value)} />
          <input className="form-input" type="date" value={filters.dateTo || ''} onChange={(e) => handle('dateTo', e.target.value)} />
        </>
      )}
      <button className="btn btn-secondary btn-sm" onClick={clear}>Clear</button>
    </div>
  );
}

function ClassModal({ data, onClose, onSave }) {
  return (
    <div className="modal-backdrop">
      <div className="glass-panel modal-card animate-fade-in">
        <h3>{data ? 'Edit Class' : 'Add Class'}</h3>
        <form onSubmit={onSave}>
          <Input name="subjectName" label="Subject Name" value={data?.subjectName} />
          <Input name="teacherName" label="Teacher Name" value={data?.teacherName} />
          <div className="form-group">
            <label className="form-label">Weekdays</label>
            <select className="form-select stylish-select" name="classDays" defaultValue={data?.classDays || 'Monday'}>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Mon-Fri">Mon-Fri</option>
              <option value="Weekend">Weekend</option>
            </select>
          </div>
          <Input name="classTime" label="Class Time" type="datetime-local" value={data?.classTime ? new Date(data.classTime).toISOString().substring(0, 16) : ''} />
          <Input name="classJoinlink" label="Join Link" value={data?.classJoinlink || ''} required={false} />
          <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary">Save</button></div>
        </form>
      </div>
    </div>
  );
}

function UserModal({ data, onClose, onSave }) {
  return (
    <div className="modal-backdrop">
      <div className="glass-panel modal-card animate-fade-in">
        <h3>Edit User</h3>
        <form onSubmit={onSave}>
          <Input name="name" label="Full Name" value={data?.name} />
          <Input name="email" label="Email" type="email" value={data?.emailid} required={true} />
          <Input name="phone" label="Phone Number" value={data?.phonenumber} />
          <div className="form-group"><label className="form-label">Active</label><select className="form-select" name="activeflag" defaultValue={data?.activeflag || 'Y'}><option value="Y">Y</option><option value="N">N</option></select></div>
          <div className="form-group"><label className="form-label">Role</label><select className="form-select" name="role" defaultValue={data?.role || 'student'}>
            <option value="superadmin">Superadmin</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select></div>
          <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button><button className="btn btn-primary">Save</button></div>
        </form>
      </div>
    </div>
  );
}

function Input({ name, label, type = 'text', value = '', required = true }) {
  return <div className="form-group"><label className="form-label">{label}</label><input className="form-input" name={name} type={type} required={required} defaultValue={value} /></div>;
}

export default App;
