const readEmployeesData = async () => {
  return await fetch(`${import.meta.env.VITE_DB_URL}/employees`).then(
    (respJson) => respJson.json()
  )
}

const readProfileData = async () => {
  return await fetch(`${import.meta.env.VITE_DB_URL}/profile`).then(
    (response) => response.json()
  )
}

const deleteEmployeesData = async (id) => {
  return await fetch(`${import.meta.env.VITE_DB_URL}/employees/${id}`, {
    method: "DELETE",
  }).then((respJson) => respJson.json())
}

const addEmployeesData = async (employee) => {
  return fetch(`${import.meta.env.VITE_DB_URL}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...employee}),
  }).then((respJson) => respJson.json())
}

const editEmployeesData = (id, updatedEmployee) => {
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

const getUsersData = async () => {
  return await fetch(`${import.meta.env.VITE_DB_URL}/users`).then((respJson) =>
    respJson.json()
  )
}

const addUserData = async (username, password) => {
  return await fetch(`${import.meta.env.VITE_DB_URL}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username: username, password: password}),
  }).then((respJson) => respJson.json())
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
