import React from "react";
import Header from "../header";
import Images from "../images";
import Footer from "../footer/footer";
import { ImagesState } from "../../context/images/imagesState";
import ModalWindow from "../modal-window/modalWindow";

const App = () => {
 
  return (
      <ImagesState>
        <Header />
        <Images />
        <ModalWindow />
        <Footer />
      </ImagesState>
  );
}

export default App;