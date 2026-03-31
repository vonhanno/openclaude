"use client";

import React from "react";

const P = 4; // pixel size (half of main mascot)

function Px({ x, y, color, w = 1, h = 1 }: { x: number; y: number; color: string; w?: number; h?: number }) {
  return <rect x={x * P} y={y * P} width={w * P} height={h * P} fill={color} />;
}

const BODY = "#CC8B6E";
const BODY_DARK = "#B07A5F";
const BODY_LIGHT = "#D9A088";
const EYES = "#1A1A1A";
const EYE_HIGHLIGHT = "#FFFFFF";

// Base octopus body pixels (shared by all variants)
function BaseBody() {
  return (
    <g>
      {/* Head */}
      <Px x={5} y={2} w={6} h={1} color={BODY} />
      <Px x={4} y={3} w={8} h={1} color={BODY} />
      <Px x={3} y={4} w={10} h={1} color={BODY} />
      <Px x={3} y={5} w={10} h={1} color={BODY} />
      <Px x={3} y={6} w={10} h={1} color={BODY} />
      <Px x={3} y={7} w={10} h={1} color={BODY_DARK} />
      <Px x={4} y={8} w={8} h={1} color={BODY} />
      {/* Eyes */}
      <Px x={5} y={5} w={2} h={2} color={EYES} />
      <Px x={9} y={5} w={2} h={2} color={EYES} />
      <Px x={5} y={5} color={EYE_HIGHLIGHT} />
      <Px x={9} y={5} color={EYE_HIGHLIGHT} />
      {/* Tentacles */}
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

// Accessory overlays for each agent type
const accessories: Record<string, React.FC> = {
  "email-triage": () => (
    <g>
      {/* Headphones - blue */}
      <Px x={3} y={1} w={10} h={1} color="#4A7DFF" />
      <Px x={2} y={2} w={2} h={3} color="#4A7DFF" />
      <Px x={12} y={2} w={2} h={3} color="#4A7DFF" />
      {/* Small envelope */}
      <Px x={14} y={7} w={3} h={2} color="#4A7DFF" />
      <Px x={15} y={7} color="#FFFFFF" />
    </g>
  ),
  "meeting-prep": () => (
    <g>
      {/* Clipboard */}
      <Px x={14} y={4} w={3} h={5} color="#8B5CF6" />
      <Px x={15} y={3} w={1} h={1} color="#6D42C9" />
      <Px x={14} y={5} w={3} h={1} color="#FFFFFF" />
      <Px x={14} y={7} w={2} h={1} color="#FFFFFF" />
    </g>
  ),
  "daily-news-briefing": () => (
    <g>
      {/* Newspaper */}
      <Px x={14} y={5} w={3} h={4} color="#F59E0B" />
      <Px x={14} y={5} w={3} h={1} color="#D97706" />
      <Px x={15} y={7} w={1} h={1} color="#FFFFFF" />
      {/* Reading glasses */}
      <Px x={4} y={4} w={3} h={1} color="#1A1A1A" />
      <Px x={9} y={4} w={3} h={1} color="#1A1A1A" />
      <Px x={7} y={4} w={2} h={1} color="#666666" />
    </g>
  ),
  "seo-site-auditor": () => (
    <g>
      {/* Magnifying glass */}
      <Px x={14} y={5} w={2} h={2} color="#10B981" />
      <Px x={15} y={5} color="#FFFFFF" />
      <Px x={16} y={7} w={1} h={2} color="#666666" />
      {/* Detective hat */}
      <Px x={4} y={1} w={8} h={1} color="#10B981" />
      <Px x={5} y={0} w={6} h={1} color="#0D9668" />
    </g>
  ),
  "code-review": () => (
    <g>
      {/* Glasses */}
      <Px x={4} y={4} w={3} h={1} color="#1A1A1A" />
      <Px x={9} y={4} w={3} h={1} color="#1A1A1A" />
      <Px x={7} y={4} w={2} h={1} color="#1A1A1A" />
      {/* Code brackets </> */}
      <Px x={0} y={6} w={1} h={1} color="#EF4444" />
      <Px x={1} y={5} w={1} h={1} color="#EF4444" />
      <Px x={0} y={7} w={1} h={1} color="#EF4444" />
      <Px x={15} y={6} w={1} h={1} color="#EF4444" />
      <Px x={14} y={5} w={1} h={1} color="#EF4444" />
      <Px x={15} y={7} w={1} h={1} color="#EF4444" />
    </g>
  ),
  "competitor-monitor": () => (
    <g>
      {/* Radar/binoculars */}
      <Px x={14} y={4} w={2} h={3} color="#F59E0B" />
      <Px x={14} y={4} w={1} h={1} color="#D97706" />
      <Px x={15} y={4} w={1} h={1} color="#D97706" />
      {/* Spy hat */}
      <Px x={4} y={1} w={8} h={1} color="#1A1A1A" />
      <Px x={3} y={2} w={10} h={1} color="#333333" />
    </g>
  ),
  "content-writer": () => (
    <g>
      {/* Pencil */}
      <Px x={14} y={3} w={1} h={5} color="#10B981" />
      <Px x={14} y={8} w={1} h={1} color="#F59E0B" />
      <Px x={14} y={2} w={1} h={1} color="#EC4899" />
      {/* Beret */}
      <Px x={4} y={1} w={8} h={1} color="#EC4899" />
      <Px x={5} y={0} w={4} h={1} color="#EC4899" />
    </g>
  ),
  "report-generator": () => (
    <g>
      {/* Chart bars */}
      <Px x={14} y={8} w={1} h={2} color="#8B5CF6" />
      <Px x={15} y={6} w={1} h={4} color="#A78BFA" />
      <Px x={16} y={4} w={1} h={6} color="#8B5CF6" />
      {/* Tie */}
      <Px x={7} y={8} w={2} h={1} color="#4A7DFF" />
      <Px x={7} y={9} w={2} h={1} color="#3B6DE0" />
    </g>
  ),
  "smart-email-reply": () => (
    <g>
      {/* Headphones */}
      <Px x={3} y={1} w={10} h={1} color="#4A7DFF" />
      <Px x={2} y={2} w={2} h={3} color="#4A7DFF" />
      <Px x={12} y={2} w={2} h={3} color="#4A7DFF" />
      {/* Speech bubble */}
      <Px x={14} y={3} w={3} h={2} color="#FFFFFF" />
      <Px x={14} y={3} w={3} h={2} color="#E5E7EB" />
      <Px x={15} y={4} w={1} h={1} color="#4A7DFF" />
      <Px x={13} y={5} w={1} h={1} color="#E5E7EB" />
    </g>
  ),
  "invoice-expense-tracker": () => (
    <g>
      {/* Calculator */}
      <Px x={14} y={4} w={3} h={5} color="#059669" />
      <Px x={14} y={4} w={3} h={1} color="#047857" />
      <Px x={15} y={6} w={1} h={1} color="#FFFFFF" />
      <Px x={15} y={8} w={1} h={1} color="#FFFFFF" />
      {/* Top hat */}
      <Px x={5} y={0} w={6} h={1} color="#1A1A1A" />
      <Px x={6} y={-1} w={4} h={1} color="#1A1A1A" />
      <Px x={4} y={1} w={8} h={1} color="#333333" />
    </g>
  ),
};

export type MascotVariant = keyof typeof accessories;

interface MiniMascotProps {
  variant: string;
  size?: number;
}

export default function MiniMascot({ variant, size = 64 }: MiniMascotProps) {
  const Accessory = accessories[variant];
  const viewBox = `0 -${P} ${17 * P} ${13 * P}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: "pixelated" }}
    >
      <BaseBody />
      {Accessory && <Accessory />}
    </svg>
  );
}
