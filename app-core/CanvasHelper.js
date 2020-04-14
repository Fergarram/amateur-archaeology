import m4 from './libs/m4.js';
import webglUtils from './libs/webgl-utils.js';
class CanvasHelper {

	constructor() {
		this.screen = null;
		this.canvas = null;
		this.assets = null;
		this.ctx = null;
		this.gl = null;
		this.imageProgram = null;
		this.squareProgram = null;
		this.textureInfoArray = {};
	}

	init(AssetLoader) {
		this.screen = document.getElementById('screen');
		this.canvas = document.createElement('canvas');
		this.canvas.id = 'MainCanvas';
		this.canvas.width = 240;
		this.canvas.height = 320;
		this.canvas.style.zIndex = 8;
		this.canvas.style.position = 'absolute';
		this.screen.appendChild(this.canvas); 
		this.gl = this.canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });
		this.assets = AssetLoader;

		// Setup GLSL programs.
		this.imageProgram = webglUtils.createProgram(this.gl, this.createImageShaders());
		this.squareProgram = webglUtils.createProgram(this.gl, this.createSquareShaders());

		// Look up where the vertex data needs to go.
		this.positionLocation = this.gl.getAttribLocation(this.imageProgram, "a_position");
		this.texcoordLocation = this.gl.getAttribLocation(this.imageProgram, "a_texcoord");
		this.squarePositionLoc = this.gl.getAttribLocation(this.squareProgram, "a_position");
	  
		// Lookup uniforms.
		this.matrixLocation = this.gl.getUniformLocation(this.imageProgram, "u_matrix");
		this.textureLocation = this.gl.getUniformLocation(this.imageProgram, "u_texture");
		this.imageColorUniformLoc = this.gl.getUniformLocation(this.imageProgram, 'u_color');
		this.squareMatrixLocation = this.gl.getUniformLocation(this.squareProgram, "u_matrix");
		this.squareColorUniformLoc = this.gl.getUniformLocation(this.squareProgram, 'u_color');
		this.suqareSizeUniformLoc = this.gl.getUniformLocation(this.squareProgram, 'u_size');

		// Square point position buffer
		this.squarePositionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squarePositionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0, 0]), this.gl.STATIC_DRAW);

		// Create a buffer.
		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
	  
		// Put a unit quad in the buffer
		const positions = [
		  0, 0,
		  0, 1,
		  1, 0,
		  1, 0,
		  0, 1,
		  1, 1,
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

		// Create a buffer for texture coords
		this.texcoordBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
	  
		// Put texcoords in the buffer
		const texcoords = [
		  0, 0,
		  0, 1,
		  1, 0,
		  1, 0,
		  0, 1,
		  1, 1,
		];
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texcoords), this.gl.STATIC_DRAW);

		// Enable alpha for textures
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);

		for (let [name, img] of Object.entries(this.assets.images)) {
			// creates a texture info { width: w, height: h, texture: tex }
			// The texture will start with 1x1 pixels and be updated
			// when the image has loaded
			const texture = this.gl.createTexture();
			this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

			// let's assume all images are not a power of 2
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);

			const textureInfo = {
				width: 1,
				height: 1,
				texture: texture
			};

			textureInfo.width = img.width;
			textureInfo.height = img.height;
	
			this.gl.bindTexture(this.gl.TEXTURE_2D, textureInfo.texture);
			this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);

			this.textureInfoArray[name] = textureInfo;
		};
	}

	loop(update, render) {
		let fps, delta, lastRender = Date.now() - 1;

		const animate = () => {
			delta = Date.now() - lastRender;
			fps = parseInt(1000 / delta);

			update(delta);
			
			this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
			this.gl.clearColor(0, 0, 0, 1);
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);

			render();

			lastRender = Date.now();
			window.requestAnimationFrame(animate);
		};

		// Start the rendering loop
		animate();
	}

	drawSquare(rgba, x, y, s) {
		this.gl.useProgram(this.squareProgram);

		// Setup the attributes to pull data from our buffers
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.squarePositionBuffer);
		this.gl.enableVertexAttribArray(this.squarePositionLoc);
		this.gl.vertexAttribPointer(this.squarePositionLoc, 2, this.gl.FLOAT, false, 0, 0);
		
		// this matirx will convert from pixels to clip space
		let matrix = m4.orthographic(0, this.canvas.width, this.canvas.height, 0, -1, 1);

		// this matrix will translate our quad to x, y
		matrix = m4.translate(matrix, x + (s/2), y + (s/2), 0);
		matrix = m4.scale(matrix, s, s, 1);
		this.gl.uniformMatrix4fv(this.squareMatrixLocation, false, matrix);
		this.gl.uniform1f(this.suqareSizeUniformLoc, s);
		this.gl.uniform4fv(this.squareColorUniformLoc, new Float32Array(rgba));
		
		this.gl.drawArrays(this.gl.POINTS, 0, 1);
	}

	drawImage(imageName, x, y, a = 1, flipx = false, flipy = false) {
		const textureInfo = this.textureInfoArray[imageName];
		this.gl.bindTexture(this.gl.TEXTURE_2D, textureInfo.texture);

		// Tell WebGL to use our shader program pair
		this.gl.useProgram(this.imageProgram);

		// Setup the attributes to pull data from our buffers
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.enableVertexAttribArray(this.positionLocation);
		this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
		this.gl.enableVertexAttribArray(this.texcoordLocation);
		this.gl.vertexAttribPointer(this.texcoordLocation, 2, this.gl.FLOAT, false, 0, 0);

		// this matirx will convert from pixels to clip space
		let matrix = m4.orthographic(0, this.canvas.width, this.canvas.height, 0, -1, 1);

		// this matrix will translate our quad to x, y
		const xx = flipx ? x + (textureInfo.width * 2) : x;
		const yy = flipy ? y + (extureInfo.height * 2) : y;
		const sx = flipx ? -1 : 1;
		const sy = flipy ? -1 : 1;
		matrix = m4.translate(matrix, xx, yy, 0);
		matrix = m4.scale(matrix, (textureInfo.width * 2) * sx, (textureInfo.height * 2) * sy, 1);
		this.gl.uniformMatrix4fv(this.matrixLocation, false, matrix);
		this.gl.uniform1i(this.textureLocation, 0);
		this.gl.uniform4fv(this.imageColorUniformLoc, new Float32Array([1, 1, 1, a]));
		this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
	}

	createShader(sourceCode, type) {
		// Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
		var shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, sourceCode);
		this.gl.compileShader(shader);
		
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			var info = this.gl.getShaderInfoLog(shader);
			throw 'Could not compile WebGL program. \n\n' + info;
		}
		return shader;
	}

	createSquareShaders() {
		const vertex = this.createShader(`
			attribute vec4 a_position;
			uniform mat4 u_matrix;
			uniform float u_size;
			
			void main() {
				gl_Position = u_matrix * a_position;
				gl_PointSize = u_size;
			}
		`, this.gl.VERTEX_SHADER);
		const frag = this.createShader(`
			precision mediump float;
			uniform vec4 u_color;
			
			void main() {
				gl_FragColor = u_color;
			}
		`, this.gl.FRAGMENT_SHADER);
		return [ vertex, frag ];
	}

	createImageShaders() {
		const vertex = this.createShader(`
			attribute vec4 a_position;
			attribute vec2 a_texcoord;
			uniform mat4 u_matrix;
			varying vec2 v_texcoord;
			
			void main() {
				gl_Position = u_matrix * a_position;
				v_texcoord = a_texcoord;
			}
		`, this.gl.VERTEX_SHADER);
		const frag = this.createShader(`
			precision mediump float;
			varying vec2 v_texcoord;
			uniform vec4 u_color;
			uniform sampler2D u_texture;
			
			void main() {
				gl_FragColor = texture2D(u_texture, v_texcoord) * u_color;
			}
		`, this.gl.FRAGMENT_SHADER);
		return [ vertex, frag ];
	}
}

export default new CanvasHelper();