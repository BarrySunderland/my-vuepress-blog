---
title: 'Making a Blog with Vuepress'
lang: 'en-uk'
tags:
  - Vue
  - vuepress
  - blogging
heroImage: 'Blogpost-09_Lepi.gif'
---
# I like Vue...

but as someone who mostly writes Python, how can I create static content efficiently and also have the option to add interesting interactivity in my website?

### Enter vuepress...

[Vuepress](https://vuepress.github.io/) is a library developed by the original Vue creator Evan You that allows you to create content in markdown and generate a static site. The markdown pages will be converted to html files and url routes are automatically discovered and created based on your documents folder structure. This frees your focus from creating the site to creating the content. And is why vuepress is quite popular for creating websites for documentation. 

But the exciting part for me is that because you can include html elements in Markdown, you can create custom vue components and import these in your markdown files. Vue will insert these just like in a normal Vue site/Single Page Application.

<b>note:</b> make sure to install `vuepress@next` and not the original vuepress which has some unsolvable issues. 

## Using Vue Components

After [installing](https://vuepress.github.io/guide/getting-started.html) and initialising Vuepress Initialising vuepress will create a docs folder and `.vuepress` subfolder. You can create your own components inside `docs/.vuepress/components` and they will be globally registered in your site for use anywhere. As a quick example, creating the component `do-nothing-button-component.vue` lets you declare it inside the markdown file.

```markdown
<do-nothing-button-component />
```

<do-nothing-button-component />

## Using Jupyter

But hold on... jupyter notebooks can be converted to markdown files...

<img src="https://media.giphy.com/media/43Me1q2l4Vg1GLCKv5/giphy.gif" width="200"/>


Indeed they can, and now we have the ability to write our blog posts about Data Science topics directly in a jupyter notebook.

How I do this is by creating a notebooks folder just above my vuepress directory. I can make the demo notebook there, adding comments and rendering the code output. When I'm happy with the post, I can convert the notebook and send the output to the proper folder inside vuepress.

Using the the nbconvert cli command from inside the notebooks dir:

```bash
jupyter nbconvert --output-dir='../web-app/docs/blog' --to markdown embedding-bokeh-plots.ipynb
```

Then the directory looks like something like:

```bash
.
├── notebooks
│   └── embedding-bokeh-plots.ipynb
└── vuepress-app
    ├── docs
    │   ├── blog
    │   │   ├── README.md
    │   │   ├── embedding-bokeh-plots.md
...

```

This is how I made one of my other blog posts ( [Embedding Interactive Bokeh Plots in Static Sites](/blog/embedding-bokeh-plots) ). The original notebook can be viewed on [github](https://github.com/BarrySunderland/my-vuepress-blog/blob/master/notebooks/embedding-bokeh-plots.ipynb).

Conveniently you can use the first notebook markdown cell to contain the header information that vuepress uses for creating searchable for tags etc.