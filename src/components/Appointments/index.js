// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appoointments extends Component {
  state = {
    appointmentsList: [],
    tittleInput: '',
    dateInput: '',
    isStarredActive: '',
  }

  onAddAppointmentDetails = event => {
    event.preventDefault()
    const {tittleInput, dateInput} = this.state
    const newAppointmentDetails = {
      id: uuidv4(),
      title: tittleInput,
      date: dateInput,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentDetails],
      tittleInput: '',
      dateInput: '',
    }))
  }

  toggleStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isStarredActive} = this.state

    this.setState({isStarredActive: !isStarredActive})
  }

  getFilteredAppoinmentList = () => {
    const {appointmentsList, isStarredActive} = this.state

    if (isStarredActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentsList
  }

  onChangeTextInput = event => {
    this.setState({tittleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  render() {
    const {tittleInput, dateInput, isStarredActive} = this.state
    const starredBtnClassName = isStarredActive
      ? 'non-starred-button'
      : 'starred-button'
    const filteredAppointmentList = this.getFilteredAppoinmentList()
    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="heading-form-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointmentDetails}>
                <label htmlFor="textInput">TITLE</label>
                <input
                  className="text-input"
                  type="text"
                  id="textInput"
                  value={tittleInput}
                  onChange={this.onChangeTextInput}
                />
                <label htmlFor="dateInput">DATE</label>
                <input
                  className="date-input"
                  type="date"
                  id="dateInput"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="appointment-img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <div className="container">
            <h1 className="heading-1">Appointments</h1>
            <button
              className={starredBtnClassName}
              type="button"
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredAppointmentList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleStarBtn={this.toggleStarBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appoointments
