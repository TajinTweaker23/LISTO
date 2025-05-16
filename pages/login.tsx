import { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async () => {
    setError('');
    try {
      if (isNewUser) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">{isNewUser ? 'Create Account' : 'Login'}</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isNewUser ? 'Sign Up' : 'Log In'}
        </button>
        <p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-center text-sm text-blue-600 cursor-pointer"
        >
          {isNewUser ? 'Already have an account? Log in' : 'New user? Create an account'}
        </p>
        <button
          onClick={() => signOut(auth)}
          className="w-full mt-2 text-sm text-gray-500 underline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
