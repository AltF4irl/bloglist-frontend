import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls the createBlog Handler with correct details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
  
    render(<BlogForm createBlog={createBlog} />)
  
    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Author')
    const url = screen.getByPlaceholderText('Url')
    const sendButton = screen.getByText('Create')
  
    await user.type(title, 'Ahmed holala')
    await user.type(author, 'lebronx jamiz')
    await user.type(url, 'hererere')
    await user.click(sendButton)
    console.log(createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Ahmed holala')
    expect(createBlog.mock.calls[0][0].author).toBe('lebronx jamiz')
    expect(createBlog.mock.calls[0][0].url).toBe('hererere')
  })