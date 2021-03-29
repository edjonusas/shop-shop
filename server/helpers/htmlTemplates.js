module.exports = {
  passwordRecover: (password) => {
    return `
      <div style="display: flex; align-items: center; flex-direction: column; color: #3e976c; padding: 50px">
          <h2>Your new password is:</h2>
          <div style="
          background-color: #f8f8f8;
          padding: 5px 20px;
          border-radius: 10px;
          text-align: center;
          color: black;
          margin-top: 50px">
              <h1>${password}</h1>
          </div>
      </div>
    `
  }
}
