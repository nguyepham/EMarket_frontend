// src/pages/GlobalError.tsx
import { isRouteErrorResponse, useRouteError } from 'react-router'
import NotFound from './NotFound'
import Unauthorized from './Unauthorized'

export default function GlobalError() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 401 || error.status === 403) {
      return <Unauthorized />
    }
    if (error.status === 404) {
      return <NotFound />
    }
  }

  return (
    <div className='p-4'>
      <h1>Something went wrong</h1>
      <p>{(error as Error).message + ' ' + (error as Error).stack}</p>
    </div>
  )
}
