import React from 'react'
import {connect} from 'react-redux'

export const SingleUserLookup = (props) => {
    const {user} = props;
    
    return (
    <div>
      <h3>testy</h3>
      {user && 
          <h3>Candidate No.{user.id}</h3>
      }      
    </div>
    )
  }

  const mapState = (state) => {
    return {
        user: state.userLookup.user
      }
  }

  export default connect(mapState)(SingleUserLookup)
