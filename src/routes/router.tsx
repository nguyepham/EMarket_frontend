import { createBrowserRouter } from 'react-router'
import { ROUTES } from '../constants'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { loginAction } from './login'
import { homeLoader } from './home'
import GlobalError from '../pages/errors/GlobalError'
import SignUp from '../pages/SignUp'
import UserProfile from '../pages/UserProfile'
import { signUpAction } from './signUp'
import { userProfileAction, userProfileLoader } from './userProfile'
import { updatePasswordAction } from './updatePassword'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <GlobalError />,
    children: [
        { path: ROUTES.LOGIN, element: <Login />, action: loginAction },
        { path: ROUTES.SIGN_UP, element: <SignUp />, action: signUpAction },
        { path: ROUTES.HOME, element: <Home />, loader: homeLoader },
        {
          path: '/user/:username/details',
          element: <UserProfile />,
          loader: userProfileLoader,
          action: userProfileAction,
          children: [
            {
              path: 'update-password',
              action: updatePasswordAction
            }
          ],
        },
    ],
  }
])
