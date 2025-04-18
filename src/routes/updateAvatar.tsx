import { LoaderFunction } from "react-router"
import { User } from "../types/model"
import { apiRequest } from "../utils/api"

export const updateAvatarLoader: LoaderFunction = async ({ params }) => {
  const username = params.username
  const user = await apiRequest<User>(`/user/${username}`,
    true, false, {
    method: 'GET',
    }
  )
  return user.imageUrl
}