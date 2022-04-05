const users = []

const addUser = ({ id, name, roomId, empno }) => {

  const user = { id : id, name : name , roomId : roomId, empno : empno  }

  users.push(user)

  return { user }
}
const getUsers = () => {
  return users
}

const removeUser = (id) => {
  // const index = users.findIndex((user) => user.id === id)
   const index = users.filter((user) => user.id !== id)
   users.length = 0
   index.map((item=> {
    users.push(item)
   }))
   return users
  // if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = (id) => users.find((user) => user.id === id)

const getUserCheck = (empno) => users.filter((user) => user.empno === empno)


const getUsersInRoom = (room) => users.filter((user) => user.room === room)

module.exports = { addUser, getUserCheck,removeUser, getUser, getUsersInRoom, getUsers }