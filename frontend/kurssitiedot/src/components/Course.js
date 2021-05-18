import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
  <div>
    <h1>{props.header1}</h1>
    <h2>{props.header2}</h2>
  </div>)
}

const Part = (props) => {
  console.log(props)
  return (<div>
    <p> {props.osat} {props.maara}</p>
  </div>)
}

const Course = (props) => {
  console.log(props.kurssi)
  const parts = [ props.kurssi[0].parts[0].exercises, props.kurssi[0].parts[1].exercises, props.kurssi[0].parts[2].exercises, props.kurssi[0].parts[3].exercises ]
  const total = (s, p) => s + p;
  const summa = parts.reduce(total) 

  const parts2 = [props.kurssi[1].parts[0].exercises, props.kurssi[1].parts[1].exercises ]
  const summa2 = parts2.reduce(total) 

  return  <div>
      <Header header1={"Web development curriculum"} />
      <Header header2={props.kurssi[0].name} />
      <Part osat={props.kurssi[0].parts[0].name} ja maara={props.kurssi[0].parts[0].exercises} />
      <Part osat={props.kurssi[0].parts[1].name} ja maara={props.kurssi[0].parts[1].exercises} />
      <Part osat={props.kurssi[0].parts[2].name} ja maara={props.kurssi[0].parts[2].exercises} />
      <Part osat={props.kurssi[0].parts[3].name} ja maara={props.kurssi[0].parts[3].exercises} />
      <h4> Total of {summa} exercises </h4>
      <h4> <Part osat={props.kurssi[1].name} ja maara={props.kurssi[1].exercises} /></h4>
      <Part osat={props.kurssi[1].parts[0].name} ja maara={props.kurssi[1].parts[0].exercises} />
      <Part osat={props.kurssi[1].parts[1].name} ja maara={props.kurssi[1].parts[1].exercises} />
      <h4> Total of {summa2} exercises </h4>
   </div>
}
export default Course