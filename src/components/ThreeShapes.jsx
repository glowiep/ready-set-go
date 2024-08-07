import * as THREE from 'three';

export const createPolygon = (innerRadius, outerRadius, sides, color, startAngle = 0) => {
  const shape = new THREE.Shape();
  const angleStep = (Math.PI * 2) / sides;

  if (sides === 0) {
    // Create a circle shape
    shape.moveTo(0, 0);
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);  // Outer circle
    shape.holes.push(new THREE.Path().absarc(0, 0, innerRadius, 0, Math.PI * 2, true))  // Inner circle as a hole
  } else {
    // Outer vertices
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + i * angleStep;
    const x = outerRadius * Math.cos(angle);
    const y = outerRadius * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  // Close the path by connecting the last vertex to the first one
  shape.closePath();
  }


  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshStandardMaterial({
    color,
    opacity: 0.8,
    transparent: true,
    side: THREE.DoubleSide,
    emissive: color, // Set emissive color to match the main color
    emissiveIntensity: 1, // Adjust intensity as needed (0 to 1)
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2  // Rotate to lay flat on the ground
  mesh.position.y = -0.55  // Set as -0.1 to avoid z-fighting

  return mesh;
}

export const createOctagon = (innerRadius, outerRadius, sides, color, startAngle = 90) => {
  const shape = new THREE.Shape();
  const angleStep = (Math.PI * 2) / sides;

  // Outer vertices
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + i * angleStep;
    const x = outerRadius * Math.cos(angle);
    const y = outerRadius * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  // Inner vertices (reverse order to ensure correct face orientation)
  for (let i = 0; i < sides; i++) {
    const angle = startAngle + (sides - 1 - i) * angleStep; // Reverse order
    const x = innerRadius * Math.cos(angle);
    const y = innerRadius * Math.sin(angle);
    shape.lineTo(x, y);
  }

  // Close the path by connecting the last inner vertex to the first outer vertex
  const firstOuterX = outerRadius * Math.cos(startAngle);
  const firstOuterY = outerRadius * Math.sin(startAngle);
  shape.lineTo(firstOuterX, firstOuterY);

  shape.closePath();

  const geometry = new THREE.ShapeGeometry(shape);
  const material = new THREE.MeshStandardMaterial({ 
    color, side: 
    THREE.DoubleSide, 
    opacity: 0.8, 
    transparent: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2; // Rotate to lay flat on the ground
  mesh.position.y = -0.55; // Set as -0.1 to avoid z-fighting

  return mesh;
};

export const createTShape = (width, height, thickness, startAngle = 0) => {
  const shape = new THREE.Shape();

  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(width / 2, thickness);
  shape.lineTo(thickness / 2, thickness);
  shape.lineTo(thickness / 2, height);
  shape.lineTo(-thickness / 2, height);
  shape.lineTo(-thickness / 2, thickness);
  shape.lineTo(-width / 2, thickness);
  shape.closePath();

  const geometry = new THREE.ShapeGeometry(shape);
  
  // Apply rotation based on the start angle
  geometry.rotateY(startAngle);

  return geometry;
};