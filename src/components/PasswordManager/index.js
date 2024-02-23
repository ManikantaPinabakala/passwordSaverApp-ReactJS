import {v4 as uuidv4} from 'uuid'

import {Component} from 'react'
import PasswordItem from '../PasswordItem'
import './index.css'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    passwordList: [],
    isCheckboxChecked: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      isCheckboxChecked: !prevState.isCheckboxChecked,
    }))
  }

  onAddPasswordItem = event => {
    event.preventDefault()

    const {websiteInput, usernameInput, passwordInput} = this.state

    if (websiteInput !== '' && usernameInput !== '' && passwordInput !== '') {
      const newPasswordItem = {
        id: uuidv4(),
        website: websiteInput,
        username: usernameInput,
        password: passwordInput,
      }

      this.setState(prevState => ({
        websiteInput: '',
        usernameInput: '',
        passwordInput: '',
        passwordList: [...prevState.passwordList, newPasswordItem],
      }))
    }
  }

  onDeletePasswordItem = toBeDeletedId => {
    const {passwordList} = this.state
    const updatedPasswordList = passwordList.filter(
      eachPasswordItem => eachPasswordItem.id !== toBeDeletedId,
    )

    this.setState({passwordList: updatedPasswordList})
  }

  renderTopSection = () => {
    const {websiteInput, usernameInput, passwordInput} = this.state

    return (
      <div className="section-bg-container top-container">
        <form className="form-container" onSubmit={this.onAddPasswordItem}>
          <h1 className="add-new-password-heading">Add New Password</h1>
          <div className="single-input-container">
            <div className="input-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-field-image"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Website"
              className="input-field"
              value={websiteInput}
              onChange={this.onChangeWebsite}
            />
          </div>
          <div className="single-input-container">
            <div className="input-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-field-image"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Username"
              className="input-field"
              value={usernameInput}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="single-input-container">
            <div className="input-image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-field-image"
              />
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              className="input-field"
              value={passwordInput}
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <div className="manager-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-image"
          />
        </div>
      </div>
    )
  }

  render() {
    const {passwordList, searchInput, isCheckboxChecked} = this.state
    const searchResults = passwordList.filter(eachPasswordItem =>
      eachPasswordItem.website
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    return (
      <div className="bg-container">
        <div className="inner-bg-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          {this.renderTopSection()}
          <div className="section-bg-container bottom-container">
            <div className="passwords-section-header">
              <div className="num-passwords-container">
                <h1 className="your-passwords-text">Your Passwords</h1>
                <div className="number-of-passwords-container">
                  <p className="number-of-passwords">{searchResults.length}</p>
                </div>
              </div>
              <div className="search-image-input-container">
                <div className="search-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search-image"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search-input-field"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="horizontal-break" />
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="showPasswords"
                className="checkbox-input"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="showPasswords" className="checkbox-label">
                Show Passwords
              </label>
            </div>
            {searchResults.length > 0 ? (
              <ul className="password-list">
                {searchResults.map(eachPasswordItem => (
                  <PasswordItem
                    key={eachPasswordItem.id}
                    passwordDetails={eachPasswordItem}
                    isCheckboxChecked={isCheckboxChecked}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                  />
                ))}
              </ul>
            ) : (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-image"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
