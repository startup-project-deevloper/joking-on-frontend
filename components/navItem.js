import { useEffect, useReducer, useRef } from "react";

function modeReducer(state = {}, action) {
  switch (action.type) {
    default:
      return [...state];
    case ACADEMIC_CAP:
      return { state: { payload: ACADEMIC_CAP, duration: action.duration } };
    case ARROWS_EXPAND:
      return { state: { payload: ARROWS_EXPAND, duration: action.duration } };
    case CHAT:
      return { state: { payload: CHAT, duration: action.duration } };
    case CHEVRON_DOWN:
      return { state: { payload: CHEVRON_DOWN, duration: action.duration } };
    case CHEVRON_RIGHT:
      return { state: { payload: CHEVRON_RIGHT, duration: action.duration } };
    case CLIPBOARD_COPY_BLANK:
      return {
        state: { payload: CLIPBOARD_COPY_BLANK, duration: action.duration },
      };
    case CLIPBOARD_COPY_CHECKED:
      return {
        state: { payload: CLIPBOARD_COPY_CHECKED, duration: action.duration },
      };
    case CLOUD_UPLOAD:
      return { state: { payload: CLOUD_UPLOAD, duration: action.duration } };
    case CLOUD:
      return { state: { payload: CLOUD, duration: action.duration } };
    case COG:
      return { state: { payload: COG, duration: action.duration } };
    case COLLECTIONS:
      return { state: { payload: COLLECTIONS, duration: action.duration } };
    case DOLLAR_SYMBOL:
      return { state: { payload: DOLLAR_SYMBOL, duration: action.duration } };
    case LOGO:
      return { state: { payload: LOGO, duration: action.duration } };
    case QR_CODE:
      return { state: { payload: QR_CODE, duration: action.duration } };
    case SORT_DECENDING:
      return { state: { payload: SORT_DECENDING, duration: action.duration } };
    case SORT_ACENDING:
      return { state: { payload: SORT_ACENDING, duration: action.duration } };
    case STAR:
      return { state: { payload: STAR, duration: action.duration } };
    case VERIFIED:
      return { state: { payload: STAR, duration: action.duration } };
  }
}

function animationsReducer(state = {}, action) {
  switch (action.type) {
    default:
      return [...state];
    case ACADEMIC_CAP:
      return { state: { payload: ACADEMIC_CAP, duration: action.duration } };
    case ARROWS_EXPAND:
      return { state: { payload: ARROWS_EXPAND, duration: action.duration } };
    case CHAT:
      return { state: { payload: CHAT, duration: action.duration } };
    case CHEVRON_DOWN:
      return { state: { payload: CHEVRON_DOWN, duration: action.duration } };
    case CHEVRON_RIGHT:
      return { state: { payload: CHEVRON_RIGHT, duration: action.duration } };
    case CLIPBOARD_COPY_BLANK:
      return {
        state: { payload: CLIPBOARD_COPY_BLANK, duration: action.duration },
      };
    case CLIPBOARD_COPY_CHECKED:
      return {
        state: { payload: CLIPBOARD_COPY_CHECKED, duration: action.duration },
      };
    case CLOUD_UPLOAD:
      return { state: { payload: CLOUD_UPLOAD, duration: action.duration } };
    case CLOUD:
      return { state: { payload: CLOUD, duration: action.duration } };
    case COG:
      return { state: { payload: COG, duration: action.duration } };
    case COLLECTIONS:
      return { state: { payload: COLLECTIONS, duration: action.duration } };
    case DOLLAR_SYMBOL:
      return { state: { payload: DOLLAR_SYMBOL, duration: action.duration } };
    case LOGO:
      return { state: { payload: LOGO, duration: action.duration } };
    case QR_CODE:
      return { state: { payload: QR_CODE, duration: action.duration } };
    case SORT_DECENDING:
      return { state: { payload: SORT_DECENDING, duration: action.duration } };
    case SORT_ACENDING:
      return { state: { payload: SORT_ACENDING, duration: action.duration } };
    case STAR:
      return { state: { payload: STAR, duration: action.duration } };
    case VERIFIED:
      return { state: { payload: STAR, duration: action.duration } };
  }
}

export default function NavItem({ handleChange, children, type }) {
  const [mode, modeDispatch] = useReducer(modeReducer({}), {
    state: {
      payload: "fillCurrent text-blue-600",
      duration: 1000,
    },
  });

  const [animation, animationsDispatch] = useReducer(animationsReducer(), {
    state: { payload: "fillCurrent text-blue-600", duration: 1000 },
  });

  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(async () => {
    if (open) {
      await animationsDispatch({
        payload: animation.payload,
        duration: animation.duration,
      });
      await modeDispatch({
        payload: mode.payload,
        duration: mode.duration,
      });
    }

    return (open = false) => {
      return open;
    };
  }, [animation, open, mode, animationsDispatch, modeDispatch]);

  return (
    <li ref={ref}>
      <a
        href="#"
        className={`(fillCurrent ${mode} && ${mode.payload}) && (${animation} && ${animation.payload})`}
        onClick={() => setOpen(!open)}
      >
        {
          <img
            src={mode.payload}
            alt={mode.payload}
            className={mode.payload && animation.payload && duration}
          />
        }
        {open && children}
      </a>
    </li>
  );
}
