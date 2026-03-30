"use client";

import React from "react";

interface AgentMascotProps {
  equippedCategories: Set<string>;
  isRunning?: boolean;
  status?: string;
}

const P = 8; // pixel size

function Px({
  x,
  y,
  color,
  w = 1,
  h = 1,
}: {
  x: number;
  y: number;
  color: string;
  w?: number;
  h?: number;
}) {
  return <rect x={x * P} y={y * P} width={w * P} height={h * P} fill={color} />;
}

// Color palette
const BODY = "#CC8B6E";
const BODY_DARK = "#B07A5F";
const BODY_LIGHT = "#D9A088";
const EYE = "#1A1A1A";
const LEG_TIP = "#D9A088";

export default function AgentMascot({
  equippedCategories,
  isRunning = false,
  status,
}: AgentMascotProps) {
  const equippedCount = equippedCategories.size;

  const hasCommunication = equippedCategories.has("communication");
  const hasMarketing = equippedCategories.has("marketing");
  const hasProductivity = equippedCategories.has("productivity");
  const hasDevelopment = equippedCategories.has("development");
  const hasData = equippedCategories.has("data");
  const hasDesign = equippedCategories.has("design");

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={isRunning ? "mascot-bounce" : ""}
        style={{ lineHeight: 0 }}
      >
        <svg
          viewBox="0 0 200 200"
          width={200}
          height={200}
          xmlns="http://www.w3.org/2000/svg"
          style={{ imageRendering: "pixelated" }}
        >
          {/* === HEADPHONES (communication) === */}
          <g
            style={{
              opacity: hasCommunication ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* headband */}
            <Px x={7} y={3} color="#4A7DFF" w={11} h={1} />
            <Px x={6} y={4} color="#4A7DFF" w={1} h={1} />
            <Px x={18} y={4} color="#4A7DFF" w={1} h={1} />
            {/* left earpiece */}
            <Px x={5} y={5} color="#4A7DFF" w={2} h={2} />
            <Px x={5} y={7} color="#3A6AE0" w={2} h={1} />
            {/* right earpiece */}
            <Px x={18} y={5} color="#4A7DFF" w={2} h={2} />
            <Px x={18} y={7} color="#3A6AE0" w={2} h={1} />
          </g>

          {/* === BODY === */}
          {/* Head - top row */}
          <Px x={9} y={5} color={BODY} w={7} h={1} />
          {/* Head - second row */}
          <Px x={8} y={6} color={BODY} w={9} h={1} />
          {/* Head - main rows */}
          <Px x={7} y={7} color={BODY} w={11} h={1} />
          <Px x={7} y={8} color={BODY} w={11} h={1} />

          {/* Eyes row */}
          <Px x={7} y={9} color={BODY} w={2} h={1} />
          <Px x={9} y={9} color={EYE} w={2} h={1} />
          <Px x={11} y={9} color={BODY} w={3} h={1} />
          <Px x={14} y={9} color={EYE} w={2} h={1} />
          <Px x={16} y={9} color={BODY} w={2} h={1} />

          {/* Eye highlights */}
          <Px x={9} y={9} color="#FFFFFF" w={1} h={1} />
          <Px x={14} y={9} color="#FFFFFF" w={1} h={1} />

          {/* Below eyes */}
          <Px x={7} y={10} color={BODY} w={11} h={1} />

          {/* Mouth row */}
          <Px x={7} y={11} color={BODY} w={4} h={1} />
          <Px x={11} y={11} color={BODY_DARK} w={3} h={1} />
          <Px x={14} y={11} color={BODY} w={4} h={1} />

          {/* Body lower */}
          <Px x={8} y={12} color={BODY} w={9} h={1} />
          <Px x={8} y={13} color={BODY} w={9} h={1} />
          <Px x={9} y={14} color={BODY} w={7} h={1} />

          {/* === TENTACLES === */}
          {/* Tentacle 1 (far left) */}
          <Px x={7} y={14} color={BODY} w={2} h={1} />
          <Px x={6} y={15} color={BODY} w={2} h={1} />
          <Px x={5} y={16} color={BODY} w={2} h={1} />
          <Px x={5} y={17} color={BODY_DARK} w={1} h={1} />
          <Px x={4} y={17} color={LEG_TIP} w={1} h={1} />
          <Px x={4} y={18} color={LEG_TIP} w={2} h={1} />

          {/* Tentacle 2 (inner left) */}
          <Px x={9} y={15} color={BODY} w={2} h={1} />
          <Px x={9} y={16} color={BODY} w={2} h={1} />
          <Px x={8} y={17} color={BODY_DARK} w={2} h={1} />
          <Px x={8} y={18} color={LEG_TIP} w={2} h={1} />

          {/* Tentacle 3 (inner right) */}
          <Px x={14} y={15} color={BODY} w={2} h={1} />
          <Px x={14} y={16} color={BODY} w={2} h={1} />
          <Px x={15} y={17} color={BODY_DARK} w={2} h={1} />
          <Px x={15} y={18} color={LEG_TIP} w={2} h={1} />

          {/* Tentacle 4 (far right) */}
          <Px x={16} y={14} color={BODY} w={2} h={1} />
          <Px x={17} y={15} color={BODY} w={2} h={1} />
          <Px x={18} y={16} color={BODY} w={2} h={1} />
          <Px x={19} y={17} color={BODY_DARK} w={1} h={1} />
          <Px x={20} y={17} color={LEG_TIP} w={1} h={1} />
          <Px x={19} y={18} color={LEG_TIP} w={2} h={1} />

          {/* === MAGNIFYING GLASS (marketing) === */}
          <g
            style={{
              opacity: hasMarketing ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* handle - held by right tentacle */}
            <Px x={20} y={14} color="#10B981" w={1} h={1} />
            <Px x={21} y={13} color="#10B981" w={1} h={1} />
            {/* lens ring */}
            <Px x={21} y={11} color="#10B981" w={3} h={1} />
            <Px x={20} y={12} color="#10B981" w={1} h={1} />
            <Px x={24} y={12} color="#10B981" w={1} h={1} />
            <Px x={21} y={13} color="#10B981" w={1} h={1} />
            <Px x={24} y={13} color="#10B981" w={1} h={1} />
            <Px x={21} y={14} color="#10B981" w={3} h={1} />
            {/* lens glass */}
            <Px x={21} y={12} color="#A7F3D0" w={3} h={2} />
          </g>

          {/* === PENCIL (productivity) === */}
          <g
            style={{
              opacity: hasProductivity ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* pencil body - behind left side */}
            <Px x={4} y={4} color="#8B5CF6" w={1} h={1} />
            <Px x={4} y={5} color="#8B5CF6" w={1} h={1} />
            <Px x={4} y={6} color="#8B5CF6" w={1} h={1} />
            <Px x={4} y={7} color="#8B5CF6" w={1} h={1} />
            <Px x={4} y={8} color="#A78BFA" w={1} h={1} />
            <Px x={4} y={9} color="#A78BFA" w={1} h={1} />
            {/* eraser */}
            <Px x={4} y={3} color="#F472B6" w={1} h={1} />
            {/* tip */}
            <Px x={4} y={10} color="#FDE68A" w={1} h={1} />
            <Px x={4} y={11} color={EYE} w={1} h={1} />
          </g>

          {/* === CODE BRACKETS (development) === */}
          <g
            style={{
              opacity: hasDevelopment ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* < bracket */}
            <Px x={20} y={6} color="#EF4444" w={1} h={1} />
            <Px x={19} y={7} color="#EF4444" w={1} h={1} />
            <Px x={20} y={8} color="#EF4444" w={1} h={1} />
            {/* / */}
            <Px x={21} y={6} color="#EF4444" w={1} h={1} />
            <Px x={21} y={7} color="#EF4444" w={1} h={1} />
            <Px x={22} y={8} color="#EF4444" w={1} h={1} />
            {/* > bracket */}
            <Px x={23} y={6} color="#EF4444" w={1} h={1} />
            <Px x={24} y={7} color="#EF4444" w={1} h={1} />
            <Px x={23} y={8} color="#EF4444" w={1} h={1} />
          </g>

          {/* === NEWSPAPER/DOCUMENT (data) === */}
          <g
            style={{
              opacity: hasData ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* document in left tentacle */}
            <Px x={1} y={14} color="#FEF3C7" w={4} h={5} />
            <Px x={1} y={14} color="#F59E0B" w={4} h={1} />
            {/* text lines */}
            <Px x={2} y={16} color="#F59E0B" w={2} h={1} />
            <Px x={2} y={17} color="#D97706" w={2} h={1} />
          </g>

          {/* === PAINTBRUSH (design) === */}
          <g
            style={{
              opacity: hasDesign ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            {/* brush tip */}
            <Px x={9} y={20} color="#EC4899" w={2} h={1} />
            <Px x={9} y={21} color="#F472B6" w={1} h={1} />
            {/* ferrule */}
            <Px x={10} y={21} color="#9CA3AF" w={1} h={1} />
            {/* handle */}
            <Px x={10} y={22} color="#7C3AED" w={1} h={1} />
            <Px x={11} y={23} color="#7C3AED" w={1} h={1} />
            <Px x={11} y={24} color="#7C3AED" w={1} h={1} />
          </g>
        </svg>
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-sm font-medium text-[#1A1A1A]">
          {equippedCount} {equippedCount === 1 ? "skill" : "skills"} equipped
        </p>
        {status && (
          <p className="text-xs text-muted-foreground mt-0.5">{status}</p>
        )}
        {isRunning && !status && (
          <p className="text-xs text-muted-foreground mt-0.5">Running...</p>
        )}
      </div>

      {/* Bounce animation */}
      <style jsx>{`
        @keyframes mascot-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .mascot-bounce {
          animation: mascot-bounce 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
