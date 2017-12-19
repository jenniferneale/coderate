import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_LOOKUP = 'GET_USER_LOOKUP'
const REMOVE_USER = 'REMOVE_USER'
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const defaultState = {
    user: {},
    users: {}
}

/**
 * ACTION CREATORS
 */
const getUserLookup = user => ({type: GET_USER_LOOKUP, user})
const getUsers = users => ({type: GET_USERS, users})

/**
 * THUNK CREATORS
 */
export const getUserById = (id) =>
  dispatch =>
      axios.get(`/api/users/${id}`)      
      .then(res =>
          dispatch(getUserLookup(res.data)))
          .catch(err => console.log(err))

export const getAllUsers = () =>
dispatch =>
    axios.get(`/api/users/`)
    .then(res =>
        dispatch(getUsers(res.data)))
        .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_USER_LOOKUP:
        return Object.assign({}, state, {user: action.user})
    case GET_USERS:
        return Object.assign({}, state, {users: action.users})
    default:
        return state
  }
}
