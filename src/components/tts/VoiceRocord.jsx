import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import PopUpVoice from "./PopUpVoice";

const VoiceRocord = ({ searchValue, setSearchValue, searchFu }) => {
  const [activePop, setActivePop] = useState(false);
  const [result, setResult] = useState("");
  const [sound, setSound] = useState(false);
  const [time, setTime] = useState(0);
  const [isTimeout, setIsTimeout] = useState(false);
  const microphone = useRef(null);
  const recognitionCheck = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    const timeoutFuc = setTimeout(() => {
      setIsTimeout(true);
    }, 2500);
    return () => clearTimeout(timeoutFuc);
  }, []);

  useEffect(() => {
    if (activePop && searchValue == "") {
      const timeout = setTimeout(() => {
        handleClose();
        setActivePop(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [activePop, searchValue]);

  // function autoCloseTTS(handler) {
  //   if (searchValue === "") handler();
  // }
  //
  if (!navigator.onLine) return;
  if (!recognitionCheck)
    return (
      <div
        className={`absolute top-[75px] left-[50%] -translate-x-1/2 w-full text-center bg-white pb-2 ${
          isTimeout ? "hidden" : ""
        }`}>
        Your browser not text to speech!
      </div>
    );
  //
  const recognition = new recognitionCheck();
  recognition.lang = "en-US";

  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onsoundend = (e) => {
    setSound(true);
    setTime(e.timeStamp);
  };

  useEffect(() => {
    const shortcutToOpenVoice = (e) => {
      if (e.altKey && e.keyCode === 82) {
        handleClick();
      }
    };
    window.addEventListener("keydown", shortcutToOpenVoice);
    return () => window.removeEventListener("keydown", shortcutToOpenVoice);
  }, []);

  recognition.onresult = function (event) {
    const transcript = event.results[event.results.length - 1][0].transcript;

    if (transcript.charAt(transcript.length - 1).includes(".")) {
      const formatingTranscript = transcript.slice(0, transcript.length - 1);
      setSearchValue(formatingTranscript);
      setResult(formatingTranscript);
    } else {
      setSearchValue(transcript);
      setResult(transcript);
    }
  };

  useEffect(() => {
    return () => {
      recognition.onresult = null;
    };
  }, []);

  //
  function handleClick() {
    setSound(false);
    setResult("");
    setActivePop(true);
    recognition.start();
  }
  function handleClose() {
    recognition.stop();
  }

  return (
    <div>
      <FontAwesomeIcon
        ref={microphone}
        icon={faMicrophone}
        onClick={() => {
          handleClick();
        }}
        title="Voice to search! (alt + r)"
        className="px-3 py-2 hover:bg-green-400 hover:text-white  rounded-full cursor-pointer select-none text-gray-600"
      />
      <div
        className={`fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center ${activePop ? "" : "hidden"}`}
        style={{ background: "rgb(0,0,0,.5)" }}>
        <PopUpVoice {...{ handleClose, setActivePop, result, searchFu, sound, time }} />
      </div>
    </div>
  );
};

export default VoiceRocord;
