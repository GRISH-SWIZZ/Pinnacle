import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState('phone');

  const handleSendCode = (e) => {
    e.preventDefault();
    setStep('verification');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    alert('Phone login functionality will be implemented in future phases');
  };

  return (
    <div className="w-full max-w-md">
      <div className="card">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Phone Login
          </h2>
          <p className="text-(--text-secondary)">
            {step === 'phone'
              ? 'Enter your phone number'
              : 'Enter verification code'}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label htmlFor="phone" className="block text-white mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Send Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-white mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="input-field"
                placeholder="000000"
                maxLength="6"
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Verify & Login
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full btn-secondary"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-(--text-secondary) text-sm">
            Prefer email login?{' '}
            <Link to="/login" className="text-white hover:underline">
              Sign in with email
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}