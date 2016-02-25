import React, { Component } from 'react';
import React3 from 'react-three-renderer';
import THREE from 'three';
import Stats from 'stats.js';
import Target from '../Target';

export default class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.cameraPosition = new THREE.Vector3(0, 0, 500);

		this.state = {};
		this.state.blue = {
			position: new THREE.Vector3(-300, 0, 0),
			sprite: 'img/blue.png',
			hTiles: 8,
			vTiles: 10,
			animationSpeed: 16,
			tileIndex: 0
		};
		this.state.violet = {
			position: new THREE.Vector3(300, 0, 0),
			sprite: 'img/violet.png',
			hTiles: 8,
			vTiles: 10,
			animationSpeed: 16,
			tileIndex: 0
		};
		this._onAnimate = this._onAnimate.bind(this);
		this._updateTile = this._updateTile.bind(this);
	}

	componentDidMount() {
		this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		this.refs.container.appendChild(this.stats.domElement);
	}

	componentWillUnmount() {
		delete this.stats;
	}

	_onAnimate() {
		this.stats.update();
		['blue', 'violet'].forEach((tileName) => {
			const newTileState = this._updateTile(tileName);
			this.setState(newTileState);
		});
	}

	_updateTile(tileName) {
		const newTile = Object.assign({}, this.state[tileName]);
		if (!newTile.lastAnimate) {
			newTile.lastAnimate = new Date();
		}
		const now = new Date();
		if (now - newTile.lastAnimate > newTile.animationSpeed) {
			newTile.lastAnimate = now;
			const newTileIndex = (newTile.tileIndex + 1) % (newTile.hTiles * newTile.vTiles);
			newTile.tileIndex = newTileIndex;
		}
		const result = {};
		result[tileName] = newTile;
		return result;
	}

	render() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		return (
			<div ref="container">
				<React3
					mainCamera="camera"
					width={width}
					height={height}
					clearColor="#fff"
					alpha
					clearAlpha={0}
					onAnimate={this._onAnimate}
				>
					<scene>
						<perspectiveCamera
							name="camera"
							fov={75}
							aspect={width / height}
							near={0.1}
							far={1000}
							position={this.cameraPosition}
						/>
						<Target
							position={this.state.blue.position}
							sprite={this.state.blue.sprite}
							hTiles={this.state.blue.hTiles}
							vTiles={this.state.blue.vTiles}
							animationSpeed={this.state.blue.animationSpeed}
							tileIndex={this.state.blue.tileIndex}
						/>
						<Target
							position={this.state.violet.position}
							sprite={this.state.violet.sprite}
							hTiles={this.state.violet.hTiles}
							vTiles={this.state.violet.vTiles}
							animationSpeed={this.state.violet.animationSpeed}
							tileIndex={this.state.violet.tileIndex}
						/>
					</scene>
				</React3>
			</div>
		);
	}
}
