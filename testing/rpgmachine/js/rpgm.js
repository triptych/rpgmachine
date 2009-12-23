/** RPG MAKER JS **/


var RM; // make RM global scope so we can reference it;

//Bring in YUI

YUI({
						combine: true, 
						timeout: 10000,
						modules: {
							'gallery-yui2': {
								fullpath: 'http://yui.yahooapis.com/gallery-2009.11.19-20/build/gallery-yui2/gallery-yui2-min.js',
								requires: ['node-base', 'get', 'async-queue'],
								optional: [],
								supersedes: []
							}
						}
				}).use("anim", "gallery-yui2", function(Y) {
					Y.log("so far so good.")	
					
					
					/** set up global RM object **/
					RM = {
						init: function(){
							Y.log("RM.init called!");
							
							/**
							// set up click for start button
							Y.one("#gamestart")
								.on("click",function(e){
									Y.log(e);
									RM.initPanel("monster");
								})
								**/
							Y.one("#main")
								.on("click",function(e){
									Y.log(e)
									e.preventDefault();
									switch(e.target.get("id")){
										case "gamestart":
											Y.log("gamestart clicked!");
											RM.initPanel("monster")
											break;
											
										case "btn-fight":
											RM.model.monster.val-=5;
											break;	
										default:
										
											Y.log(e.target);
												
									}
									RM.updateWorld();
								})	
								
							
						},
						btnClick: function(e){
							
						},
						updateWorld: function(){
							Y.log("Update World Called!");
							//go through the model
							
							for(j in RM.model){
								var pnl = RM.model[j];
								// update progress bars
								var val = pnl.val;
								var pb = pnl.progressBar;
								
								if(val < 0){
									val = 0;
								} 
								pb.set("value",val);
							}
							
							
						},
						initPanel: function(pid){
							//get the panel data
							var pnl = RM.model[pid];
							//get the storage area
							var storage = Y.one("#storage");
							var world = Y.one("#world");
							if(pnl){
								Y.log("got data for panel pid:"+pid);
								if(pnl.dom == null){
									//need to create panel
									storage.append("<fieldset id='pnl-"+pid+"'><label>"+pnl.label+"</label><ul></ul><div class='pb' id='pb-"+pid+"'></div></fieldset>");
									//now get the list
									var list = Y.one("#pnl-"+pid+" ul");
									for(i in pnl.buttons){
										Y.log(pnl.buttons[i].label)
										list.append("<button class='btn' id='btn-"+pnl.buttons[i].label+"'>"+pnl.buttons[i].label+"</button>")
									}
									//Y.log(YAHOO);
									
									//ok now create the progress bar
									pnl.progressBar = new YAHOO.widget.ProgressBar({
										value: 0,
										maxValue: 100,
										anim: true
										});
									
									//now render the progress bar and attach the animation
									
									pnl.progressBar.render("pb-"+pid);
									var anim = pnl.progressBar.get("anim");
										anim.duration = 1;
										anim.method = YAHOO.util.Easing.backBoth;
						
									
									//now move it to the world
									var theNode = Y.one("#pnl-"+pid);
									world.append(theNode);
									pnl.dom = theNode;
									
									
								}else{
									//do nothing
								}
								
							}else {
								Y.log("err - no panel data for pid:"+ pid);
							}
						},
						//set up the panels and button via a data model
						model: {
							//panels
							monster: {
								label:"Monster",
								shown: false,
								dom: null,
								progressBar: null,
								val:50,
								buttons: {
									fight:{
										label:"fight",
										disabled:true	
									},
									flee: {
										label:"flee",
										disabled:true
									}
								}
							}
						},
						rules:[
							{
								clicktype:"fight",
								action: function(){
									//decrease monster health
									Y.log("decrease monster health");
								}
							}
						
						]
					};
					/** end set up RM **/
					
					/** enter YUI2 Land **/
					Y.yui2().use('progressbar','animation',function(){
						
						/** start doing stuff on DOM ready **/
						
						Y.on("domready", function(){
							RM.init();	
						});
						
					});
					/** exit YUI2 Land **/
					
					
						
				});


