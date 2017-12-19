import React, {Component} from 'react'
import {connect} from 'react-redux'
import store, { getUserById, getAllUsers } from '../store'

const GetPercentile = props => {
        let percentiles;
        if(props.user && props.users.length) percentiles = props.generatePercentiles(props.user, props.users);
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
            {props.user.id && percentiles &&
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
                                <td>{percentiles.communication}th percentile</td>
                            </tr>
                            <tr>
                                <td>Coding Score</td>
                                <td>{props.user.coding_score}</td>
                                <td>{percentiles.coding}th percentile</td>
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
        user: state.userLookup.user,
        users: state.userLookup.users
      }
  }

const mapDispatch = (dispatch) => {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const candidateId = evt.target.candidateId.value;
            dispatch(getAllUsers())
            dispatch(getUserById(candidateId))                      
        },
        generatePercentiles(user, users){
            let filteredArr = users.filter(usr => {
                return usr.title === user.title && (Math.abs(usr.company.fractal_index - user.company.fractal_index) < 0.15)
            });
            let commArr = filteredArr.map(usr => usr.communication_score);
            let codeArr = filteredArr.map(usr => usr.coding_score);
            return {
                communication: percentileCalc(commArr, user.communication_score),
                coding: percentileCalc(codeArr, user.communication_score)
            }
        }            
    }
}

export default connect(mapState, mapDispatch)(GetPercentile)

//Required function for challenge
function percentileCalc(arr, score){
    let sorted = arr.sort((a, b) => (a - b));
    let lessThan = 0;
    let equalTo = 0;
    sorted.forEach(curr => {
      if (curr < score) lessThan++;
      if (curr == score) equalTo++;
    })
    return Math.round((lessThan + equalTo/2)/sorted.length * 100);
  }