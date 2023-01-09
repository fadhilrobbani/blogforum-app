import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import Spinner from '../../components/Spinner';

interface Blogs {
  blogs:
    | {
        userId: number;
        id: number;
        title: string;
        body: string;
      }[]
    | null;
}
export default function Blogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blogs['blogs']>(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const blogs: Blogs['blogs'] = await res.json();
      setBlogs(blogs);
    };
    fetchBlogs();
  }, [blogs]);
  if (!blogs)
    return (
      <Layout pageTitle="Blogs">
        <Spinner />
      </Layout>
    );
  return (
    <Layout pageTitle="Blogs">
      <div>
        <div className="grid grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="m-2 p-2 shadow-md bg-slate-50 cursor-pointer hover:scale-105 transition duration-150"
              onClick={() => router.push(`/blogs/${blog.id}`)}
            >
              <p className="font-bold text-lg">{blog.title}</p>
              <p className="line-clamp-3">{blog.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
