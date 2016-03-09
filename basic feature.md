###### mvp : basic feature:

  import md/txt files and convert each line## line to question, whatever that follows as answer

  that means web server is needed to read files from local storage

  maybe use mac exeutatable to start the server and open up a browser

  open http://localhost.com:8000 this will open the link and browser.

###### web server:

​	reads all files names so user can choose

​	read the file that user picks

​	over write the file with content from user when he saves.

##### making web server

​	routes: 

​	/    :   to see all available notes files

​	/save : to save file to storage

​	/read : to read one file

​	that's it…...

###### front end:

the main view

​	show all files available only at main page

the study view

​	display flash cards one by one, question first then enter to see next

​	have two windows side by side, one display the pre-recored answer, one allows user to write things down to compare.

the editors view

​	when editing: click button or press comm + e to edit things

​	entire file is available to edit, focus on current view however. so maybe separate each card into its own little box?

  	each box is a textarea to focus, just use autofocus

  	make sure to have a delete button on each textarea so user can delete it

  have an add button to add new cards, but new cards should not flow, should be fixed to specific view on window, in case user wants to move around and get info from other cards.

​	when click add, the card currently in view should stay in view

​	two sides panel left is existing card, right is the empty new card

  maybe even allows users to open up new card stack and take info out of it?

  to save, click save or comm+s