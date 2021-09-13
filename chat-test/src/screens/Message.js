import React from 'react';
import firebase from '../Firebase.js';
import { useState } from "react";

const Message = (props) => {
    const userId = props.match.params.userId;
    const [myId, setMyId] = useState("");

    firebase.auth().onAuthStateChanged((user) => {
        firebase.firestore().collection('Users').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                firebase.firestore().collection('Users').doc(doc.id).get().then((querySnapshotSubCollection) => {
                    if(querySnapshotSubCollection.data().mail == user.email) {
                        setMyId(querySnapshotSubCollection.data().id);
                    }
                });
            });
        })
    })

    var from = ""
    var to = ""

    if(myId < userId) {
        from = myId;
        to = userId;
    } else {
        from = userId;
        to = myId;
    }

    firebase.firestore().collection('rooms').get().then((querySnapshot) => {
        querySnapshot.forEach((room) => {
            if(room.data().ownerId == from && room.data().toId == to) {
                console.log(room.id);
            }
        })

    });



    return (
        <h1>メッセージ画面</h1>
    );
};

export default Message;