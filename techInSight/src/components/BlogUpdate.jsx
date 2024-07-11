

import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "./TextInput";
import { getBlogById, updateBlog } from "../api/internal";

const BlogUpdate = () => {
  const params = useParams();
  const blogId =  params.id;
  const navigate =useNavigate();


  const [content, setContent]=useState('');
  const [title, setTitle] = useState('');
  const [photo, setPhoto] = useState('');
  const author = useSelector(state => state.user._id)
  const getPhoto = (e) =>{
const file = e.target.files[0];
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onloadend = () =>{
  setPhoto(reader.result);
}
  };

  const updateHandler = async () =>{
    let data;
    if(photo.includes('http')){
      data = {
        author,
        title,
        content,
        blogId
      }
    }else{
      data ={
        author, title, content, photo, blogId
      }
    }
  
   const response = await updateBlog(data);

   if(response.status === 200){
    navigate('/blog');
   }
  };

  useEffect(()=>{
    async function getBlogDetails(){
      const response = await getBlogById(blogId);
      if(response.status === 200){
        setTitle(response.data.blog.title);
        setContent(response.data.blog.content);
        setPhoto(response.data.blog.photo);
      }
    }
    getBlogDetails();
  },[blogId]);

  return (
    <section className="max_padd_container flex flex-col justify-center pt-40">
    <div className="flexCenter flex-col ">
      <h4 className="bold-32 mb-6">Edit a Blog</h4>
      <TextInput 
      type="text"
      name='title'
      placeholder='Title'
      value={title}
      onChange = {(e) =>setTitle(e.target.value)}
      />
      <textarea 
      placeholder="type your content"
      maxLength={400}
      value={content}
      onChange={(e)=>setContent(e.target.value)}
      className="py-3 px-7 m-2 outline-none w-full max-w-[355px] h-full min-h-56 bg-[#f7f7f7] rounded-3xl resize-none"
      />
    <div className="flex flex-col gap-y-3 my-2 w-full max-w-[355px]">
      <div className="flex item-center gap-2">
      <p className="flex flex-1">Choose a photo</p>
      <input 
      type="file"
      name="photo"
      id="photo"
      accept="image/jpg, image/jpeg, image/png"
      onChange={getPhoto}
      className="text-[14px] font-[500] flex flex-[2]"
      />
      </div>
       <img src={photo} height={55} width={77} className="rounded-md"/ >
    </div>
    <button onClick={updateHandler} className="btn_dark_rounded w-[333px] mt-4 disabled:bg-[#333]" disabled={title === '' || content === ''|| photo === ''}>Submit</button>
    </div>
    </section>
  )
}




export default BlogUpdate
