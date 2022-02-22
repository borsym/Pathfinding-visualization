import { AiOutlineClose } from "react-icons/ai";
import Button from "../Button";
import { firebase } from "../../Firebase/firebase";
import React, { useState, useEffect } from "react";

const Profile = (props) => {
  const [user, setUser] = useState({});
  const db = firebase.firestore();

  const SignOut = () => {
    firebase.auth().signOut();
  };

  const getUser = () => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        setUser(doc.data());
      });
  };
  // ez bugos ide kell kitalálni valamit
  // useEffect(() => {
  //   // const updateUser = () => {
  //   getUser();
  //   // };

  //   // setInterval(updateUser, 5000);
  //   // return () => {
  //   //   clearInterval(updateUser);
  //   // };
  // }, []);

  return props.isOpenProfile ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-grey-800 flex justify-center items-center -mt-[90px] z-10">
      <div className="relative p-8 w-full max-w-3xl max-h-[38rem] md:min-h-[24rem] bg-zinc-100 rounded-md border-2 border-black sm:min-w-0 min-h-0">
        <AiOutlineClose
          onClick={() => {
            props.setIsOpenProfile(false);
          }}
          className="cursor-pointer absolute top-5 right-5 w-8 h-8 p-0 z-10"
        />
        <div className="grid place-items-center">
          <div className="text-xl">
            <b>Name:</b> {user.name}
          </div>
          <div className="text-xl">
            <b>Points:</b> {user.points}
          </div>
          <div className="pt-2">
            <Button function={SignOut} name="Sign out" questionSection={true} />
          </div>
          <div className="pt-2">
            <Button
              function={() => {
                props.setIsOpenProfile(false);
                props.setShowModelTutorial(true);
              }}
              name="Help"
              questionSection={true}
            />
          </div>

          <div>
            bugos, idő kell mire frissiti ujra kell tölteni az oldalt, erre majd
            valamit ki kell talani
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
// {db
//     .collection("users")
//     .doc(result.user.uid)
//     .get()
//     .then((result) => {
//       console.log("result", result);
//     })}
export default Profile;
