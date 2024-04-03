/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

 function getFlashVersion(){
	// ie
	try {
		try {			
			var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
			try { axo.AllowScriptAccess = 'always'; }
			catch(e) { return '6,0,0'; }
		} catch(e) {}
			return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
	// other browsers
	} catch(e) {
		try {
			if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
				return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
				}
		} catch(e) {}
	}
	return '0,0,0';
};
	
function supports3dCSS()
{
	var div = document.createElement('div'),
	ret = false,
	properties = ['perspectiveProperty', 'WebkitPerspective'];
	for (var i = properties.length - 1; i >= 0; i--)
	{
		ret = ret ? ret : div.style[properties[i]] != undefined;
	};
	
	// webkit has 3d transforms disabled for chrome, though
	// it works fine in safari on leopard and snow leopard
	// as a result, it 'recognizes' the syntax and throws a false positive
	// thus we must do a more thorough check:
	if (ret)
	{
		var st = document.createElement('style');
		// webkit allows this media query to succeed only if the feature is enabled.
		// "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d),(modernizr){#modernizr{height:3px}}"
		st.textContent = '@media (-webkit-transform-3d){#test3d{height:3px}}';
		document.getElementsByTagName('head')[0].appendChild(st);
		div.id = 'test3d';
		document.body.appendChild(div);
		
		ret = div.offsetHeight === 3;
		
		st.parentNode.removeChild(st);
		div.parentNode.removeChild(div);
	}
	return ret;
}
  
Detector = {
	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,
	getWebGLErrorMessage: function () {
		var element = document.createElement( 'div' );
		element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'center';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '400px';
		element.style.margin = '5em auto 0';
		if ( ! this.webgl ) {
			element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );
		}
		return element;
	},

	addGetWebGLMessage: function ( parameters ) {
		var parent, id, element;
		parameters = parameters || {};
		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';
		element = Detector.getWebGLErrorMessage();
		element.id = id;
		parent.appendChild( element );
	}
};
