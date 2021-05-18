import React from 'react'

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const courses = [
  {
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
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

const Part = (props) => {
  console.log(props)
  return <p> {props.osat} {props.maara}</p>
}

const parts = [ courses[0].parts[0].exercises, courses[0].parts[1].exercises, courses[0].parts[2].exercises, courses[0].parts[3].exercises ]
const total = (s, p) => s + p;
const summa = parts.reduce(total) 

const parts2 = [courses[1].parts[0].exercises, courses[1].parts[1].exercises ]
const summa2 = parts2.reduce(total) 

const Course = (props) => {
  console.log(props)
  return  <div>
      <Header course={courses[0].name} />
      <Part osat={courses[0].parts[0].name} ja maara={courses[0].parts[0].exercises} />
      <Part osat={courses[0].parts[1].name} ja maara={courses[0].parts[1].exercises} />
      <Part osat={courses[0].parts[2].name} ja maara={courses[0].parts[2].exercises} />
      <Part osat={courses[0].parts[3].name} ja maara={courses[0].parts[3].exercises} />
      <h4> Total of {summa} exercises </h4>
      <h4> <Part osat={courses[1].name} ja maara={courses[1].exercises} /></h4>
      <Part osat={courses[1].parts[0].name} ja maara={courses[1].parts[0].exercises} />
      <Part osat={courses[1].parts[1].name} ja maara={courses[1].parts[1].exercises} />
      <h4> Total of {summa2} exercises </h4>
   </div>
}
export default Course