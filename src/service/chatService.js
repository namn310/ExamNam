import { getListChat } from '@/utils/request'
export const ListChat = async () => {
  const data = await getListChat('list-user-chat')
  return data.list_user_chat
}

export const ChatByUserId = async (id) => {
  const data = await getListChat(`list-chat-byUserId/${id}`)
  return data.list_user_chat
}

export const updateIsread = async (id) => {
  const data = await getListChat(`updateIsReadChat/${id}`)
  return data
}
