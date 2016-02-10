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
		this.state.explosion = {
			position: new THREE.Vector3(-100, 0, 0),
			sprite: 'img/explosion.png',
			hTiles: 4,
			vTiles: 4,
			animationSpeed: 200,
			tileIndex: 0
		};
		this.state.fire = {
			position: new THREE.Vector3(0, 0, 0),
			sprite: 'img/fire.jpg',
			hTiles: 8,
			vTiles: 8,
			animationSpeed: 75,
			tileIndex: 0
		};
		this.state.runner = {
			position: new THREE.Vector3(100, 0, 0),
			sprite: 'img/run.png',
			hTiles: 10,
			vTiles: 1,
			animationSpeed: 75,
			tileIndex: 0
		};
		this._onAnimate = this._onAnimate.bind(this);
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
		['explosion', 'fire', 'runner'].forEach((tile) => {
			const newTileState = this._updateTile(this.state[tile], tile);
			this.setState(newTileState);
		});
	}

	_updateTile(tile, tileName) {
		const newTile = Object.assign({}, tile);
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
					clearColor="white"
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
							position={this.state.fire.position}
							sprite={this.state.fire.sprite}
							hTiles={this.state.fire.hTiles}
							vTiles={this.state.fire.vTiles}
							animationSpeed={this.state.fire.animationSpeed}
							tileIndex={this.state.fire.tileIndex}
						/>
						<Target
							position={this.state.explosion.position}
							sprite={this.state.explosion.sprite}
							hTiles={this.state.explosion.hTiles}
							vTiles={this.state.explosion.vTiles}
							animationSpeed={this.state.explosion.animationSpeed}
							tileIndex={this.state.fire.tileIndex}
						/>
						<Target
							position={this.state.runner.position}
							sprite={this.state.runner.sprite}
							hTiles={this.state.runner.hTiles}
							vTiles={this.state.runner.vTiles}
							animationSpeed={this.state.runner.animationSpeed}
							tileIndex={this.state.fire.tileIndex}
						/>
					</scene>
				</React3>
			</div>
		);
	}
}
