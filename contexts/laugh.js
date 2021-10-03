import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./auth";

export const LaughContext = createContext(null);

export const LaughProvider = ({ children }) => {
  const { user, beforeLogout, setBeforeLogout } = useContext(AuthContext);
  const [record, setRecord] = useState();
  const [stop, setStop] = useState();
  const [getStreamTime, setGetStreamTime] = useState();
  const [remove, setRemove] = useState();
  const [save, setSave] = useState();
  const [session, setSession] = useState({
    session: { id: 0, user: { id: 0 }, sessionNouce: "" },
  });
  const [recorder, setRecorder] = useState(null);
  const [currentPreppedStrapiLaughPoint, setCurrentPreppedStrapiLaughPoint] =
    useState(null);

  const finalizeSession = useCallback(async () => {
    stop();
    save();
    setSession({ session: { isFinished: true, ...session } });
    await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughSessions/${session.id}`,
      session
    );
    disposeOfUnusedStrapiLaughPoint();
    setCurrentPreppedStrapiLaughPoint(null);
    setSession({
      session: { id: 0, user: { id: 0 }, sessionNouce: "", pipeId: 0 },
    });
    remove();
  }, [setSession, session]);

  setBeforeLogout([...beforeLogout, finalizeSession]);

  const initializeSession = useCallback(async () => {
    try{
    record();
    setSession(
      (
        await axios.post(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughSessions`,
          { user: user.id }
        )
      ).data.session[0]
    );
        } catch(err){
            console.log(err)
        }
  }, []);

  const updateSession = useCallback(async () => {
    await axios.put(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughSessions/${session.id}`,
      session
    );
  }, []);

  const prepStrapiLaughPoint = useCallback(async () => {
    try{
    return await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughPoints`,
      { session: session.id, user: user.id }
    );
    } catch(e){
      console.log(e);
    }
  }, []);

  const checkHasLaughedAtBefore = useCallback(async (video) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughPoints?user=${user.id}&video=${video.id}`
    );
    return data.length > 0;
  }, []);

  const submitCurrentPreppedStrapiLaughPoint = useCallback(async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughPoints`,
      currentPreppedStrapiLaughPoint
    );
    setCurrentPreppedStrapiLaughPoint(null);
    prepareNextStrapiLaughPoint();
  }, []);

  const disposeOfUnusedStrapiLaughPoint = useCallback(async () => {
    currentPreppedStrapiLaughPoint
      ? await axios.delete(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/laughPoints/${currentPreppedStrapiLaughPoint.id}`
        )
      : null;
  }, [currentPreppedStrapiLaughPoint]);

  useEffect(async() => {
    if (session.pipeId === 0) {
      PipeSDK.insert(
        "PipeSDK",
        {
          accountHash: process.env.NEXT_PUBLIC_PIPE_ACCOUNT_HASH,
          eid: 1,
          showMenu: "false",
          mrt: 30000,
          ao: 1,
          payload: { sessionNouce: session.sessionNouce, user: user.id },
        },
        function (recorder) {
          recorder.onReadyToRecord = function (id) {
            setRecord(() => recorder.record());
            setStop(() => recorder.stop());
            setGetStreamTime(() => recorder.getStreamTime());
            setSave(() => recorder.save());
            setRemove(() => {
              recorder.remove();
            });
            setSession({ session: { pipeId: id, ...session } });
          };
        }
      );
    }
    if (session.id === 0) {
      initializeSession();
    } else if (!currentPreppedStrapiLaughPoint) {
      setCurrentPreppedStrapiLaughPoint(
        (await prepStrapiLaughPoint()).data.laughPoint[0]
      );
    }

    let timer;
    if (session.id !== 0) {
      timer = setTimeout(() => {
        finalizeSession();
      }, 30000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [user, currentPreppedStrapiLaughPoint, session]);

  return (
    <LaughContext.Provider
      value={{
        session,
        currentPreppedStrapiLaughPoint,
        submitCurrentPreppedStrapiLaughPoint,
        checkHasLaughedAtBefore,
        getStreamTime,
      }}
    >
      {children}
      <div className="hidden">
        <div id="PipeSDK" />
      </div>
    </LaughContext.Provider>
  );
};
