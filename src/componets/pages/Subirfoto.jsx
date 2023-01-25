import { useState, useEffect } from "react";
import { stor } from "../../firebaseInicial/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'
//////


function Subirfoto(){
    const imageListRef = ref(stor, "avatar/")
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const uploadImage = () => {
        if (imageUpload == null) return; 
        const imageRef = ref(stor, `avatar/${imageUpload.name + v4()}`)
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("image uploaded")
        })
    };

    useEffect (() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageList((prev) => [...prev, url] )
                })
            });
        });
    }, [])
    
    
    return (
        <div >
            <input type="file" 
            onChange={(e) => {setImageUpload(e.target.files[0])} }
             />
            <button onClick={uploadImage}>
                upload
            </button>
            {imageList.map((url, idx) => {
                return <img key={idx} src={url} />
            })}
        </div>


    );
}
export default Subirfoto


