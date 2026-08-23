import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://3.111.191.254:8080';
const AUTH_COOKIE_NAME = 'edumantra_user';

const setAuthCookie = (user) => {
  if (!user) return;
  const value = encodeURIComponent(JSON.stringify(user));
  document.cookie = `${AUTH_COOKIE_NAME}=${value}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
};

function AuthPage({ setAuth }) {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const initialMode = searchParams && (searchParams.get('mode') === 'signup' || searchParams.get('redirect') === 'signup' || searchParams.get('type') === 'signup') ? 'signup' : 'signin';
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Full name is required.');
        return;
      }
      const digitsOnly = phone.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        setError('Phone number must include exactly 10 digits.');
        return;
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#*$&!%^])[A-Za-z\d@#*$&!%^]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError('Password must be at least 8 characters with uppercase, lowercase, number and special character.');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = mode === 'signin' ? '/api/auth/login' : '/api/auth/register';
      const payload = mode === 'signin'
        ? { email: email.trim(), password }
        : { username: name.trim(), email: email.trim(), phonenumber: phone.replace(/\D/g, ''), password, role };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (mode === 'signin') {
        if (!response.ok) {
          throw new Error(data.error || data.message || 'Sign-in failed.');
        }

        const user = {
          name: data.username,
          email: data.usermail,
          role: data.userrole,
          phone: data.userphone || '',
          token: data.token,
          type: data.type,
          avatar: 'https://api.dicebear.com/10.x/identicon/svg?seed=Edumantra',
        };

        localStorage.setItem('edumantra_user', JSON.stringify(user));
        setAuthCookie(user);
        setAuth(user);
        return;
      }

      if (response.status === 202) {
        setSuccess(data.message || 'Registration submitted. An admin will review it shortly.');
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setRole('student');
        setMode('signin');
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Registration failed.');
      }

      setSuccess('Account created successfully. You can now sign in.');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('student');
      setMode('signin');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-icon">EM</div>
          <h2>{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
          <p>{mode === 'signin' ? 'Use your EduMantra credentials to access the admin dashboard.' : 'Register to start using the EduMantra admin portal.'}</p>
        </div>

        {error && <div className="auth-message auth-error">{error}</div>}
        {success && <div className="auth-message auth-success">{success}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <div className="auth-field">
                <label htmlFor="name">Full name</label>
                <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
              </div>
              <div className="auth-field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="9876543210" />
              </div>
              <div className="auth-field">
                <label htmlFor="role">Register as</label>
                <select id="role" value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </>
          )}

          <div className="auth-field">
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" />
          </div>

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="auth-toggle">
          <span>{mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}</span>
          <button type="button" onClick={() => { resetMessages(); setMode(mode === 'signin' ? 'signup' : 'signin'); }}>
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
