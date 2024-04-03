const currentURL = window.location.href;
// const fileName = currentURL.split('/').pop(); // Get the last part of the URL (the file name)
const templength = currentURL.split('/').length;
const tempName = currentURL.split('/')[templength-1];
const filename = tempName.split('_')[1];
let imgNames = filename.split('.')[0]
console.log(`panos/${imgNames}.png`);

// Create a new link element
var linkElement = document.createElement("link");
linkElement.setAttribute("rel", "stylesheet");
linkElement.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");
linkElement.setAttribute("integrity", "sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==");
linkElement.setAttribute("crossorigin", "anonymous");
linkElement.setAttribute("referrerpolicy", "no-referrer");
document.head.appendChild(linkElement);

// Create the zoom-in-out container div
var zoomContainer = document.createElement('div');
zoomContainer.classList.add('zoom-in-out-container');
zoomContainer.style.display = 'flex';
zoomContainer.style.flexDirection = 'column';
zoomContainer.style.width = 'fit-content';
zoomContainer.style.position = 'absolute';
zoomContainer.style.left = '10px';
zoomContainer.style.top = '10px';

// Create the zoom-in button
var zoomInButton = document.createElement('button');
zoomInButton.textContent = '+';
zoomInButton.id = 'zoomInButton';
zoomInButton.classList.add('disable');
zoomInButton.style.fontSize = '24px';
zoomInButton.style.border = '1px solid gray';
zoomInButton.style.background = '#ffff';
zoomInButton.style.borderRadius = '3px 3px 0px 0px';

// Create the zoom-out button
var zoomOutButton = document.createElement('button');
zoomOutButton.textContent = '-';
zoomOutButton.id = 'zoomOutButton';
zoomOutButton.style.fontSize = '24px';
zoomOutButton.style.border = '1px solid gray';
zoomOutButton.style.background = '#ffff';
zoomOutButton.style.borderRadius = '0px 0px 3px 3px';

// Create the full-screen icon button
var fullScreenButton = document.createElement('button');
fullScreenButton.innerHTML = '<i class="fa-solid fa-expand"></i>';
fullScreenButton.classList.add('full-screen-icon');
fullScreenButton.style.position = 'absolute';
fullScreenButton.style.fontSize = '19px';
fullScreenButton.style.border = '1px solid gray';
fullScreenButton.style.background = '#ffff';
fullScreenButton.style.left = '10px';
fullScreenButton.style.top = '80px';
fullScreenButton.style.borderRadius = '3px';
fullScreenButton.style.padding = '5px';

// Append the buttons to the zoom-in-out container
zoomContainer.appendChild(zoomInButton);
zoomContainer.appendChild(zoomOutButton);

// Append the zoom-in-out container and full-screen button to the body (or another container)
document.body.appendChild(zoomContainer);
document.body.appendChild(fullScreenButton);

// Apply additional styles for .smallmap (assuming you want to apply these styles to a specific element with a class)
var smallMapElement = document.querySelector('.smallmap');
smallMapElement.style.position = 'absolute';
smallMapElement.style.width = '100%';
smallMapElement.style.height = '100vh';

			var camera, scene, renderer;
			var container, containerWidth, containerHeight;
			var fov = 50,
			texture_placeholder,
			isUserInteracting = false,
			onMouseDownMouseX = 0, onMouseDownMouseY = 0,
			lon = 0, onMouseDownLon = 0,
			lat = 0, onMouseDownLat = 0,
			phi = 0, theta = 0;
			
			var zoomSpeed = 0.1;
			var minZoom = 1;
			var maxZoom = 100;
			var mouseX = 0, mouseY = 0;
			var targetX = 0, targetY = 0;

            let imgName;
			
            // if(fileName ==="panoWebGL_0.html"){
            //     imgName = 'panos/0.png'
            // }
            // else if(fileName ==="panoWebGL_1.html"){
            //     imgName = 'panos/1.png'
            // }

			init(imgNames);
			animate();
            
			function init(imgName) {
				// if(!Detector.webgl )
				// {
				// 	window.open ('???PointCab_FlashLink???','_self',false);
				// 	return false;                                                                                                                  
				// }		
				//  var container, mesh; 

				container = document.getElementById( 'panomap' );
				containerWidth = container.offsetWidth, 
				containerHeight = container.offsetHeight, 
				windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;
				
				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( fov, containerWidth / windowHeight, 1, 1100 );
				
				camera.target = new THREE.Vector3( 0, 0, 0 );
				scene.add( camera );
				/* camera.fov = fov; */
				mesh = new THREE.Mesh( new THREE.SphereGeometry( 500, 200, 100 ), new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( `panos/${imgName}.png` ) } ) );
				mesh.scale.x = -1;
				scene.add( mesh );

				renderer = new THREE.WebGLRenderer();
				renderer.setSize( containerWidth-2, windowHeight-3 );

				container.appendChild( renderer.domElement );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
				document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);
			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				isUserInteracting = true;

				onPointerDownPointerX = event.clientX;
				onPointerDownPointerY = event.clientY;

				onPointerDownLon = lon;
				onPointerDownLat = lat;

			}

			function onDocumentMouseMove( event ) {
				if ( isUserInteracting ) {

					lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
					lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

				}
			}

			function onDocumentMouseUp( event ) {

				isUserInteracting = false;

			}

			function onDocumentMouseWheel( event ) {

				// WebKit

				if ( event.wheelDeltaY ) {

					fov -= event.wheelDeltaY * 0.05;

				// Opera / Explorer 9

				} else if ( event.wheelDelta ) {

					fov -= event.wheelDelta * 0.05;

				// Firefox

				} else if ( event.detail ) {

					fov += event.detail * 1.0;

				}
				/* camera.projectionMatrix = THREE.Matrix4.makePerspective( fov, window.innerWidth / window.innerHeight, 1, 1100 ); */
				render();

			}
			
			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			function render() {

				lat = Math.max( - 85, Math.min( 85, lat ) );
				phi = ( 90 - lat ) * Math.PI / 180;
				theta = lon * Math.PI / 180;

				camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta );
				camera.target.y = 500 * Math.cos( phi );
				camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );

				camera.lookAt( camera.target );
				/* // distortion
				camera.position.x = - camera.target.x;
				camera.position.y = - camera.target.y;
				camera.position.z = - camera.target.z; */
				renderer.render( scene, camera );

			}

			window.onresize = function() {
				// reset all variables
				container = document.getElementById( 'panomap' );
				containerWidth = container.offsetWidth, 
				containerHeight = container.offsetHeight, 
				windowWidth = window.innerWidth,
				windowHeight = window.innerHeight;
				renderer.setSize( containerWidth-2, windowHeight-3 );
			};	
			/* Zoom-in-btn-code */
			var zoomInButton = document.getElementById('zoomInButton');
			zoomInButton.addEventListener('click', zoomInBtn);
			function zoomInBtn(){
				if(camera.fov == 5  ){
					camera.fov = 5;
					zoomOutButton.disabled =false;
					zoomInButton.disabled =true;
				}
					else if(camera.fov == 100){
					zoomOutButton.disabled =false;
					camera.fov -= 5;
					camera.updateProjectionMatrix(); 
					}
					else{
					camera.fov -= 5;
					camera.updateProjectionMatrix(); 
					}
			}/* Zoom-in-btn-code-end */

			/* Zoom-out-btn-code */
			var zoomOutButton = document.getElementById('zoomOutButton');
			zoomOutButton.addEventListener('click',zoomOutBtn );
			function zoomOutBtn(){
				if(camera.fov == 100){
					camera.fov =100;
					zoomOutButton.disabled =true;
					zoomInButton.disabled =false;
				}
				else {
				camera.fov += 5; 
				zoomInButton.disabled =false;
				camera.updateProjectionMatrix(); 
				}
			}/* Zoom-out-btn-code-end */

			/* FullScreen-icon-code */
			var FullScreenBtn = document.querySelector('.full-screen-icon');
			var OldIcon = document.querySelector('.full-screen-icon i');
			var isFullScreen = false; 
			FullScreenBtn.addEventListener('click', () => {
			if (document.fullscreenElement) {
				// If already in fullscreen, exit fullscreen
				if (document.exitFullscreen) {
					document.exitFullscreen();
				}
			} else {
				// If not in fullscreen, request fullscreen for the document
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				}
			}
			isFullScreen ? OldIcon.className = "fa-solid fa-expand" : OldIcon.className = "fa-solid fa-minimize";
			isFullScreen = !isFullScreen;
			});/* FullScreen-icon-code-end */

			 //Mouse-Weel-Zoom-in-out-code
			var zoomSpeed = 0.1; // Adjust the zoom speed as needed
			var minZoom = 5;
			var maxZoom = 100;
			function zoomCamera(delta) {
				camera.fov -= delta * zoomSpeed;
				camera.fov = Math.max(minZoom, Math.min(maxZoom, camera.fov));
				camera.fov == 5 ? zoomInButton.disabled =true :zoomInButton.disabled =false;
				camera.fov == 100 ? zoomOutButton.disabled =true:zoomOutButton.disabled =false;
				camera.updateProjectionMatrix();
			}
			function onDocumentMouseWheel(event) {
				var delta = event.wheelDelta || -event.detail;
				zoomCamera(delta);
			}
			document.addEventListener('DOMMouseScroll ',onDocumentMouseWheel , false);
			document.addEventListener('mousewheel', onDocumentMouseWheel, false);
			//Mouse-Weel-Zoom-in-out-code-end 







