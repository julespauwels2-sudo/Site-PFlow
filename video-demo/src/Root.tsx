import { Composition } from "remotion";
import { MintBunDemo, DUREE } from "./MintBunDemo";

/* La vidéo : verticale 9:16, 720 × 1280, 30 images/s, environ 23 s. */
export const RemotionRoot: React.FC = () => (
  <Composition
    id="MintBunDemo"
    component={MintBunDemo}
    durationInFrames={DUREE}
    fps={30}
    width={720}
    height={1280}
  />
);
