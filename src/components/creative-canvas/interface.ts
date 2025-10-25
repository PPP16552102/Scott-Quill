import { MotionValue } from "framer-motion";

export interface CreativeCanvasProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

export interface Point {
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}
