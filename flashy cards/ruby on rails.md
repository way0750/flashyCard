# basic rails



###### routes creation: standard, and parameter

​	every routes needs a controller#andAction

​	go to config/routes.rb

​	method '/routeName' => 'controllerName#actionName'

​	for paremeter:

​	method '/routeName/:param' => 'controller#action'

​	and the parameters will be accessible within the instance method in controller file by self.params #[controller: falsdkfj, action: lsdjf, paremaName: userInputInUrl]

###### controller, action: how to create each

​	controllers are found in their individual fils in: app/controllers/

​	in the format: controllerName_controller.rb

​	to define a controller: in the file,

``` ruby
	class ControllerName < ApplicationController
      #convention: the ControllerName is cap
      def actionName 	
      end
	end
```

each controller get its own dir with same name

then each action gets its own html file if view is needed for that action

​	actions are optional in the Controller def but needed in the route at least as a placeholder

###### some controller action method:

​	def actionName

​		redirect_to 'path'

​		#path could be root_path

​	end

###### view:

​	all views are found in app/views

​	the structure follows the controllerName/actionName.html.erb format

​	each controller has its own folder with just the controlName

​	then each file in it is the html.erb template for each the action: action.html.erb

###### view snippet:

​	in a view folder name an html.erb file with this convention: _name.html.erb

​	to use that snippet in any view: <%= render 'pathUnderView/name'%>

​	the _ and the .html.erb needs to be omitted

###### view: the shared template:

​	in the view/layout dir there is the application.html.erb file. it persist across the entire app.

it's the app view, so keep things here if you need them to control the entire app.





# using resources:

so if in the routes.rb file:

resources :routeName

this will auto create a route with any amount of param

auto create a controller name RoteName_controller 

but expect you to do these:

define an action method and name it as create to deal with post requests

what about template?? if post then the create action method is needed so a create.htlm.erb will be needed?

define a show action to deal with get request with one allowed param with the name as :id

define a index action to deal with getting routeName without any params.





# model related

how to create:

create a table with schema

go to projectName/db/migrate/ this is the dir with many ruby files that are actually task to define tables

ex: 20150227050106_create_questions.rb

and in it

class CreateQuestions < ActiveRecord::Migration

​	def change

​		#method to create table schema:

​		create_table :questions do |t|

​			t.string :email

​			t.text :body

​			t.timestamps null: false #null: false means required filed

​		end

​	end

end

this table definition is database agnostic, as long as you have the db driver for it. but how to install driver for specific db?



then in the console run: rake db:migrate

this will run all those db table def



the rails console: rails console

everything related to project is loaded in there



using the rails console:

accessing ModelName

Question.someDBMethod



sending data to the view:

in the action method in the controller

define instance variables for data, then in its own view, access that data by

 <% @instanceVariableName %>

 so a new instance is created for each action being called by the route? and only the method associated with the action will be defined???

so instance variables define in other instance method(aka other actions) will not be shared

unless of course it is the def initialize method, it will be called and data will be shared



data injection:

<div>this is an Array object <%= @arr.each do |item| %></div>

every thing here will be repeated!

<div><%= item%></div>

<%= end %>

<div></div>



data injection could be in string form too: src = "<%= @source %>"



# need to learn more about creating data base table and using migrate and activerecord

some rails helper methods:

​	time_ago_in_words (<timeObj>)



so to create or update a table in a database in Rails: you need to?

have to first generate the migrate file in the console in the project dir??

like this? with colName and dataType?????

``` 
rails generate model User name:string email:string
```

you should do this because couple files are created and strongly linked together??? don't fight convention!

but you can still go to the migration file in db/migrate to customize thing right?

so you specify what to do to the db table in the migration file?

to create a new table, to update the table's col…..

to generate a migration file: rails generate migration

and then in terminal use rake db:migrate to carry the change



to use the database in the app

just use the capitalized singular table name, ex:

Book

and simply use their ORM methods, like find, create….

Book.find, Book.create….

###### to modify a database:

so first to use rails g migration AddTaskNameToModelNames

remember if you created a model named: person, then rails will auto name the table in plural and as people

then a migration file is generated and you can add methods and modify the method code blocks then have rake db:migrate to take care the rest?



###### to add methods to a model

to its model definition file in app/models/modelName.rb



to inject data to a template:

<%= @instanceVaribaleName%>

to run code :

<% obj.method do  %>

<% end %> # no =



# writting modules:

for now put them inside of those concerns folders

name convention: module name and file needs to be the same, but of course modules has to be capitalized

then if module name needed to be camelized, then switch to using _ for file name  

then use same mix-in method to include the module by simple its name