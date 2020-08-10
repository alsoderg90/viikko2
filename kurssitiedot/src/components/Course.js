import React from 'react'

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
      <h2>{props.course.name}</h2>
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
      <div class="total">
        Number of exercises {total}
      </div>
    )
  }
  export default Course