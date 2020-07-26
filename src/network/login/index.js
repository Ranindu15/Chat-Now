import firebase from '../../firebase/config'

const LoginReq = async (email, password) => {
    try{
        return await firebase.auth().signInWithEmailAndPassword(email, password);
    }
    catch (error) {
        return error;
    }
}

export default LoginReq