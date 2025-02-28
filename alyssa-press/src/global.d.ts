/* eslint-disable @typescript-eslint/no-unused-vars */
import * as THREE from 'three';
import { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: ThreeElements['group'];
      primitive: ThreeElements['primitive'];
    }
  }
}
/* eslint-enable @typescript-eslint/no-unused-vars */
