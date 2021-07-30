import { useEffect, useReducer, useRef } from "react";

import { getCloudinaryURL } from "../lib/cloudinary";

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

function masterReducer(state, action) {
  switch (action.path) {
    case ANIMATION:
      return iconAnimationReducer(action);
    case ICON:
      return iconReducer(action);
    default:
      return new Error();
  }
}

function iconReducer(state, action = { type: false }) {
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

function iconAnimationReducer(state, action = { type: false, duration: 0 }) {
  switch (action.type) {
    default:
      return new Error();
    case ARROWS_EXPAND:
      return {
        state: {
          payload: getCloudinaryURL(ARROWS_EXPAND),
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

export default function useIcon({ type, dimensions, handleChange }) {
  const instance = useRef(null);

  const [iconState, iconDispatch] = useReducer(iconReducer, {
    state: {
      type: type,
      className: "fillCurrent animate-bounce text-blue-600",
      height: dimensions.height,
      width: dimensions.width,
    },
  });

  const [iconAnimationState, iconAnimationDispatch] = useReducer(
    iconAnimationReducer,
    {
      state: {
        type: type,
        duration: 1000,
        height: dimensions.height,
        width: dimensions.width,
      },
    }
  );

  const [masterState, masterDispatch] = useReducer(masterReducer, {
    state: { type: false },
  });

  return [
    <img
      src={iconState.state.type}
      className={iconState.state.className}
      width={iconState.state.width}
      height={iconState.state.height}
      onChange={() => handleChange()}
      aria-label={iconState.state.type}
    />,
    dispatch,
  ];
}
