import { useEffect, useState, useReducer, useRef } from "react";

import {
  ARROWS_EXPAND,
  CHAT,
  CHEVRON_DOWN,
  CHEVRON_RIGHT,
  BELL,
  CLIPBOARD_COPY_BLANK,
  CLIPBOARD_COPY_CHECKED,
  CLOUD_UPLOAD,
  CLOUD,
  COG,
  COLLECTIONS,
  DOLLAR_SYMBOL,
  LOGO,
  QR_CODE,
  SORT_DECENDING,
  SORT_ACENDING,
  STAR,
  VERIFIED,
} from "../constrants/index";

function iconReducer(state = {}, action = { type: false }) {
  switch (action.type) {
    default:
      return new Error();
    case ARROWS_EXPAND:
      return {
        state: {
          payload: ARROWS_EXPAND,
          duration: action.duration,
          type: action.type,
        },
      };
    case CHAT:
      return {
        state: { payload: CHAT, duration: action.duration, type: action.type },
      };
    case BELL:
      return {
        state: { payload: CHAT, duration: action.duration, type: action.type },
      };
    case CHEVRON_DOWN:
      return {
        state: {
          payload: CHEVRON_DOWN,
          duration: action.duration,
          type: action.type,
        },
      };
    case CHEVRON_RIGHT:
      return {
        state: {
          payload: CHEVRON_RIGHT,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLIPBOARD_COPY_BLANK:
      return {
        state: {
          payload: CLIPBOARD_COPY_BLANK,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLIPBOARD_COPY_CHECKED:
      return {
        state: {
          payload: CLIPBOARD_COPY_CHECKED,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLOUD_UPLOAD:
      return {
        state: {
          payload: CLOUD_UPLOAD,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLOUD:
      return {
        state: { payload: CLOUD, duration: action.duration },
        type: action.type,
      };
    case COG:
      return {
        state: { payload: COG, duration: action.duration, type: action.type },
      };
    case COLLECTIONS:
      return {
        state: {
          payload: COLLECTIONS,
          duration: action.duration,
          type: action.type,
        },
      };
    case DOLLAR_SYMBOL:
      return {
        state: {
          payload: DOLLAR_SYMBOL,
          duration: action.duration,
          type: action.type,
        },
      };
    case LOGO:
      return {
        state: { payload: LOGO, duration: action.duration, type: action.type },
      };
    case QR_CODE:
      return {
        state: {
          payload: QR_CODE,
          duration: action.duration,
          type: action.type,
        },
      };
    case SORT_DECENDING:
      return {
        state: {
          payload: SORT_DECENDING,
          duration: action.duration,
          type: action.type,
        },
      };
    case SORT_ACENDING:
      return {
        state: {
          payload: SORT_ACENDING,
          duration: action.duration,
          type: action.type,
        },
      };
    case STAR:
      return {
        state: { payload: STAR, duration: action.duration, type: action.type },
      };
    case VERIFIED:
      return {
        state: { payload: STAR, duration: action.duration, type: action.type },
      };
  }
}

function animationsReducer(state = {}, action = { type: false, duration: 0 }) {
  switch (action.type) {
    default:
      return { ...state };
    case ARROWS_EXPAND:
      return {
        state: {
          payload: ARROWS_EXPAND,
          duration: action.duration,
          type: action.type,
        },
      };
    case BELL:
      return {
        state: { payload: BELL, duration: action.duration, type: action.type },
      };
    case CHAT:
      return {
        state: { payload: CHAT, duration: action.duration, type: action.type },
      };
    case CHEVRON_DOWN:
      return {
        state: {
          payload: CHEVRON_DOWN,
          duration: action.duration,
          type: action.type,
        },
      };
    case CHEVRON_RIGHT:
      return {
        state: {
          payload: CHEVRON_RIGHT,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLIPBOARD_COPY_BLANK:
      return {
        state: {
          payload: CLIPBOARD_COPY_BLANK,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLIPBOARD_COPY_CHECKED:
      return {
        state: {
          payload: CLIPBOARD_COPY_CHECKED,
          duration: action.duration,
          type: action.type,
        },
        state: {
          payload: CLIPBOARD_COPY_CHECKED,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLOUD_UPLOAD:
      return {
        state: {
          payload: CLOUD_UPLOAD,
          duration: action.duration,
          type: action.type,
        },
      };
    case CLOUD:
      return {
        state: { payload: CLOUD, duration: action.duration, type: action.type },
      };
    case COG:
      return {
        state: { payload: COG, duration: action.duration, type: action.type },
      };
    case COLLECTIONS:
      return {
        state: {
          payload: COLLECTIONS,
          duration: action.duration,
          type: action.type,
        },
      };
    case DOLLAR_SYMBOL:
      return {
        state: {
          payload: DOLLAR_SYMBOL,
          duration: action.duration,
          type: action.type,
        },
      };
    case LOGO:
      return {
        state: { payload: LOGO, duration: action.duration, type: action.type },
      };
    case QR_CODE:
      return {
        state: {
          payload: QR_CODE,
          duration: action.duration,
          type: action.type,
        },
      };
    case SORT_DECENDING:
      return {
        state: {
          payload: SORT_DECENDING,
          duration: action.duration,
          type: action.type,
        },
      };
    case SORT_ACENDING:
      return {
        state: {
          payload: SORT_ACENDING,
          duration: action.duration,
          type: action.type,
        },
      };
    case STAR:
      return {
        state: { payload: STAR, duration: action.duration, type: action.type },
      };
    case VERIFIED:
      return {
        state: {
          payload: VERIFIED,
          duration: action.duration,
          type: action.type,
        },
      };
  }
}

export default function NavItem({ handleChange, children, type }) {
  const [modeState, modeDispatch] = useReducer(modeReducer, {
    state: {
      type: CHAT,
      payload: "fillCurrent animate-bounce text-blue-600",
      duration: 1000,
    },
  });

  const [animationState, animationsDispatch] = useReducer(animationsReducer, {
    state: {
      type: BELL,
      payload: "fillCurrent animate-bounce text-yellow-600",
      duration: 1000,
    },
  });

  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(async () => {
    animationsDispatch({
      type: type,
      payload: animation.payload,
      duration: animation.duration,
    });
    modeDispatch({
      type: type,
      payload: mode.payload,
      duration: mode.duration,
    });
    if (open) {
      await animationsDispatch({
        type: type,
        payload: animation.payload,
        duration: animation.duration,
      });
      await modeDispatch({
        type: type,
        payload: mode.payload,
        duration: mode.duration,
      });
    }

    return () => {
      open = false;
    };
  }, [animation, open, mode]);

  return (
    <li ref={ref}>
      <a
        href="#"
        className={`(fillCurrent ${mode} && text-green-600) && (${animation} && ${animation.payload})`}
        onClick={() => setOpen(!open) && handleChange()}
      >
        {
          <img
            src={mode.payload}
            alt={mode.payload}
            className={mode.payload && animation.payload}
          />
        }
        {open && children}
      </a>
    </li>
  );
}
