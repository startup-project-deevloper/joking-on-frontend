import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import {getStrapiURL} from '../lib/strapi';
import { AuthContext } from "./auth";

export const LaughContext = createContext(null);

const sessionSkeleton = {
  session: { id: 0, user: { id: 0 }, sessionNonce: "" },
};

export const LaughProvider = ({ children }) => {
  const { user, beforeLogout, setBeforeLogout, getToken } = useContext(AuthContext);
  
  const [focalPoint, setFocalPoint] = useState(null);
  const [getStreamTime, setGetStreamTime] = useState(null);

  const [record, setRecord] = useState();
  const [stop, setStop] = useState();
  const [remove, setRemove] = useState();
  const [save, setSave] = useState();

  const [timer, setTimer] = useState(null);

  const [session, setSession] = useState(sessionSkeleton);

  const [currentPreppedStrapiLaughPoint, setCurrentPreppedStrapiLaughPoint] =
    useState(null);

  const finalizeSession = useCallback(async () => {
    stop();
    save();

    setSession({ session: { isFinished: true, ...session } });

    await axios({
      method: "put",
      url: getStrapiURL(`laughSessions/${session.id}`),
      data: { session: session },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    disposeOfUnusedStrapiLaughPoint();

    setCurrentPreppedStrapiLaughPoint(null);

    setSession(sessionSkeleton);
    
    remove();
  }, [
    setSession,
    setCurrentPreppedStrapiLaughPoint,
    session,
    stop,
    save,
    remove,
    disposeOfUnusedStrapiLaughPoint,
    getToken,
  ]);

  setBeforeLogout([...beforeLogout, finalizeSession]);

  const initializeSession = useCallback(async () => {
      try{
        record();
        
        setSession(
          (
            await axios({
              method: "post",
              url: getStrapiURL(`laughSessions`),
              data: { user: user.id },
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${await getToken()}`,
              },
            })
          ).data.session[0]
        );
      } catch(err){
        console.log(err)
      }
  }, [user, record, setSession]);

  const updateSession = useCallback(async () => {
    if(focalPoint) {
      await axios({
        method: "put",
        url: getStrapiURL(`laughSessions/${session.id}`),
        data: {session:session, focalPoint: focalPoint.id},
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        }
      });
    }
  }, [session, getToken, focalPoint]);

  const prepStrapiLaughPoint = useCallback(async () => {
    try{
      return await axios({
        method: "post",
        url: getStrapiURL(`laughPoints`),
        data: { session: session.id, user: user.id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
    } catch(e){
      console.log(e);
    }
  }, [session, user, getToken]);

  const checkHasLaughedAtBefore = useCallback(async (video) => {
    const { data } = await axios({
      method: 'get',
      url: getStrapiURL(`laughPoints?user=${user.id}&video=${video.id}`),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
      data: { focalPoint: focalPoint.id } ,
    });
    return data.length > 0;
  }, [user, getToken, focalPoint]);

  const submitCurrentPreppedStrapiLaughPoint = useCallback(async () => {
    if(focalPoint) {
      await axios({
        method: "put",
        url: getStrapiURL(`laughPoints/${currentPreppedStrapiLaughPoint.id}`),
        data: { ...currentPreppedStrapiLaughPoint, focalPoint: focalPoint.id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      setCurrentPreppedStrapiLaughPoint(
        (await prepStrapiLaughPoint()).data.laughPoint[0]
      );
    }
  }, [currentPreppedStrapiLaughPoint, focalPoint, getToken, prepStrapiLaughPoint, setCurrentPreppedStrapiLaughPoint]);

  const disposeOfUnusedStrapiLaughPoint = useCallback(async () => {
    currentPreppedStrapiLaughPoint
      ? await axios({
          method: "delete",
          url: getStrapiURL(`laughPoints/${currentPreppedStrapiLaughPoint.id}`),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          }
      })
      : null;
  }, [currentPreppedStrapiLaughPoint, getToken]);

  useEffect(async () => {
    if (session.pipeId === 0) {
      PipeSDK.insert(
        "PipeSDK",
        {
          accountHash: process.env.NEXT_PUBLIC_PIPE_ACCOUNT_HASH,
          eid: 1,
          showMenu: "false",
          mrt: 30000,
          ao: 1,
          payload: { sessionNonce: session.sessionNonce, user: {id: user.id} },
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
      await initializeSession();
    } else if (!currentPreppedStrapiLaughPoint) {
      setCurrentPreppedStrapiLaughPoint(
        (await prepStrapiLaughPoint()).data.laughPoint[0]
      );
    }

    if (session.id !== 0 || !timer) {
      timer = setTimeout(() => {
        await finalizeSession();
        setTimer(null);
      }, 30000);
    }

    return () => {
      if(timer) {
        clearTimeout(timer);
      }
      setFocalPoint(null);
    };
  }, [user, currentPreppedStrapiLaughPoint, timer, focalPoint, setTimer, prepStrapiLaughPoint, finalizeSession, setCurrentPreppedStrapiLaughPoint, getStreamTime, initializeSession, session]);

  return (
    <LaughContext.Provider
      value={{
        session,
        focalPoint,
        setFocalPoint,
        updateSession,
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