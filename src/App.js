import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import { AddNewPost } from './features/posts/AddPostFrom'
import { EditPostFrom } from './features/posts/EditPostForm'

import { PostsList } from './features/posts/PostsList'
import { SinglePostPage } from './features/posts/SinglePostPage'
import { UserPage } from './features/users/UserPage'
import { UsersList } from './features/users/UsersList'
import { fetchUsers } from './features/users/usersSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddNewPost />
                <PostsList />
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/edit/:postId" component={EditPostFrom} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
