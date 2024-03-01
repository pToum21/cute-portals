import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three"
export const Experience = () => {

  const map = useTexture(
    'textures/Anime_equirectangular-jpg_desert_sand_dunes_world_1355661936_10321814.jpg'
  );
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial map={map} side={THREE.BackSide}/>
      </mesh>
    </>
  );
};
