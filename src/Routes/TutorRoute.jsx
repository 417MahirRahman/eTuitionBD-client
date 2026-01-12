import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import Loader from '../utilities/Loader'

const TutorRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return <Loader />
  if (role === 'tutor' || role === 'demo') return children
  return <Navigate to='/' replace='true' />
}

export default TutorRoute;