
class Auth {
    constructor(){
        this.isLogined = false;
        this.userAccess = null;
    }

    setLogined = (value) => {
        this.isLogined = value;
        localStorage.setItem('isLogined', String(value))
    }

    setAccess = (access) => {
        this.userAccess = access;
        localStorage.setItem('access', String(access))
    }

    loadDataFromLS = () => {
        if(localStorage.getItem('isLogined') === 'true'){
            this.isLogined = true;
        }
    }

    loadAccessFromLS = () => {
        if(localStorage.getItem('access') === 'Admin'){
            this.userAccess = 'Admin';
        }
        if(localStorage.getItem('access') === 'User'){
            this.userAccess = 'User';
        }
        if(localStorage.getItem('access') === 'Owner'){
            this.userAccess = 'Owner';
        }
    }
}
export default new Auth();
