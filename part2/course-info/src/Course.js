import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <>
    {parts.map(part => 
    <Part key={part.id} part={part}/>)}     
  </>


const Course = ({courses}) => {
    //console.log(courses);
  const initVal = 0;

  return (
    <>
    {courses.map((course) => {
      console.log('courses ', course);
      const total = course.parts.reduce((initVal, currentSum) => {
        console.log(currentSum);
      return initVal += currentSum.exercises
    }, initVal
    )
      return (
    <div key={course.id}>
    <Header course={course.name}/>
    <Content parts={course.parts}/>
    <Total sum={total}/>
    </div>
      )
    }
    )}
  </>
  )
  }

  export default Course