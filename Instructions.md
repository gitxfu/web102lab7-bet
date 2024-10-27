# Lab7

### Step 0: Explore the Starter Code

For this lab, we provide you with the front-end of this web 
application so that you can focus on setting up the database and 
performing the CRUD operations. In this step, download the starter code 
and explore the interface.

- [ ]  Download the starter code by downloading the file from this [Unit 7 GitHub Repo](https://github.com/codepath/web102_unit7lab)
- [ ]  Move the downloaded file into the repository you created for this project.
- [ ]  Start the React app:
    - [ ]  Using the Terminal, navigate into the `client` directory.
    - [ ]  To install the dependencies, enter the command `npm install` into the Terminal.
    - [ ]  To start the app, enter the command `npm start` into the Terminal.
- [ ]  Explore the application to familiarize yourself with the user interface.

📍**Checkpoint 0**: At this point in the lab, your app should look like this ⤵️

### Step 1: Sign Up for Supabase

In this step, sign up for Supabase and begin setting up the database for the web application.

**🤖 AI Pro Tip: Using AI to Explore New Concepts**

- [ ]  Go to the [Supabase website](https://supabase.com/)
- [ ]  Sign up for a Supabase account:
    - [ ]  Click the green "Start your project" button.
    - [ ]  At the bottom of the sign-in form, click the "Sign Up Now" link.
    - [ ]  Create an account using your GitHub credentials by clicking the "Continue with GitHub" button.
- [ ]  Create a new project:
    - [ ]  Click the green "New Project" button to create a new project
    - [ ]  Set the name of your project to `bet` and create a database password
    - [ ]  Click the green "Create new project" button to submit to form
    - [ ]  After submitting the form, give Supabase a few minutes to setup your project

📍**Checkpoint 1**: At this point in the lab, the page in your browser should look like this ⤵️

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/47aac019-5a81-407d-a83c-d2c7952b9b46/9fd49831-8643-4ea0-a46c-0f472c92fc88/Untitled.png)

`App.js`

```jsx
import "./App.css";
import React from "react";
import { useRoutes } from "react-router-dom";
import ReadPosts from "./pages/ReadPosts";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import { Link } from "react-router-dom";

const App = () => {
  const descr =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

  const posts = [
    {
      id: "1",
      title: "Cartwheel in Chelsea 🤸🏽‍♀️",
      author: "Harvey Milian",
      description: descr,
    },
    {
      id: "2",
      title: "Love Lock in Paris 🔒",
      author: "Beauford Delaney",
      description: descr,
    },
    {
      id: "3",
      title: "Wear Pink on Fridays 🎀",
      author: "Onika Tonya",
      description: descr,
    },
    {
      id: "4",
      title: "Adopt a Dog 🐶",
      author: "Denise Michelle",
      description: descr,
    },
  ];

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />,
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />,
    },
    {
      path: "/new",
      element: <CreatePost />,
    },
  ]);

  return (
    <div className="App">
      <div className="header">
        <h1>👍 Bet 1.0</h1>
        <Link to="/">
          <button className="headerBtn"> Explore Challenges 🔍 </button>
        </Link>
        <Link to="/new">
          <button className="headerBtn"> Submit Challenge 🏆 </button>
        </Link>
      </div>
      {element}
    </div>
  );
};

export default App;
```

- At the `/` path, it renders the `<ReadPosts />` component and passes `posts` data to it via a prop named `data`.
- At the `/edit/:id` path, it renders the `<EditPost />` component and passes the same `posts` data to it.
- At the `/new` path, it renders a `<CreatePost />` component.

`element:<ReadPosts data={posts}/>`: This is where the data is passed from the parent component to the child component. The value of `posts` from the parent (`App` component) is being passed to `ReadPosts` as a `data` prop.

`pages/CreatePost.js`

```jsx
import React from 'react';
import './CreatePost.css'

const CreatePost = () => {

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" /><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description">
                </textarea>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost
```

`pages/ReadPost.js`

```jsx
import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const ReadPosts = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(props.data);
  }, [props]);

  return (
    <div className="ReadPosts">
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <Card
            id={post.id}
            title={post.title}
            author={post.author}
            description={post.description}
          />
        ))
      ) : (
        <h2>{"No Challenges Yet 😞"}</h2>
      )}
    </div>
  );
};

export default ReadPosts;
```

`props.data`: This prop is supposed to contain an array of posts that are passed down from a parent component `App.js`.  `useEffect` hook sets the local `posts` state whenever `props.data` changes

`components/Card.js`

```jsx
import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'

const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card;
```

`pages/EditPost.js`

```jsx
import React from "react";
import { useParams } from "react-router-dom";
import "./EditPost.css";

const EditPost = ({ data }) => {
  const { id } = useParams();
  const post = data.filter((item) => item.id === id)[0];

  return (
    <div>
      <form>
        <label for="title">Title</label> <br />
        <input type="text" id="title" name="title" value={post.title} />
        <br />
        <br />
        <label for="author">Author</label>
        <br />
        <input type="text" id="author" name="author" value={post.author} />
        <br />
        <br />
        <label for="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          value={post.description}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
        <button className="deleteButton">Delete</button>
      </form>
    </div>
  );
};

export default EditPost;
```

### Step 2: Set Up the Database

In this step, you will create a new Supabase database for your 
project. For this project, we want to save data for each challenge that 
users post on Bet. Our database needs to store the title, author, 
description, and bet count for each post.

- [ ]  Click the "Database" icon in the left side bar menu
- [ ]  Click the green "New table" button to create a new table in the database
- [ ]  Create a `Posts` table:
    - [ ]  Name the table `Posts`
    - [ ]  Uncheck the option "Enable Row Level Security"
    - [ ]  Check the option "Enable Realtime"
    - [ ]  By default, your table should have a column called `id` and `created_at`. The `id` attribute is a unique identifier for each entry in your database. When a new entry is inserted into the database, Supabase will assign it a new ID number. The `created_at` attribute is a timestamp of whenan entry was inserted into the database. Supabase will automatically
    assign it a timestamp when it is inserted.
        - [ ]  Create a column called `title`. For Type, select `text`.
        - [ ]  Create a column called `author`. For Type, select `text`.
        - [ ]  Create a column called `description`. For Type, select `text`.
        - [ ]  Create a column called `betCount`. For Type, select `numberic`. Set the default value to `0`.
        - [ ]  Click the green "Save" button to save the table.
- [ ]  To view your table, click the "Table Editor" icon in the left side bar 
menu. Then, under all tables and click "Posts". Your table should be 
empty, as we did not add any entries yet into the database.

📍**Checkpoint 2**: At this point in the lab, the page in your browser should look like this ⤵️

### Step 3: Connect to the Database

In this step, you will add the Supabase client to the React application so that we can connect the front-end to the database.

- [ ]  Terminate the React server in the terminal.
- [ ]  Install the Supabase library using the following command:

`npm install @supabase/supabase-js`

- [ ]  To start the application again, enter the command `npm start` into the Terminal.
- [ ]  In the `src` directory, create a JavaScript file called `client.js`. In this file, we will create our Supabase client that will connect our React app to the Supabase database.

📍**Checkpoint 3**: At this point in the lab, the your `client.js` file should look like this

```jsx
import { createClient } from '@supabase/supabase-js'

const URL = 'https://nwzdnbouppgjgjvfwbpg.supabase.co';
const API_KEY = 'xx';

export const supabase = createClient(URL, API_KEY);
```

### Step 4: Create Database Entry

Currently, when a user tries submitting a new challenge, the data does not save to a database.

In this step, we will update the event handler `createPost()` so that it adds a new challenge post to the database when the "Submit New Challenge" form is submitted.

- [ ]  Go to `CreatePost.js` in the `pages` directory.

You initialize state variables to hold the form fields:

`const [post, setPost] = useState({ title: '', author: '', description: '' });`

Define a function (`handleInputChange`) that updates the `post` state whenever an input field changes:

```jsx
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setPost({
    ...post,
    [name]: value
  });
};
```

Here, object destructuring is used to extract `name` and `value` properties from `event.target`, which is the DOM element that triggered the event (in this case, an input field).

- `...post`: This is the spread operator. It takes all existing key-value pairs from the current `post` object and spreads them into the new object. This ensures that any values not being updated by this input change are preserved.
- `[name]: value`: This is computed property name syntax. It means "create a property in this object with a key equal to the value of the `name` variable, and set its value to `value`". Essentially, this will update or add the key-value pair for the field that was changed.

```jsx
const createPost = async (event) => {
  event.preventDefault();
  const { data, error } = await supabase
    .from("Posts")
    .insert({
      title: post.title,
      author: post.author,
      description: post.description,
    })
    .select();

  if (error) {
    console.error("Error inserting:", error);
  } else {
    console.log("Insert:", data);
  }

  // window.location = "/";
};
```

calling `event.preventDefault()` prevents the default action  of the form submission, which is typically to send the form data to a specified URL and refresh the page.

The line `window.location = "/";` navigates the user to the root URL (`/`) of your web application. When this navigation occurs, the whole React application is reloaded, and this is likely causing your browser's console to clear, which is why you might not be able to see logs printed before the navigation.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/47aac019-5a81-407d-a83c-d2c7952b9b46/e9ca6846-31ea-4597-86cc-c9d0d2e5bd94/Untitled.png)

- First, making calls to the Supabase client is an asynchronous operation so we need to include the `await` keyword.
- Next, we use the `.from()` method to specify which table in the project we want to use. In this case, we want to access data "from" the `Posts` table.
- Next, we use the `.insert()` method to indicate that we want to perform an insertion operation (the "create" of CRUD). To the `.insert()` method, we pass an object with the `title`, `post`, and `description` each populated with data from the form.
- Lastly, we included a call to the `.select()` method, which will return the database entry back to use once it has been inserted into the database.

Update your form's inputs to call `handleInputChange` on changes:

```jsx
<form>
  {/* ... */}
  <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} />
  {/* ... */}
  <input type="submit" value="Submit" />
</form>
```

Update the form tag to call `createPost` on submit:

```jsx
<form onSubmit={createPost}>
```

The `onSubmit` attribute is most commonly placed on the `<form>` element because it captures the submit event for the entire form. When a form is submitted—either by clicking a submit button (`<input type="submit">`), pressing Enter while focused on a form input, or through other means—the `onSubmit` event handler attached to the `<form>` element will be triggered. This allows you to perform actions like validation or sending the form data to a server.

In contrast, if you place an `onClick` event on the `<input type="submit">` element, it will only trigger when the submit button is clicked. This won't cover scenarios where the form is submitted through other means, such as pressing the Enter key while focused on an input element.

With `event.preventDefault()`:

1. User clicks the submit button.
2. The `createPost` function is called, and `event.preventDefault()` stops the form from submitting in the default way.
3. The page does not refresh, allowing you to execute your custom logic, such as sending the form data asynchronously to the server using AJAX, Fetch API, or some other method.

CreatePost.js

```jsx
import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

const CreatePost = () => {
  // initialize the state variables for the form fields:
  const [post, setPost] = useState({ title: "", author: "", description: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const createPost = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from("Posts")
      .insert({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .select();

    if (error) {
      console.error("Error inserting:", error);
    } else {
      console.log("Insert:", data);
    }

    window.location = "/";
  };

  return (
    <div>
      <form onSubmit={createPost}>
        <label for="title">Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={post.title}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label for="author">Author</label>
        <br />
        <input
          type="text"
          id="author"
          name="author"
          value={post.author}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label for="description">Description</label>
        <br />
        <textarea
          rows="5"
          cols="50"
          id="description"
          name="description"
          value={post.description}
          onChange={handleInputChange}
        ></textarea>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default CreatePost;
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/47aac019-5a81-407d-a83c-d2c7952b9b46/ded7491b-ff35-43d4-ad02-aaf56a7a716e/Untitled.png)

### Step 5: Read Database Entires

Currently, when a user goes to the home page, there are no entries available. This is because the `posts` props being passed to the `ReadPosts` view is an empty list `[]`.
 In this step, we will make a request to the database to read all of the entries in the database and display them on the homepage.

`App.js`

```jsx
const [posts, setPosts] = useState([]);
```

You initialize a `posts` state variable to an empty array, and `setPosts` is the function to update this state. This state will hold the posts fetched from the database.

```jsx
const fetchPosts = async () => {
  const { data, error } = await supabase
    .from('Posts')
    .select()
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching posts:', error);
  } else {
    setPosts(data);
  }
};
```

You define an asynchronous function `fetchPosts` that fetches data from the 'Posts' table in the database using Supabase. If fetching is successful, `setPosts(data);` updates the `posts` state with the fetched data.

```jsx
useEffect(() => {
  fetchPosts();  // Fetch posts when component mounts
}, []);  // Empty dependency array means this runs once when component mounts
```

You use the `useEffect` hook to call `fetchPosts` when the component mounts. The empty dependency array `[]` means that this effect runs only once after the initial render.

```jsx
let element = useRoutes([
  {
    path: "/",
    element: <ReadPosts data={posts} />
  },
  // ... other routes
]);
```

You set up routes using `useRoutes`. For the default route `/`, you pass the fetched `posts` as a prop `data` to the `ReadPosts` component.

In `ReadPosts.js`

```jsx
const ReadPosts = (props) => {
  // ...
};
```

The `props` object contains a `data` attribute that holds the posts array fetched from the Supabase database in the parent component (`App.js`).

```jsx
const [posts, setPosts] = useState([]);
```

You define a local state variable `posts` initialized to an empty array. The `setPosts` function is used to update this state.

```jsx
useEffect(() => {
  setPosts(props.data);
  console.log(props);
}, [props]);
```

You use the `useEffect` hook to update the local `posts` state whenever the `props` change. Specifically, `setPosts(props.data);` sets the `posts` state to the `data` received through `props`.

```jsx
return (
  <div className="ReadPosts">
    {posts && posts.length > 0 ? (
      posts.map((post, index) => (
        <Card
          key={post.id}
          id={post.id}
          title={post.title}
          author={post.author}
          description={post.description}
        />
      ))
    ) : (
      <h2>{"No Challenges Yet 😞"}</h2>
    )}
  </div>
);
```

`key={post.id}` assigns a unique `key` prop to each `Card` component based on the `id` of the post. This ensures that each `Card` is uniquely identifiable, which is particularly useful when the list of
 posts changes over time, helping React optimize re-rendering. If missing, there will be a warning.

The message "No Challenges Yet 😞" appears initially because the `posts` array starts as empty. This is a common pattern in React applications when dealing with asynchronous operations like fetching data from an API or a database.

The component renders initially with the `posts` array empty, and that's why you see the message. Then, once the `useEffect` function fetches the data and updates the state, the component re-renders, this time displaying the actual posts.

`element: <ReadPosts data={posts} />`

the `posts` array is being passed as a prop named `data`.

 **Using `props` object directly**

```jsx
const ReadPosts = (props) => {
    const posts = props.data;
    // rest of the code
};
```

**Using destructuring**

```jsx
const ReadPosts = ({ data }) => {
    // now "data" contains the posts
};
```

Or rename it while destructuring:

```jsx
const ReadPosts = ({ data: posts }) => {
    // now "posts" contains the posts
};
```

This is especially useful when the parent and child components use different naming conventions, or when you want to make the function body more readable by using a name that better describes the data.

### Step 6: Update Database Entires

Currently, when a user clicks the vertical three dot icon on the Card the homepage it redirects them to a form where they can update their submission, but their changes are not updated in the database when they submit their changes. In this step, we will make a request to the database to update a given post and display the changes in the web application and database.

### Step 7: Delete Database Entires

Currently, when a user clicks the delete button on the `EditPost`view, the user is redirected back to the home page and nothing is deleted. In this step, we will make a request to the database to delete a given data entry from database and homepage.

1. **Read**: Fetch a specific post using the passed-in `posts` array and `id` from the URL (via `useParams()`).
2. **Update**: Modify the existing details of that post.
3. **Delete**: Remove that post.

 `EditPost.js`

```jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client"; // Import Supabase client
import "./EditPost.css";

const EditPost = ({ data: posts }) => {
  const { id } = useParams();

  // If post is initialized as {}, then post.title, post.author, and post.description will all be undefined, but they won't cause the program to crash.
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchedPost = posts.find((item) => item.id.toString() === id);
    // const fetchedPost = posts.filter(item => item.id.toString() === id)[0];
    //  finds the first post in posts where item.id is strictly equal to id and assigns that to fetchedPost
    setPost(fetchedPost);
  }, [posts, id]);
  // Anytime posts or id changes, useEffect will run again.

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const updatePost = async (event) => {
    event.preventDefault();
    await supabase
      .from("Posts")
      .update({
        title: post.title,
        author: post.author,
        description: post.description,
      })
      .eq("id", id);

    window.location = "/";
  };

  const deletePost = async (event) => {
    event.preventDefault();

    await supabase.from("Posts").delete().eq("id", id);

    window.location = "/";
  };

  return (
    <div>
      {post ? (
        <form onSubmit={updatePost}>
          <label htmlFor="title">Title</label> <br />
          <input
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <label htmlFor="author">Author</label>
          <br />
          <input
            type="text"
            id="author"
            name="author"
            value={post.author}
            onChange={handleInputChange}
          />
          <br />
          <br />
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            rows="5"
            cols="50"
            id="description"
            value={post.description}
            onChange={handleInputChange}
          ></textarea>
          <br />
          <input type="submit" value="Submit" />
          <button className="deleteButton" onClick={deletePost}>
            Delete
          </button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

// In React, the for attribute should be replaced with htmlFor when specifying labels for input elements.
// This is because for is a reserved word in JavaScript, and React elements are written in JavaScript.

export default EditPost;
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/47aac019-5a81-407d-a83c-d2c7952b9b46/98985fdd-633e-41f2-b5df-c12f1315a611/Untitled.png)

- In React Router, the `useParams` hook returns an object of key-value pairs of URL parameters. The keys are defined by the `:name` syntax in the path string in your route definitions. The type of these values is always a string, because URL parameters are strings. So, in the expression `const { id } = useParams();`, the variable `id` would be of type `string`. use `item.id.toString() === id` in your `useEffect` to ensure that both sides of the comparison are strings.
1. **Update**: When the form is submitted, the `updatePost` function is triggered.
    - `event.preventDefault();` prevents the default form submission behavior.
    - The `supabase.from('Posts').update(...).eq('id', id);` line updates the post with the specified `id` in the database.
    - Finally, `window.location = '/';` redirects the user to the home page.
2. **Delete**: When the delete button is clicked, the `deletePost` function is triggered.
    - `event.preventDefault();` prevents the default button click behavior.
    - The `supabase.from('Posts').delete().eq('id', id);` line deletes the post with the specified `id` from the database.
    - Finally, `window.location = '/';` redirects the user to the home page.
    

### Step 8: Save Bet Count to Database

In this step, we will update the `updateCount()` so that when a user clicks the bet button the bet count is updated in and saved to the database.

In `Card.js`

```jsx
import React from 'react'
import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { supabase } from '../client'

const Card = (props) =>  {

  const [count, setCount] = useState(0)

  const updateCount = async (event) => {
    event.preventDefault();

    const { data, error } = await supabase
      .from('Posts')
      .update({ betCount: count + 1 })
      .eq('id', props.id)

    if (error) {
      console.error('Error updating:', error);
    } else {
      console.log('Update with:', data);
    }

    setCount((count) => count + 1);
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="title">{props.title}</h2>
          <h3 className="author">{"by " + props.author}</h3>
          <p className="description">{props.description}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card;
```

- `.from('Posts')`: Specifies the `Posts` table in the database.
- `.update({ betCount: count + 1 })`: Updates the `betCount` field with the new count (`count + 1`).
- `.eq('id', props.id)`: Filters the rows to be updated by matching the `id` with `props.id`.
