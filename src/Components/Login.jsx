import React, { useState } from 'react'
import { login as storeLogin } from '../Store/AuthSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../Appwrite/auth'
import { Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import Button from './Button'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false)

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        authService.getCurrentUser().then((userData) => {
          dispatch(storeLogin(userData))
          setLoader(true)
          navigate("/")
        })
      }
    } catch (error) {
      setError(error.message)
    }
  }

  if (loader) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-green-600">Logged In Successfully</h2>
        <p className="text-gray-600">Redirecting you to the dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <Logo className="w-20 h-20 mx-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up Now
            </Link>
          </p>
        </div>
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 mt-1 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                {...register("password", {
                  required: "Password is required"
                })}
              />
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login