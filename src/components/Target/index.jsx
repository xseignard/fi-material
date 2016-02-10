import React, { Component } from 'react';
import THREE from 'three';

export default class Target extends Component {
	constructor(props, context) {
		super(props, context);
		this.repeat = new THREE.Vector2(1 / this.props.hTiles, 1 / this.props.vTiles);
	}

	render() {
		const tileColumn = this.props.tileIndex % this.props.hTiles;
		const tileRow = this.props.vTiles - 1 - Math.floor(this.props.tileIndex / this.props.hTiles);
		// const tileColumn = 3;
		// const tileRow = 2;
		const offset = new THREE.Vector2(tileColumn / this.props.hTiles, tileRow / this.props.vTiles);

		return (
			<group>
				<resources>
					<texture
						resourceId="texture"
						url={this.props.sprite}
						wrapS={THREE.RepeatWrapping}
						wrapT={THREE.RepeatWrapping}
						repeat={this.repeat}
						offset={offset}
						transparent
						opacity={0.5}
						anisotropy={16}
					/>
					<meshBasicMaterial resourceId="material" color="white" transparent >
						<textureResource resourceId="texture" />
					</meshBasicMaterial>
					<planeGeometry resourceId="targetGeometry" width={50} height={50} />
				</resources>
				<mesh position={this.props.position}>
					<geometryResource resourceId="targetGeometry" />
					<materialResource resourceId="material" />
				</mesh>
			</group>
		);
	}
}
