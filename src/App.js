import React from 'react'
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

function App() {
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
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
