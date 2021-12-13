import React from "react";
import { ImagesState } from "../../context/images/imagesState";
import ModalWindow from "../modal-window/modalWindow";

const App = () => {
 
  return (
      <ImagesState>
        <ModalWindow>        
        </ModalWindow>
      </ImagesState>
  );
}

export default App;