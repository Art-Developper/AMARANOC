import React, { useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    // 1 values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    // 2 function
    const handleLogin = async (e) => {
        e.preventDefault();

        setError('');


        try {
            // 3 use SIWEAP FIREBASE function
            await signInWithEmailAndPassword(auth, email, password);

            // 4. Հաջող մուտքից հետո վերահղել    
            navigate('/AMARANOC.git')
        } catch (firebaseError) {
            // 5 Errors Handling 
            console.error("Login Error:", firebaseError.message);
            // Show error message
            switch (firebaseError.code) {
                case 'auth/invalid-email': // Փոփոխված է 'auth/invalid.email'-ից դեպի 'auth/invalid-email'
                    setError('Սխալ էլ. փոստի ձևաչափ։');
                    break;
                case 'auth/user-not-found':
                    setError('Օգտատեր այս էլ. փոստով գոյություն չունի։');
                    break;
                case 'auth/wrong-password':
                    setError('Սխալ գաղտնաբառ։');
                    break;
                case 'auth/invalid-credential':
                    setError('Սխալ էլ. փոստ կամ գաղտնաբառ։');
                    break;
                default:
                    setError('Մուտքի սխալ։ Խնդրում ենք փորձել կրկին։');
            }
        }
    }
    return (
        <>
            <Header />
            <div className='flex justify-center items-center h-screen'> {/* Ավելացվել է h-screen բարձրությունը կենտրոնացնելու համար */}
                <div className="bg-white p-8 rounded shadow-md w-96"> {/* Ավելացվել են ոճեր՝ տեսքը բարելավելու համար */}
                    <h2 className="text-2xl font-bold mb-6 text-center">Մուտք</h2>
                    <form onSubmit={handleLogin}>
                        {error && <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Էլ. փոստ
                            </label>
                            <input
                                type="email"
                                id='email'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder='Ձեր էլ․ փոստը'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Գաղտնաբառ
                            </label>
                            <input
                                type="password"
                                id='password'
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder='*********'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                            >
                                Մուտք
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;