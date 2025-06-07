const users = [];
let user = {};  

const showLogin = () => {
  let str = `
    <div>
    <h1>Login Form</h1>
    <p><div id="dvMsg"></div></p>
    <p><input type="text" id="txtEmail" placeholder="Email"></p>
    <p><input type="password" id="txtPass" placeholder="Password"></p>
    <p><button onclick='validateUser()'>Log In</button></p>
    <p><button onclick='showRegister()'>Create Account</button></p>
    </div>
    `;
  root.innerHTML = str;
};

const showRegister = () => {
  let str = `
    <h1>Register Form</h1>
    <p><input type="text" id="txtName" placeholder="Name"></p>
    <p><input type="text" id="txtEmail" placeholder="Email"></p>
    <p><input type="password" id="txtPass" placeholder="Password"></p>
    <button onclick='addUser()'>Register</button>
    <hr>
    <button onClick='showLogin()'>Already a Member? Login here...</button>
    `;
  root.innerHTML = str;
};

const showHome = () => {
  let str = `
    <h1>Welcome ${user.name}</h1>
    <hr>
    <p><select id="action">
     <option value="">--select--</option>
     <option value="deposit">Deposit</option>
     <option value="withdraw">Withdraw</option>
    </select></p>
    <p><input type='number' id='txtAmount' placeholder="Amount"></p>
    <p>
      <button onclick="submitAction()">Submit</button>
      <button onclick='showLogin()'>Logout</button>
    </p>
    <hr>
    <p>Current balance: ${user.balance}</p>
    `;
  root.innerHTML = str;
};

const addUser = () => {
  const newUser = {
    name: document.getElementById("txtName").value,
    email: document.getElementById("txtEmail").value,
    pass: document.getElementById("txtPass").value,
    balance: 0
  };
  users.push(newUser);
  console.log(users);
  showLogin();
};

const validateUser = () => {
  let email = document.getElementById("txtEmail").value;
  let pass = document.getElementById("txtPass").value;
  user = users.find(e => e.email === email && e.pass === pass);  
  if (user) {
    showHome();
  } else {
    dvMsg.innerText = "Access Denied";
  }
};

const submitAction = () => {
  const action = document.getElementById("action").value;
  const amount = parseFloat(document.getElementById("txtAmount").value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid amount.");
    return;
  }

  if (action === "deposit") {
    user.balance += amount;
    showHome();
  } else if (action === "withdraw") {
    if (amount > user.balance) {
      alert("Insufficient balance.");
      return;
    }
    user.balance -= amount;
    showHome();
  } else {
    alert("Please select an action.");
  }
};


  showHome();