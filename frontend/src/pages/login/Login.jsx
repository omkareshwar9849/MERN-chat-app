import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {loading, login} = useLogin({username,password});

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await login({username,password});
    }

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className="text-3xl font-semibold text-center text-gray-300">Login
                    <span className='text-blue-500'>ChatApp</span>
                </h1>

                <form >
                    <div>
                        <label htmlFor="username" className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} name='username' className="w-full input input-bordered h-10" placeholder='Enter username' />
                    </div>

                    <div>
                        <label htmlFor="password" className="label p-2">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} name='password' className="w-full input input-bordered h-10" placeholder='Enter password' />
                    </div>

                    <Link to="/signup" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" onClick={handleSubmit} disabled={loading}>
                            {!loading ? "Login" : <span className='loading loading-spinner'></span>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
