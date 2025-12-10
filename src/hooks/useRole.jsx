import { useContext } from 'react'
import AuthContext from '../providers/AuthContext'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
  const { user, loading } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure()

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ['role', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/user/role`)
      console.log(result)
      return result.data.role
    },
  })

  return [role, isRoleLoading]
}

export default useRole