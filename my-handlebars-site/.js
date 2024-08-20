---
# My Handlebars Site

## Introduction

This project is a simple standalone website built with Node.js and Handlebars.js. It was originally based on a Ghost CMS theme but has been adapted to work without a CMS. This guide will walk you through the structure of the project, how to set it up, and how to run it.

## Project Structure

Here's a breakdown of the project's directory structure and the role of each file:

```
my-handlebars-site/
│
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   └── img/
├── views/
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   │   ├── header.hbs
│   │   ├── footer.hbs
│   │   └── navigation.hbs
│   ├── index.hbs
│   ├── post.hbs
│   └── 404.hbs
├── routes/
│   ├── index.js
│   └── posts.js
├── app.js
├── package.json
└── README.md
```

### 1. Static Files

**`public/` Directory**

- **`public/css/styles.css`**: Contains the CSS styles for the website. This file ensures that the site has a consistent and appealing design.

```css
body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  color: #333;
}

/* Additional CSS rules */
```

### 2. Handlebars Templates

**`views/` Directory**

- **`views/layouts/main.hbs`**: This is the main layout template. It sets up the basic HTML structure and includes the header, footer, and content area where other templates are rendered.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}} | My Handlebars Site</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    {{> header}}
    <main>
        {{{body}}}
    </main>
    {{> footer}}
</body>
</html>
```

- **`views/partials/header.hbs`**: Contains the HTML for the header section of the site, including the site title and navigation menu.

```html
<header>
    <h1>{{@site.title}}</h1>
    {{> navigation}}
</header>
```

- **`views/partials/footer.hbs`**: Contains the HTML for the footer section of the site.

```html
<footer>
    <p>© {{@site.title}} {{date "YYYY"}}. All rights reserved.</p>
</footer>
```

- **`views/partials/navigation.hbs`**: Renders the navigation menu based on site navigation data.

```html
<nav>
    {{#each @site.navigation}}
        <a href="{{url}}">{{label}}</a>
    {{/each}}
</nav>
```

- **`views/index.hbs`**: The homepage template that displays a list of posts.

```html
{{!< main}}
<h2>Latest Posts</h2>
{{#each posts}}
    <article>
        <h2>{{title}}</h2>
        <p>{{excerpt}}</p>
        <p>Published on {{date published_at format="MMMM D, YYYY"}}</p>
    </article>
{{else}}
    <p>No posts found.</p>
{{/each}}
```

- **`views/post.hbs`**: Displays an individual post with its title, publish date, and content.

```html
{{!< main}}
<article>
    <h2>{{title}}</h2>
    <p>Published on {{date published_at format="MMMM D, YYYY"}}</p>
    <p>{{{content}}}</p>
</article>
```

- **`views/404.hbs`**: A template for handling 404 errors when a page is not found.

```html
{{!< main}}
<h2>Page Not Found</h2>
<p>Sorry, the page you are looking for does not exist.</p>
```

### 3. Routes

**`routes/` Directory**

- **`routes/index.js`**: Defines the route for the homepage. It renders the `index.hbs` template with sample post data.

```javascript
const express = require('express');
const router = express.Router();

// Homepage Route
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Latest Posts',
        posts: [
            { title: 'Post One', excerpt: 'This is the excerpt for post one...', published_at: new Date('2024-01-01') },
            { title: 'Post Two', excerpt: 'This is the excerpt for post two...', published_at: new Date('2024-02-01') }
        ]
    });
});

module.exports = router;
```

- **`routes/posts.js`**: Defines the route for individual posts. It renders the `post.hbs` template with sample post content.

```javascript
const express = require('express');
const router = express.Router();

// Individual Post Route
router.get('/:id', (req, res) => {
    const post = { title: 'Sample Post', content: 'This is the content of the post...', published_at: new Date('2024-01-01') };
    res.render('post', post);
});

module.exports = router;
```

### 4. Application Setup

**`app.js`**

- This file initializes the Express application, sets up the Handlebars engine, and defines the routes.

```javascript
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Middleware
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
}));
app.set('view engine', 'hbs');

// Routes
app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/posts'));

// 404 Route
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 5. Package Configuration

**`package.json`**

- This file contains metadata about the project, including dependencies and scripts.

```json
{
  "name": "my-handlebars-site",
  "version": "1.0.0",
  "description": "A custom website built with Node.js and Handlebars.js",
  "main": "app.js",
  "scripts": {
    "start": "nodemon app.js"
  },
  "author": "Aytekin Kaplan",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "express-handlebars": "^7.0.7",
    "nodemon": "^3.0.1"
  }
}
```

## Running the Project

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/aytekinkaplan/my-handlebars-site.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd my-handlebars-site
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Application:**
   ```bash
   npx nodemon app.js
   ```

5. **Visit the Website:**
   Open your browser and go to `http://localhost:3000` to view the site.

## License

This project is licensed under the MIT License.

---