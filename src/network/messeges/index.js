import firebase from '../../firebase/config'

export const senderMsg = async (msgValue, currentUserid, guestUserId,img) => {
    try{
        return await firebase.database().ref('messeges/'+ currentUserid)
        .child(guestUserId).push({
            messege: {
                sender: currentUserid,
                reciever: guestUserId,
                msg : msgValue,
                img: img
            }
        })
    }
    catch (error) {
        return error;
    }
}

export const recieverMsg = async (msgValue, currentUserid, guestUserId,img) => {
    try{
        return await firebase.database().ref('messeges/' + guestUserId)
        .child(currentUserid)
        .push({
            messege:{
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
