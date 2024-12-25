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

// GET
export const getAllFolder = async() =>{
  return await fetch(`${URL}/folder`, {
    method : "GET",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    }
  })
}

// CREATE
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

// DELETE
export const deleteFolder = async(id)=>{
  return fetch(`${URL}/folder/${id}`, {
    method : 'DELETE',
    headers : {
      "Content-Type": "application/json",
      "Authorization": `${localStorage.getItem('token')}`,
    },
  })
}

