import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef(({createBlog}, refs) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }

    const toggleBlogFormVisbility = () => {
        setBlogFormVisible(!blogFormVisible)
    }

    const submitBlogHandler = (e) => {
        e.preventDefault()
        const blogObject = { title, author, url }
        
        createBlog(blogObject)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    useImperativeHandle(refs, () => {
        return {
            toggleBlogFormVisbility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleBlogFormVisbility}>New Note</button>
            </div>
            <div style={showWhenVisible}>
                <h1>Create New</h1>

                <form onSubmit={submitBlogHandler}>
                    <div>
                        Title:
                        <input 
                        type='text'
                        value={title}
                        onChange={({target}) => setTitle(target.value)}
                        name='Title'
                        />
                    </div>
                    
                    <div>
                        Author:
                        <input 
                        type='text'
                        value={author}
                        onChange={({target}) => setAuthor(target.value)}
                        name='Author'
                        />
                    </div>
                    
                    <div>
                        URL:
                        <input 
                        type='text'
                        value={url}
                        onChange={({target}) => setUrl(target.value)}
                        name='Url'
                        />
                    </div>

                    <br />

                    <button type='submit'>Create</button>
                </form>
                <button onClick={toggleBlogFormVisbility}>Cancel</button>
            </div>
        </div>
    )
})

export default BlogForm