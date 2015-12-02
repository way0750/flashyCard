# random new info



###### where you install your node_module vs where you can require those node modules

search local node_moudules(doesn't matter if folder doesn't exist)
then continue doing the same until root of drive. 

you can install modules anywhere(local install) and access them as long as your js file are at same dir as the node_modules dir or the node_modules dir is at one of the enclosing dir.
	also it seems like sometimes, if module no found locally then error even if it is installed globally.
Loading from node_modules Folders#
	​If the module identifier passed to require() is not a native module, and does not begin with '/', '../', or './', then Node.js starts at the parent directory of the current module, and adds /node_modules, and attempts to load the module from that
	If it is not found there, then it moves to the parent directory, and so on, until the root of the file system is reached.
​	For example, if the file at '/home/ry/projects/foo.js' called require('bar.js'), then Node.js would look in the following locations, in this order:
/home/ry/projects/node_modules/bar.js
/home/ry/node_modules/bar.js
/home/node_modules/bar.js
/node_modules/bar.js