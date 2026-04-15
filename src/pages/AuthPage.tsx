import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setError('Email não verificado. Por favor, verifique sua caixa de entrada (e também a pasta de SPAM).');
        } else {
          navigate('/');
        }
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        if (!passwordRegex.test(password)) {
          setError('Senha inválida. Deve conter 8-20 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial.');
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          nome: email.split('@')[0],
          email,
          dataCriacao: new Date().toISOString(),
        });
        await signOut(auth);
        setMessage('Conta criada com sucesso! Por favor, verifique seu email (e também a pasta de SPAM) para ativar sua conta.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1e1f22]">
      <div className="bg-[#313338] p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{isLogin ? 'Login' : 'Criar Conta'}</h1>
        <form onSubmit={handleAuth} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 bg-[#1e1f22] text-white rounded" />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 bg-[#1e1f26] text-white rounded" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button type="submit" className="w-full p-2 bg-[#5865f2] text-white rounded font-bold">{isLogin ? 'Entrar' : 'Cadastrar'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="w-full mt-4 text-[#b5bac1] text-sm">
          {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entre'}
        </button>
      </div>
    </div>
  );
}
