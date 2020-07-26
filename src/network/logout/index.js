import firebase from '../../firebase/config'

const LogoutUser = async () => {
    try{
        return await firebase.auth().signOut();
    }
    catch (err) {
        return (err);
    }
}

export default LogoutUser;