import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Ghost } from "./Ghost";
export const Experience = () => {

  const map = useTexture(
    'textures/Anime_equirectangular-jpg_desert_sand_dunes_world_1355661936_10321814.jpg'
  );
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <Ghost scale={0.6} />
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>
  );
};
