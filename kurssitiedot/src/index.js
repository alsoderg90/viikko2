import React from 'react'
import ReactDOM from 'react-dom'

const Course = (props) => {
  return (
    <div>
       <Header course={props.course} />
       <Content course={props.course} />
       <Total course={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log('props 1 is ', props.course.name)
  return (
    <div>
    <Part parts={props.course.parts}/>
    </div>
  )
}

const Part = (props) => {
  console.log('props 2 is ', props)
  return (
    <div>
    {props.parts.map(part => <p key={part.id}> {part.name} {part.exercises} </p>)}
    </div>
  )
}

const Total = (props) => {
  const total = props.course.reduce( (s, p) => s + p.exercises, 0
  )

  return (
    <div>
      Number of exercises {total}
    </div>
    
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))