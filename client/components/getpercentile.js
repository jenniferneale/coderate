import React from 'react'
import {connect} from 'react-redux'
import { getUserById } from '../store'
import { SingleUserLookup } from './singleUserLookup';

export const GetPercentile = (props) => {
    const {handleSubmit} = props;
    console.log('props', props);
    return (
    <div>
      <h3>Get the Percentile for Your Candidate Id:</h3>
      <form onSubmit={handleSubmit} name="GetPercentile">
        <div>
            <label htmlFor="candidateId"><small>Candidate Id</small></label>
            <input name="candidateId" type="text" />
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>
    <SingleUserLookup />
    </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        handleSubmit (evt) {
            evt.preventDefault();
            const candidateId = evt.target.candidateId.value;
            console.log('----------------candidateId ', candidateId);
            dispatch(getUserById(candidateId))
        }
    }
}

  export default connect(state => state, mapDispatch)(GetPercentile)
