import server from './server'

const PORT = process.env.PORT || 2027

server.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`)
})
