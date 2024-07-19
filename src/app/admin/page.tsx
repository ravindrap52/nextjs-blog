import BlogsList from "@/components/BlogsList";
import CreateBlog from "@/components/CreateBlogPost";

export default function Admin() {
    return(
        <div>
            <BlogsList />
            <br />
            <h1>Create New blog post</h1>
            <CreateBlog />
        </div>
    )
}