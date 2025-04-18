import { Avatar, majorScale } from 'evergreen-ui'
import { API_BASE_URL } from '../constants'
import { useEffect } from 'react'
import { apiRequest } from '../utils/api'
import { User } from '../types/model'

export function CustomAvatar({ username, avatarUrl, onClick }: {
  username: string
  avatarUrl: string | null
  onClick?: () => void
}) {
  useEffect(() => {
    if (username !== localStorage.getItem('username')) {
    // Initial fetch if avatar is not already available
      const fetchAvatar = async () => {
        try {
          const res = await apiRequest<User>(`/user/${username}`, true, false)
          avatarUrl = res.imageUrl
          console.log('Fetched avatar URL from CustomAvatar:', avatarUrl)
        } catch (err) {
          console.error('Failed to fetch avatar:', err)
        }
      }
      fetchAvatar()
    }
  }, [avatarUrl])

  console.log('avatarUrl from CustomAvatar: ', avatarUrl)
  console.log('username from CustomAvatar: ', username)
  
  return (
    <Avatar
      key={avatarUrl}
      src={avatarUrl ? `${API_BASE_URL}${avatarUrl}` : undefined}
      name={username}
      size={majorScale(6)}
      marginRight={majorScale(1)}
      onClick={onClick}
      cursor='pointer'
    />
  )
}
