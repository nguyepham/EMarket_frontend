import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { loginAction, loginLoader } from './login'
import GlobalError from '../pages/errors/GlobalError'
import SignUp from '../pages/SignUp'
import UserProfile from '../pages/UserProfile'
import { signUpAction } from './signUp'
import { userProfileAction, userProfileLoader } from './userProfile'
import { changePasswordAction } from './changePassword'
import RootLayout from '../layouts/RootLayout'
import ChangePassword from '../pages/ChangePassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout key={localStorage.getItem("username") || "guest"}/>,
    errorElement: <GlobalError />,
    children: [
        { 
          path: 'auth/login', 
          element: <Login />, 
          loader: loginLoader,
          action: loginAction 
        },
        { 
          path: 'auth/sign-up', 
          element: <SignUp />, 
          action: signUpAction 
        },
        { 
          path: 'home', 
          element: <Home /> 
        },
        { 
          path: 'user/:username/details', 
          element: <UserProfile />, 
          loader: userProfileLoader, 
          action: userProfileAction,
          children: [
          ]
        },
        { 
          path: 'user/:username/change-password', 
          element: <ChangePassword />, 
          action: changePasswordAction 
        },
    ],
  }
])
