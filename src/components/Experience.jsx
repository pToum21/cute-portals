import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture, Text, CameraControls } from "@react-three/drei";
import * as THREE from "three"
import { Ghost } from "./Ghost";
import { Yeti } from "./Yeti";
import { Frog } from "./Frog";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";


export const Experience = () => {
  const [active, setActive] = useState(null);

  const controlsRef = useRef();

  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      const targetPostition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPostition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPostition.x,
        targetPostition.y,
        targetPostition.z,
        true,
      )

    } else {
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true,
      )
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      {/* desert ghost */}
      <MonsterStage
        texture={"textures/Anime_equirectangular-jpg_desert_sand_dunes_world_1355661936_10321814.jpg"}
        name={"Messy Ghost"}
        color={"#290f2e"}
        active={active}
        setActive={setActive}
      >
        <Ghost scale={0.6} position-y={-1} />
      </MonsterStage>
      {/* snow yeti */}
      <MonsterStage
        texture={"textures/Anime_equirectangular-jpg_snowy_forest_with_big_909903919_10321818.jpg"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        // yetis name that displays as text
        name={"Drunk Yeti"}
        color={"#8abbc9"}
        active={active}
        setActive={setActive}
      >
        <Yeti scale={0.6} position-y={-1} />
      </MonsterStage>
      {/* water frog */}
      <MonsterStage
        texture={"textures/Anime_equirectangular-jpg_water_world_664462261_10321798.jpg"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        name={"Dart Frog"}
        color={"#cfad35"}
        active={active}
        setActive={setActive}
      >
        <Frog scale={0.6} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, name, color, active, setActive, ...props }) => {
  const map = useTexture(texture);

  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, 'blend', worldOpen ? 1 : 0, 0.2, delta);
  })

  const handleDoubleClick = () => {
    setActive(active === name ? null : name);
  };

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox name={name} args={[2, 3, 0.1]} onDoubleClick={handleDoubleClick}>
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
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
