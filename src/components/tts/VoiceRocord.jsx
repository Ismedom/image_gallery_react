import React, { useEffect, useRef, useState, useCallback } from "react";
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
  const overay = useRef(null);
  const recognitionRef = useRef(null);

  const recognitionCheck = window.SpeechRecognition || window.webkitSpeechRecognition;

  useEffect(() => {
    const timeoutFuc = setTimeout(() => setIsTimeout(true), 5000);
    return () => clearTimeout(timeoutFuc);
  }, []);

  useEffect(() => {
    if (activePop && searchValue === "") {
      const timeout = setTimeout(() => handleClose(), 5000);
      return () => clearTimeout(timeout);
    }
  }, [activePop, searchValue]);

  const handleClose = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setActivePop(false);
    setSound(false);
  }, []);

  const handleSearchAndClose = useCallback(
    (finalResult) => {
      handleClose();
      setSearchValue(finalResult);
      searchFu();
    },
    [handleClose, setSearchValue, searchFu]
  );

  const handleClick = useCallback(() => {
    setSound(false);
    setResult("");
    setActivePop(true);
    setSearchValue("");

    if (recognitionCheck) {
      recognitionRef.current = new recognitionCheck();
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        const formattedTranscript = transcript.endsWith(".") ? transcript.slice(0, -1) : transcript;

        setResult(formattedTranscript);
        setSearchValue(formattedTranscript);
      };

      recognitionRef.current.onsoundend = (e) => {
        setSound(true);
        setTime(e.timeStamp);
      };

      recognitionRef.current.start();
    }
  }, [setSearchValue]);

  useEffect(() => {
    const shortcutToOpenVoice = (e) => {
      if (e.altKey && e.key === "r") handleClick();
    };
    window.addEventListener("keydown", shortcutToOpenVoice);
    return () => window.removeEventListener("keydown", shortcutToOpenVoice);
  }, [handleClick]);

  if (!navigator.onLine) return null;
  if (!recognitionCheck) {
    return (
      <div
        className={`absolute top-[75px] left-[50%] -translate-x-1/2 w-full text-center bg-white pb-2 ${
          isTimeout ? "hidden" : ""
        }`}>
        Your browser does not support speech recognition!
      </div>
    );
  }

  return (
    <div>
      <FontAwesomeIcon
        ref={microphone}
        icon={faMicrophone}
        onClick={handleClick}
        title="Voice to search! (alt + r)"
        className="px-3 py-2 hover:bg-green-400 hover:text-white rounded-full cursor-pointer select-none text-gray-600"
      />
      {activePop && (
        <div
          ref={overay}
          onClick={(e) => {
            if (e.target === overay.current) {
              handleClose();
            }
          }}
          className="fixed top-0 right-0 bottom-0 left-0 flex justify-center items-center"
          style={{ background: "rgb(0,0,0,.5)" }}>
          <PopUpVoice
            {...{
              handleClose,
              result,
              onSearch: handleSearchAndClose,
              sound,
              time,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default VoiceRocord;
