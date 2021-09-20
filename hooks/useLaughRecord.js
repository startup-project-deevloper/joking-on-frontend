import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { LaughContext } from "../contexts/laugh";
import { AuthContext } from "../contexts/auth";
import * as ml5 from "ml5";

const useLaughRecord = (video) => {
  const { user } = useContext(AuthContext);
  const laughInput = useRef(null);
  const {
    sessionId,
    currentPreppedStrapiLaughPoint,
    submitCurrentPreppedStrapiLaughPoint,
    checkHasLaughedAtBefore,
    getStreamTime,
  } = useContext(LaughContext);
  const classifier = ml5.soundClassifier(
    "http://localhost:1337/model/laugh" ||
      "https://www.jokingon.com/model/laugh",
    modelReady
  );

  const modelReady = (currentSection) => {
    classifier.classify(currentSection);
  };
  const [recorder, setRecorder] = useState(null);
  const [isFocalPoint, setIsFocalPoint] = useState(false);
  const [laughPointArray, setLaughPointArray] = useState([]);

  const handleDataAvailable = useCallback(async () => {
    recorder.start();
    while (!video.paused && isFocalPoint) {
      const currentTime = await getStreamTime();
      const currentSection = await modelReady(recorder.get);
      const currentLaughPoint = {
        currentTime,
        currentSection,
      };
      setLaughPointArray((prevState) => [...prevState, currentLaughPoint]);
    }
  }, [classifier]);

  useEffect(() => {
    if (!laughInput.current) {
      laughInput.current = await navigator.mediaDevices.getUserMedia();
      if (isFocalPoint && !video.paused) {
        let temp = new MediaRecorder(laughInput.current, {
          mimeType: "audio/mp4",
        }).;
        setRecorder(temp);
        temp.ondataavailable("dataavailable", handleDataAvailable);
      }
    } else if (!isFocalPoint || video.paused) {
      laughInput.current.stop();
      laughInput.current = null;
    }
  }, [sessionId, currentPreppedStrapiLaughPoint, isFocalPoint]);

  const hasFired = useCallback(() => {
    return checkHasLaughedBefore(contentId) || laughPointArray.length > 0;
  }, [sessionId, preppedStrapiLaughPoint]);

  return {
    hasFired,
    setIsFocalPoint,
  };
};

export default useAuth;
