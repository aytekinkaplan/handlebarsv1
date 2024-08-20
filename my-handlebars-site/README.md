### Project Structure and Conversion Steps

To convert your Ghost CMS-dependent project into a standalone structure using Handlebars.js and Node.js, we will maintain the principles of Handlebars.js while creating a dynamic content site without relying on Ghost CMS.

#### Project Structure

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

#### Conversion Steps

1. **Set Up Node.js Environment**:

   - Create a new directory for your project (`my-handlebars-site`).
   - Initialize a Node.js project using `npm init -y`.
   - Install the necessary dependencies: `express`, `express-handlebars`, `nodemon`, and `body-parser` by running:
     ```bash
     npm install express express-handlebars nodemon body-parser
     ```

2. **Organize Public Assets**:

   - Place your `styles.css` in the `public/css/` directory. This directory will also hold any JavaScript files and images if needed.

3. **Create Handlebars Views**:

   - Move your Handlebars templates into the `views/` directory. You'll need to adjust the file structure slightly:
     - `default.hbs` becomes `layouts/main.hbs`.
     - `header.hbs`, `footer.hbs`, and `navigation.hbs` move to the `partials/` directory.

4. **Configure Express and Handlebars**:

   - Create an `app.js` file in the root of your project. This will be the entry point for your Node.js application.
   - Set up the Express server and configure Handlebars as the templating engine:

     ```javascript
     const express = require("express");
     const exphbs = require("express-handlebars");
     const path = require("path");

     const app = express();

     // Set static folder
     app.use(express.static(path.join(__dirname, "public")));

     // Set up Handlebars
     app.engine(
       "hbs",
       exphbs({
         extname: "hbs",
         defaultLayout: "main",
         layoutsDir: "views/layouts/",
         partialsDir: "views/partials/",
       })
     );
     app.set("view engine", "hbs");

     // Routes
     app.use("/", require("./routes/index"));
     app.use("/posts", require("./routes/posts"));

     // 404 page
     app.use((req, res) => {
       res.status(404).render("404");
     });

     const PORT = process.env.PORT || 3000;
     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     ```

5. **Create Routes**:

   - Create the `routes/index.js` and `routes/posts.js` files to manage your application's routes.

     - `index.js` will render the homepage using `index.hbs`.
     - `posts.js` will handle rendering individual posts using `post.hbs`.

     Example `index.js`:

     ```javascript
     const express = require("express");
     const router = express.Router();

     // Homepage
     router.get("/", (req, res) => {
       res.render("index", {
         title: "Latest Posts",
         posts: [
           {
             title: "Post One",
             excerpt: "This is the excerpt for post one...",
             published_at: "January 1, 2024",
           },
           {
             title: "Post Two",
             excerpt: "This is the excerpt for post two...",
             published_at: "February 1, 2024",
           },
         ],
       });
     });

     module.exports = router;
     ```

     Example `posts.js`:

     ```javascript
     const express = require("express");
     const router = express.Router();

     // Individual Post Page
     router.get("/:id", (req, res) => {
       const post = {
         title: "Post Title",
         content: "This is the content of the post...",
         published_at: "January 1, 2024",
       };
       res.render("post", post);
     });

     module.exports = router;
     ```

6. **Run the Application**:

   - Start the application using `nodemon` to auto-reload on changes:
     ```bash
     npx nodemon app.js
     ```

7. **Push to GitHub**:
   - After completing the setup, push your project to GitHub.

### README.md Template

````markdown
# My Handlebars Site

A simple standalone website using Node.js and Handlebars.js, originally based on a Ghost CMS theme. This project demonstrates how to use Handlebars.js to create dynamic pages without the need for a CMS.

## Features

- Dynamic rendering of pages using Handlebars.js
- Node.js and Express server setup
- Organized structure for views, partials, and layouts
- Responsive design with a custom CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aytekinkaplan/my-handlebars-site.git
   ```
````

2. Navigate to the project directory:
   ```bash
   cd my-handlebars-site
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npx nodemon app.js
   ```
5. Visit `http://localhost:3000` in your browser to view the site.

## Project Structure

- **public/**: Contains static assets like CSS, JavaScript, and images.
- **views/**: Contains Handlebars templates organized into layouts, partials, and pages.
- **routes/**: Defines routes for the homepage and posts.
- **app.js**: Entry point for the Node.js application.
- **package.json**: Contains project metadata and dependencies.

## License

This project is licensed under the MIT License.

```

### LinkedIn Article Tutorial

#### Title: Creating a Standalone Handlebars.js Site Without Ghost CMS

#### Introduction:
In this tutorial, I'll guide you through converting a Ghost CMS-based theme into a standalone website using Node.js and Handlebars.js. You'll learn how to set up a simple, dynamic site that doesn't rely on any CMS, making it lightweight and easily customizable.

#### Step 1: Set Up the Node.js Environment
[Provide a detailed step-by-step guide for setting up Node.js, installing dependencies, and organizing the project structure.]

#### Step 2: Configure Handlebars.js in Express
[Explain how to set up Express and Handlebars.js, including creating layouts, partials, and templates.]

#### Step 3: Create Dynamic Routes
[Walk through creating routes for rendering the homepage and individual posts dynamically.]

#### Step 4: Launch the Application
[Show how to run the application using nodemon and test it locally.]

#### Step 5: Deploy and Share
[Guide on pushing the project to GitHub and sharing it.]

#### Conclusion:
By following these steps, you've successfully transformed a Ghost CMS theme into a fully functional standalone site using Handlebars.js and Node.js. This setup is perfect for lightweight projects where a full CMS isn't necessary.

---

This tutorial format will provide a comprehensive guide for anyone looking to replicate your project or learn from it.
```
