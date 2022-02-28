import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


ReactDOM.render(
    <App />,
  document.getElementById('root')
);


/*courses.reduce((initVal, currentSum) => {
    console.log('hello!', currentSum);
    currentSum.parts.forEach((part) => {
      console.log('for each..', part)
      initVal += part.exercises});
    return initVal;
  }, initVal
  )*/

  /*const total = courses.forEach(course => {
    console.table(course)
    course.reduce((initVal, currentSum) => {
      return initVal += currentSum.parts.exercises
    }, initVal
    ) 
  }
  )*/

  /*
  courses.reduce((initVal, currentSum) => {
    console.log('hello! the initial value is ', initVal, '\ncourse parts: ', currentSum.parts);
      return initVal += currentSum.parts.forEach((part) => {
        console.log('the exercises in each part ', part.exercises);
        console.log('new subtotal ', subTotal)
        return subTotal += part.exercises
      })
  }, initVal
  )
  */