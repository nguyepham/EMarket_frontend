import { createBrowserRouter } from 'react-router'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { loginAction, loginLoader } from './login'
import GlobalError from '../pages/errors/GlobalError'
import SignUp from '../pages/SignUp'
import UserProfile from '../pages/UpdateProfile'
import { signUpAction } from './signUp'
import { userProfileAction, userProfileLoader } from './userProfile'
import { changePasswordAction } from './changePassword'
import RootLayout from '../layouts/RootLayout'
import ChangePassword from '../pages/ChangePassword'
import UploadProfilePicture from '../pages/UpdateProfilePicture'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
          path: 'user/:username/update-details', 
          element: <UserProfile />, 
          loader: userProfileLoader, 
          action: userProfileAction,
        },
        { 
          path: 'user/:username/change-password', 
          element: <ChangePassword />, 
          action: changePasswordAction 
        },
        { 
          path: 'user/:username/update-profile-picture', 
          element: <UploadProfilePicture />, 
        },
    ],
  }
])
