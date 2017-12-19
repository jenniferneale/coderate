import React, {Component} from 'react'
import {connect} from 'react-redux'
import { getUserById } from '../store'

const GetPercentile = props => {
    
        return (<div>
              <h3>Get the Percentile for Your Candidate Id:</h3>
              <form onSubmit={props.handleSubmit} name="GetPercentile">
                <div>
                    <label htmlFor="candidateId"><small>Candidate Id</small></label>
                    <input name="candidateId" type="text" />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div>
            {props.user.id && 
                <div>
                    <h3>Candidate No.{props.user.id}</h3>
                    <table className="table table-striped table-hover col-sm-11">
                        <tbody>
                            <tr>
                                <td>Title</td>
                                <td>{props.user.title}</td>                                
                            </tr>
                            <tr>
                                <td>Communication Score</td>
                                <td>{props.user.communication_score}</td>
                                <td>75th percentile</td>
                            </tr>
                            <tr>
                                <td>Coding Score</td>
                                <td>{props.user.coding_score}</td>
                                <td>75th percentile</td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>
            }      
            </div>
            </div>)    

}

const mapState = (state) => {
    return {
        user: state.userLookup.user
      }
  }

const mapDispatch = (dispatch) => {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const candidateId = evt.target.candidateId.value;
            dispatch(getUserById(candidateId))
        }
    }
}

export default connect(mapState, mapDispatch)(GetPercentile)
