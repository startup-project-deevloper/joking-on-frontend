import { useEffect, useReducer, useRef 
} from 'react';

import { AcademicCapIcon, BellIcon, CashIcon, ChatIcon, CogIcon, LogoIcon, ChevronDownIcon, ChevronRightIcon, ClipboardCopyBlankIcon, ClipboardCopyCheckedIcon, CloudUploadIcon, CloudIcon, CollectionsIcon, DollarSymbol, QRCodeIcon, ShareIcon, SortAcendingIcon, SortDecendingIcon, VerifiedIcon  } from '../../public/icons';

//use array to map svg in a memoized way
function reducer(state = {}, action) {
  switch (action.type) {
    default:
      return [...state];
    case BELL:
      return state.payload = action.payload;
  }
}

const NavItem = ({ handleChange, children, type }) => {
  const [state, dispatch] = useReducer()
  function NavItem(props) {
  const [open, setOpen] = useState(false);

  
  return (
    <li>
      <a
        className="fill-current bg-maximum-red"
        handleChange={handleChange}
      >
        {<img src={state.type} alt={} />}
        {children}
      </a>
    </li>
  );
};

export default NavItem;
