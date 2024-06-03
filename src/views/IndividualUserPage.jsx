const IndividualUserPage = ({ userBlogs, blogUser }) => {
  if (!blogUser) {
    return null
  }
  return (
    <div>
      <h1>{blogUser.name}</h1>
      <h3>added blogs</h3>
      <div>
        <ul>
          {userBlogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IndividualUserPage
