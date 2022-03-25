const users = []

const addUser = ({ id, name, roomId }) => {

  const user = { id : id, name : name , roomId : roomId }

  users.push(user)

  return { user }
}
const getUsers = () => {
  return users
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => users.find((user) => user.id === id)

const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getUsers }