import { OrbitControls, useTexture } from "@react-three/drei";

export const Experience = () => {

  const map = useTexture(
    'textures/Anime_equirectangular-jpg_desert_sand_dunes_world_1355661936_10321814.jpg'
  );
  return (
    <>
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};
