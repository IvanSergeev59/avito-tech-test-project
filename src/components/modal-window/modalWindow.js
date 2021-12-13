import React, { useContext, useState } from "react";
import { ImagesContext } from "../../context/images/imagesContext";
import close from '../../images/close.png';
import Header from "../header";
import Images from "../images";
import Footer from "../footer/footer";

const ModalWindow = () => {
    const {modalImage, modalDisplay, closeModalWindow, modalComments, modalLoading, addCommentToImage, modalError, changeOverlayStatus} = useContext(ImagesContext);

    //user click on close button
    const onCloseButton = () => {
        closeModalWindow();
        changeOverlayStatus('overlay-hide');
        document.getElementsByName('body')[0].classList.toggle('hystmodal__opened');
    }

    //useEffect of overlay winodw (show or hide)
    const [valueError, setValueError] = useState('');

    const setDefaultFormsValue = (valueForm) => {
        valueForm.userName.value = '';
        valueForm.userComment.value = '';
    }

    const setErrorText= () => {
        setValueError(<p className="_red-form">Заполните оба поля</p>)
    }

    let comments = {};
    const getComments = (valueForm) => {
        comments = {date: valueForm.userName.value, text: valueForm.userComment.value}
        if (comments.date.length>0 && comments.text.length>0) return true
    }

    // submit button
    const onClickSubmit = (event) => {
        event.preventDefault();       
        const valueForm = event.target.parentNode.elements;     
        
        // check length of inputs
        if(getComments(valueForm)){
            addCommentToImage(comments);
            setValueError('')
            setDefaultFormsValue(valueForm)           
        }
        else setErrorText()
    }
    
    const onChangeInputs = (event) => {
        const valueForm = event.target.parentNode.parentNode.elements;    
        if(getComments(valueForm)){ 
           setValueError('')
        } 
        else setErrorText() 
    }
    
    const CommentsCointainer = () => {
        return (            
                modalComments.map(item => { return (                    
                        <div className="_right-side_comment" key={item.id}>
                            <p className="_comment_date" >{item.date}</p>
                            <p className="_comment_text">{item.text}</p>
                        </div>                    
                )})                
        )
    }

    const ModalError = () => {
        return (
            <div>
            {modalError &&  <p>Ошибка загрузки</p>}
            </div>
        )
       
    }

    return (           
        <React.Fragment>                                            
            {modalDisplay ?                            
                <div className="modalWindow">
                    <div className="_left-side">
                        <ModalError />
                        {modalLoading || modalError
                        ?
                            <div className="lds-dual-ring"></div>
                        : <img src={modalImage} alt="big"/>  
                        }
                         <div className="_right-side">
                        <CommentsCointainer />  
                        </div>
                        <form className="_left-side_form">
                            <p className="_form_input"><input placeholder="Ваше имя" name="userName" onChange={onChangeInputs}></input></p>
                            <p className="_form_input"><input placeholder="Ваш комментарий" name="userComment" onChange={onChangeInputs}></input></p>
                            {valueError}
                            <input type="submit" className="_form_submit" onClick={onClickSubmit} disable="true" value="Оставить комментарий "></input>
                        </form>                   
                    </div>
                    <div className="_modalWindow_close" onClick={onCloseButton}>
                        <img src={close}   alt="close" />
                    </div>                                
                </div> 
            :null}  
            <Header />
            <Images />        
            <Footer />
        </React.Fragment>
        
    )
}

export default ModalWindow