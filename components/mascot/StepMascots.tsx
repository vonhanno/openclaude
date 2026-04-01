"use client";

import React from "react";

const P = 4; // pixel size

function Px({ x, y, color, w = 1, h = 1 }: { x: number; y: number; color: string; w?: number; h?: number }) {
  return <rect x={x * P} y={y * P} width={w * P} height={h * P} fill={color} />;
}

const BODY = "#CC8B6E";
const BODY_DARK = "#B07A5F";
const BODY_LIGHT = "#D9A088";
const EYES = "#1A1A1A";
const EYE_HL = "#FFFFFF";

function BaseOctopus() {
  return (
    <g>
      <Px x={5} y={2} w={6} h={1} color={BODY} />
      <Px x={4} y={3} w={8} h={1} color={BODY} />
      <Px x={3} y={4} w={10} h={1} color={BODY} />
      <Px x={3} y={5} w={10} h={1} color={BODY} />
      <Px x={3} y={6} w={10} h={1} color={BODY} />
      <Px x={3} y={7} w={10} h={1} color={BODY_DARK} />
      <Px x={4} y={8} w={8} h={1} color={BODY} />
      <Px x={5} y={5} w={2} h={2} color={EYES} />
      <Px x={9} y={5} w={2} h={2} color={EYES} />
      <Px x={5} y={5} color={EYE_HL} />
      <Px x={9} y={5} color={EYE_HL} />
      <Px x={3} y={9} w={2} h={1} color={BODY} />
      <Px x={6} y={9} w={1} h={1} color={BODY} />
      <Px x={9} y={9} w={1} h={1} color={BODY} />
      <Px x={12} y={9} w={1} h={1} color={BODY} />
      <Px x={3} y={10} w={1} h={1} color={BODY_LIGHT} />
      <Px x={6} y={10} w={1} h={1} color={BODY_LIGHT} />
      <Px x={9} y={10} w={1} h={1} color={BODY_LIGHT} />
      <Px x={12} y={10} w={1} h={1} color={BODY_LIGHT} />
    </g>
  );
}

// Step 1: Browse — octopus with magnifying glass, looking at cards
export function BrowseMascot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 -${P} ${18 * P} ${14 * P}`} xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <BaseOctopus />
      {/* Magnifying glass held by right tentacle */}
      <Px x={14} y={6} w={2} h={2} color="#4A7DFF" />
      <Px x={15} y={6} color="#D4E4FF" />
      <Px x={16} y={8} w={1} h={2} color="#6B7280" />
      {/* Small cards floating to the left */}
      <Px x={0} y={3} w={2} h={3} color="#FFFFFF" />
      <Px x={0} y={3} w={2} h={1} color="#4A7DFF" />
      <Px x={0} y={7} w={2} h={3} color="#FFFFFF" />
      <Px x={0} y={7} w={2} h={1} color="#10B981" />
    </svg>
  );
}

// Step 2: Customize — octopus with pencil, writing on a form
export function CustomizeMascot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 -${P} ${18 * P} ${14 * P}`} xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <BaseOctopus />
      {/* Pencil in right tentacle */}
      <Px x={14} y={4} w={1} h={1} color="#EC4899" />
      <Px x={14} y={5} w={1} h={4} color="#8B5CF6" />
      <Px x={14} y={9} w={1} h={1} color="#FDE68A" />
      <Px x={14} y={10} w={1} h={1} color={EYES} />
      {/* Checklist/form to the left */}
      <Px x={0} y={3} w={2} h={7} color="#FFFFFF" />
      <Px x={0} y={3} w={2} h={1} color="#E5E7EB" />
      <Px x={0} y={5} w={1} h={1} color="#10B981" />
      <Px x={0} y={7} w={1} h={1} color="#10B981" />
      <Px x={0} y={9} w={1} h={1} color="#E5E7EB" />
    </svg>
  );
}

// Step 3: Install — octopus with terminal/command prompt
export function InstallMascot({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 -${P} ${18 * P} ${14 * P}`} xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: "pixelated" }}>
      <BaseOctopus />
      {/* Terminal window behind */}
      <Px x={0} y={1} w={16} h={1} color="#374151" />
      <Px x={0} y={2} w={16} h={9} color="#1A1A1A" />
      {/* Terminal dots */}
      <Px x={1} y={1} color="#EF4444" />
      <Px x={2} y={1} color="#F59E0B" />
      <Px x={3} y={1} color="#10B981" />
      {/* Terminal text */}
      <Px x={1} y={3} w={2} h={1} color="#10B981" />
      <Px x={4} y={3} w={4} h={1} color="#6B7280" />
      <Px x={1} y={5} w={3} h={1} color="#4A7DFF" />
      <Px x={1} y={7} w={1} h={1} color="#10B981" />
      <Px x={2} y={7} w={1} h={1} color="#6B7280" />
      {/* Octopus on top of terminal (smaller, overlapping) */}
      <Px x={9} y={0} w={5} h={1} color={BODY} />
      <Px x={8} y={1} w={7} h={1} color={BODY} />
      <Px x={8} y={2} w={7} h={4} color={BODY} />
      <Px x={9} y={3} w={2} h={1} color={EYES} />
      <Px x={12} y={3} w={2} h={1} color={EYES} />
      <Px x={9} y={3} color={EYE_HL} />
      <Px x={12} y={3} color={EYE_HL} />
      <Px x={10} y={5} w={3} h={1} color={BODY_DARK} />
      <Px x={8} y={6} w={2} h={1} color={BODY} />
      <Px x={11} y={6} w={1} h={1} color={BODY} />
      <Px x={13} y={6} w={2} h={1} color={BODY} />
      <Px x={8} y={7} w={1} h={1} color={BODY_LIGHT} />
      <Px x={11} y={7} w={1} h={1} color={BODY_LIGHT} />
      <Px x={14} y={7} w={1} h={1} color={BODY_LIGHT} />
      {/* Checkmark floating */}
      <Px x={16} y={1} w={1} h={1} color="#10B981" />
      <Px x={17} y={0} w={1} h={1} color="#10B981" />
      <Px x={15} y={2} w={1} h={1} color="#10B981" />
    </svg>
  );
}
