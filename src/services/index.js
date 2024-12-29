const URL = "http://localhost:3000/api";

// SIGNUP
export const signup = (data) =>{
    return fetch(`${URL}/user/signup`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify(data),
    })
}

//LOGIN
export const login = (data) =>{
    return fetch(`${URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify(data)
    });
}

// UPDATE DETAILS
export const updateDetails = async(data)=>{
  return fetch(`${URL}/user/update`, {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json',
        "Authorization": `${localStorage.getItem('token')}`,
    },
    body : JSON.stringify(data)
  })
}

// GET FOLDER
export const getAllFolder = async() =>{

  return await fetch(`${URL}/folder`, {
    method : "GET",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    }
  })
}

// CREATE FOLDER
export const createFolder = async (foldername) =>{
  return await fetch(`${URL}/folder`, {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({
      foldername,
    })
  })
}

// DELETE FOLDER
export const deleteFolder = async(id)=>{
  return fetch(`${URL}/folder/${id}`, {
    method : 'DELETE',
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    },
  })
}

// CREATE FORM
export const createForm = async (data) =>{
  return await fetch(`${URL}/form`, {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(data)
  })
}
