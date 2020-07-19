
# Ganglia Note-taking App

> Before I begin...
> I am learning React. I work best when I start with something that already exists and modify it to my will. I shamelessly stole the basis of this code from [this repo](https://github.com/noofherder/ReactSolrApp). Thank you to @noofherder for such a good start.

I had a neat idea for a note-taking tool that instead of using folders or buckets, uses tags that are taken directly from the text of the notes. Markdown is an excellent simple formatting method, and  there are some really good React components that use it. I chose the Solr search engine to store my docs, mostly because I was fairly familar with it. When documents are saved, any single, three-letter or greater word that is prefixed with a hashmark (#) or an ampersand (@) are saved as either a tag or a mention with the document. The app then displays those as facets to make it simpler to find your documents later. 

 Here are some of the things I'd like to do:

* Signon supported by social logins (Google app login, Github, Facebook, etc)
* Additional screens to show tag clouds, timelines, or other interesting views of the notes
* Simple, customizable Kanban board for tracking tasks from notes
* Auto extraction and creation of task/todo items from notes to a kanban board
* Move to cloud hosting of app and solr
* Setup API Gateway with authorization controls (these two prob go at the same time)

Again, this is my first React app. I this code will be full of bad practices and anti-patterns. Please feel free to leave issues or comments.

