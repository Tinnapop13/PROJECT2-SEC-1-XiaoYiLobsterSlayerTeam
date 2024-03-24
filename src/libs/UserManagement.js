class UserManagement {
    constructor(users = {}){
        this.users = users
    }
    getUsers(){
        return this.users
     }
    addUsers(users){
        this.users = { ...users }
    }

}

export {UserManagement}