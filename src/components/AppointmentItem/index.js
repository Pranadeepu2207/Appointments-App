// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStarBtn} = props
  const {id, title, date, isStarred} = appointmentDetails
  const appointmentDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const isStarredImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickToogle = () => {
    toggleStarBtn(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-date-container">
        <p className="title">{title}</p>
        <p className="date">Date: {appointmentDate}</p>
      </div>
      <button
        className="star-btn"
        type="button"
        data-testid="star"
        onClick={onClickToogle}
      >
        <img className="star-img" alt="star" src={isStarredImgUrl} />
      </button>
    </li>
  )
}

export default AppointmentItem
