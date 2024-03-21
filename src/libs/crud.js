const readJsonData = async () => {
      return fetch("http://localhost:5000/employees")
      .then((respJson) => respJson.json())
      
  };

  const readProfileData = async  () => {
    return await fetch("http://localhost:5000/profile")
      .then((response) => response.json())
  }

const deleteJsonData = async (id) => {
      return await fetch(`http://localhost:5000/employees/${Number(id)}`, {
      method: "DELETE",
    }).then((respJson) => respJson.json())
  };

const addJsonData = (employee , id ) => {
    return fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id , ...employee , DateAdded: new Date().toDateString() }),
    }).then((respJson) => {
      respJson.json()
    });
  };

  const editJsonData = (id,updatedEmployee) => {
      fetch(`http://localhost:5000/employees/${Number(id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      }).then((respJson) => {
        respJson.json()
      })
    }



  export { deleteJsonData , readJsonData ,  addJsonData , readProfileData , editJsonData}