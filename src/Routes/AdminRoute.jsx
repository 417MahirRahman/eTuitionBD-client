import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import Loader from '../utilities/Loader'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <Loader />
  if (role === 'admin' || role === 'demo') return children
  return <Navigate to='/' replace='true' />
}

export default AdminRoute;