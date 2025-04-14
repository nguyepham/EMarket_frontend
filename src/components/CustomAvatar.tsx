import { Avatar, majorScale, minorScale } from 'evergreen-ui'
import { API_BASE_URL } from '../constants'
import { useEffect, useState } from 'react'
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
          console.log('Fetched avatar URL:', avatarUrl)
        } catch (err) {
          console.error('Failed to fetch avatar:', err)
        }
      }
      fetchAvatar()
    }
  }, [avatarUrl])

  
  return (
    <Avatar
      // key={src}
      src={avatarUrl ? `${API_BASE_URL}${avatarUrl}` : undefined}
      name={username}
      size={majorScale(6)}
      marginRight={majorScale(1)}
      onClick={onClick}
      cursor='pointer'
    />
  )
}
