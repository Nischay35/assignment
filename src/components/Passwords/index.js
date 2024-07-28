import {Component} from 'react'
import './index.css'
import PasswordItem from '../PasswordItem'
import {v4 as uuidv4} from 'uuid'
class Passwords extends Component {
  state = {
    websiteNameInput: '',
    userInput: '',
    passwordInput: '',
    passwordsList: [],
    searchInput: '',
    isChecked: false,
  }
  onChangeWebsite = event => {
    this.setState({websiteNameInput: event.target.value})
  }
  onChangeUser = event => {
    this.setState({userInput: event.target.value})
  }
  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }
  onAddPassword = event => {
    event.preventDefault()
    const {websiteNameInput, userInput, passwordInput} = this.state
    const newPassword = {
      id: uuidv4(),
      website: websiteNameInput,
      username: userInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteNameInput: '',
      userInput: '',
      passwordInput: '',
    }))
  }
  deletePassword = id => {
    const {passwordsList} = this.state
    this.setState({
      passwordsList: passwordsList.filter(
        eachPassword => eachPassword.id !== id,
      ),
    })
  }
  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }
  onChangeCheckbox = event => {
    this.setState({
      isChecked: event.target.checked,
    })
  }
  renderPassword = () => {
    const {isChecked, passwordsList, searchInput} = this.state
    const searchResults = passwordsList.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (passwordsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords"
          />
          <p className="text">No Passwords</p>
        </div>
      )
    } else if (searchInput === '') {
      return (
        <ul className="passwords-list">
          {passwordsList.map(eachPassword => (
            <PasswordItem
              key={eachPassword.id}
              passwordDetails={eachPassword}
              deletePassword={this.deletePassword}
              isChecked={isChecked}
            />
          ))}
        </ul>
      )
    } else if (searchResults.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords"
          />
          <p className="text">No Passwords</p>
        </div>
      )
    } else {
      return (
      <ul className="passwords-list">
        {searchResults.map(eachPassword => (
          <PasswordItem
            key={eachPassword.id}
            passwordDetails={eachPassword}
            deletePassword={this.deletePassword}
            isChecked={isChecked}
          />
        ))}
      </ul>
      )
    }
  }
  render() {
    const {
      websiteNameInput,
      userInput,
      passwordInput,
      passwordsList,
      searchInput,
      isChecked,
    } = this.state
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo"
        />
        <div className="container">
          <div className="forms-container">
            <h1 className="add">Add New Password</h1>
            <form className="forms" onSubmit={this.onAddPassword}>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
                <input
                  type="text"
                  onChange={this.onChangeWebsite}
                  value={websiteNameInput}
                  placeholder="Enter Website"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="username"
                />
                <input
                  type="text"
                  onChange={this.onChangeUser}
                  value={userInput}
                  placeholder="Enter Username"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="password"
                />
                <input
                  type="password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                  placeholder="Enter Password"
                />
              </div>
              <button className="button" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="image"
          />
        </div>
        <div className="container">
          <div className="password-container">
            <h1 className="password-count">Your Passwords</h1>
            <p className="styling">{passwordsList.length}</p>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search"
            />
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              value={searchInput}
              placeholder="Search"
            />
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              type="checkbox"
              onChange={this.onChangeCheckbox}
              checked={isChecked}
              id="checkboxE1"
            />
            <label for="checkboxE1" className="label-text">
              Show Passwords
            </label>
          </div>
          {this.renderPassword()}
        </div>
      </div>
    )
  }
}
export default Passwords
