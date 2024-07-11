import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, postComment, getCommentsById, getBlogById } from "../api/internal";
import CommentList from "./CommentList";
import Loader from './Loader'

const BlogDetails = () => {
   const [blog, setblog] = useState([]);
   const [comments, setComments] = useState([]);
   const [ownBlog, setOwnBlog] = useState(false);
   const [newComment, setNewComment] = useState('');
   const [reload, setReload] = useState(false);

   const navigate = useNavigate();
   const params = useParams();
   const blogId = params.id;
   const username = useSelector(state => state.user.username);
   const userId = useSelector(state => state.user._id);
   
    useEffect(()=>{
        async function getBlogDetails() {
            const commentResponse = await getCommentsById(blogId);
            if(commentResponse.status === 200){
                setComments(commentResponse.data.data)
            }
            const blogResponse = await  getBlogById(blogId);
            if(blogResponse.status === 200){
                setOwnBlog(username === blogResponse.data.blog.authorUsername);
                setblog(blogResponse.data.blog);
                
            }
        }
        getBlogDetails();
    },[blogId, username]);

   const postCommentHandler = async () =>{
    const data = {
        author : userId,
        blog : blogId,
        content : newComment
    }
    console.log(data);
    const response =await postComment(data);
    if(response.status === 201){
        setNewComment("")
        setReload(!reload);
    }
   }
   const deleteBlogHandler = async () =>{
    const response = await deleteBlog(blogId);
    if(response.status === 200){
     navigate("/");
    }
};
if(blog.length === 0){
    return <Loader text={"Blog Details"}/>
}
  return (
    <section className="max_padd_container flex items-start justify-center flex-col gap-8 pt-32 md:flex-row">

      <div className="flex flex-1 flex-col p-4 bg-slate-500/5 ring-1 ring-slate-900/5 rounded-3xl overflow-hidden cursor-default transition-all duration-300 shadow-sm">
        <h4 className="bold-20 capitalize">{blog.title}</h4>
        <div className="my-3">
            <p>@{blog.authorUsername + " on " + new Date(blog.createdAt).toDateString()}</p>
        </div>
        <div>
            <img src={blog.photo} alt="blogPhoto" className="mb-6 rounded-3xl"/>
        </div>
        <p>{blog.content}</p>
        {ownBlog && (
            <div className="flexStart gap-2 my-6">
                <button onClick={() => navigate(`/blog-update/${blog._id}`)} className="btn_dark_rounded">Edit</button>
                <button onClick={deleteBlogHandler} className="btn_secondary_rounded">Delete</button>
            </div>
        )}
      </div>
      <div className="flex flex-1 ">
        <div>
        <CommentList comments={comments}/>
         <div className="flexCenter gap-x-3">
            <input
            placeholder="comment goes here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="regular-14 py-3 px-5 my-2 outline-none bg-[#e8e8e8] rounded-full shadow-sm"
            />
            <button onClick={postCommentHandler} className="btn_dark_rounded">Post</button>
         </div>
        </div>
      </div>

    </section>
  )
}

export default BlogDetails
