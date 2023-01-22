import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import BootstrapNav from "./BootstrapNav";

function MyNavbar(props) {
  const [arrowDown, setArrow] = useState(false);

  const arrowClickHandler = () => {
    setArrow((arrowPrev) => !arrowPrev);
  };

  const formClickHandler = () =>{
    props.onShow()
  }

  return (
    <div className="mainDiv">
      {arrowDown && <FontAwesomeIcon className="fa-2x icon" icon="fa-solid fa-circle-down fa-5x" onClick={arrowClickHandler} />}
      {!arrowDown && 
        <>
          <BootstrapNav onShow = {formClickHandler}/>
          <FontAwesomeIcon className="fa-2x icon" icon="fa-solid fa-circle-up fa-5x" onClick={arrowClickHandler} />
        </>
      }

    </div>
  );
}

export default MyNavbar;
