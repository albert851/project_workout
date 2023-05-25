import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div>
        <h1>404 Page Not Found</h1>
        <Link
          className="login__registrationLink"
          style={{ textDecoration: "none" }}
          to={`/`}
        >
          <p>go to main page</p>
        </Link>
    </div>
  )
}

export default Page404