import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import useFetch from './useFetch'


const BlogDetails = () => {

    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('  http://localhost:8000/blogs/' + id)
    const history = useHistory()

    const [isEditing, setIsEditing] = useState(false)


    // Handle Delete
    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/'+ blog.id,{
            method:'DELETE'
        })
        .then(() => {
            history.push('/')
        })
    }

    // Handle Edit And Save
    let title =  document.querySelector('.blog-title')
    let body =  document.querySelector('.blog-body')


    const handleEdit = () => {
        title.contentEditable=true;
        body.contentEditable=true;
        setIsEditing(true)
    }

    const handleSave = () => {
        title.contentEditable=false;
        body.contentEditable=false;
        setIsEditing(false)
        
        const editedBlog = {...blog,title: title.textContent, body:body.textContent} 
        console.log(editedBlog)

        fetch('http://localhost:8000/blogs/'+ blog.id,{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(editedBlog)
        })
        .then(() => {
            history.push('/blogs/'+blog.id)
        })
      
    }

    return (
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2 className='blog-title'>{blog.title}</h2>
                    <div className='blog-body'>{blog.body}</div>
                    <button onClick={handleDelete}>Delete Blog</button>
                    {!isEditing && <button
                    style={{
                        marginLeft:'25px'
                    }}
                    onClick={handleEdit}
                    >Edit Blog</button>}
                    {isEditing && <button onClick={handleSave}
                    style={{
                        marginLeft:'25px'
                    }}
                    >Save</button>}
                </article>
            )}
        </div>
    )
}

export default BlogDetails

