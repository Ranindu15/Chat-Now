import firebase from '../../firebase/config'

export const senderMsg = async (msgValue, currentUserid, guestUserId,img) => {
    try{
        return await firebase.database().ref('messeges/' + currentUserid)
        .child(guestUserId)
        .push({
            messeges:{
                sender: currentUserid,
                reciever:guestUserId,
                msg:msgValue,
                img: img
            }
        })
    }
    catch (error) {
        return error;
    }
}

export const recieverMsg = async (email, password) => {
    try{
        return await firebase.database().ref('messeges/' + currentUserid)
        .child(guestUserId)
        .push({
            messeges:{
                sender: currentUserid,
                reciever:guestUserId,
                msg:msgValue,
                img: img
            }
        })
    }
    catch (error) {
        return error;
    }
}
