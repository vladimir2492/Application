
class Auth {
    constructor(){
        this.isLogined = false;
        this.productData = [];
        this.userData = [];
    }

    setLogined = (value) => {
        this.isLogined = value;
        localStorage.setItem('isLogined', String(value))
    }

    loadDataFromLS = () => {
        if(localStorage.getItem('isLogined') === 'true'){
            this.isLogined = true;
        }
    }
}
export default new Auth();
