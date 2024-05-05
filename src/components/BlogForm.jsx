import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef(({
    onBlogSubmit, 
    title, 
    author, 
    url,
    titleChange,
    authorChange,
    urlChange,
}, refs) => {
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }

    const toggleBlogFormVisbility = () => {
        setBlogFormVisible(!blogFormVisible)
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

                <form onSubmit={onBlogSubmit}>
                    <div>
                        Title:
                        <input 
                        type='text'
                        value={title}
                        onChange={titleChange}
                        name='Title'
                        />
                    </div>
                    
                    <div>
                        Author:
                        <input 
                        type='text'
                        value={author}
                        onChange={authorChange}
                        name='Author'
                        />
                    </div>
                    
                    <div>
                        URL:
                        <input 
                        type='text'
                        value={url}
                        onChange={urlChange}
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