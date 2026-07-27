import React, { useEffect,useState }  from 'react'
import { useNavigate,useParams,Link} from 'react-router-dom';
import appwriteservice from "../appwrite/config"
import {Button,Container} from "../components/index";
import parse from "html-react-parser";
import { useSelector } from 'react-redux'; 
import {FixedSizeList as List} from "react-window"
import InfiniteLoader from "react-window-infinite-loader";
export default function Post() {
    const [post,setPost]= useState(null);
    const { slug }= useParams();
    const navigate= useNavigate()
    const userData=useSelector((state) => state.auth.userData);
    const isAuthor=post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(slug){
            appwriteservice.getPost(slug).then((post)=>{
                if(post) setPost(post);
                else navigate("/");
            });
        } else navigate("/")
    }, [slug,navigate]);
    
    const deletePost=()=>{
        appwriteservice.deletePost(post.$id).then((status) => {
            if(status){
                appwriteservice.deleteFile(post.featuredImage)
                navigate("/");
            }
        });
    };
    //MORE OPTIMISED CODE FOR SHOWING BLOGS IF ITHE NUMBER IF BLOGS INCREASED.
    const contentArray= post?.content? post.content.split("\n"):[];
    const isitem=(index)=> index < contentArray.length;
    const loadmore= async(start)=>{
        console.log(`Loading items ${start}`);
        return new Promise((resolve)=>setTimeout(resolve,1000));
    };
    const Blog=({index})=>(
        <div className="p-2 border-b">
            {parse(contentArray[index])}
        </div>
    );
return post ? (
<div className="py-8">
        <Container>
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={appwriteservice.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-xl"
                />
            {isAuthor && (
                <div className="absolute right-6 top-6">
                    <Link to={`/edit-post/${post.$id}`}>
                        <Button className="bg-green-500 mr-3">
                            Edit
                        </Button>
                    </Link>
                    <Button className="bg-red-500" onClick={deletePost}>
                        Delete
                    </Button>
                </div>
            )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            {/* INITIALIZING INFININTELOADER FOR THE CAUSE */}
            <InfiniteLoader
                isItemLoaded={isitem}
                itemCount={contentArray.length + 5}
                loadMoreItems={loadmore}
            >
                    {({onItemsReferenced,ref})=>(
                <List
                    height={300}
                    width={"100%"}
                    itemCount={contentArray.length }
                    itemSize={50}
                    onItemsRendered={onItemsReferenced}
                    ref={ref}
                >
                    {Blog}
                </List>
)}
            </InfiniteLoader>
        </Container>
</div>
) : null;
}
