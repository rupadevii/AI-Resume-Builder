import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import { isValidEmail } from '../utils/validation';

function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [formError, setFormError] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError('');
    };

    async function handleSubmit(e){
        e.preventDefault();
        if (!formData.email || !formData.password) {
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
            await api.post('/auth/login', formData);
            navigate('/home');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full grid md:grid-cols-7">
            <div className="hidden md:flex flex-col justify-between p-14 relative overflow-hidden bg-neutral-900 col-span-3">
                <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/5" />
                <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5" />
                <div
                className="absolute inset-0 opacity-[0.03] auth-left"
                />

                <div className="relative z-10 flex flex-col">
                    <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-8">
                        <span className="text-white text-lg font-bold">R</span>
                    </div>
                    <h2 className="text-white text-7xl font-bold leading-tight max-w-lg">
                        Build a resume that gets you hired.
                    </h2>
                    <p className="text-neutral-400 text-base mt-4 max-w-sm">
                        Create polished, ATS-friendly resumes in minutes with smart templates and real-time suggestions.
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-3 text-neutral-400 text-sm">
                    <div className="flex -space-x-2">
                        <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-neutral-900" />
                        <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-neutral-900" />
                        <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-neutral-900" />
                    </div>
                    <span>Join job seekers already building</span>
                </div>
            </div>

            <div
                className="flex items-center justify-center px-6 py-12 sm:px-12 col-span-4"
                style={{ backgroundColor: 'rgb(237, 236, 236)' }}
            >
                <div className="w-full max-w-md border p-9 rounded-lg">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-md text-neutral-500 mt-1.5">
                            Sign in to continue with Resume Builder
                        </p>
                    </div>

                    {error && <Alert type="error" message={error} />}
                    {formError && <Alert type="error" message={formError} />}

                    <form onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            required
                        />

                        <Button type="submit" variant="primary" className="w-full mt-4" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-neutral-500 mt-6">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-semibold text-neutral-900 hover:underline underline-offset-3"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;