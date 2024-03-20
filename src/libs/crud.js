const readJsonData = async () => {
      return fetch("http://localhost:5000/employees")
      .then((respJson) => respJson.json())
      
  };

const deleteJsonData = async (e) => {
      return fetch(`http://localhost:5000/employees/${Number(e.target.id)}`, {
      method: "DELETE",
    }).then((respJson) => respJson.json())
  };


  export { deleteJsonData , readJsonData}