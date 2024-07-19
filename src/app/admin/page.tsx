import BlogsList from "@/components/BlogsList";
import CreateBlog from "@/components/CreateBlogPost";

export default function Admin() {
    return(
        <div className="w-3/4 p-6">
          <h1 className="text-3xl font-bold mb-4">List of Blogs</h1>
          <h4 className="text-1xl font-bold mb-4">To Edit a blog, Click on the list</h4>
          <BlogsList />
          <h2 className="text-2xl font-bold mb-4">Create a Blog</h2>
          <CreateBlog />
        </div>
    )
}