import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three"
import { Ghost } from "./Ghost";
export const Experience = () => {


  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      {/* desert ghost */}
      <MonsterStage texture={"textures/Anime_equirectangular-jpg_desert_sand_dunes_world_1355661936_10321814.jpg"}>
        <Ghost scale={0.6} position-y={-1} />
      </MonsterStage>
      {/* snow penguin */}
      <MonsterStage texture={"textures/Anime_equirectangular-jpg_snowy_forest_with_big_909903919_10321818.jpg"} position-x={-2.5} rotation-y={Math.PI /8}>
        <Ghost scale={0.6} position-y={-1} />
      </MonsterStage>
      {/* water frog */}
      <MonsterStage texture={"textures/Anime_equirectangular-jpg_water_world_664462261_10321798.jpg"} position-x={2.5} rotation-y={-Math.PI /8}>
        <Ghost scale={0.6} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, ...props }) => {
  const map = useTexture(texture);
  return (
    <group {...props}>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

