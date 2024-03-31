import emailjs from "@emailjs/browser";
import React, { useRef } from "react";

const EmailUserDeletion = (e) => {
  var templateParams = {
    status: "success",
    success: "yuz@ac.kr",
    fail: "fail@ac.kr",
  };
  console.log(e);
  const publicKey = "zXxhbxDNbYcoYRm7j";
  const templateID = "template_aafbvk7";
  e.preventDefault();
  console.log("이메일전송클릭");
  emailjs.init({
    publicKey: publicKey,
  });
  emailjs.send('yuz0517yuz@gmail.com', templateID, templateParams).then(
    (res) => {
      console.log("SUCCESS!", res);
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );

  //   return (
  //     <form ref={form}>
  //       <div>EmailUserDeletion</div>
  //     </form>
  //   );
};

export default EmailUserDeletion;
