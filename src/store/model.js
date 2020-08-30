import { action, thunk } from 'easy-peasy'
import {apiUrl} from '../utils/api'

export default {
  items: [],
  //? Thunks
  fetchDoctors: thunk(async actions => {
    const res = await fetch(apiUrl)
    const items = await res.json()
    //console.log(res)
    actions.setDoctorsList(items)
    

  }),
  
  //? action
  setDoctorsList: action((state, items) => {
    state.items = items
  }),
  
  selectedDoctor:'',
 
  submitAppoinment: action((state, selectedDoctor) => {
    state.selectedDoctor = selectedDoctor
    localStorage.setItem('currentDoctor', JSON.stringify(state.selectedDoctor));
  }),


  // add: action((state, todo) => {
  //   todo.id = uuid.v4()
  //   state.items = [...state.items, todo]
  // }),

  // toggle: action((state, id) => {
  //   state.items.map(todo => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed
  //     }
  //     return todo;
  //   })
  // }),

  // remove: action((state, id) => {
  //   state.items = state.items.filter(todo => todo.id !== id)
  // })

}