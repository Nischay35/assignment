import './index.css'
const PasswordItem = props => {
  const {passwordDetails, deletePassword, isChecked} = props
  const {id, website, username, password} = passwordDetails
  const onDeletePassword = () => {
    deletePassword(id)
  }
  return (
    <li className="list-items">
      <p className="username">{username.slice(0, 1).toUpperCase()}</p>
      <div>
        <p className="text">{website}</p>
        <p className="text">{username}</p>
        {isChecked ? (
          <p className="text">{password.text}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
          />
        )}
      </div>
      <button onClick={onDeletePassword} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
