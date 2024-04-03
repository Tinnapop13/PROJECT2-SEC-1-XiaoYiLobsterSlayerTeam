const readEmployeesData = async () => {
  try {
    return await fetch(`${import.meta.env.VITE_DB_URL}/employees`).then(
      (respJson) => respJson.json()
    )
  }
  catch (error) {
    alert(error)
  }
}

const readProfileData = async () => {
  try {
    return await fetch(`${import.meta.env.VITE_DB_URL}/profile`).then(
      (response) => response.json()
    )
  }
  catch (error) {
    alert(error)
  }
}

const deleteEmployeesData = async (id) => {
  try {
    return await fetch(`${import.meta.env.VITE_DB_URL}/employees/${id}`, {
      method: "DELETE",
    }).then((respJson) => respJson.json())
  }
  catch (error) {
    alert(error)
  }
}

const addEmployeesData = async (employee) => {
  try {
    return fetch(`${import.meta.env.VITE_DB_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...employee }),
    }).then((respJson) => respJson.json())
  }
  catch (error) {
    alert(error)
  }
}

const editEmployeesData = (id, updatedEmployee) => {
  try {
    fetch(`${import.meta.env.VITE_DB_URL}/employees/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEmployee),
    }).then((respJson) => {
      respJson.json()
    })
  }
  catch (error) {
    alert(error)
  }
}

const getUsersData = async () => {
  try {
    return await fetch(`${import.meta.env.VITE_DB_URL}/users`).then((respJson) =>
      respJson.json()
    )
  }
  catch (error) {
    alert(error)
  }
}

const addUserData = async (username, password) => {
  try {
    return await fetch(`${import.meta.env.VITE_DB_URL}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then((respJson) => respJson.json())
  }
  catch (error) {
    alert(error)
  }
}

export {
  deleteEmployeesData,
  readEmployeesData,
  addEmployeesData,
  readProfileData,
  editEmployeesData,
  getUsersData,
  addUserData,
}
