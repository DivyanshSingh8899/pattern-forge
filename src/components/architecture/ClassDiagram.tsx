interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  stereo?: string;
  dashed?: boolean;
}

function Box({ x, y, w, h, name, stereo, dashed }: BoxProps) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={3}
        fill="var(--card)"
        stroke={stereo ? "#a3a3a3" : "#c9c9c9"}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      {stereo && (
        <text x={x + w / 2} y={y + 14} textAnchor="middle" fontSize={8.5} fill="#868686" fontFamily="inherit">
          {stereo}
        </text>
      )}
      <text
        x={x + w / 2}
        y={stereo ? y + 28 : y + 18}
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={500}
        fill="#1c1c1c"
        fontFamily="ui-monospace, monospace"
      >
        {name}
      </text>
    </g>
  );
}

const ARROW = "url(#pf-arrow)";

export function ClassDiagram() {
  return (
    <svg
      viewBox="0 0 920 790"
      className="h-auto w-full"
      role="img"
      aria-label="PatternForge simplified class diagram"
    >
      <defs>
        <marker id="pf-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#8b8b8b" />
        </marker>
        <marker id="pf-arrow-dashed" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#a3a3a3" />
        </marker>
      </defs>

      {/* ---- Facade cluster ---- */}
      <Box x={60} y={16} w={120} h={36} name="DeploymentController" />
      <Box x={400} y={12} w={420} h={52} name="ReleaseManager" stereo="« Facade » — deploy()" />

      {/* client -> facade */}
      <line x1={180} y1={34} x2={392} y2={34} stroke="#8b8b8b" markerEnd={ARROW} />

      {/* facade -> subsystems (row B) */}
      {[
        { cx: 120, cy: 100 },
        { cx: 280, cy: 100 },
        { cx: 460, cy: 100 },
        { cx: 640, cy: 100 },
        { cx: 830, cy: 100 },
      ].map((p) => (
        <line key={p.cx} x1={610} y1={66} x2={p.cx} y2={p.cy - 6} stroke="#a6a6a6" markerEnd={ARROW} />
      ))}
      <Box x={60} y={100} w={120} h={44} name="Pipeline" />
      <Box x={220} y={100} w={120} h={44} name="CommandInvoker" />
      <Box x={395} y={100} w={130} h={44} name="HealthMonitor" />
      <Box x={565} y={100} w={150} h={44} name="RollbackManager" />
      <Box x={760} y={100} w={140} h={44} name="NotificationService" />

      {/* facade -> subsystems (row C) */}
      {[
        { cx: 145, cy: 170 },
        { cx: 355, cy: 170 },
        { cx: 570, cy: 170 },
        { cx: 795, cy: 170 },
      ].map((p) => (
        <line key={p.cx} x1={610} y1={66} x2={p.cx} y2={p.cy - 6} stroke="#a6a6a6" markerEnd={ARROW} />
      ))}
      <Box x={60} y={170} w={170} h={44} name="DeploymentCaretaker" stereo="« Memento »" />
      <Box x={270} y={170} w={170} h={44} name="DeploymentStrategy" stereo="« Strategy »" />
      <Box x={480} y={170} w={180} h={44} name="StageFactory" stereo="« Factory Method »" />
      <Box x={700} y={170} w={190} h={44} name="DeploymentEngine" stereo="« Subject / Observer »" />

      {/* ---- Command hierarchy ---- */}
      <Box x={60} y={330} w={250} h={46} name="DeploymentCommand" stereo="« interface »" />
      <Box x={60} y={404} w={250} h={46} name="DeploymentStage" stereo="« abstract »" dashed />
      <line x1={185} y1={378} x2={185} y2={398} stroke="#a3a3a3" strokeDasharray="4 3" markerEnd="url(#pf-arrow-dashed)" />

      {[
        "BuildCommand",
        "TestCommand",
        "ProvisionCommand",
        "DeployCommand",
        "VerifyCommand",
        "PromoteCommand",
        "RollbackCommand",
      ].map((name, i) => (
        <g key={name}>
          <line x1={318} y1={427 + i * 48} x2={352} y2={427 + i * 48} stroke="#a3a3a3" markerEnd={ARROW} />
          <Box x={356} y={406 + i * 48} w={150} h={42} name={name} />
        </g>
      ))}

      {/* ---- Observer fan-out ---- */}
      <Box x={600} y={330} w={280} h={46} name="DeploymentObserver" stereo="« interface »" />
      <line x1={830} y1={146} x2={830} y2={324} stroke="#a6a6a6" markerEnd={ARROW} />
      {[
        { name: "DashboardObserver", y: 406 },
        { name: "EmailObserver", y: 454 },
        { name: "LogObserver", y: 502 },
        { name: "SlackObserver", y: 550 },
      ].map((o) => (
        <g key={o.name}>
          <line x1={738} y1={378} x2={738} y2={o.y - 2} stroke="#a6a6a6" markerEnd={ARROW} />
          <Box x={600} y={o.y} w={276} h={40} name={o.name} />
        </g>
      ))}

      {/* caption */}
      <text x={60} y={768} fontSize={9.5} fill="#8b8b8b" fontFamily="ui-monospace, monospace">
        simplified class map — State, Chain &amp; Builder relationships omitted for legibility (see PlantUML tab)
      </text>
    </svg>
  );
}
