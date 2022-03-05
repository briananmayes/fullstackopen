const Notification = ({ message, name }) => {
  const SuccessStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const ErrorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
    if (message === null) {
      return null
    }
    else if(message === `Added ${name} to phonebook`) {
      
      return (
        <div style={SuccessStyle} className='success'>
          {message}
        </div>
      )
    }
    else if(message === `${name} has already been removed from the phonebook.` || message === 'Unable to get phonebook list from server...') {
      
    return (
      <div style={ErrorStyle} className='error'>
        {message}
      </div>
    )
    }
    return null
  }

  export default Notification;