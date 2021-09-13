import React from 'react';
import firebase from '../Firebase.js';
import { useState } from "react";

const Profile = () => {
    var users = [];
    const [usersList, setUsersList] = useState(users);

    firebase.firestore().collection('Users').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            firebase.firestore().collection('Users').doc(doc.id).get().then((querySnapshotSubCollection) => {
                var user = [];
                user.push(querySnapshotSubCollection.data().id);
                user.push(querySnapshotSubCollection.data().name);
                users.push(user);
                //setUsersList([...users, user]);
            });
        });
    });

    return (
        <div className="container">
            <h1>ユーザ一覧</h1>
            {console.log(usersList.length)}
            {usersList.map((user) => 
                <a href="/message/${user[0]}">{user[1]}<br /></a>
            )}
            {/* <a href="/message/1"><br />佐藤</a>
            <a href="/message/2"><br />鈴木</a>
            <a href="/message/3"><br />渡辺</a> */}
        </div>
    );
};

export default Profile;