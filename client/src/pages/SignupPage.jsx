import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { isValidEmail } from '../utils/validation';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../redux/features/authSlice';

function SignupPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');
    const dispatch = useDispatch()

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError('');
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            setFormError('All fields are required');
            return;
        }
        if (!isValidEmail(formData.email)) {
            setFormError('Please enter a valid email');
            return;
        }
        if (formData.password.length < 6) {
            setFormError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/register', formData);
            dispatch(fetchUser())
            navigate(-1);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-neutral-900 px-6 py-12">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/5" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5" />
            <div className="absolute inset-0 opacity-[0.03] auth-left" />

            <div className="primary relative z-10 w-full max-w-md bg-white border p-9 rounded-lg">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-neutral-900">
                        Create your account
                    </h1>
                    <p className="text-md text-neutral-500 mt-1.5">
                        Get started with Resume Builder
                    </p>
                </div>

                {error && <Alert type="error" message={error} />}
                {formError && <Alert type="error" message={formError} />}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Min 6 characters"
                        required
                    />

                    <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="text-center text-sm text-neutral-500 mt-6">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-neutral-900 hover:underline underline-offset-4"
                    >
                    Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;