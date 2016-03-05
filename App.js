//External Libs
include("lib/three/three.js");
include("lib/three/loaders/OBJLoader.js");
include("lib/three/loaders/MTLLoader.js");
include("lib/three/loaders/OBJMTLLoader.js");
include("lib/three/loaders/FBXLoader.js");
include("lib/three/loaders/ColladaLoader.js");
include("lib/three/loaders/collada/Animation.js");
include("lib/three/loaders/collada/AnimationHandler.js");
include("lib/three/loaders/collada/KeyFrameAnimation.js");

include("lib/three/vr/es6-promise.js");
include("lib/three/vr/VRControls.js");
include("lib/three/vr/VREffect.js");
include("lib/three/vr/webvr-manager.js");
include("lib/three/vr/webvr-polyfill.js");

include("lib/leap-0.6.4.js");
include("lib/cannon/cannon.js");
include("lib/cannon/ConvexGeometry.js");
include("lib/cannon/Detector.js");
include("lib/cannon/CannonDebugRenderer.js");

include("lib/stats.min.js");

//Internal components
include("device/LeapDevice.js");

include("input/Key.js");
include("input/Keyboard.js");
include("input/Mouse.js");

include("Main.js");

//App class
function App(){}

//App initialization (entry point)
App.initialize = function()
{
	//Stas tool
	App.stats = new Stats();
	App.stats.setMode(0);
	App.stats.domElement.style.position = 'absolute';
	App.stats.domElement.style.left = '0px';
	App.stats.domElement.style.top = '0px';
	document.body.appendChild(App.stats.domElement);


	//Get canvas
	var canvas = document.getElementById("canvas");
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	//Init Input
	Keyboard.initialize();
	Mouse.initialize();

	//Keyboard OnKeyDown Event
	document.onkeydown = function(event)
	{
		Keyboard.update(event.keyCode, Key.KEY_DOWN);
	}

	//Keyboard OnKeyUp Event
	document.onkeyup = function(event)
	{
		Keyboard.update(event.keyCode, Key.KEY_UP);
	}

	//Mouse Move Position
	document.onmousemove = function(event)
	{
		Mouse.updatePosition(event.clientX, event.clientY, event.movementX, event.movementY);
	}

	//Mouse Button Down
	document.onmousedown = function(event)
	{
		Mouse.updateKey(event.which-1, Key.KEY_DOWN);
	}

	//Mouse Button Up
	document.onmouseup = function(event)
	{
		Mouse.updateKey(event.which-1, Key.KEY_UP);
	}

	//Request to lock mouse if canvas is clicked
	canvas.onclick = function()
	{
		try
		{
			canvas.requestPointerLock = canvas.mozRequestPointerLock || canvas.requestPointerLock || canvas.webkitRequestPointerLock;
			canvas.requestPointerLock();
		}
		catch(e){}
	}

	//Create main program
	Main.initialize(canvas);

	//Time control
	App.delta_time = 0;
	App.time = Date.now();

	//Start Loop
	App.loop();
}

//App loop
App.loop = function()
{
	//Prepare next frame render
	requestAnimationFrame(App.loop);

	App.stats.begin();

	//Update Mouse Values
	Mouse.update();

	//Update time values
	App.delta_time = Date.now() - App.time;
	App.time += App.delta_time;

	//Update and draw
	Main.update();
	Main.draw();

	App.stats.end();
}

//Called every time page is resized
App.resize = function()
{
	var canvas = document.getElementById("canvas");
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;

	Main.resize(canvas);
}

//Auxiliar include
function include(jsFile)
{
	document.write('<script type="text/javascript" src="'+ jsFile+ '"></script>');
}