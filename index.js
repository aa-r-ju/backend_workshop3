const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
  // const app = http.createServer((request, response) => {
  //   response.writeHead(200, { 'Content-Type': 'application/json' })
  //   response.end(JSON.stringify(notes))
  // })


  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
  app.use(requestLogger)

  
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
   
    const note = notes.find(note => note.id === id)
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
    })

    app.delete('/api/notes/:id', (request, response) => {
      const id = Number(request.params.id)
      notes = notes.filter(note => note.id !== id)
    
      response.status(204).end()
    })


    const generateId = () => {
      const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
      return maxId + 1
    }

    app.post('/api/notes', (request, response) => {
       const note = request.body
      if (!note.content) {
        return response.status(400).json({ 
          error: 'content missing' 
        })
      }
       
      const note1 = {
        content: note.content,
        important: note.important || false,
        id: generateId()
      }

      notes = notes.concat(note1)
    
      response.json(note1)
         })

         const unknownEndpoint = (request, response) => {
          response.status(404).send({ error: 'unknown endpoint' })
        }
        
        app.use(unknownEndpoint)
      



const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)   