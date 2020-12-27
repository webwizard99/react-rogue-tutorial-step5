import React, { useRef, useEffect, useState } from 'react';
import InputManager from '../../utilities/InputManager';

const ReactRogue = ({ width, height, tileSize }) => {
  const canvasRef = useRef();
  let inputManager = new InputManager();
  const [player, setPlayer] = useState({ x: 64, y: 128 })

  const handleInput = (action, data) => {
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newPlayer = {...player};
    newPlayer.x += data.x * tileSize;
    newPlayer.y += data.y * tileSize;
    setPlayer(newPlayer);
  }

  useEffect(() => {
    console.log('Bind input');
    inputManager.bindKeys();
    inputManager.subscribe(handleInput);
    return () => {
      inputManager.unbindKeys();
      inputManager.unsubscribe(handleInput);
    }
  });

  useEffect(() => {
    console.log("Draw to canvas")
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, width * tileSize, height * tileSize);
    ctx.fillSytle = '#000';
    ctx.fillRect(player.x, player.y, 16, 16);
  })
  return (
  <canvas 
    ref={canvasRef}  
    width={width * tileSize} 
    height={height * tileSize} 
    style={{ border: '1px solid black' }}
  ></canvas>)
}

export default ReactRogue;