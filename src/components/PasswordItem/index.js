import './index.css'

const initialClassNames = [
  'className1',
  'className2',
  'className3',
  'className4',
  'className5',
  'className6',
  'className7',
  'className8',
]

const PasswordItem = props => {
  const {passwordDetails, isCheckboxChecked, onDeletePasswordItem} = props
  const {id, website, username, password} = passwordDetails
  const initial = username[0].toUpperCase()
  const initialClassName = initialClassNames[Math.floor(Math.random() * 7)]

  const passwordToBeShown = isCheckboxChecked ? (
    <p className="password">{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="masked-password-image"
    />
  )

  const onDelete = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="password-item">
      <div className={`initial-container ${initialClassName}`}>
        <p className="initial">{initial}</p>
      </div>
      <div className="details-container">
        <p className="website-url">{website}</p>
        <p className="username">{username}</p>
        {passwordToBeShown}
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
