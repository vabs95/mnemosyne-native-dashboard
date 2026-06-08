"use strict";(()=>{var th=window.__HERMES_PLUGIN_SDK__.React,a=th,he=window.__HERMES_PLUGIN_SDK__.hooks.useState,it=window.__HERMES_PLUGIN_SDK__.hooks.useEffect,J0=window.__HERMES_PLUGIN_SDK__.hooks.useContext,Tt=window.__HERMES_PLUGIN_SDK__.hooks.useRef,K0=window.__HERMES_PLUGIN_SDK__.hooks.useMemo,Ds=window.__HERMES_PLUGIN_SDK__.hooks.useCallback,j0=window.__HERMES_PLUGIN_SDK__.hooks.createContext;var At=window.__HERMES_PLUGIN_SDK__,ex=At.api,st=At.fetchJSON,tx=At.authedFetch,nx=At.buildWsUrl,ix=At.useI18n,ct=At.components.Card,It=At.components.CardHeader,Pt=At.components.CardTitle,dt=At.components.CardContent,He=At.components.Badge,Ue=At.components.Button,Pc=At.components.Checkbox,un=At.components.Input,sx=At.components.Label,mn=At.components.Select,Qe=At.components.SelectOption,rx=At.components.Separator,Dc=At.components.Tabs,Rc=At.components.TabsList,Lc=At.components.TabsTrigger,ox=At.components.PluginSlot,ax=At.utils.cn,Nc=At.utils.timeAgo,lx=At.utils.isoTimeAgo;function yt(i,e=2,t="n/a"){let n=typeof i=="number"?i:Number(i);return Number.isFinite(n)?n.toFixed(e):t}function rn(i,e="unknown"){if(!i)return e;let t=new Date(String(i));return Number.isNaN(t.getTime())?e:t.toLocaleString()}function Ga(i,e="unknown"){if(!i)return e;let t=new Date(String(i));return Number.isNaN(t.getTime())?e:t.toLocaleDateString()}function Uc(i,e="unknown"){if(!i)return e;let t=new Date(String(i));if(Number.isNaN(t.getTime()))return e;let n=Date.now()-t.getTime(),s=Math.floor(n/6e4);if(s<1)return"just now";if(s<60)return`${s}m ago`;let r=Math.floor(s/60);return r<24?`${r}h ago`:`${Math.floor(r/24)}d ago`}function Bt(i,e=8,t=6){let n=String(i||"").trim();return n.length>e+t+1?`${n.slice(0,e)}\u2026${n.slice(-t)}`:n}var nh={tabs:{overview:"Overview",today:"Today",visualiser:"Visualiser",review:"Review",memories:"Memories",profile:"Context Bank",lifecycle:"Lifecycle",graph:"Graph",memoria:"Memoria",activity:"History",settings:"Settings"},common:{loading:"Loading...",noData:"No data",close:"Close",id:"ID",created:"Created",expires:"Expires",veracity:"Veracity",importance:"Importance",source:"Source",scope:"Scope",status:"Status",session:"Session",metadata:"Metadata",clear:"Clear",refresh:"Refresh",search:"Search",details:"Details",backups:"Backups",actions:"Actions",preview:"Preview",unknown:"Unknown",active:"Active",inactive:"Inactive",none:"None",never:"Never"},overview:{workingMemory:"Working Memory",workingDesc:"Short-term active thoughts",episodicMemory:"Episodic Memory",episodicDesc:"Archived session memories",scratchpad:"Scratchpad",scratchpadDesc:"Reasoning workspace",needsReview:"Needs Review",needsReviewDesc:"Contaminated logs",degraded:"Degraded",degradedDesc:"Decayed episodic summaries",triples:"Triples",triplesDesc:"Extracted semantic facts",consolidations:"Consolidations",consolidationsDesc:"Episodic summaries built",trustMix:"Trust Mix",lifecycle:"Lifecycle",sources:"Sources",scopes:"Scopes",topSessions:"Top Sessions",liveMemoryLog:"Live Memory Log",showingLatest:"Showing 25 latest",noMemories:"No memories found.",noData:"No data"},today:{title:"Today",subtitle:"Today in Memory",digest:"Daily digest of additions, recalls, facts, and consolidations",todayBtn:"Today",added:"Added",recalled:"Retrieved",needsReview:"Needs Review",lifecycleChanges:"Lifecycle Changes",triples:"Facts",consolidations:"Consolidations",breakdowns:"Breakdowns",topEntities:"Top Entities",trustMix:"Trust Mix",lifecycle:"Lifecycle",sources:"Sources",sessions:"Sessions",noAdded:"No memories added today.",noRecalled:"No memories recalled today.",noTriples:"No facts added today.",noConsolidations:"No consolidations today.",loadingDigest:"Loading daily digest..."},memories:{title:"Memories",subtitle:"Memory search and inspector",searchPlaceholder:"Search memories...",refresh:"Refresh",clear:"Clear",kind:"Kind",status:"Status",sort:"Sort",trustPreset:"Trust Preset",veracity:"Veracity",source:"Source",scope:"Scope",session:"Session",allTiers:"All Tiers",working:"Working",episodic:"Episodic",activeOnly:"Active Only",expiredOnly:"Expired Only",allStatuses:"All Statuses",recent:"Recent",importance:"Importance",oldest:"Oldest",allConfidence:"All confidence",contaminated:"needs review",degradedOnly:"degraded only",due:"due for degradation",allTrust:"All trust",allSources:"All Sources",allScopes:"All Scopes",allSessions:"All Sessions",noMatching:"No memories matching filters.",inspector:"Memory Inspector",viewDetails:"View Details",adminActions:"Admin Actions",supersedePlaceholder:"Replacement text content...",supersedeBtn:"Supersede (Replace)",adjustVeracity:"Adjust Veracity/Trust",setExpiry:"Set Expiry",invalidateBtn:"Expire (Invalidate)",selectPrompt:"Select a memory from the list to inspect.",loadingList:"Loading memory list...",contentLabel:"Memory content",createdLabel:"Created",expiresLabel:"Expires"},review:{title:"Trust Review",subtitle:"Triage selected memories \u2014 confirm, correct, or expire only what you choose",searchPlaceholder:"Search this queue...",minImportance:"Min Importance",applyFilters:"Apply Filters",clear:"Clear",selectListed:"Select Listed",selectedCount:"selected",confirmSelected:"Confirm Selected",setTrust:"Set Trust",expire:"Expire",clearSelection:"Clear Selection",totalCount:"total",listedCount:"listed",openBrowser:"Open filtered browser",loadingTriage:"Loading triage queue...",noItems:"No items in this queue. This queue is clear for now.",loadMore:"Load More"},lifecycle:{title:"Lifecycle",subtitle:"Hot / warm / cold memory degradation dashboard",tier2After:"Tier 2 after",tier3After:"Tier 3 after",days:"days",weights:"Weights",readOnlyNotice:"Read-only: no degradation is triggered from this page",listed:"listed",openFilter:"Open lifecycle filter",noItems:"No items in this queue. This queue is clear for now.",loadingLifecycle:"Loading lifecycle diagnostics..."},history:{title:"Chronological Memory Timeline",byDay:"By Day",bySession:"By Session",loadingTimeline:"Loading timeline events...",events:"events",event:"event",noEvents:"No events recorded in memory yet.",sessionDetails:"Session Details",close:"Close",session:"Session",count:"Count",consolidationHistory:"Consolidation History",noConsolidations:"No consolidation summaries generated yet."},memoria:{title:"Memoria",subtitle:"Structured fact extraction and retrieval (Memoria 3.x schema)",noData:"No data found.",loadingMetrics:"Loading Memoria metrics...",tableCounts:"Table Counts",topSessions:"Top Sessions",noSessionData:"No session data",entries:"entries",search:"Search",searching:"Searching...",factsTitle:"MEMORIA Facts",timelinesTitle:"MEMORIA Timelines",instructionsTitle:"MEMORIA Instructions",kgTitle:"MEMORIA KG",preferencesTitle:"MEMORIA Preferences",searchFacts:"Search facts...",searchTimelines:"Search timelines...",searchInstructions:"Search instructions...",searchKg:"Search KG...",searchPreferences:"Search preferences...",subject:"Subject",predicate:"Predicate",object:"Object",confidence:"Confidence"},settings:{title:"Dashboard Settings",memoryMaintenance:"Memory Maintenance",maintenanceInfo:"Enable admin maintenance mode to supersede, expire, or invalidate selected memories. Database backups are highly recommended before executing any database modifications.",enableAdminMode:"Enable Admin Maintenance Mode",createBackup:"Create Database Backup",viewAuditLogs:"View Audit Logs",saving:"Saving...",saved:"Saved",creatingBackup:"Creating backup...",backupCreated:"Backup created",failedAuditLogs:"Failed to load audit logs",closeLogs:"Close Logs",noAuditLogs:"No audit log records found.",databaseDiagnostics:"Database Diagnostics",runningDiagnostics:"Running diagnostic reports...",size:"Size",tableRows:"Table Rows",noDiagnostics:"No diagnostic metrics available.",auditLogsTitle:"Memory Modification Audit Logs"},contextBank:{title:"Context Bank",subtitle:"Inferred profile entities, preferences, and active context segments",loading:"Loading context bank profile...",items:"items",item:"item",noActiveContext:"No active context found in this segment.",noRecords:"No inferred profile records found."},visualiser:{title:"Memory Constellation 3D",subtitle:"Interactive 3D model of episodic records and semantic connections.",workspaceTitle:"Visualiser",workspaceSubtitle:"Memory maps + neural activation views",constellationMode:"Constellation",neuralMode:"Neural Map",refresh:"Refresh visualiser",resetView:"Reset view",panMode:"Pan mode",rotateMode:"Rotate mode",pauseRotation:"Pause rotation",pauseDrift:"Pause drift",resume:"Resume",fullscreen:"Fullscreen",constellationHelp:"Drag to rotate \xB7 Pan mode/Shift-drag to pan \xB7 wheel/pinch to zoom.",neuralHelp:"Drag to orbit the neural cloud \xB7 Pan mode/Shift-drag to pan \xB7 wheel/pinch to zoom.",canvasLabel:"Interactive 3D memory constellation",legend:"Constellation legend",entityTopic:"Entity/topic",neuronHub:"Neuron hub",memory:"Memory",memorySoma:"Memory soma",link:"Link",synapse:"Synapse",constellationInspector:"Constellation inspector",neuralInspector:"Neural inspector",nothingSelected:"Nothing selected",constellationPickPrompt:"Pick a star, memory, or link to inspect the underlying read-only source.",neuralPickPrompt:"Pick a neuron hub, memory soma, or synapse to inspect the underlying read-only source.",signals:"signal(s)",weight:"weight",loadError:"Failed to load constellation data",nodes:"nodes",edges:"edges",ready:"Ready",selected:"Selected",hovering:"Hovering",prompt:"Move over a node to show its label",loadingEngine:"Loading 3D Engine...",noNodes:"No constellation nodes available.",inspectorTitle:"Constellation Inspector",inspectorDesc:"Select a star inside the 3D model to view detailed semantic links.",entityHub:"Entity Hub",openMemory:"Open Associated Memory",clickNodePrompt:"Click on any node in the constellation to inspect it."},graph:{title:"Graph",relationshipGraph:"Relationship graph",factsTable:"Facts table",filterGraphPlaceholder:"Filter graph by entity or predicate...",refreshGraph:"Refresh graph",clear:"Clear",resetView:"Reset view",helpText:"Scroll to zoom \xB7 Drag to pan \xB7 Click to inspect",queryingGraph:"Querying graph repository...",noTriples:"No matching triples found. Try adjusting filters.",inspectorTitle:"Graph inspector",entityNode:"Entity Node",connectedCount:"Connected to {count} relational fact triples.",showInTriples:"Show in Triples",searchMemories:"Search Memories",connectedTriples:"Connected Triples:",predicateLink:"Predicate Link",subject:"Subject:",object:"Object:",confidence:"Confidence:",recorded:"Recorded:",inspectJson:"Inspect JSON",pickNodePrompt:"Pick a node or edge to inspect connected triples, then jump into the Triples table.",searchTriplesPlaceholder:"Search subject / predicate / object...",search:"Search",searchingKg:"Searching KG facts database...",noTriplesMatch:"No triples matched search query.",relationalFactDetails:"Relational Fact Details"},index:{version:"v",adminActive:"Admin Active",readOnly:"Read-Only",memoryRecord:"Memory Record",loadingRecord:"Loading memory record...",trust:"Trust",tier:"Tier",notDegraded:"Not Degraded",effectiveWeight:"Effective Weight:",needsReview:"Needs Review",content:"Content",diagnostics:"Diagnostics",noRecordFound:"Memory record could not be found.",sessionDetails:"Session Details",loadingSession:"Loading session details...",memories:"Memories:",facts:"Facts:",consolidations:"Consolidations:",noSessionEvents:"No session events found.",sessionNotLoaded:"Session could not be loaded."}},E=(i,e)=>{let t=i.split("."),n=nh;for(let s of t){if(n[s]===void 0)return i;n=n[s]}if(typeof n=="string"&&e){let s=n;for(let[r,o]of Object.entries(e))s=s.replace(`{${r}}`,String(o));return s}return n};var Fc="/api/plugins/mnemosyne-native-dashboard",Vt=i=>`rgba(234,234,234,${i})`,Ii=({title:i,count:e,desc:t,icon:n,onClick:s})=>a.createElement("div",{onClick:s,style:{cursor:s?"pointer":"default",transition:"background 0.15s, border-color 0.15s",padding:"12px",borderRadius:"6px",border:`1px solid ${Vt(.1)}`,background:Vt(.03),minHeight:"104px",minWidth:0},onMouseEnter:r=>{s&&(r.currentTarget.style.background=Vt(.06))},onMouseLeave:r=>{s&&(r.currentTarget.style.background=Vt(.03))}},a.createElement("div",{style:{display:"grid",gridTemplateColumns:"minmax(0, 1fr) 32px",alignItems:"start",gap:"10px"}},a.createElement("div",{style:{minWidth:0}},a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.08em",color:Vt(.45),marginBottom:"7px",lineHeight:1.25,overflowWrap:"anywhere"}},i),a.createElement("div",{style:{fontSize:"26px",fontWeight:700,lineHeight:1.05,fontVariantNumeric:"tabular-nums",overflowWrap:"anywhere"}},e.toLocaleString()),a.createElement("div",{style:{fontSize:"11px",color:Vt(.4),marginTop:"7px",lineHeight:1.35,overflowWrap:"anywhere"}},t)),a.createElement("div",{"aria-hidden":"true",style:{width:"32px",height:"32px",borderRadius:"6px",display:"grid",placeItems:"center",background:Vt(.06),color:Vt(.64),fontSize:"18px",lineHeight:1,flexShrink:0}},a.createElement("span",{style:{display:"block",lineHeight:1,transform:"translateY(-1px)"}},n)))),ih={stated:"#065f46",inferred:"#1e3a8a",tool:"#581c87",imported:"#78350f"},Oc=({onInspectMemory:i,onInspectSession:e,onNavigateToTab:t,onApplyFilters:n})=>{let[s,r]=he(null),[o,l]=he([]),[d,c]=he(!0);if(it(()=>{Promise.all([st(`${Fc}/stats`),st(`${Fc}/memories?limit=25`)]).then(([u,x])=>{r(u),l(x.items||[])}).catch(()=>{}).finally(()=>c(!1))},[]),d)return a.createElement("div",{style:{padding:"32px",color:Vt(.4),textAlign:"center"}},E("common.loading"));let p=s?.counts??{working_memory:0,episodic_memory:0,triples:0,consolidation_log:0,scratchpad:0},g=s?.contamination?.total??0,h=s?.degradation?.degraded??0;return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px"}},a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"10px"}},a.createElement(Ii,{title:E("overview.workingMemory"),count:p.working_memory,desc:E("overview.workingDesc"),icon:"\u25C9",onClick:()=>n({kind:"working"})}),a.createElement(Ii,{title:E("overview.episodicMemory"),count:p.episodic_memory,desc:E("overview.episodicDesc"),icon:"\u25A4",onClick:()=>n({kind:"episodic"})}),a.createElement(Ii,{title:E("overview.scratchpad"),count:p.scratchpad??0,desc:E("overview.scratchpadDesc"),icon:"\u270E"}),a.createElement(Ii,{title:E("overview.needsReview"),count:g,desc:E("overview.needsReviewDesc"),icon:"\u2691",onClick:()=>t("review")}),a.createElement(Ii,{title:E("overview.degraded"),count:h,desc:E("overview.degradedDesc"),icon:"\u25F4",onClick:()=>t("lifecycle")}),a.createElement(Ii,{title:E("overview.triples"),count:p.triples,desc:E("overview.triplesDesc"),icon:"\u25CE",onClick:()=>t("graph")}),a.createElement(Ii,{title:E("overview.consolidations"),count:p.consolidation_log,desc:E("overview.consolidationsDesc"),icon:"\u2726",onClick:()=>t("activity")})),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",gap:"12px"}},a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,{style:{fontSize:"12px"}},E("overview.trustMix"))),a.createElement(dt,{style:{padding:"10px 14px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(s?.by_veracity??[]).map(({veracity:u,count:x})=>a.createElement("div",{key:u,onClick:()=>n({veracity:u}),style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}},a.createElement("span",{style:{textTransform:"capitalize"}},u),a.createElement(He,null,String(x)))),!s?.by_veracity?.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"11px"}},E("overview.noData"))))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,{style:{fontSize:"12px"}},E("overview.lifecycle"))),a.createElement(dt,{style:{padding:"10px 14px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(s?.by_degradation??[]).map(({degradation_label:u,count:x})=>{let _={hot:"1",warm:"2",cold:"3"};return a.createElement("div",{key:u,onClick:()=>n({degradation_tier:_[u]||""}),style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}},a.createElement("span",{style:{textTransform:"capitalize"}},u),a.createElement(He,null,String(x)))}),!s?.by_degradation?.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"11px"}},E("overview.noData"))))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,{style:{fontSize:"12px"}},E("overview.sources"))),a.createElement(dt,{style:{padding:"10px 14px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(s?.by_source??[]).slice(0,6).map(({source:u,count:x})=>a.createElement("div",{key:u,onClick:()=>n({source:u}),style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}},a.createElement("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:u},u||"unknown"),a.createElement(He,null,String(x)))),!s?.by_source?.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"11px"}},E("overview.noData"))))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,{style:{fontSize:"12px"}},E("overview.scopes"))),a.createElement(dt,{style:{padding:"10px 14px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(s?.by_scope??[]).slice(0,6).map(({scope:u,count:x})=>a.createElement("div",{key:u,onClick:()=>n({scope:u}),style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}},a.createElement("span",{style:{textTransform:"capitalize"}},u||"unknown"),a.createElement(He,null,String(x)))),!s?.by_scope?.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"11px"}},E("overview.noData"))))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,{style:{fontSize:"12px"}},E("overview.topSessions"))),a.createElement(dt,{style:{padding:"10px 14px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(s?.by_session??[]).slice(0,6).map(({session_id:u,count:x})=>a.createElement("div",{key:u,onClick:()=>e(u),style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px",cursor:"pointer",textDecoration:"underline"}},a.createElement("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"var(--theme-font-mono)"},title:u},Bt(u)),a.createElement(He,null,String(x)))),!s?.by_session?.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"11px"}},E("overview.noData")))))),a.createElement(ct,null,a.createElement(It,null,a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},a.createElement(Pt,null,E("overview.liveMemoryLog")),a.createElement("span",{style:{fontSize:"11px",color:Vt(.4)}},E("overview.showingLatest")))),a.createElement(dt,null,a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},o.map(u=>a.createElement("div",{key:u.id,onClick:()=>i(u),style:{padding:"10px 12px",borderRadius:"4px",background:"rgba(234,234,234,0.03)",border:"1px solid rgba(234,234,234,0.07)",cursor:"pointer",transition:"background 0.15s",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px"},onMouseEnter:x=>x.currentTarget.style.background="rgba(234,234,234,0.07)",onMouseLeave:x=>x.currentTarget.style.background="rgba(234,234,234,0.03)"},a.createElement("div",{style:{flex:1,minWidth:0}},a.createElement("div",{style:{fontSize:"13px",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}},u.content),a.createElement("div",{style:{display:"flex",gap:"8px",marginTop:"4px",alignItems:"center",flexWrap:"wrap"}},a.createElement(He,{style:{background:ih[String(u.veracity).toLowerCase()]||Vt(.1)}},u.veracity),u.session_id&&a.createElement("span",{onClick:x=>{x.stopPropagation(),e(u.session_id)},style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:Vt(.4),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(u.session_id)),a.createElement("span",{style:{fontSize:"11px",color:Vt(.4)}},"imp:",yt(u.importance,2,"n/a")))),a.createElement("span",{style:{fontSize:"11px",color:Vt(.35),whiteSpace:"nowrap",fontFamily:"var(--theme-font-mono)"}},Uc(u.created_at,Nc(u.created_at))))),!o.length&&a.createElement("div",{style:{color:Vt(.35),fontSize:"12px",textAlign:"center",padding:"20px"}},E("overview.noMemories"))))))};var sh="/api/plugins/mnemosyne-native-dashboard",_t=i=>`rgba(234,234,234,${i})`,Bc={stated:"#065f46",inferred:"#1e3a8a",tool:"#581c87",imported:"#78350f"},kc=({onInspectMemory:i,onInspectSession:e,onInspectJson:t})=>{let[n,s]=he(()=>new Date().toISOString().split("T")[0]),[r,o]=he(null),[l,d]=he(!0),[c,p]=he("added");it(()=>{d(!0),st(`${sh}/digest/today?day=${n}`).then(u=>o(u)).catch(()=>{}).finally(()=>d(!1))},[n]);let g=()=>s(new Date().toISOString().split("T")[0]),h=r?.breakdowns?[[E("today.topEntities"),r.breakdowns.entities],[E("today.trustMix"),r.breakdowns.veracity],[E("today.lifecycle"),r.breakdowns.degradation],[E("today.sources"),r.breakdowns.sources],[E("today.sessions"),r.breakdowns.sessions]]:[];return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",paddingBottom:"16px",borderBottom:`1px solid ${_t(.1)}`}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600,marginBottom:"4px"}},E("today.subtitle")),a.createElement("div",{style:{fontSize:"12px",color:_t(.45)}},E("today.digest"))),a.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},a.createElement(un,{type:"date",value:n,onChange:u=>s(u.target.value),style:{width:"160px"}}),a.createElement(Ue,{onClick:g,ghost:!0},E("today.todayBtn")))),l?a.createElement("div",{style:{textAlign:"center",color:_t(.4),padding:"40px"}},E("today.loadingDigest")):a.createElement(a.Fragment,null,a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"10px"}},[{label:E("today.added"),value:r?.counts.memories_added??0},{label:E("today.recalled"),value:r?.counts.memories_recalled??0},{label:E("today.needsReview"),value:r?.counts.contaminated_added??0},{label:E("today.lifecycleChanges"),value:r?.counts.degraded_added??0},{label:E("today.triples"),value:r?.counts.triples_added??0},{label:E("today.consolidations"),value:r?.counts.consolidations??0}].map(u=>a.createElement(ct,{key:u.label},a.createElement(dt,{style:{padding:"10px",textAlign:"center"}},a.createElement("div",{style:{fontSize:"9px",color:_t(.45),textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},title:u.label},u.label),a.createElement("div",{style:{fontSize:"20px",fontWeight:700,marginTop:"4px"}},u.value.toLocaleString()))))),r?.breakdowns&&a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("today.breakdowns"))),a.createElement(dt,{style:{padding:"16px 20px"}},a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, minmax(0, 1fr))",gap:"16px"}},h.map(([u,x])=>a.createElement("div",{key:u},a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.08em",color:_t(.45),marginBottom:"8px"}},u),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},(x||[]).slice(0,6).map(_=>a.createElement("div",{key:_.label,style:{display:"flex",justifyContent:"space-between",gap:"8px",fontSize:"11px"}},a.createElement("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:_.label||"unknown"},_.label||"unknown"),a.createElement("strong",null,_.count))),!(x||[]).length&&a.createElement("div",{style:{color:_t(.35),fontSize:"11px"}},E("common.noData")))))))),a.createElement("div",{style:{display:"flex",gap:"4px",borderBottom:`1px solid ${_t(.1)}`,paddingBottom:"8px",marginTop:"8px"}},a.createElement(Ue,{onClick:()=>p("added"),ghost:c!=="added",primary:c==="added",style:{fontSize:"12px",padding:"6px 12px",height:"30px"}},E("today.added")),a.createElement(Ue,{onClick:()=>p("recalled"),ghost:c!=="recalled",primary:c==="recalled",style:{fontSize:"12px",padding:"6px 12px",height:"30px"}},E("today.recalled")),a.createElement(Ue,{onClick:()=>p("triples"),ghost:c!=="triples",primary:c==="triples",style:{fontSize:"12px",padding:"6px 12px",height:"30px"}},E("today.triples")),a.createElement(Ue,{onClick:()=>p("consolidations"),ghost:c!=="consolidations",primary:c==="consolidations",style:{fontSize:"12px",padding:"6px 12px",height:"30px"}},E("today.consolidations"))),a.createElement("div",null,c==="added"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},r?.memories_added&&r.memories_added.length>0?r.memories_added.map(u=>a.createElement("div",{key:u.id,onClick:()=>i(u),style:{padding:"10px 12px",borderRadius:"4px",cursor:"pointer",background:_t(.03),border:`1px solid ${_t(.07)}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0}},a.createElement("span",{style:{fontSize:"13px"}},u.content),a.createElement("div",{style:{display:"flex",gap:"8px",marginTop:"4px",alignItems:"center"}},a.createElement(He,{style:{background:Bc[String(u.veracity).toLowerCase()]||_t(.1)}},u.veracity),u.session_id&&a.createElement("span",{onClick:x=>{x.stopPropagation(),e(u.session_id)},style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:_t(.5),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(u.session_id)),a.createElement("span",{style:{fontSize:"10px",color:_t(.4)}},"imp:",yt(u.importance,2)))))):a.createElement("div",{style:{color:_t(.35),fontSize:"12px",textAlign:"center",padding:"20px"}},E("today.noAdded"))),c==="recalled"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},r?.memories_recalled&&r.memories_recalled.length>0?r.memories_recalled.map(u=>a.createElement("div",{key:u.id,onClick:()=>i(u),style:{padding:"10px 12px",borderRadius:"4px",cursor:"pointer",background:_t(.03),border:`1px solid ${_t(.07)}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:"12px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0}},a.createElement("span",{style:{fontSize:"13px"}},u.content),a.createElement("div",{style:{display:"flex",gap:"8px",marginTop:"4px",alignItems:"center"}},a.createElement(He,{style:{background:Bc[String(u.veracity).toLowerCase()]||_t(.1)}},u.veracity),u.session_id&&a.createElement("span",{onClick:x=>{x.stopPropagation(),e(u.session_id)},style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:_t(.5),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(u.session_id)),a.createElement("span",{style:{fontSize:"10px",color:_t(.4)}},"importance:",yt(u.importance,2)))))):a.createElement("div",{style:{color:_t(.35),fontSize:"12px",textAlign:"center",padding:"20px"}},E("today.noRecalled"))),c==="triples"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},r?.triples_added&&r.triples_added.length>0?r.triples_added.map((u,x)=>a.createElement("div",{key:u.id||x,onClick:()=>t(u,"Triple detail"),style:{padding:"10px 12px",borderRadius:"4px",cursor:"pointer",background:_t(.03),border:`1px solid ${_t(.07)}`,fontSize:"12px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",color:_t(.45),marginBottom:"4px"}},a.createElement("span",null,E("today.triples").toLowerCase()),a.createElement("span",null,rn(u.created_at||u.valid_from))),a.createElement("div",null,a.createElement("strong",null,u.subject)," \u2014 ",u.predicate," \u2192 ",a.createElement("strong",null,u.object)))):a.createElement("div",{style:{color:_t(.35),fontSize:"12px",textAlign:"center",padding:"20px"}},E("today.noTriples"))),c==="consolidations"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},r?.consolidations&&r.consolidations.length>0?r.consolidations.map((u,x)=>a.createElement("div",{key:u.id||x,onClick:()=>t(u,"Consolidation detail"),style:{padding:"10px 12px",borderRadius:"4px",cursor:"pointer",background:_t(.03),border:`1px solid ${_t(.07)}`,fontSize:"12px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",color:_t(.45),marginBottom:"4px"}},a.createElement("span",null,E("today.consolidations").toLowerCase()," \xB7 ",u.items_consolidated," ",E("contextBank.items")),a.createElement("span",null,rn(u.created_at))),a.createElement("div",null,a.createElement("strong",{style:{fontFamily:"var(--theme-font-mono)"}},u.session_id),": ",u.summary_preview))):a.createElement("div",{style:{color:_t(.35),fontSize:"12px",textAlign:"center",padding:"20px"}},E("today.noConsolidations"))))))};var gd=0,Cl=1,xd=2;var hr=1,vd=2,Ss=3,An=0,dn=1,hn=2,Gn=0,Fi=1,Wn=2,Il=3,Pl=4,yd=5;var pi=100,_d=101,bd=102,Sd=103,Md=104,wd=200,Td=201,Ed=202,Ad=203,so=204,ro=205,Cd=206,Id=207,Pd=208,Dd=209,Rd=210,Ld=211,Nd=212,Ud=213,Fd=214,oo=0,ao=1,lo=2,Oi=3,co=4,uo=5,ho=6,fo=7,Dl=0,Od=1,Bd=2,Cn=0,Rl=1,Ll=2,Nl=3,Ul=4,Fl=5,Ol=6,Bl=7;var kl=300,Si=301,zi=302,qo=303,Yo=304,fr=306,po=1e3,On=1001,mo=1002,$t=1003,kd=1004;var pr=1005;var Jt=1006,$o=1007;var Mi=1008;var fn=1009,zl=1010,Vl=1011,Ms=1012,Zo=1013,In=1014,Pn=1015,Xn=1016,Jo=1017,Ko=1018,ws=1020,Hl=35902,Gl=35899,Wl=1021,Xl=1022,Sn=1023,Bn=1026,wi=1027,ql=1028,jo=1029,Ti=1030,Qo=1031;var ea=1033,mr=33776,gr=33777,xr=33778,vr=33779,ta=35840,na=35841,ia=35842,sa=35843,ra=36196,oa=37492,aa=37496,la=37488,ca=37489,yr=37490,da=37491,ua=37808,ha=37809,fa=37810,pa=37811,ma=37812,ga=37813,xa=37814,va=37815,ya=37816,_a=37817,ba=37818,Sa=37819,Ma=37820,wa=37821,Ta=36492,Ea=36494,Aa=36495,Ca=36283,Ia=36284,_r=36285,Pa=36286;var zs=2300,go=2301,no=2302,xl=2303,vl=2400,yl=2401,_l=2402;var zd=3200;var Yl=0,Vd=1,ii="",an="srgb",Vs="srgb-linear",Hs="linear",ht="srgb";var Ni=7680;var bl=519,Hd=512,Gd=513,Wd=514,Da=515,Xd=516,qd=517,Ra=518,Yd=519,xo=35044;var $l="300 es",En=2e3,ls=2001;function rh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function oh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $d(){let i=Gs("canvas");return i.style.display="block",i}var zc={},cs=null;function Ws(...i){let e="THREE."+i.shift();cs?cs("log",e,...i):console.log(e,...i)}function Zd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function ke(...i){i=Zd(i);let e="THREE."+i.shift();if(cs)cs("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ve(...i){i=Zd(i);let e="THREE."+i.shift();if(cs)cs("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function vo(...i){let e=i.join(" ");e in zc||(zc[e]=!0,ke(...i))}function Jd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var Kd={[oo]:ao,[lo]:ho,[co]:fo,[Oi]:uo,[ao]:oo,[ho]:lo,[fo]:co,[uo]:Oi},kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var io=Math.PI/180,yo=180/Math.PI;function fi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[i&255]+en[i>>8&255]+en[i>>16&255]+en[i>>24&255]+"-"+en[e&255]+en[e>>8&255]+"-"+en[e>>16&15|64]+en[e>>24&255]+"-"+en[t&63|128]+en[t>>8&255]+"-"+en[t>>16&255]+en[t>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function nt(i,e,t){return Math.max(e,Math.min(t,i))}function ah(i,e){return(i%e+e)%e}function Wa(i,e,t){return(1-t)*i+t*e}function Un(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function gt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Ql=class Ql{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ql.prototype.isVector2=!0;var Xe=Ql,zn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,l){let d=n[s+0],c=n[s+1],p=n[s+2],g=n[s+3],h=r[o+0],u=r[o+1],x=r[o+2],_=r[o+3];if(g!==_||d!==h||c!==u||p!==x){let m=d*h+c*u+p*x+g*_;m<0&&(h=-h,u=-u,x=-x,_=-_,m=-m);let f=1-l;if(m<.9995){let M=Math.acos(m),A=Math.sin(M);f=Math.sin(f*M)/A,l=Math.sin(l*M)/A,d=d*f+h*l,c=c*f+u*l,p=p*f+x*l,g=g*f+_*l}else{d=d*f+h*l,c=c*f+u*l,p=p*f+x*l,g=g*f+_*l;let M=1/Math.sqrt(d*d+c*c+p*p+g*g);d*=M,c*=M,p*=M,g*=M}}e[t]=d,e[t+1]=c,e[t+2]=p,e[t+3]=g}static multiplyQuaternionsFlat(e,t,n,s,r,o){let l=n[s],d=n[s+1],c=n[s+2],p=n[s+3],g=r[o],h=r[o+1],u=r[o+2],x=r[o+3];return e[t]=l*x+p*g+d*u-c*h,e[t+1]=d*x+p*h+c*g-l*u,e[t+2]=c*x+p*u+l*h-d*g,e[t+3]=p*x-l*g-d*h-c*u,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,l=Math.cos,d=Math.sin,c=l(n/2),p=l(s/2),g=l(r/2),h=d(n/2),u=d(s/2),x=d(r/2);switch(o){case"XYZ":this._x=h*p*g+c*u*x,this._y=c*u*g-h*p*x,this._z=c*p*x+h*u*g,this._w=c*p*g-h*u*x;break;case"YXZ":this._x=h*p*g+c*u*x,this._y=c*u*g-h*p*x,this._z=c*p*x-h*u*g,this._w=c*p*g+h*u*x;break;case"ZXY":this._x=h*p*g-c*u*x,this._y=c*u*g+h*p*x,this._z=c*p*x+h*u*g,this._w=c*p*g-h*u*x;break;case"ZYX":this._x=h*p*g-c*u*x,this._y=c*u*g+h*p*x,this._z=c*p*x-h*u*g,this._w=c*p*g+h*u*x;break;case"YZX":this._x=h*p*g+c*u*x,this._y=c*u*g+h*p*x,this._z=c*p*x-h*u*g,this._w=c*p*g-h*u*x;break;case"XZY":this._x=h*p*g-c*u*x,this._y=c*u*g-h*p*x,this._z=c*p*x+h*u*g,this._w=c*p*g+h*u*x;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],l=t[5],d=t[9],c=t[2],p=t[6],g=t[10],h=n+l+g;if(h>0){let u=.5/Math.sqrt(h+1);this._w=.25/u,this._x=(p-d)*u,this._y=(r-c)*u,this._z=(o-s)*u}else if(n>l&&n>g){let u=2*Math.sqrt(1+n-l-g);this._w=(p-d)/u,this._x=.25*u,this._y=(s+o)/u,this._z=(r+c)/u}else if(l>g){let u=2*Math.sqrt(1+l-n-g);this._w=(r-c)/u,this._x=(s+o)/u,this._y=.25*u,this._z=(d+p)/u}else{let u=2*Math.sqrt(1+g-n-l);this._w=(o-s)/u,this._x=(r+c)/u,this._y=(d+p)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,l=t._x,d=t._y,c=t._z,p=t._w;return this._x=n*p+o*l+s*c-r*d,this._y=s*p+o*d+r*l-n*c,this._z=r*p+o*c+n*d-s*l,this._w=o*p-n*l-s*d-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,l=this.dot(e);l<0&&(n=-n,s=-s,r=-r,o=-o,l=-l);let d=1-t;if(l<.9995){let c=Math.acos(l),p=Math.sin(c);d=Math.sin(d*c)/p,t=Math.sin(t*c)/p,this._x=this._x*d+n*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+o*t,this._onChangeCallback()}else this._x=this._x*d+n*t,this._y=this._y*d+s*t,this._z=this._z*d+r*t,this._w=this._w*d+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},ec=class ec{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vc.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,l=e.z,d=e.w,c=2*(o*s-l*n),p=2*(l*t-r*s),g=2*(r*n-o*t);return this.x=t+d*c+o*g-l*p,this.y=n+d*p+l*c-r*g,this.z=s+d*g+r*p-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,l=t.y,d=t.z;return this.x=s*d-r*l,this.y=r*o-n*d,this.z=n*l-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xa.copy(this).projectOnVector(e),this.sub(Xa)}reflect(e){return this.sub(Xa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ec.prototype.isVector3=!0;var B=ec,Xa=new B,Vc=new zn,tc=class tc{constructor(e,t,n,s,r,o,l,d,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,l,d,c)}set(e,t,n,s,r,o,l,d,c){let p=this.elements;return p[0]=e,p[1]=s,p[2]=l,p[3]=t,p[4]=r,p[5]=d,p[6]=n,p[7]=o,p[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],l=n[3],d=n[6],c=n[1],p=n[4],g=n[7],h=n[2],u=n[5],x=n[8],_=s[0],m=s[3],f=s[6],M=s[1],A=s[4],I=s[7],D=s[2],S=s[5],R=s[8];return r[0]=o*_+l*M+d*D,r[3]=o*m+l*A+d*S,r[6]=o*f+l*I+d*R,r[1]=c*_+p*M+g*D,r[4]=c*m+p*A+g*S,r[7]=c*f+p*I+g*R,r[2]=h*_+u*M+x*D,r[5]=h*m+u*A+x*S,r[8]=h*f+u*I+x*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],d=e[6],c=e[7],p=e[8];return t*o*p-t*l*c-n*r*p+n*l*d+s*r*c-s*o*d}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],d=e[6],c=e[7],p=e[8],g=p*o-l*c,h=l*d-p*r,u=c*r-o*d,x=t*g+n*h+s*u;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/x;return e[0]=g*_,e[1]=(s*c-p*n)*_,e[2]=(l*n-s*o)*_,e[3]=h*_,e[4]=(p*t-s*d)*_,e[5]=(s*r-l*t)*_,e[6]=u*_,e[7]=(n*d-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,l){let d=Math.cos(r),c=Math.sin(r);return this.set(n*d,n*c,-n*(d*o+c*l)+o+e,-s*c,s*d,-s*(-c*o+d*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(qa.makeScale(e,t)),this}rotate(e){return this.premultiply(qa.makeRotation(-e)),this}translate(e,t){return this.premultiply(qa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};tc.prototype.isMatrix3=!0;var $e=tc,qa=new $e,Hc=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gc=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function lh(){let i={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ht&&(s.r=ti(s.r),s.g=ti(s.g),s.b=ti(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(s.r=as(s.r),s.g=as(s.g),s.b=as(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ii?Hs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return vo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return vo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Vs]:{primaries:e,whitePoint:n,transfer:Hs,toXYZ:Hc,fromXYZ:Gc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:Hc,fromXYZ:Gc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),i}var ot=lh();function ti(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function as(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Xi,_o=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Xi===void 0&&(Xi=Gs("canvas")),Xi.width=e.width,Xi.height=e.height;let s=Xi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Xi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Gs("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=ti(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ti(t[n]/255)*255):t[n]=ti(t[n]);return{data:t,width:e.width,height:e.height}}else return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},ch=0,ds=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ch++}),this.uuid=fi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,l=s.length;o<l;o++)s[o].isDataTexture?r.push(Ya(s[o].image)):r.push(Ya(s[o]))}else r=Ya(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ya(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?_o.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var dh=0,$a=new B,ln=class i extends kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=On,s=On,r=Jt,o=Mi,l=Sn,d=fn,c=i.DEFAULT_ANISOTROPY,p=ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dh++}),this.uuid=fi(),this.name="",this.source=new ds(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=d,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize($a).x}get height(){return this.source.getSize($a).y}get depth(){return this.source.getSize($a).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case po:e.x=e.x-Math.floor(e.x);break;case On:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case po:e.y=e.y-Math.floor(e.y);break;case On:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=kl;ln.DEFAULT_ANISOTROPY=1;var nc=class nc{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,d=e.elements,c=d[0],p=d[4],g=d[8],h=d[1],u=d[5],x=d[9],_=d[2],m=d[6],f=d[10];if(Math.abs(p-h)<.01&&Math.abs(g-_)<.01&&Math.abs(x-m)<.01){if(Math.abs(p+h)<.1&&Math.abs(g+_)<.1&&Math.abs(x+m)<.1&&Math.abs(c+u+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,I=(u+1)/2,D=(f+1)/2,S=(p+h)/4,R=(g+_)/4,y=(x+m)/4;return A>I&&A>D?A<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=S/n,r=R/n):I>D?I<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(I),n=S/s,r=y/s):D<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(D),n=R/r,s=y/r),this.set(n,s,r,t),this}let M=Math.sqrt((m-x)*(m-x)+(g-_)*(g-_)+(h-p)*(h-p));return Math.abs(M)<.001&&(M=1),this.x=(m-x)/M,this.y=(g-_)/M,this.z=(h-p)/M,this.w=Math.acos((c+u+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(nt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};nc.prototype.isVector4=!0;var Dt=nc,bo=class extends kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new ln(s),o=n.count;for(let l=0;l<o;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0,this.textures[l].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:Jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ds(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends bo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Xs=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var So=class extends ln{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=On,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xo=class Xo{constructor(e,t,n,s,r,o,l,d,c,p,g,h,u,x,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,l,d,c,p,g,h,u,x,_,m)}set(e,t,n,s,r,o,l,d,c,p,g,h,u,x,_,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=l,f[13]=d,f[2]=c,f[6]=p,f[10]=g,f[14]=h,f[3]=u,f[7]=x,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Xo().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,s=1/qi.setFromMatrixColumn(e,0).length(),r=1/qi.setFromMatrixColumn(e,1).length(),o=1/qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),l=Math.sin(n),d=Math.cos(s),c=Math.sin(s),p=Math.cos(r),g=Math.sin(r);if(e.order==="XYZ"){let h=o*p,u=o*g,x=l*p,_=l*g;t[0]=d*p,t[4]=-d*g,t[8]=c,t[1]=u+x*c,t[5]=h-_*c,t[9]=-l*d,t[2]=_-h*c,t[6]=x+u*c,t[10]=o*d}else if(e.order==="YXZ"){let h=d*p,u=d*g,x=c*p,_=c*g;t[0]=h+_*l,t[4]=x*l-u,t[8]=o*c,t[1]=o*g,t[5]=o*p,t[9]=-l,t[2]=u*l-x,t[6]=_+h*l,t[10]=o*d}else if(e.order==="ZXY"){let h=d*p,u=d*g,x=c*p,_=c*g;t[0]=h-_*l,t[4]=-o*g,t[8]=x+u*l,t[1]=u+x*l,t[5]=o*p,t[9]=_-h*l,t[2]=-o*c,t[6]=l,t[10]=o*d}else if(e.order==="ZYX"){let h=o*p,u=o*g,x=l*p,_=l*g;t[0]=d*p,t[4]=x*c-u,t[8]=h*c+_,t[1]=d*g,t[5]=_*c+h,t[9]=u*c-x,t[2]=-c,t[6]=l*d,t[10]=o*d}else if(e.order==="YZX"){let h=o*d,u=o*c,x=l*d,_=l*c;t[0]=d*p,t[4]=_-h*g,t[8]=x*g+u,t[1]=g,t[5]=o*p,t[9]=-l*p,t[2]=-c*p,t[6]=u*g+x,t[10]=h-_*g}else if(e.order==="XZY"){let h=o*d,u=o*c,x=l*d,_=l*c;t[0]=d*p,t[4]=-g,t[8]=c*p,t[1]=h*g+_,t[5]=o*p,t[9]=u*g-x,t[2]=x*g-u,t[6]=l*p,t[10]=_*g+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uh,e,hh)}lookAt(e,t,n){let s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),ai.crossVectors(n,gn),ai.lengthSq()===0&&(Math.abs(n.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),ai.crossVectors(n,gn)),ai.normalize(),Er.crossVectors(gn,ai),s[0]=ai.x,s[4]=Er.x,s[8]=gn.x,s[1]=ai.y,s[5]=Er.y,s[9]=gn.y,s[2]=ai.z,s[6]=Er.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],l=n[4],d=n[8],c=n[12],p=n[1],g=n[5],h=n[9],u=n[13],x=n[2],_=n[6],m=n[10],f=n[14],M=n[3],A=n[7],I=n[11],D=n[15],S=s[0],R=s[4],y=s[8],C=s[12],P=s[1],w=s[5],F=s[9],G=s[13],$=s[2],O=s[6],H=s[10],X=s[14],re=s[3],ce=s[7],me=s[11],we=s[15];return r[0]=o*S+l*P+d*$+c*re,r[4]=o*R+l*w+d*O+c*ce,r[8]=o*y+l*F+d*H+c*me,r[12]=o*C+l*G+d*X+c*we,r[1]=p*S+g*P+h*$+u*re,r[5]=p*R+g*w+h*O+u*ce,r[9]=p*y+g*F+h*H+u*me,r[13]=p*C+g*G+h*X+u*we,r[2]=x*S+_*P+m*$+f*re,r[6]=x*R+_*w+m*O+f*ce,r[10]=x*y+_*F+m*H+f*me,r[14]=x*C+_*G+m*X+f*we,r[3]=M*S+A*P+I*$+D*re,r[7]=M*R+A*w+I*O+D*ce,r[11]=M*y+A*F+I*H+D*me,r[15]=M*C+A*G+I*X+D*we,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],l=e[5],d=e[9],c=e[13],p=e[2],g=e[6],h=e[10],u=e[14],x=e[3],_=e[7],m=e[11],f=e[15],M=d*u-c*h,A=l*u-c*g,I=l*h-d*g,D=o*u-c*p,S=o*h-d*p,R=o*g-l*p;return t*(_*M-m*A+f*I)-n*(x*M-m*D+f*S)+s*(x*A-_*D+f*R)-r*(x*I-_*S+m*R)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],l=e[5],d=e[6],c=e[7],p=e[8],g=e[9],h=e[10],u=e[11],x=e[12],_=e[13],m=e[14],f=e[15],M=t*l-n*o,A=t*d-s*o,I=t*c-r*o,D=n*d-s*l,S=n*c-r*l,R=s*c-r*d,y=p*_-g*x,C=p*m-h*x,P=p*f-u*x,w=g*m-h*_,F=g*f-u*_,G=h*f-u*m,$=M*G-A*F+I*w+D*P-S*C+R*y;if($===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let O=1/$;return e[0]=(l*G-d*F+c*w)*O,e[1]=(s*F-n*G-r*w)*O,e[2]=(_*R-m*S+f*D)*O,e[3]=(h*S-g*R-u*D)*O,e[4]=(d*P-o*G-c*C)*O,e[5]=(t*G-s*P+r*C)*O,e[6]=(m*I-x*R-f*A)*O,e[7]=(p*R-h*I+u*A)*O,e[8]=(o*F-l*P+c*y)*O,e[9]=(n*P-t*F-r*y)*O,e[10]=(x*S-_*I+f*M)*O,e[11]=(g*I-p*S-u*M)*O,e[12]=(l*C-o*w-d*y)*O,e[13]=(t*w-n*C+s*y)*O,e[14]=(_*A-x*D-m*M)*O,e[15]=(p*D-g*A+h*M)*O,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,l=e.y,d=e.z,c=r*o,p=r*l;return this.set(c*o+n,c*l-s*d,c*d+s*l,0,c*l+s*d,p*l+n,p*d-s*o,0,c*d-s*l,p*d+s*o,r*d*d+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,l=t._z,d=t._w,c=r+r,p=o+o,g=l+l,h=r*c,u=r*p,x=r*g,_=o*p,m=o*g,f=l*g,M=d*c,A=d*p,I=d*g,D=n.x,S=n.y,R=n.z;return s[0]=(1-(_+f))*D,s[1]=(u+I)*D,s[2]=(x-A)*D,s[3]=0,s[4]=(u-I)*S,s[5]=(1-(h+f))*S,s[6]=(m+M)*S,s[7]=0,s[8]=(x+A)*R,s[9]=(m-M)*R,s[10]=(1-(h+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinant();if(r===0)return n.set(1,1,1),t.identity(),this;let o=qi.set(s[0],s[1],s[2]).length(),l=qi.set(s[4],s[5],s[6]).length(),d=qi.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Mn.copy(this);let c=1/o,p=1/l,g=1/d;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=p,Mn.elements[5]*=p,Mn.elements[6]*=p,Mn.elements[8]*=g,Mn.elements[9]*=g,Mn.elements[10]*=g,t.setFromRotationMatrix(Mn),n.x=o,n.y=l,n.z=d,this}makePerspective(e,t,n,s,r,o,l=En,d=!1){let c=this.elements,p=2*r/(t-e),g=2*r/(n-s),h=(t+e)/(t-e),u=(n+s)/(n-s),x,_;if(d)x=r/(o-r),_=o*r/(o-r);else if(l===En)x=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(l===ls)x=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=p,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=g,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,l=En,d=!1){let c=this.elements,p=2/(t-e),g=2/(n-s),h=-(t+e)/(t-e),u=-(n+s)/(n-s),x,_;if(d)x=1/(o-r),_=o/(o-r);else if(l===En)x=-2/(o-r),_=-(o+r)/(o-r);else if(l===ls)x=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=p,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=g,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=x,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Xo.prototype.isMatrix4=!0;var bt=Xo,qi=new B,Mn=new bt,uh=new B(0,0,0),hh=new B(1,1,1),ai=new B,Er=new B,gn=new B,Wc=new bt,Xc=new zn,mi=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],l=s[8],d=s[1],c=s[5],p=s[9],g=s[2],h=s[6],u=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-p,u),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(l,u),this._z=Math.atan2(d,c)):(this._y=Math.atan2(-g,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-g,u),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(d,r));break;case"ZYX":this._y=Math.asin(-nt(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(h,u),this._z=Math.atan2(d,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-p,c),this._y=Math.atan2(-g,r)):(this._x=0,this._y=Math.atan2(l,u));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-p,u),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Wc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Wc,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xc.setFromEuler(this),this.setFromQuaternion(Xc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};mi.DEFAULT_ORDER="XYZ";var us=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},fh=0,qc=new B,Yi=new zn,Jn=new bt,Ar=new B,Rs=new B,ph=new B,mh=new zn,Yc=new B(1,0,0),$c=new B(0,1,0),Zc=new B(0,0,1),Jc={type:"added"},gh={type:"removed"},$i={type:"childadded",child:null},Za={type:"childremoved",child:null},Zt=class i extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fh++}),this.uuid=fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new mi,n=new zn,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new bt},normalMatrix:{value:new $e}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new us,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.multiply(Yi),this}rotateOnWorldAxis(e,t){return Yi.setFromAxisAngle(e,t),this.quaternion.premultiply(Yi),this}rotateX(e){return this.rotateOnAxis(Yc,e)}rotateY(e){return this.rotateOnAxis($c,e)}rotateZ(e){return this.rotateOnAxis(Zc,e)}translateOnAxis(e,t){return qc.copy(e).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Yc,e)}translateY(e){return this.translateOnAxis($c,e)}translateZ(e){return this.translateOnAxis(Zc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Jn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ar.copy(e):Ar.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Jn.lookAt(Rs,Ar,this.up):Jn.lookAt(Ar,Rs,this.up),this.quaternion.setFromRotationMatrix(Jn),s&&(Jn.extractRotation(s.matrixWorld),Yi.setFromRotationMatrix(Jn),this.quaternion.premultiply(Yi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ve("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Jc),$i.child=e,this.dispatchEvent($i),$i.child=null):Ve("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gh),Za.child=e,this.dispatchEvent(Za),Za.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Jn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Jn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Jn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Jc),$i.child=e,this.dispatchEvent($i),$i.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,e,ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,mh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(l,d){return l[d.uuid]===void 0&&(l[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let d=l.shapes;if(Array.isArray(d))for(let c=0,p=d.length;c<p;c++){let g=d[c];r(e.shapes,g)}else r(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let d=0,c=this.material.length;d<c;d++)l.push(r(e.materials,this.material[d]));s.material=l}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){let d=this.animations[l];s.animations.push(r(e.animations,d))}}if(t){let l=o(e.geometries),d=o(e.materials),c=o(e.textures),p=o(e.images),g=o(e.shapes),h=o(e.skeletons),u=o(e.animations),x=o(e.nodes);l.length>0&&(n.geometries=l),d.length>0&&(n.materials=d),c.length>0&&(n.textures=c),p.length>0&&(n.images=p),g.length>0&&(n.shapes=g),h.length>0&&(n.skeletons=h),u.length>0&&(n.animations=u),x.length>0&&(n.nodes=x)}return n.object=s,n;function o(l){let d=[];for(let c in l){let p=l[c];delete p.metadata,d.push(p)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Zt.DEFAULT_UP=new B(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ui=class extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}},xh={type:"move"},hs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,l=this._targetRay,d=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let m=t.getJointPose(_,n),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let p=c.joints["index-finger-tip"],g=c.joints["thumb-tip"],h=p.position.distanceTo(g.position),u=.02,x=.005;c.inputState.pinching&&h>u+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=u-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(d.matrix.fromArray(r.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,r.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(r.linearVelocity)):d.hasLinearVelocity=!1,r.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(r.angularVelocity)):d.hasAngularVelocity=!1,d.eventsEnabled&&d.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(xh)))}return l!==null&&(l.visible=s!==null),d!==null&&(d.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ui;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},jd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function Ja(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ge=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ot.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=ot.workingColorSpace){return this.r=e,this.g=t,this.b=n,ot.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=ot.workingColorSpace){if(e=ah(e,1),t=nt(t,0,1),n=nt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ja(o,r,e+1/3),this.g=Ja(o,r,e),this.b=Ja(o,r,e-1/3)}return ot.colorSpaceToWorking(this,s),this}setStyle(e,t=an){function n(r){r!==void 0&&parseFloat(r)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],l=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){let n=jd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ti(e.r),this.g=ti(e.g),this.b=ti(e.b),this}copyLinearToSRGB(e){return this.r=as(e.r),this.g=as(e.g),this.b=as(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return ot.workingToColorSpace(tn.copy(this),e),Math.round(nt(tn.r*255,0,255))*65536+Math.round(nt(tn.g*255,0,255))*256+Math.round(nt(tn.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ot.workingColorSpace){ot.workingToColorSpace(tn.copy(this),t);let n=tn.r,s=tn.g,r=tn.b,o=Math.max(n,s,r),l=Math.min(n,s,r),d,c,p=(l+o)/2;if(l===o)d=0,c=0;else{let g=o-l;switch(c=p<=.5?g/(o+l):g/(2-o-l),o){case n:d=(s-r)/g+(s<r?6:0);break;case s:d=(r-n)/g+2;break;case r:d=(n-s)/g+4;break}d/=6}return e.h=d,e.s=c,e.l=p,e}getRGB(e,t=ot.workingColorSpace){return ot.workingToColorSpace(tn.copy(this),t),e.r=tn.r,e.g=tn.g,e.b=tn.b,e}getStyle(e=an){ot.workingToColorSpace(tn.copy(this),e);let t=tn.r,n=tn.g,s=tn.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(Cr);let n=Wa(li.h,Cr.h,t),s=Wa(li.s,Cr.s,t),r=Wa(li.l,Cr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new Ge;Ge.NAMES=jd;var qs=class extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new mi,this.environmentIntensity=1,this.environmentRotation=new mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},wn=new B,Kn=new B,Ka=new B,jn=new B,Zi=new B,Ji=new B,Kc=new B,ja=new B,Qa=new B,el=new B,tl=new Dt,nl=new Dt,il=new Dt,Fn=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),wn.subVectors(e,t),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){wn.subVectors(s,t),Kn.subVectors(n,t),Ka.subVectors(e,t);let o=wn.dot(wn),l=wn.dot(Kn),d=wn.dot(Ka),c=Kn.dot(Kn),p=Kn.dot(Ka),g=o*c-l*l;if(g===0)return r.set(0,0,0),null;let h=1/g,u=(c*d-l*p)*h,x=(o*p-l*d)*h;return r.set(1-u-x,x,u)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,jn)===null?!1:jn.x>=0&&jn.y>=0&&jn.x+jn.y<=1}static getInterpolation(e,t,n,s,r,o,l,d){return this.getBarycoord(e,t,n,s,jn)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(r,jn.x),d.addScaledVector(o,jn.y),d.addScaledVector(l,jn.z),d)}static getInterpolatedAttribute(e,t,n,s,r,o){return tl.setScalar(0),nl.setScalar(0),il.setScalar(0),tl.fromBufferAttribute(e,t),nl.fromBufferAttribute(e,n),il.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(tl,r.x),o.addScaledVector(nl,r.y),o.addScaledVector(il,r.z),o}static isFrontFacing(e,t,n,s){return wn.subVectors(n,t),Kn.subVectors(e,t),wn.cross(Kn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return wn.subVectors(this.c,this.b),Kn.subVectors(this.a,this.b),wn.cross(Kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,l;Zi.subVectors(s,n),Ji.subVectors(r,n),ja.subVectors(e,n);let d=Zi.dot(ja),c=Ji.dot(ja);if(d<=0&&c<=0)return t.copy(n);Qa.subVectors(e,s);let p=Zi.dot(Qa),g=Ji.dot(Qa);if(p>=0&&g<=p)return t.copy(s);let h=d*g-p*c;if(h<=0&&d>=0&&p<=0)return o=d/(d-p),t.copy(n).addScaledVector(Zi,o);el.subVectors(e,r);let u=Zi.dot(el),x=Ji.dot(el);if(x>=0&&u<=x)return t.copy(r);let _=u*c-d*x;if(_<=0&&c>=0&&x<=0)return l=c/(c-x),t.copy(n).addScaledVector(Ji,l);let m=p*x-u*g;if(m<=0&&g-p>=0&&u-x>=0)return Kc.subVectors(r,s),l=(g-p)/(g-p+(u-x)),t.copy(s).addScaledVector(Kc,l);let f=1/(m+_+h);return o=_*f,l=h*f,t.copy(n).addScaledVector(Zi,o).addScaledVector(Ji,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},gi=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Tn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Tn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Tn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=r.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Tn):Tn.fromBufferAttribute(r,o),Tn.applyMatrix4(e.matrixWorld),this.expandByPoint(Tn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(e.matrixWorld),this.union(Ir)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Tn),Tn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),Pr.subVectors(this.max,Ls),Ki.subVectors(e.a,Ls),ji.subVectors(e.b,Ls),Qi.subVectors(e.c,Ls),ci.subVectors(ji,Ki),di.subVectors(Qi,ji),Pi.subVectors(Ki,Qi);let t=[0,-ci.z,ci.y,0,-di.z,di.y,0,-Pi.z,Pi.y,ci.z,0,-ci.x,di.z,0,-di.x,Pi.z,0,-Pi.x,-ci.y,ci.x,0,-di.y,di.x,0,-Pi.y,Pi.x,0];return!sl(t,Ki,ji,Qi,Pr)||(t=[1,0,0,0,1,0,0,0,1],!sl(t,Ki,ji,Qi,Pr))?!1:(Dr.crossVectors(ci,di),t=[Dr.x,Dr.y,Dr.z],sl(t,Ki,ji,Qi,Pr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Tn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Tn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new B,new B,new B,new B,new B,new B,new B,new B],Tn=new B,Ir=new gi,Ki=new B,ji=new B,Qi=new B,ci=new B,di=new B,Pi=new B,Ls=new B,Pr=new B,Dr=new B,Di=new B;function sl(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Di.fromArray(i,r);let l=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),d=e.dot(Di),c=t.dot(Di),p=n.dot(Di);if(Math.max(-Math.max(d,c,p),Math.min(d,c,p))>l)return!1}return!0}var Ht=new B,Rr=new Xe,vh=0,Yt=class extends kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=xo,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rr.fromBufferAttribute(this,t),Rr.applyMatrix3(e),this.setXY(t,Rr.x,Rr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix3(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyMatrix4(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.applyNormalMatrix(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ht.fromBufferAttribute(this,t),Ht.transformDirection(e),this.setXYZ(t,Ht.x,Ht.y,Ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Un(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Un(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Un(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xo&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Ys=class extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var $s=class extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Ct=class extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}},yh=new gi,Ns=new B,rl=new B,xi=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):yh.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ns.subVectors(e,this.center);let t=Ns.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(rl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ns.copy(e.center).add(rl)),this.expandByPoint(Ns.copy(e.center).sub(rl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},_h=0,bn=new bt,ol=new Zt,es=new B,xn=new gi,Us=new gi,qt=new B,kt=class i extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_h++}),this.uuid=fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(rh(e)?$s:Ys)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new $e().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,n){return bn.makeTranslation(e,t,n),this.applyMatrix4(bn),this}scale(e,t,n){return bn.makeScale(e,t,n),this.applyMatrix4(bn),this}lookAt(e){return ol.lookAt(e),ol.updateMatrix(),this.applyMatrix4(ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ct(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new gi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ve('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ve("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let l=t[r];Us.setFromBufferAttribute(l),this.morphTargetsRelative?(qt.addVectors(xn.min,Us.min),xn.expandByPoint(qt),qt.addVectors(xn.max,Us.max),xn.expandByPoint(qt)):(xn.expandByPoint(Us.min),xn.expandByPoint(Us.max))}xn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)qt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(qt));if(t)for(let r=0,o=t.length;r<o;r++){let l=t[r],d=this.morphTargetsRelative;for(let c=0,p=l.count;c<p;c++)qt.fromBufferAttribute(l,c),d&&(es.fromBufferAttribute(e,c),qt.add(es)),s=Math.max(s,n.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ve('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ve("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),l=[],d=[];for(let y=0;y<n.count;y++)l[y]=new B,d[y]=new B;let c=new B,p=new B,g=new B,h=new Xe,u=new Xe,x=new Xe,_=new B,m=new B;function f(y,C,P){c.fromBufferAttribute(n,y),p.fromBufferAttribute(n,C),g.fromBufferAttribute(n,P),h.fromBufferAttribute(r,y),u.fromBufferAttribute(r,C),x.fromBufferAttribute(r,P),p.sub(c),g.sub(c),u.sub(h),x.sub(h);let w=1/(u.x*x.y-x.x*u.y);isFinite(w)&&(_.copy(p).multiplyScalar(x.y).addScaledVector(g,-u.y).multiplyScalar(w),m.copy(g).multiplyScalar(u.x).addScaledVector(p,-x.x).multiplyScalar(w),l[y].add(_),l[C].add(_),l[P].add(_),d[y].add(m),d[C].add(m),d[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let y=0,C=M.length;y<C;++y){let P=M[y],w=P.start,F=P.count;for(let G=w,$=w+F;G<$;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}let A=new B,I=new B,D=new B,S=new B;function R(y){D.fromBufferAttribute(s,y),S.copy(D);let C=l[y];A.copy(C),A.sub(D.multiplyScalar(D.dot(C))).normalize(),I.crossVectors(S,C);let w=I.dot(d[y])<0?-1:1;o.setXYZW(y,A.x,A.y,A.z,w)}for(let y=0,C=M.length;y<C;++y){let P=M[y],w=P.start,F=P.count;for(let G=w,$=w+F;G<$;G+=3)R(e.getX(G+0)),R(e.getX(G+1)),R(e.getX(G+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,u=n.count;h<u;h++)n.setXYZ(h,0,0,0);let s=new B,r=new B,o=new B,l=new B,d=new B,c=new B,p=new B,g=new B;if(e)for(let h=0,u=e.count;h<u;h+=3){let x=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);s.fromBufferAttribute(t,x),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),p.subVectors(o,r),g.subVectors(s,r),p.cross(g),l.fromBufferAttribute(n,x),d.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),l.add(p),d.add(p),c.add(p),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(_,d.x,d.y,d.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,u=t.count;h<u;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),p.subVectors(o,r),g.subVectors(s,r),p.cross(g),n.setXYZ(h+0,p.x,p.y,p.z),n.setXYZ(h+1,p.x,p.y,p.z),n.setXYZ(h+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qt.fromBufferAttribute(e,t),qt.normalize(),e.setXYZ(t,qt.x,qt.y,qt.z)}toNonIndexed(){function e(l,d){let c=l.array,p=l.itemSize,g=l.normalized,h=new c.constructor(d.length*p),u=0,x=0;for(let _=0,m=d.length;_<m;_++){l.isInterleavedBufferAttribute?u=d[_]*l.data.stride+l.offset:u=d[_]*p;for(let f=0;f<p;f++)h[x++]=c[u++]}return new Yt(h,p,g)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let l in s){let d=s[l],c=e(d,n);t.setAttribute(l,c)}let r=this.morphAttributes;for(let l in r){let d=[],c=r[l];for(let p=0,g=c.length;p<g;p++){let h=c[p],u=e(h,n);d.push(u)}t.morphAttributes[l]=d}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let l=0,d=o.length;l<d;l++){let c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let d=this.parameters;for(let c in d)d[c]!==void 0&&(e[c]=d[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let d in n){let c=n[d];e.data.attributes[d]=c.toJSON(e.data)}let s={},r=!1;for(let d in this.morphAttributes){let c=this.morphAttributes[d],p=[];for(let g=0,h=c.length;g<h;g++){let u=c[g];p.push(u.toJSON(e.data))}p.length>0&&(s[d]=p,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let p=s[c];this.setAttribute(c,p.clone(t))}let r=e.morphAttributes;for(let c in r){let p=[],g=r[c];for(let h=0,u=g.length;h<u;h++)p.push(g[h].clone(t));this.morphAttributes[c]=p}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,p=o.length;c<p;c++){let g=o[c];this.addGroup(g.start,g.count,g.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mo=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xo,this.updateRanges=[],this.version=0,this.uuid=fi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},on=new B,Zs=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),s=gt(s,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ws("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ws("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},bh=0,Vn=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=fi(),this.name="",this.type="Material",this.blending=Fi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=Oi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ke(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Oi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let l in r){let d=r[l];delete d.metadata,o.push(d)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Bi=class extends Vn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ts,Fs=new B,ns=new B,is=new B,ss=new Xe,Os=new Xe,Qd=new bt,Lr=new B,Bs=new B,Nr=new B,jc=new Xe,al=new Xe,Qc=new Xe,fs=class extends Zt{constructor(e=new Bi){if(super(),this.isSprite=!0,this.type="Sprite",ts===void 0){ts=new kt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Mo(t,5);ts.setIndex([0,1,2,0,2,3]),ts.setAttribute("position",new Zs(n,3,0,!1)),ts.setAttribute("uv",new Zs(n,2,3,!1))}this.geometry=ts,this.material=e,this.center=new Xe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Ve('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),ns.setFromMatrixScale(this.matrixWorld),Qd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),is.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ns.multiplyScalar(-is.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;Ur(Lr.set(-.5,-.5,0),is,o,ns,s,r),Ur(Bs.set(.5,-.5,0),is,o,ns,s,r),Ur(Nr.set(.5,.5,0),is,o,ns,s,r),jc.set(0,0),al.set(1,0),Qc.set(1,1);let l=e.ray.intersectTriangle(Lr,Bs,Nr,!1,Fs);if(l===null&&(Ur(Bs.set(-.5,.5,0),is,o,ns,s,r),al.set(0,1),l=e.ray.intersectTriangle(Lr,Nr,Bs,!1,Fs),l===null))return;let d=e.ray.origin.distanceTo(Fs);d<e.near||d>e.far||t.push({distance:d,point:Fs.clone(),uv:Fn.getInterpolation(Fs,Lr,Bs,Nr,jc,al,Qc,new Xe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ur(i,e,t,n,s,r){ss.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Os.x=r*ss.x-s*ss.y,Os.y=s*ss.x+r*ss.y):Os.copy(ss),i.copy(e),i.x+=Os.x,i.y+=Os.y,i.applyMatrix4(Qd)}var ei=new B,ll=new B,Fr=new B,ui=new B,cl=new B,Or=new B,dl=new B,ki=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ll.copy(e).add(t).multiplyScalar(.5),Fr.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(ll);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Fr),l=ui.dot(this.direction),d=-ui.dot(Fr),c=ui.lengthSq(),p=Math.abs(1-o*o),g,h,u,x;if(p>0)if(g=o*d-l,h=o*l-d,x=r*p,g>=0)if(h>=-x)if(h<=x){let _=1/p;g*=_,h*=_,u=g*(g+o*h+2*l)+h*(o*g+h+2*d)+c}else h=r,g=Math.max(0,-(o*h+l)),u=-g*g+h*(h+2*d)+c;else h=-r,g=Math.max(0,-(o*h+l)),u=-g*g+h*(h+2*d)+c;else h<=-x?(g=Math.max(0,-(-o*r+l)),h=g>0?-r:Math.min(Math.max(-r,-d),r),u=-g*g+h*(h+2*d)+c):h<=x?(g=0,h=Math.min(Math.max(-r,-d),r),u=h*(h+2*d)+c):(g=Math.max(0,-(o*r+l)),h=g>0?r:Math.min(Math.max(-r,-d),r),u=-g*g+h*(h+2*d)+c);else h=o>0?-r:r,g=Math.max(0,-(o*h+l)),u=-g*g+h*(h+2*d)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,g),s&&s.copy(ll).addScaledVector(Fr,h),u}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),s=ei.dot(ei)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),l=n-o,d=n+o;return d<0?null:l<0?this.at(d,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,l,d,c=1/this.direction.x,p=1/this.direction.y,g=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),p>=0?(r=(e.min.y-h.y)*p,o=(e.max.y-h.y)*p):(r=(e.max.y-h.y)*p,o=(e.min.y-h.y)*p),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),g>=0?(l=(e.min.z-h.z)*g,d=(e.max.z-h.z)*g):(l=(e.max.z-h.z)*g,d=(e.min.z-h.z)*g),n>d||l>s)||((l>n||n!==n)&&(n=l),(d<s||s!==s)&&(s=d),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,s,r){cl.subVectors(t,e),Or.subVectors(n,e),dl.crossVectors(cl,Or);let o=this.direction.dot(dl),l;if(o>0){if(s)return null;l=1}else if(o<0)l=-1,o=-o;else return null;ui.subVectors(this.origin,e);let d=l*this.direction.dot(Or.crossVectors(ui,Or));if(d<0)return null;let c=l*this.direction.dot(cl.cross(ui));if(c<0||d+c>o)return null;let p=-l*ui.dot(dl);return p<0?null:this.at(p/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Hn=class extends Vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new mi,this.combine=Dl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ed=new bt,Ri=new ki,Br=new xi,td=new B,kr=new B,zr=new B,Vr=new B,ul=new B,Hr=new B,nd=new B,Gr=new B,Kt=class extends Zt{constructor(e=new kt,t=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let l=this.morphTargetInfluences;if(r&&l){Hr.set(0,0,0);for(let d=0,c=r.length;d<c;d++){let p=l[d],g=r[d];p!==0&&(ul.fromBufferAttribute(g,e),o?Hr.addScaledVector(ul,p):Hr.addScaledVector(ul.sub(t),p))}t.add(Hr)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Br.copy(n.boundingSphere),Br.applyMatrix4(r),Ri.copy(e.ray).recast(e.near),!(Br.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Br,td)===null||Ri.origin.distanceToSquared(td)>(e.far-e.near)**2))&&(ed.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(ed),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,l=r.index,d=r.attributes.position,c=r.attributes.uv,p=r.attributes.uv1,g=r.attributes.normal,h=r.groups,u=r.drawRange;if(l!==null)if(Array.isArray(o))for(let x=0,_=h.length;x<_;x++){let m=h[x],f=o[m.materialIndex],M=Math.max(m.start,u.start),A=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let I=M,D=A;I<D;I+=3){let S=l.getX(I),R=l.getX(I+1),y=l.getX(I+2);s=Wr(this,f,e,n,c,p,g,S,R,y),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,u.start),_=Math.min(l.count,u.start+u.count);for(let m=x,f=_;m<f;m+=3){let M=l.getX(m),A=l.getX(m+1),I=l.getX(m+2);s=Wr(this,o,e,n,c,p,g,M,A,I),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(o))for(let x=0,_=h.length;x<_;x++){let m=h[x],f=o[m.materialIndex],M=Math.max(m.start,u.start),A=Math.min(d.count,Math.min(m.start+m.count,u.start+u.count));for(let I=M,D=A;I<D;I+=3){let S=I,R=I+1,y=I+2;s=Wr(this,f,e,n,c,p,g,S,R,y),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let x=Math.max(0,u.start),_=Math.min(d.count,u.start+u.count);for(let m=x,f=_;m<f;m+=3){let M=m,A=m+1,I=m+2;s=Wr(this,o,e,n,c,p,g,M,A,I),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Sh(i,e,t,n,s,r,o,l){let d;if(e.side===dn?d=n.intersectTriangle(o,r,s,!0,l):d=n.intersectTriangle(s,r,o,e.side===An,l),d===null)return null;Gr.copy(l),Gr.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Gr);return c<t.near||c>t.far?null:{distance:c,point:Gr.clone(),object:i}}function Wr(i,e,t,n,s,r,o,l,d,c){i.getVertexPosition(l,kr),i.getVertexPosition(d,zr),i.getVertexPosition(c,Vr);let p=Sh(i,e,t,n,kr,zr,Vr,nd);if(p){let g=new B;Fn.getBarycoord(nd,kr,zr,Vr,g),s&&(p.uv=Fn.getInterpolatedAttribute(s,l,d,c,g,new Xe)),r&&(p.uv1=Fn.getInterpolatedAttribute(r,l,d,c,g,new Xe)),o&&(p.normal=Fn.getInterpolatedAttribute(o,l,d,c,g,new B),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));let h={a:l,b:d,c,normal:new B,materialIndex:0};Fn.getNormal(kr,zr,Vr,h.normal),p.face=h,p.barycoord=g}return p}var wo=class extends ln{constructor(e=null,t=1,n=1,s,r,o,l,d,c=$t,p=$t,g,h){super(null,o,l,d,c,p,s,r,g,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var hl=new B,Mh=new B,wh=new $e,Nn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=hl.subVectors(n,t).cross(Mh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(hl),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||wh.getNormalMatrix(e),s=this.coplanarPoint(hl).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Li=new xi,Th=new Xe(.5,.5),Xr=new B,ps=class{constructor(e=new Nn,t=new Nn,n=new Nn,s=new Nn,r=new Nn,o=new Nn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(s),l[4].copy(r),l[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=En,n=!1){let s=this.planes,r=e.elements,o=r[0],l=r[1],d=r[2],c=r[3],p=r[4],g=r[5],h=r[6],u=r[7],x=r[8],_=r[9],m=r[10],f=r[11],M=r[12],A=r[13],I=r[14],D=r[15];if(s[0].setComponents(c-o,u-p,f-x,D-M).normalize(),s[1].setComponents(c+o,u+p,f+x,D+M).normalize(),s[2].setComponents(c+l,u+g,f+_,D+A).normalize(),s[3].setComponents(c-l,u-g,f-_,D-A).normalize(),n)s[4].setComponents(d,h,m,I).normalize(),s[5].setComponents(c-d,u-h,f-m,D-I).normalize();else if(s[4].setComponents(c-d,u-h,f-m,D-I).normalize(),t===En)s[5].setComponents(c+d,u+h,f+m,D+I).normalize();else if(t===ls)s[5].setComponents(d,h,m,I).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);let t=Th.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var vi=class extends Vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ge(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},To=new B,Eo=new B,id=new bt,ks=new ki,qr=new xi,fl=new B,sd=new B,ms=class extends Zt{constructor(e=new kt,t=new vi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)To.fromBufferAttribute(t,s-1),Eo.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=To.distanceTo(Eo);e.setAttribute("lineDistance",new Ct(n,1))}else ke("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(s),qr.radius+=r,e.ray.intersectsSphere(qr)===!1)return;id.copy(s).invert(),ks.copy(e.ray).applyMatrix4(id);let l=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=l*l,c=this.isLineSegments?2:1,p=n.index,h=n.attributes.position;if(p!==null){let u=Math.max(0,o.start),x=Math.min(p.count,o.start+o.count);for(let _=u,m=x-1;_<m;_+=c){let f=p.getX(_),M=p.getX(_+1),A=Yr(this,e,ks,d,f,M,_);A&&t.push(A)}if(this.isLineLoop){let _=p.getX(x-1),m=p.getX(u),f=Yr(this,e,ks,d,_,m,x-1);f&&t.push(f)}}else{let u=Math.max(0,o.start),x=Math.min(h.count,o.start+o.count);for(let _=u,m=x-1;_<m;_+=c){let f=Yr(this,e,ks,d,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){let _=Yr(this,e,ks,d,x-1,u,x-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}};function Yr(i,e,t,n,s,r,o){let l=i.geometry.attributes.position;if(To.fromBufferAttribute(l,s),Eo.fromBufferAttribute(l,r),t.distanceSqToSegment(To,Eo,fl,sd)>n)return;fl.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(fl);if(!(c<e.near||c>e.far))return{distance:c,point:sd.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var rd=new B,od=new B,gs=class extends ms{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)rd.fromBufferAttribute(t,s),od.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+rd.distanceTo(od);e.setAttribute("lineDistance",new Ct(n,1))}else ke("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ao=class extends Vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ge(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ad=new bt,Sl=new ki,$r=new xi,Zr=new B,Js=class extends Zt{constructor(e=new kt,t=new Ao){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere),$r.applyMatrix4(s),$r.radius+=r,e.ray.intersectsSphere($r)===!1)return;ad.copy(s).invert(),Sl.copy(e.ray).applyMatrix4(ad);let l=r/((this.scale.x+this.scale.y+this.scale.z)/3),d=l*l,c=n.index,g=n.attributes.position;if(c!==null){let h=Math.max(0,o.start),u=Math.min(c.count,o.start+o.count);for(let x=h,_=u;x<_;x++){let m=c.getX(x);Zr.fromBufferAttribute(g,m),ld(Zr,m,d,s,e,t,this)}}else{let h=Math.max(0,o.start),u=Math.min(g.count,o.start+o.count);for(let x=h,_=u;x<_;x++)Zr.fromBufferAttribute(g,x),ld(Zr,x,d,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}};function ld(i,e,t,n,s,r,o){let l=Sl.distanceSqToPoint(i);if(l<t){let d=new B;Sl.closestPointToPoint(i,d),d.applyMatrix4(n);let c=s.ray.origin.distanceTo(d);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(l),point:d,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var Ks=class extends ln{constructor(e=[],t=Si,n,s,r,o,l,d,c,p){super(e,t,n,s,r,o,l,d,c,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},xs=class extends ln{constructor(e,t,n,s,r,o,l,d,c){super(e,t,n,s,r,o,l,d,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var ni=class extends ln{constructor(e,t,n=In,s,r,o,l=$t,d=$t,c,p=Bn,g=1){if(p!==Bn&&p!==wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:g};super(h,s,r,o,l,d,p,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ds(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Co=class extends ni{constructor(e,t=In,n=Si,s,r,o=$t,l=$t,d,c=Bn){let p={width:e,height:e,depth:1},g=[p,p,p,p,p,p];super(e,e,t,n,s,r,o,l,d,c),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},js=class extends ln{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},vs=class i extends kt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let l=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let d=[],c=[],p=[],g=[],h=0,u=0;x("z","y","x",-1,-1,n,t,e,o,r,0),x("z","y","x",1,-1,n,t,-e,o,r,1),x("x","z","y",1,1,e,n,t,s,o,2),x("x","z","y",1,-1,e,n,-t,s,o,3),x("x","y","z",1,-1,e,t,n,s,r,4),x("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(d),this.setAttribute("position",new Ct(c,3)),this.setAttribute("normal",new Ct(p,3)),this.setAttribute("uv",new Ct(g,2));function x(_,m,f,M,A,I,D,S,R,y,C){let P=I/R,w=D/y,F=I/2,G=D/2,$=S/2,O=R+1,H=y+1,X=0,re=0,ce=new B;for(let me=0;me<H;me++){let we=me*w-G;for(let Ce=0;Ce<O;Ce++){let je=Ce*P-F;ce[_]=je*M,ce[m]=we*A,ce[f]=$,c.push(ce.x,ce.y,ce.z),ce[_]=0,ce[m]=0,ce[f]=S>0?1:-1,p.push(ce.x,ce.y,ce.z),g.push(Ce/R),g.push(1-me/y),X+=1}}for(let me=0;me<y;me++)for(let we=0;we<R;we++){let Ce=h+we+O*me,je=h+we+O*(me+1),rt=h+(we+1)+O*(me+1),K=h+(we+1)+O*me;d.push(Ce,je,K),d.push(je,rt,K),re+=6}l.addGroup(u,re,C),u+=re,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Qs=class i extends kt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],l=[],d=[],c=new B,p=new Xe;o.push(0,0,0),l.push(0,0,1),d.push(.5,.5);for(let g=0,h=3;g<=t;g++,h+=3){let u=n+g/t*s;c.x=e*Math.cos(u),c.y=e*Math.sin(u),o.push(c.x,c.y,c.z),l.push(0,0,1),p.x=(o[h]/e+1)/2,p.y=(o[h+1]/e+1)/2,d.push(p.x,p.y)}for(let g=1;g<=t;g++)r.push(g,g+1,0);this.setIndex(r),this.setAttribute("position",new Ct(o,3)),this.setAttribute("normal",new Ct(l,3)),this.setAttribute("uv",new Ct(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}};var Jr=new B,Kr=new B,pl=new B,jr=new Fn,er=class extends kt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let s=Math.pow(10,4),r=Math.cos(io*t),o=e.getIndex(),l=e.getAttribute("position"),d=o?o.count:l.count,c=[0,0,0],p=["a","b","c"],g=new Array(3),h={},u=[];for(let x=0;x<d;x+=3){o?(c[0]=o.getX(x),c[1]=o.getX(x+1),c[2]=o.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);let{a:_,b:m,c:f}=jr;if(_.fromBufferAttribute(l,c[0]),m.fromBufferAttribute(l,c[1]),f.fromBufferAttribute(l,c[2]),jr.getNormal(pl),g[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,g[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,g[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let M=0;M<3;M++){let A=(M+1)%3,I=g[M],D=g[A],S=jr[p[M]],R=jr[p[A]],y=`${I}_${D}`,C=`${D}_${I}`;C in h&&h[C]?(pl.dot(h[C].normal)<=r&&(u.push(S.x,S.y,S.z),u.push(R.x,R.y,R.z)),h[C]=null):y in h||(h[y]={index0:c[M],index1:c[A],normal:pl.clone()})}}for(let x in h)if(h[x]){let{index0:_,index1:m}=h[x];Jr.fromBufferAttribute(l,_),Kr.fromBufferAttribute(l,m),u.push(Jr.x,Jr.y,Jr.z),u.push(Kr.x,Kr.y,Kr.z)}this.setAttribute("position",new Ct(u,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},Io=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let l=0,d=r-1,c;for(;l<=d;)if(s=Math.floor(l+(d-l)/2),c=n[s]-o,c<0)l=s+1;else if(c>0)d=s-1;else{d=s;break}if(s=d,n[s]===o)return s/(r-1);let p=n[s],h=n[s+1]-p,u=(o-p)/h;return(s+u)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),l=this.getPoint(r),d=t||(o.isVector2?new Xe:new B);return d.copy(l).sub(o).normalize(),d}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,s=[],r=[],o=[],l=new B,d=new bt;for(let u=0;u<=e;u++){let x=u/e;s[u]=this.getTangentAt(x,new B)}r[0]=new B,o[0]=new B;let c=Number.MAX_VALUE,p=Math.abs(s[0].x),g=Math.abs(s[0].y),h=Math.abs(s[0].z);p<=c&&(c=p,n.set(1,0,0)),g<=c&&(c=g,n.set(0,1,0)),h<=c&&n.set(0,0,1),l.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],l),o[0].crossVectors(s[0],r[0]);for(let u=1;u<=e;u++){if(r[u]=r[u-1].clone(),o[u]=o[u-1].clone(),l.crossVectors(s[u-1],s[u]),l.length()>Number.EPSILON){l.normalize();let x=Math.acos(nt(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(d.makeRotationAxis(l,x))}o[u].crossVectors(s[u],r[u])}if(t===!0){let u=Math.acos(nt(r[0].dot(r[e]),-1,1));u/=e,s[0].dot(l.crossVectors(r[0],r[e]))>0&&(u=-u);for(let x=1;x<=e;x++)r[x].applyMatrix4(d.makeRotationAxis(s[x],u*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};function Eh(i,e){let t=1-i;return t*t*e}function Ah(i,e){return 2*(1-i)*i*e}function Ch(i,e){return i*i*e}function ml(i,e,t,n){return Eh(i,e)+Ah(i,t)+Ch(i,n)}var tr=class extends Io{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(ml(e,s.x,r.x,o.x),ml(e,s.y,r.y,o.y),ml(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var nr=class i extends kt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,l=Math.floor(n),d=Math.floor(s),c=l+1,p=d+1,g=e/l,h=t/d,u=[],x=[],_=[],m=[];for(let f=0;f<p;f++){let M=f*h-o;for(let A=0;A<c;A++){let I=A*g-r;x.push(I,-M,0),_.push(0,0,1),m.push(A/l),m.push(1-f/d)}}for(let f=0;f<d;f++)for(let M=0;M<l;M++){let A=M+c*f,I=M+c*(f+1),D=M+1+c*(f+1),S=M+1+c*f;u.push(A,I,S),u.push(I,D,S)}this.setIndex(u),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},ir=class i extends kt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let l=[],d=[],c=[],p=[],g=e,h=(t-e)/s,u=new B,x=new Xe;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){let f=r+m/n*o;u.x=g*Math.cos(f),u.y=g*Math.sin(f),d.push(u.x,u.y,u.z),c.push(0,0,1),x.x=(u.x/t+1)/2,x.y=(u.y/t+1)/2,p.push(x.x,x.y)}g+=h}for(let _=0;_<s;_++){let m=_*(n+1);for(let f=0;f<n;f++){let M=f+m,A=M,I=M+n+1,D=M+n+2,S=M+1;l.push(A,I,S),l.push(I,D,S)}}this.setIndex(l),this.setAttribute("position",new Ct(d,3)),this.setAttribute("normal",new Ct(c,3)),this.setAttribute("uv",new Ct(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var ys=class i extends kt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let d=Math.min(o+l,Math.PI),c=0,p=[],g=new B,h=new B,u=[],x=[],_=[],m=[];for(let f=0;f<=n;f++){let M=[],A=f/n,I=0;f===0&&o===0?I=.5/t:f===n&&d===Math.PI&&(I=-.5/t);for(let D=0;D<=t;D++){let S=D/t;g.x=-e*Math.cos(s+S*r)*Math.sin(o+A*l),g.y=e*Math.cos(o+A*l),g.z=e*Math.sin(s+S*r)*Math.sin(o+A*l),x.push(g.x,g.y,g.z),h.copy(g).normalize(),_.push(h.x,h.y,h.z),m.push(S+I,1-A),M.push(c++)}p.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){let A=p[f][M+1],I=p[f][M],D=p[f+1][M],S=p[f+1][M+1];(f!==0||o>0)&&u.push(A,I,S),(f!==n-1||d<Math.PI)&&u.push(I,D,S)}this.setIndex(u),this.setAttribute("position",new Ct(x,3)),this.setAttribute("normal",new Ct(_,3)),this.setAttribute("uv",new Ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};function Vi(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(cd(s))s.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(cd(s[0])){let r=[];for(let o=0,l=s.length;o<l;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function sn(i){let e={};for(let t=0;t<i.length;t++){let n=Vi(i[t]);for(let s in n)e[s]=n[s]}return e}function cd(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Ih(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Zl(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ot.workingColorSpace}var eu={clone:Vi,merge:sn},Ph=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,cn=class extends Vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ph,this.fragmentShader=Dh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=Ih(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Po=class extends cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Do=class extends Vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ro=class extends Vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};var sr=class extends vi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Qr(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}var yi=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let l=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let l=t[1];e<l&&(n=2,r=l);for(let d=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===d)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let l=n+o>>>1;e<t[l]?o=l:n=l+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Lo=class extends yi{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vl,endingEnd:vl}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,l=s[r],d=s[o];if(l===void 0)switch(this.getSettings_().endingStart){case yl:r=e,l=2*t-n;break;case _l:r=s.length-2,l=t+s[r]-s[r+1];break;default:r=e,l=n}if(d===void 0)switch(this.getSettings_().endingEnd){case yl:o=e,d=2*n-t;break;case _l:o=1,d=n+s[1]-s[0];break;default:o=e-1,d=t}let c=(n-t)*.5,p=this.valueSize;this._weightPrev=c/(t-l),this._weightNext=c/(d-n),this._offsetPrev=r*p,this._offsetNext=o*p}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,d=e*l,c=d-l,p=this._offsetPrev,g=this._offsetNext,h=this._weightPrev,u=this._weightNext,x=(n-t)/(s-t),_=x*x,m=_*x,f=-h*m+2*h*_-h*x,M=(1+h)*m+(-1.5-2*h)*_+(-.5+h)*x+1,A=(-1-u)*m+(1.5+u)*_+.5*x,I=u*m-u*_;for(let D=0;D!==l;++D)r[D]=f*o[p+D]+M*o[c+D]+A*o[d+D]+I*o[g+D];return r}},No=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,d=e*l,c=d-l,p=(n-t)/(s-t),g=1-p;for(let h=0;h!==l;++h)r[h]=o[c+h]*g+o[d+h]*p;return r}},Uo=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Fo=class extends yi{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,d=e*l,c=d-l,p=this.settings||this.DefaultSettings_,g=p.inTangents,h=p.outTangents;if(!g||!h){let _=(n-t)/(s-t),m=1-_;for(let f=0;f!==l;++f)r[f]=o[c+f]*m+o[d+f]*_;return r}let u=l*2,x=e-1;for(let _=0;_!==l;++_){let m=o[c+_],f=o[d+_],M=x*u+_*2,A=h[M],I=h[M+1],D=e*u+_*2,S=g[D],R=g[D+1],y=(n-t)/(s-t),C,P,w,F,G;for(let $=0;$<8;$++){C=y*y,P=C*y,w=1-y,F=w*w,G=F*w;let H=G*t+3*F*y*A+3*w*C*S+P*s-n;if(Math.abs(H)<1e-10)break;let X=3*F*(A-t)+6*w*y*(S-A)+3*C*(s-S);if(Math.abs(X)<1e-10)break;y=y-H/X,y=Math.max(0,Math.min(1,y))}r[_]=G*m+3*F*y*I+3*w*C*R+P*f}return r}},yn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qr(t,this.TimeBufferType),this.values=Qr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qr(e.times,Array),values:Qr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Uo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case zs:t=this.InterpolantFactoryMethodDiscrete;break;case go:t=this.InterpolantFactoryMethodLinear;break;case no:t=this.InterpolantFactoryMethodSmooth;break;case xl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ke("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return zs;case this.InterpolantFactoryMethodLinear:return go;case this.InterpolantFactoryMethodSmooth:return no;case this.InterpolantFactoryMethodBezier:return xl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let l=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*l,o*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ve("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ve("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let l=0;l!==r;l++){let d=n[l];if(typeof d=="number"&&isNaN(d)){Ve("KeyframeTrack: Time is not a valid number.",this,l,d),e=!1;break}if(o!==null&&o>d){Ve("KeyframeTrack: Out of order keys.",this,l,d,o),e=!1;break}o=d}if(s!==void 0&&oh(s))for(let l=0,d=s.length;l!==d;++l){let c=s[l];if(isNaN(c)){Ve("KeyframeTrack: Value is not a valid number.",this,l,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===no,r=e.length-1,o=1;for(let l=1;l<r;++l){let d=!1,c=e[l],p=e[l+1];if(c!==p&&(l!==1||c!==e[0]))if(s)d=!0;else{let g=l*n,h=g-n,u=g+n;for(let x=0;x!==n;++x){let _=t[g+x];if(_!==t[h+x]||_!==t[u+x]){d=!0;break}}}if(d){if(l!==o){e[o]=e[l];let g=l*n,h=o*n;for(let u=0;u!==n;++u)t[h+u]=t[g+u]}++o}}if(r>0){e[o]=e[r];for(let l=r*n,d=o*n,c=0;c!==n;++c)t[d+c]=t[l+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};yn.prototype.ValueTypeName="";yn.prototype.TimeBufferType=Float32Array;yn.prototype.ValueBufferType=Float32Array;yn.prototype.DefaultInterpolation=go;var _i=class extends yn{constructor(e,t,n){super(e,t,n)}};_i.prototype.ValueTypeName="bool";_i.prototype.ValueBufferType=Array;_i.prototype.DefaultInterpolation=zs;_i.prototype.InterpolantFactoryMethodLinear=void 0;_i.prototype.InterpolantFactoryMethodSmooth=void 0;var Oo=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};Oo.prototype.ValueTypeName="color";var Bo=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};Bo.prototype.ValueTypeName="number";var ko=class extends yi{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,l=this.valueSize,d=(n-t)/(s-t),c=e*l;for(let p=c+l;c!==p;c+=4)zn.slerpFlat(r,0,o,c-l,o,c,d);return r}},rr=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new ko(this.times,this.values,this.getValueSize(),e)}};rr.prototype.ValueTypeName="quaternion";rr.prototype.InterpolantFactoryMethodSmooth=void 0;var bi=class extends yn{constructor(e,t,n){super(e,t,n)}};bi.prototype.ValueTypeName="string";bi.prototype.ValueBufferType=Array;bi.prototype.DefaultInterpolation=zs;bi.prototype.InterpolantFactoryMethodLinear=void 0;bi.prototype.InterpolantFactoryMethodSmooth=void 0;var zo=class extends yn{constructor(e,t,n,s){super(e,t,n,s)}};zo.prototype.ValueTypeName="vector";var Vo=class{constructor(e,t,n){let s=this,r=!1,o=0,l=0,d,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(p){l++,r===!1&&s.onStart!==void 0&&s.onStart(p,o,l),r=!0},this.itemEnd=function(p){o++,s.onProgress!==void 0&&s.onProgress(p,o,l),o===l&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(p){s.onError!==void 0&&s.onError(p)},this.resolveURL=function(p){return d?d(p):p},this.setURLModifier=function(p){return d=p,this},this.addHandler=function(p,g){return c.push(p,g),this},this.removeHandler=function(p){let g=c.indexOf(p);return g!==-1&&c.splice(g,2),this},this.getHandler=function(p){for(let g=0,h=c.length;g<h;g+=2){let u=c[g],x=c[g+1];if(u.global&&(u.lastIndex=0),u.test(p))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},tu=new Vo,Ho=class{constructor(e){this.manager=e!==void 0?e:tu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ho.DEFAULT_MATERIAL_NAME="__DEFAULT";var or=class extends Zt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var gl=new bt,dd=new B,ud=new B,Ml=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.mapType=fn,this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ps,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;dd.setFromMatrixPosition(e.matrixWorld),t.position.copy(dd),ud.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ud),t.updateMatrixWorld(),gl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===ls||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(gl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},eo=new B,to=new zn,Ln=new B,ar=class extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eo,to,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,Ln.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(eo,to,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},hi=new B,hd=new Xe,fd=new Xe,nn=class extends ar{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=yo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(io*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yo*2*Math.atan(Math.tan(io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hi.x,hi.y).multiplyScalar(-e/hi.z),hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hi.x,hi.y).multiplyScalar(-e/hi.z)}getViewSize(e,t){return this.getViewBounds(e,hd,fd),t.subVectors(fd,hd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(io*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let d=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/d,t-=o.offsetY*n/c,s*=o.width/d,n*=o.height/c}let l=this.filmOffset;l!==0&&(r+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var _s=class extends ar{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,l=s+t,d=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,l-=p*this.view.offsetY,d=l-p*this.view.height}this.projectionMatrix.makeOrthographic(r,o,l,d,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},wl=class extends Ml{constructor(){super(new _s(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},lr=class extends or{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new wl}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},cr=class extends or{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var rs=-90,os=1,Go=class extends Zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new nn(rs,os,e,t);s.layers=this.layers,this.add(s);let r=new nn(rs,os,e,t);r.layers=this.layers,this.add(r);let o=new nn(rs,os,e,t);o.layers=this.layers,this.add(o);let l=new nn(rs,os,e,t);l.layers=this.layers,this.add(l);let d=new nn(rs,os,e,t);d.layers=this.layers,this.add(d);let c=new nn(rs,os,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,l,d]=t;for(let c of t)this.remove(c);if(e===En)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===ls)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,l,d,c,p]=this.children,g=e.getRenderTarget(),h=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(n,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),e.setRenderTarget(g,h,u),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},Wo=class extends nn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Jl="\\[\\]\\.:\\/",Rh=new RegExp("["+Jl+"]","g"),Kl="[^"+Jl+"]",Lh="[^"+Jl.replace("\\.","")+"]",Nh=/((?:WC+[\/:])*)/.source.replace("WC",Kl),Uh=/(WCOD+)?/.source.replace("WCOD",Lh),Fh=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Kl),Oh=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Kl),Bh=new RegExp("^"+Nh+Uh+Fh+Oh+"$"),kh=["material","materials","bones","map"],Tl=class{constructor(e,t,n){let s=n||Et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Et=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Rh,"")}static parseTrackName(e){let t=Bh.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);kh.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let l=r[o];if(l.name===t||l.uuid===t)return l;let d=n(l.children);if(d)return d}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ke("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ve("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ve("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let p=0;p<e.length;p++)if(e[p].name===c){c=p;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ve("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ve("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ve("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ve("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Ve("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?l=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let d=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ve("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}d=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(d=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(d=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[d],this.setValue=this.SetterByBindingTypeAndVersioning[d][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Et.Composite=Tl;Et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Et.prototype.GetterByBindingType=[Et.prototype._getValue_direct,Et.prototype._getValue_array,Et.prototype._getValue_arrayElement,Et.prototype._getValue_toArray];Et.prototype.SetterByBindingTypeAndVersioning=[[Et.prototype._setValue_direct,Et.prototype._setValue_direct_setNeedsUpdate,Et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_array,Et.prototype._setValue_array_setNeedsUpdate,Et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_arrayElement,Et.prototype._setValue_arrayElement_setNeedsUpdate,Et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Et.prototype._setValue_fromArray,Et.prototype._setValue_fromArray_setNeedsUpdate,Et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Mx=new Float32Array(1);var pd=new bt,dr=class{constructor(e,t,n=0,s=1/0){this.ray=new ki(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new us,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ve("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pd),this}intersectObject(e,t=!0,n=[]){return El(e,this,n,t),n.sort(md),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)El(e[s],this,n,t);return n.sort(md),n}};function md(i,e){return i.distance-e.distance}function El(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,l=r.length;o<l;o++)El(r[o],e,t,!0)}}var ur=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,ke("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},bs=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var ic=class ic{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};ic.prototype.isMatrix2=!0;var Al=ic;function jl(i,e,t,n){let s=zh(n);switch(t){case Wl:return i*e;case ql:return i*e/s.components*s.byteLength;case jo:return i*e/s.components*s.byteLength;case Ti:return i*e*2/s.components*s.byteLength;case Qo:return i*e*2/s.components*s.byteLength;case Xl:return i*e*3/s.components*s.byteLength;case Sn:return i*e*4/s.components*s.byteLength;case ea:return i*e*4/s.components*s.byteLength;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case xr:case vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case na:case sa:return Math.max(i,16)*Math.max(e,8)/4;case ta:case ia:return Math.max(i,8)*Math.max(e,8)/2;case ra:case oa:case la:case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case aa:case yr:case da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ua:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ha:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case fa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case pa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ga:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case va:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ya:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ba:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Sa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ma:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case wa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ta:case Ea:case Aa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ca:case Ia:return Math.ceil(i/4)*Math.ceil(e/4)*8;case _r:case Pa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function zh(i){switch(i){case fn:case zl:return{byteLength:1,components:1};case Ms:case Vl:case Xn:return{byteLength:2,components:1};case Jo:case Ko:return{byteLength:2,components:4};case In:case Zo:case Pn:return{byteLength:4,components:1};case Hl:case Gl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"184"}}));typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="184");function wu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Hh(i){let e=new WeakMap;function t(l,d){let c=l.array,p=l.usage,g=c.byteLength,h=i.createBuffer();i.bindBuffer(d,h),i.bufferData(d,c,p),l.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:g}}function n(l,d,c){let p=d.array,g=d.updateRanges;if(i.bindBuffer(c,l),g.length===0)i.bufferSubData(c,0,p);else{g.sort((u,x)=>u.start-x.start);let h=0;for(let u=1;u<g.length;u++){let x=g[h],_=g[u];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++h,g[h]=_)}g.length=h+1;for(let u=0,x=g.length;u<x;u++){let _=g[u];i.bufferSubData(c,_.start*p.BYTES_PER_ELEMENT,p,_.start,_.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);let d=e.get(l);d&&(i.deleteBuffer(d.buffer),e.delete(l))}function o(l,d){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){let p=e.get(l);(!p||p.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}let c=e.get(l);if(c===void 0)e.set(l,t(l,d));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,d),c.version=l.version}}return{get:s,remove:r,update:o}}var Gh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$h=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Jh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,jh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ff=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,pf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,_f="gl_FragColor = linearToOutputTexel( gl_FragColor );",bf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,If=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Df=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Rf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Lf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Nf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Ff=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Hf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Xf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,qf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ep=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,np=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ip=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,sp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,op=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,_p=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Mp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ep=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Ap=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Cp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ip=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Up=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Fp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Op=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Wp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Kp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,jp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Qp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,tm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,om=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,am=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,um=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pm=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,mm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ym=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_m=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Mm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,et={alphahash_fragment:Gh,alphahash_pars_fragment:Wh,alphamap_fragment:Xh,alphamap_pars_fragment:qh,alphatest_fragment:Yh,alphatest_pars_fragment:$h,aomap_fragment:Zh,aomap_pars_fragment:Jh,batching_pars_vertex:Kh,batching_vertex:jh,begin_vertex:Qh,beginnormal_vertex:ef,bsdfs:tf,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:of,clipping_planes_pars_vertex:af,clipping_planes_vertex:lf,color_fragment:cf,color_pars_fragment:df,color_pars_vertex:uf,color_vertex:hf,common:ff,cube_uv_reflection_fragment:pf,defaultnormal_vertex:mf,displacementmap_pars_vertex:gf,displacementmap_vertex:xf,emissivemap_fragment:vf,emissivemap_pars_fragment:yf,colorspace_fragment:_f,colorspace_pars_fragment:bf,envmap_fragment:Sf,envmap_common_pars_fragment:Mf,envmap_pars_fragment:wf,envmap_pars_vertex:Tf,envmap_physical_pars_fragment:Ff,envmap_vertex:Ef,fog_vertex:Af,fog_pars_vertex:Cf,fog_fragment:If,fog_pars_fragment:Pf,gradientmap_pars_fragment:Df,lightmap_pars_fragment:Rf,lights_lambert_fragment:Lf,lights_lambert_pars_fragment:Nf,lights_pars_begin:Uf,lights_toon_fragment:Of,lights_toon_pars_fragment:Bf,lights_phong_fragment:kf,lights_phong_pars_fragment:zf,lights_physical_fragment:Vf,lights_physical_pars_fragment:Hf,lights_fragment_begin:Gf,lights_fragment_maps:Wf,lights_fragment_end:Xf,lightprobes_pars_fragment:qf,logdepthbuf_fragment:Yf,logdepthbuf_pars_fragment:$f,logdepthbuf_pars_vertex:Zf,logdepthbuf_vertex:Jf,map_fragment:Kf,map_pars_fragment:jf,map_particle_fragment:Qf,map_particle_pars_fragment:ep,metalnessmap_fragment:tp,metalnessmap_pars_fragment:np,morphinstance_vertex:ip,morphcolor_vertex:sp,morphnormal_vertex:rp,morphtarget_pars_vertex:op,morphtarget_vertex:ap,normal_fragment_begin:lp,normal_fragment_maps:cp,normal_pars_fragment:dp,normal_pars_vertex:up,normal_vertex:hp,normalmap_pars_fragment:fp,clearcoat_normal_fragment_begin:pp,clearcoat_normal_fragment_maps:mp,clearcoat_pars_fragment:gp,iridescence_pars_fragment:xp,opaque_fragment:vp,packing:yp,premultiplied_alpha_fragment:_p,project_vertex:bp,dithering_fragment:Sp,dithering_pars_fragment:Mp,roughnessmap_fragment:wp,roughnessmap_pars_fragment:Tp,shadowmap_pars_fragment:Ep,shadowmap_pars_vertex:Ap,shadowmap_vertex:Cp,shadowmask_pars_fragment:Ip,skinbase_vertex:Pp,skinning_pars_vertex:Dp,skinning_vertex:Rp,skinnormal_vertex:Lp,specularmap_fragment:Np,specularmap_pars_fragment:Up,tonemapping_fragment:Fp,tonemapping_pars_fragment:Op,transmission_fragment:Bp,transmission_pars_fragment:kp,uv_pars_fragment:zp,uv_pars_vertex:Vp,uv_vertex:Hp,worldpos_vertex:Gp,background_vert:Wp,background_frag:Xp,backgroundCube_vert:qp,backgroundCube_frag:Yp,cube_vert:$p,cube_frag:Zp,depth_vert:Jp,depth_frag:Kp,distance_vert:jp,distance_frag:Qp,equirect_vert:em,equirect_frag:tm,linedashed_vert:nm,linedashed_frag:im,meshbasic_vert:sm,meshbasic_frag:rm,meshlambert_vert:om,meshlambert_frag:am,meshmatcap_vert:lm,meshmatcap_frag:cm,meshnormal_vert:dm,meshnormal_frag:um,meshphong_vert:hm,meshphong_frag:fm,meshphysical_vert:pm,meshphysical_frag:mm,meshtoon_vert:gm,meshtoon_frag:xm,points_vert:vm,points_frag:ym,shadow_vert:_m,shadow_frag:bm,sprite_vert:Sm,sprite_frag:Mm},ye={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Yn={basic:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:et.meshbasic_vert,fragmentShader:et.meshbasic_frag},lambert:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)},envMapIntensity:{value:1}}]),vertexShader:et.meshlambert_vert,fragmentShader:et.meshlambert_frag},phong:{uniforms:sn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:et.meshphong_vert,fragmentShader:et.meshphong_frag},standard:{uniforms:sn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag},toon:{uniforms:sn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new Ge(0)}}]),vertexShader:et.meshtoon_vert,fragmentShader:et.meshtoon_frag},matcap:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:et.meshmatcap_vert,fragmentShader:et.meshmatcap_frag},points:{uniforms:sn([ye.points,ye.fog]),vertexShader:et.points_vert,fragmentShader:et.points_frag},dashed:{uniforms:sn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:et.linedashed_vert,fragmentShader:et.linedashed_frag},depth:{uniforms:sn([ye.common,ye.displacementmap]),vertexShader:et.depth_vert,fragmentShader:et.depth_frag},normal:{uniforms:sn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:et.meshnormal_vert,fragmentShader:et.meshnormal_frag},sprite:{uniforms:sn([ye.sprite,ye.fog]),vertexShader:et.sprite_vert,fragmentShader:et.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:et.background_vert,fragmentShader:et.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:et.backgroundCube_vert,fragmentShader:et.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:et.cube_vert,fragmentShader:et.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:et.equirect_vert,fragmentShader:et.equirect_frag},distance:{uniforms:sn([ye.common,ye.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:et.distance_vert,fragmentShader:et.distance_frag},shadow:{uniforms:sn([ye.lights,ye.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:et.shadow_vert,fragmentShader:et.shadow_frag}};Yn.physical={uniforms:sn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:et.meshphysical_vert,fragmentShader:et.meshphysical_frag};var La={r:0,b:0,g:0},wm=new bt,Tu=new $e;Tu.set(-1,0,0,0,1,0,0,0,1);function Tm(i,e,t,n,s,r){let o=new Ge(0),l=s===!0?0:1,d,c,p=null,g=0,h=null;function u(M){let A=M.isScene===!0?M.background:null;if(A&&A.isTexture){let I=M.backgroundBlurriness>0;A=e.get(A,I)}return A}function x(M){let A=!1,I=u(M);I===null?m(o,l):I&&I.isColor&&(m(I,1),A=!0);let D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,r):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||A)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(M,A){let I=u(A);I&&(I.isCubeTexture||I.mapping===fr)?(c===void 0&&(c=new Kt(new vs(1,1,1),new cn({name:"BackgroundCubeMaterial",uniforms:Vi(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(D,S,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=I,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(wm.makeRotationFromEuler(A.backgroundRotation)).transpose(),I.isCubeTexture&&I.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Tu),c.material.toneMapped=ot.getTransfer(I.colorSpace)!==ht,(p!==I||g!==I.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,p=I,g=I.version,h=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):I&&I.isTexture&&(d===void 0&&(d=new Kt(new nr(2,2),new cn({name:"BackgroundMaterial",uniforms:Vi(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(d)),d.material.uniforms.t2D.value=I,d.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,d.material.toneMapped=ot.getTransfer(I.colorSpace)!==ht,I.matrixAutoUpdate===!0&&I.updateMatrix(),d.material.uniforms.uvTransform.value.copy(I.matrix),(p!==I||g!==I.version||h!==i.toneMapping)&&(d.material.needsUpdate=!0,p=I,g=I.version,h=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null))}function m(M,A){M.getRGB(La,Zl(i)),t.buffers.color.setClear(La.r,La.g,La.b,A,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,A=1){o.set(M),l=A,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,m(o,l)},render:x,addToRenderList:_,dispose:f}}function Em(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null),r=s,o=!1;function l(w,F,G,$,O){let H=!1,X=g(w,$,G,F);r!==X&&(r=X,c(r.object)),H=u(w,$,G,O),H&&x(w,$,G,O),O!==null&&e.update(O,i.ELEMENT_ARRAY_BUFFER),(H||o)&&(o=!1,I(w,F,G,$),O!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(O).buffer))}function d(){return i.createVertexArray()}function c(w){return i.bindVertexArray(w)}function p(w){return i.deleteVertexArray(w)}function g(w,F,G,$){let O=$.wireframe===!0,H=n[F.id];H===void 0&&(H={},n[F.id]=H);let X=w.isInstancedMesh===!0?w.id:0,re=H[X];re===void 0&&(re={},H[X]=re);let ce=re[G.id];ce===void 0&&(ce={},re[G.id]=ce);let me=ce[O];return me===void 0&&(me=h(d()),ce[O]=me),me}function h(w){let F=[],G=[],$=[];for(let O=0;O<t;O++)F[O]=0,G[O]=0,$[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:$,object:w,attributes:{},index:null}}function u(w,F,G,$){let O=r.attributes,H=F.attributes,X=0,re=G.getAttributes();for(let ce in re)if(re[ce].location>=0){let we=O[ce],Ce=H[ce];if(Ce===void 0&&(ce==="instanceMatrix"&&w.instanceMatrix&&(Ce=w.instanceMatrix),ce==="instanceColor"&&w.instanceColor&&(Ce=w.instanceColor)),we===void 0||we.attribute!==Ce||Ce&&we.data!==Ce.data)return!0;X++}return r.attributesNum!==X||r.index!==$}function x(w,F,G,$){let O={},H=F.attributes,X=0,re=G.getAttributes();for(let ce in re)if(re[ce].location>=0){let we=H[ce];we===void 0&&(ce==="instanceMatrix"&&w.instanceMatrix&&(we=w.instanceMatrix),ce==="instanceColor"&&w.instanceColor&&(we=w.instanceColor));let Ce={};Ce.attribute=we,we&&we.data&&(Ce.data=we.data),O[ce]=Ce,X++}r.attributes=O,r.attributesNum=X,r.index=$}function _(){let w=r.newAttributes;for(let F=0,G=w.length;F<G;F++)w[F]=0}function m(w){f(w,0)}function f(w,F){let G=r.newAttributes,$=r.enabledAttributes,O=r.attributeDivisors;G[w]=1,$[w]===0&&(i.enableVertexAttribArray(w),$[w]=1),O[w]!==F&&(i.vertexAttribDivisor(w,F),O[w]=F)}function M(){let w=r.newAttributes,F=r.enabledAttributes;for(let G=0,$=F.length;G<$;G++)F[G]!==w[G]&&(i.disableVertexAttribArray(G),F[G]=0)}function A(w,F,G,$,O,H,X){X===!0?i.vertexAttribIPointer(w,F,G,O,H):i.vertexAttribPointer(w,F,G,$,O,H)}function I(w,F,G,$){_();let O=$.attributes,H=G.getAttributes(),X=F.defaultAttributeValues;for(let re in H){let ce=H[re];if(ce.location>=0){let me=O[re];if(me===void 0&&(re==="instanceMatrix"&&w.instanceMatrix&&(me=w.instanceMatrix),re==="instanceColor"&&w.instanceColor&&(me=w.instanceColor)),me!==void 0){let we=me.normalized,Ce=me.itemSize,je=e.get(me);if(je===void 0)continue;let rt=je.buffer,K=je.type,L=je.bytesPerElement,j=K===i.INT||K===i.UNSIGNED_INT||me.gpuType===Zo;if(me.isInterleavedBufferAttribute){let ie=me.data,Ie=ie.stride,Fe=me.offset;if(ie.isInstancedInterleavedBuffer){for(let De=0;De<ce.locationSize;De++)f(ce.location+De,ie.meshPerAttribute);w.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let De=0;De<ce.locationSize;De++)m(ce.location+De);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let De=0;De<ce.locationSize;De++)A(ce.location+De,Ce/ce.locationSize,K,we,Ie*L,(Fe+Ce/ce.locationSize*De)*L,j)}else{if(me.isInstancedBufferAttribute){for(let ie=0;ie<ce.locationSize;ie++)f(ce.location+ie,me.meshPerAttribute);w.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ie=0;ie<ce.locationSize;ie++)m(ce.location+ie);i.bindBuffer(i.ARRAY_BUFFER,rt);for(let ie=0;ie<ce.locationSize;ie++)A(ce.location+ie,Ce/ce.locationSize,K,we,Ce*L,Ce/ce.locationSize*ie*L,j)}}else if(X!==void 0){let we=X[re];if(we!==void 0)switch(we.length){case 2:i.vertexAttrib2fv(ce.location,we);break;case 3:i.vertexAttrib3fv(ce.location,we);break;case 4:i.vertexAttrib4fv(ce.location,we);break;default:i.vertexAttrib1fv(ce.location,we)}}}}M()}function D(){C();for(let w in n){let F=n[w];for(let G in F){let $=F[G];for(let O in $){let H=$[O];for(let X in H)p(H[X].object),delete H[X];delete $[O]}}delete n[w]}}function S(w){if(n[w.id]===void 0)return;let F=n[w.id];for(let G in F){let $=F[G];for(let O in $){let H=$[O];for(let X in H)p(H[X].object),delete H[X];delete $[O]}}delete n[w.id]}function R(w){for(let F in n){let G=n[F];for(let $ in G){let O=G[$];if(O[w.id]===void 0)continue;let H=O[w.id];for(let X in H)p(H[X].object),delete H[X];delete O[w.id]}}}function y(w){for(let F in n){let G=n[F],$=w.isInstancedMesh===!0?w.id:0,O=G[$];if(O!==void 0){for(let H in O){let X=O[H];for(let re in X)p(X[re].object),delete X[re];delete O[H]}delete G[$],Object.keys(G).length===0&&delete n[F]}}}function C(){P(),o=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:C,resetDefaultState:P,dispose:D,releaseStatesOfGeometry:S,releaseStatesOfObject:y,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Am(i,e,t){let n;function s(d){n=d}function r(d,c){i.drawArrays(n,d,c),t.update(c,n,1)}function o(d,c,p){p!==0&&(i.drawArraysInstanced(n,d,c,p),t.update(c,n,p))}function l(d,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,d,0,c,0,p);let h=0;for(let u=0;u<p;u++)h+=c[u];t.update(h,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=l}function Cm(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Sn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(R){let y=R===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Pn&&!y)}function d(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",p=d(c);p!==c&&(ke("WebGLRenderer:",c,"not supported, using",p,"instead."),c=p);let g=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),I=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),S=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:d,textureFormatReadable:o,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:g,reversedDepthBuffer:h,maxTextures:u,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:M,maxVaryings:A,maxFragmentUniforms:I,maxSamples:D,samples:S}}function Im(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Nn,l=new $e,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(g,h){let u=g.length!==0||h||n!==0||s;return s=h,n=g.length,u},this.beginShadows=function(){r=!0,p(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(g,h){t=p(g,h,0)},this.setState=function(g,h,u){let x=g.clippingPlanes,_=g.clipIntersection,m=g.clipShadows,f=i.get(g);if(!s||x===null||x.length===0||r&&!m)r?p(null):c();else{let M=r?0:n,A=M*4,I=f.clippingState||null;d.value=I,I=p(x,h,A,u);for(let D=0;D!==A;++D)I[D]=t[D];f.clippingState=I,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){d.value!==t&&(d.value=t,d.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function p(g,h,u,x){let _=g!==null?g.length:0,m=null;if(_!==0){if(m=d.value,x!==!0||m===null){let f=u+_*4,M=h.matrixWorldInverse;l.getNormalMatrix(M),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,I=u;A!==_;++A,I+=4)o.copy(g[A]).applyMatrix4(M,l),o.normal.toArray(m,I),m[I+3]=o.constant}d.value=m,d.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}var Ei=4,nu=[.125,.215,.35,.446,.526,.582],Hi=20,Pm=256,br=new _s,iu=new Ge,sc=null,rc=0,oc=0,ac=!1,Dm=new B,Ua=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:l=Dm}=r;sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,n,s,d,l),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ou(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ru(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(sc,rc,oc),this._renderer.xr.enabled=ac,e.scissorTest=!1,Ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Si||e.mapping===zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Xn,format:Sn,colorSpace:Vs,depthBuffer:!1},s=su(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=su(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Rm(r)),this._blurMaterial=Nm(r,e,t),this._ggxMaterial=Lm(r,e,t)}return s}_compileMaterial(e){let t=new Kt(new kt,e);this._renderer.compile(t,br)}_sceneToCubeUV(e,t,n,s,r){let d=new nn(90,1,t,n),c=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,h=g.autoClear,u=g.toneMapping;g.getClearColor(iu),g.toneMapping=Cn,g.autoClear=!1,g.state.buffers.depth.getReversed()&&(g.setRenderTarget(s),g.clearDepth(),g.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Kt(new vs,new Hn({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,m=_.material,f=!1,M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,f=!0):(m.color.copy(iu),f=!0);for(let A=0;A<6;A++){let I=A%3;I===0?(d.up.set(0,c[A],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x+p[A],r.y,r.z)):I===1?(d.up.set(0,0,c[A]),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y+p[A],r.z)):(d.up.set(0,c[A],0),d.position.set(r.x,r.y,r.z),d.lookAt(r.x,r.y,r.z+p[A]));let D=this._cubeSize;Ts(s,I*D,A>2?D:0,D,D),g.setRenderTarget(s),f&&g.render(_,d),g.render(e,d)}g.toneMapping=u,g.autoClear=h,e.background=M}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===Si||e.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ou()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ru());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let l=r.uniforms;l.envMap.value=e;let d=this._cubeSize;Ts(t,0,0,3*d,2*d),n.setRenderTarget(t),n.render(o,br)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,l=this._lodMeshes[n];l.material=o;let d=o.uniforms,c=n/(this._lodMeshes.length-1),p=t/(this._lodMeshes.length-1),g=Math.sqrt(c*c-p*p),h=0+c*1.25,u=g*h,{_lodMax:x}=this,_=this._sizeLods[n],m=3*_*(n>x-Ei?n-x+Ei:0),f=4*(this._cubeSize-_);d.envMap.value=e.texture,d.roughness.value=u,d.mipInt.value=x-t,Ts(r,m,f,3*_,2*_),s.setRenderTarget(r),s.render(l,br),d.envMap.value=r.texture,d.roughness.value=0,d.mipInt.value=x-n,Ts(e,m,f,3*_,2*_),s.setRenderTarget(e),s.render(l,br)}_blur(e,t,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,l){let d=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Ve("blur direction must be either latitudinal or longitudinal!");let p=3,g=this._lodMeshes[s];g.material=c;let h=c.uniforms,u=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*u):2*Math.PI/(2*Hi-1),_=r/x,m=isFinite(r)?1+Math.floor(p*_):Hi;m>Hi&&ke(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hi}`);let f=[],M=0;for(let R=0;R<Hi;++R){let y=R/_,C=Math.exp(-y*y/2);f.push(C),R===0?M+=C:R<m&&(M+=2*C)}for(let R=0;R<f.length;R++)f[R]=f[R]/M;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=o==="latitudinal",l&&(h.poleAxis.value=l);let{_lodMax:A}=this;h.dTheta.value=x,h.mipInt.value=A-n;let I=this._sizeLods[s],D=3*I*(s>A-Ei?s-A+Ei:0),S=4*(this._cubeSize-I);Ts(t,D,S,3*I,2*I),d.setRenderTarget(t),d.render(g,br)}};function Rm(i){let e=[],t=[],n=[],s=i,r=i-Ei+1+nu.length;for(let o=0;o<r;o++){let l=Math.pow(2,s);e.push(l);let d=1/l;o>i-Ei?d=nu[o-i+Ei-1]:o===0&&(d=0),t.push(d);let c=1/(l-2),p=-c,g=1+c,h=[p,p,g,p,g,g,p,p,g,g,p,g],u=6,x=6,_=3,m=2,f=1,M=new Float32Array(_*x*u),A=new Float32Array(m*x*u),I=new Float32Array(f*x*u);for(let S=0;S<u;S++){let R=S%3*2/3-1,y=S>2?0:-1,C=[R,y,0,R+2/3,y,0,R+2/3,y+1,0,R,y,0,R+2/3,y+1,0,R,y+1,0];M.set(C,_*x*S),A.set(h,m*x*S);let P=[S,S,S,S,S,S];I.set(P,f*x*S)}let D=new kt;D.setAttribute("position",new Yt(M,_)),D.setAttribute("uv",new Yt(A,m)),D.setAttribute("faceIndex",new Yt(I,f)),n.push(new Kt(D,null)),s>Ei&&s--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function su(i,e,t){let n=new vn(i,e,t);return n.texture.mapping=fr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ts(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Lm(i,e,t){return new cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Pm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ba(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Nm(i,e,t){let n=new Float32Array(Hi),s=new B(0,1,0);return new cn({name:"SphericalGaussianBlur",defines:{n:Hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function ru(){return new cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function ou(){return new cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ba(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Gn,depthTest:!1,depthWrite:!1})}function Ba(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var Fa=class extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ks(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new vs(5,5,5),r=new cn({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:dn,blending:Gn});r.uniforms.tEquirect.value=t;let o=new Kt(s,r),l=t.minFilter;return t.minFilter===Mi&&(t.minFilter=Jt),new Go(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};function Um(i){let e=new WeakMap,t=new WeakMap,n=null;function s(h,u=!1){return h==null?null:u?o(h):r(h)}function r(h){if(h&&h.isTexture){let u=h.mapping;if(u===qo||u===Yo)if(e.has(h)){let x=e.get(h).texture;return l(x,h.mapping)}else{let x=h.image;if(x&&x.height>0){let _=new Fa(x.height);return _.fromEquirectangularTexture(i,h),e.set(h,_),h.addEventListener("dispose",c),l(_.texture,h.mapping)}else return null}}return h}function o(h){if(h&&h.isTexture){let u=h.mapping,x=u===qo||u===Yo,_=u===Si||u===zi;if(x||_){let m=t.get(h),f=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return n===null&&(n=new Ua(i)),m=x?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{let M=h.image;return x&&M&&M.height>0||_&&M&&d(M)?(n===null&&(n=new Ua(i)),m=x?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",p),m.texture):null}}}return h}function l(h,u){return u===qo?h.mapping=Si:u===Yo&&(h.mapping=zi),h}function d(h){let u=0,x=6;for(let _=0;_<x;_++)h[_]!==void 0&&u++;return u===x}function c(h){let u=h.target;u.removeEventListener("dispose",c);let x=e.get(u);x!==void 0&&(e.delete(u),x.dispose())}function p(h){let u=h.target;u.removeEventListener("dispose",p);let x=t.get(u);x!==void 0&&(t.delete(u),x.dispose())}function g(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:g}}function Fm(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&vo("WebGLRenderer: "+n+" extension not supported."),s}}}function Om(i,e,t,n){let s={},r=new WeakMap;function o(g){let h=g.target;h.index!==null&&e.remove(h.index);for(let x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",o),delete s[h.id];let u=r.get(h);u&&(e.remove(u),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function l(g,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,t.memory.geometries++),h}function d(g){let h=g.attributes;for(let u in h)e.update(h[u],i.ARRAY_BUFFER)}function c(g){let h=[],u=g.index,x=g.attributes.position,_=0;if(x===void 0)return;if(u!==null){let M=u.array;_=u.version;for(let A=0,I=M.length;A<I;A+=3){let D=M[A+0],S=M[A+1],R=M[A+2];h.push(D,S,S,R,R,D)}}else{let M=x.array;_=x.version;for(let A=0,I=M.length/3-1;A<I;A+=3){let D=A+0,S=A+1,R=A+2;h.push(D,S,S,R,R,D)}}let m=new(x.count>=65535?$s:Ys)(h,1);m.version=_;let f=r.get(g);f&&e.remove(f),r.set(g,m)}function p(g){let h=r.get(g);if(h){let u=g.index;u!==null&&h.version<u.version&&c(g)}else c(g);return r.get(g)}return{get:l,update:d,getWireframeAttribute:p}}function Bm(i,e,t){let n;function s(g){n=g}let r,o;function l(g){r=g.type,o=g.bytesPerElement}function d(g,h){i.drawElements(n,h,r,g*o),t.update(h,n,1)}function c(g,h,u){u!==0&&(i.drawElementsInstanced(n,h,r,g*o,u),t.update(h,n,u))}function p(g,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,g,0,u);let _=0;for(let m=0;m<u;m++)_+=h[m];t.update(_,n,1)}this.setMode=s,this.setIndex=l,this.render=d,this.renderInstances=c,this.renderMultiDraw=p}function km(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,l){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=l*(r/3);break;case i.LINES:t.lines+=l*(r/2);break;case i.LINE_STRIP:t.lines+=l*(r-1);break;case i.LINE_LOOP:t.lines+=l*r;break;case i.POINTS:t.points+=l*r;break;default:Ve("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function zm(i,e,t){let n=new WeakMap,s=new Dt;function r(o,l,d){let c=o.morphTargetInfluences,p=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,g=p!==void 0?p.length:0,h=n.get(l);if(h===void 0||h.count!==g){let C=function(){R.dispose(),n.delete(l),l.removeEventListener("dispose",C)};h!==void 0&&h.texture.dispose();let u=l.morphAttributes.position!==void 0,x=l.morphAttributes.normal!==void 0,_=l.morphAttributes.color!==void 0,m=l.morphAttributes.position||[],f=l.morphAttributes.normal||[],M=l.morphAttributes.color||[],A=0;u===!0&&(A=1),x===!0&&(A=2),_===!0&&(A=3);let I=l.attributes.position.count*A,D=1;I>e.maxTextureSize&&(D=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);let S=new Float32Array(I*D*4*g),R=new Xs(S,I,D,g);R.type=Pn,R.needsUpdate=!0;let y=A*4;for(let P=0;P<g;P++){let w=m[P],F=f[P],G=M[P],$=I*D*4*P;for(let O=0;O<w.count;O++){let H=O*y;u===!0&&(s.fromBufferAttribute(w,O),S[$+H+0]=s.x,S[$+H+1]=s.y,S[$+H+2]=s.z,S[$+H+3]=0),x===!0&&(s.fromBufferAttribute(F,O),S[$+H+4]=s.x,S[$+H+5]=s.y,S[$+H+6]=s.z,S[$+H+7]=0),_===!0&&(s.fromBufferAttribute(G,O),S[$+H+8]=s.x,S[$+H+9]=s.y,S[$+H+10]=s.z,S[$+H+11]=G.itemSize===4?s.w:1)}}h={count:g,texture:R,size:new Xe(I,D)},n.set(l,h),l.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)d.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let u=0;for(let _=0;_<c.length;_++)u+=c[_];let x=l.morphTargetsRelative?1:1-u;d.getUniforms().setValue(i,"morphTargetBaseInfluence",x),d.getUniforms().setValue(i,"morphTargetInfluences",c)}d.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Vm(i,e,t,n,s){let r=new WeakMap;function o(c){let p=s.render.frame,g=c.geometry,h=e.get(c,g);if(r.get(h)!==p&&(e.update(h),r.set(h,p)),c.isInstancedMesh&&(c.hasEventListener("dispose",d)===!1&&c.addEventListener("dispose",d),r.get(c)!==p&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,p))),c.isSkinnedMesh){let u=c.skeleton;r.get(u)!==p&&(u.update(),r.set(u,p))}return h}function l(){r=new WeakMap}function d(c){let p=c.target;p.removeEventListener("dispose",d),n.releaseStatesOfObject(p),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:o,dispose:l}}var Hm={[Rl]:"LINEAR_TONE_MAPPING",[Ll]:"REINHARD_TONE_MAPPING",[Nl]:"CINEON_TONE_MAPPING",[Ul]:"ACES_FILMIC_TONE_MAPPING",[Ol]:"AGX_TONE_MAPPING",[Bl]:"NEUTRAL_TONE_MAPPING",[Fl]:"CUSTOM_TONE_MAPPING"};function Gm(i,e,t,n,s){let r=new vn(e,t,{type:i,depthBuffer:n,stencilBuffer:s,depthTexture:n?new ni(e,t):void 0}),o=new vn(e,t,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new kt;l.setAttribute("position",new Ct([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ct([0,2,0,0,2,0],2));let d=new Po({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Kt(l,d),p=new _s(-1,1,1,-1,0,1),g=null,h=null,u=!1,x,_=null,m=[],f=!1;this.setSize=function(M,A){r.setSize(M,A),o.setSize(M,A);for(let I=0;I<m.length;I++){let D=m[I];D.setSize&&D.setSize(M,A)}},this.setEffects=function(M){m=M,f=m.length>0&&m[0].isRenderPass===!0;let A=r.width,I=r.height;for(let D=0;D<m.length;D++){let S=m[D];S.setSize&&S.setSize(A,I)}},this.begin=function(M,A){if(u||M.toneMapping===Cn&&m.length===0)return!1;if(_=A,A!==null){let I=A.width,D=A.height;(r.width!==I||r.height!==D)&&this.setSize(I,D)}return f===!1&&M.setRenderTarget(r),x=M.toneMapping,M.toneMapping=Cn,!0},this.hasRenderPass=function(){return f},this.end=function(M,A){M.toneMapping=x,u=!0;let I=r,D=o;for(let S=0;S<m.length;S++){let R=m[S];if(R.enabled!==!1&&(R.render(M,D,I,A),R.needsSwap!==!1)){let y=I;I=D,D=y}}if(g!==M.outputColorSpace||h!==M.toneMapping){g=M.outputColorSpace,h=M.toneMapping,d.defines={},ot.getTransfer(g)===ht&&(d.defines.SRGB_TRANSFER="");let S=Hm[h];S&&(d.defines[S]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=I.texture,M.setRenderTarget(_),M.render(c,p),_=null,u=!1},this.isCompositing=function(){return u},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),d.dispose()}}var Eu=new ln,dc=new ni(1,1),Au=new Xs,Cu=new So,Iu=new Ks,au=[],lu=[],cu=new Float32Array(16),du=new Float32Array(9),uu=new Float32Array(4);function As(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=au[s];if(r===void 0&&(r=new Float32Array(s),au[s]=r),e!==0){n.toArray(r,0);for(let o=1,l=0;o!==e;++o)l+=t,i[o].toArray(r,l)}return r}function Wt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ka(i,e){let t=lu[e];t===void 0&&(t=new Int32Array(e),lu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Wm(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Xm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2fv(this.addr,e),Xt(t,e)}}function qm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Wt(t,e))return;i.uniform3fv(this.addr,e),Xt(t,e)}}function Ym(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4fv(this.addr,e),Xt(t,e)}}function $m(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;uu.set(n),i.uniformMatrix2fv(this.addr,!1,uu),Xt(t,n)}}function Zm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;du.set(n),i.uniformMatrix3fv(this.addr,!1,du),Xt(t,n)}}function Jm(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(Wt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Xt(t,e)}else{if(Wt(t,n))return;cu.set(n),i.uniformMatrix4fv(this.addr,!1,cu),Xt(t,n)}}function Km(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function jm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2iv(this.addr,e),Xt(t,e)}}function Qm(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3iv(this.addr,e),Xt(t,e)}}function eg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4iv(this.addr,e),Xt(t,e)}}function tg(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ng(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Wt(t,e))return;i.uniform2uiv(this.addr,e),Xt(t,e)}}function ig(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Wt(t,e))return;i.uniform3uiv(this.addr,e),Xt(t,e)}}function sg(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Wt(t,e))return;i.uniform4uiv(this.addr,e),Xt(t,e)}}function rg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(dc.compareFunction=t.isReversedDepthBuffer()?Ra:Da,r=dc):r=Eu,t.setTexture2D(e||r,s)}function og(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cu,s)}function ag(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Iu,s)}function lg(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Au,s)}function cg(i){switch(i){case 5126:return Wm;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return $m;case 35675:return Zm;case 35676:return Jm;case 5124:case 35670:return Km;case 35667:case 35671:return jm;case 35668:case 35672:return Qm;case 35669:case 35673:return eg;case 5125:return tg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return og;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return lg}}function dg(i,e){i.uniform1fv(this.addr,e)}function ug(i,e){let t=As(e,this.size,2);i.uniform2fv(this.addr,t)}function hg(i,e){let t=As(e,this.size,3);i.uniform3fv(this.addr,t)}function fg(i,e){let t=As(e,this.size,4);i.uniform4fv(this.addr,t)}function pg(i,e){let t=As(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function mg(i,e){let t=As(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function gg(i,e){let t=As(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function xg(i,e){i.uniform1iv(this.addr,e)}function vg(i,e){i.uniform2iv(this.addr,e)}function yg(i,e){i.uniform3iv(this.addr,e)}function _g(i,e){i.uniform4iv(this.addr,e)}function bg(i,e){i.uniform1uiv(this.addr,e)}function Sg(i,e){i.uniform2uiv(this.addr,e)}function Mg(i,e){i.uniform3uiv(this.addr,e)}function wg(i,e){i.uniform4uiv(this.addr,e)}function Tg(i,e,t){let n=this.cache,s=e.length,r=ka(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=dc:o=Eu;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||o,r[l])}function Eg(i,e,t){let n=this.cache,s=e.length,r=ka(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Cu,r[o])}function Ag(i,e,t){let n=this.cache,s=e.length,r=ka(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Iu,r[o])}function Cg(i,e,t){let n=this.cache,s=e.length,r=ka(t,s);Wt(n,r)||(i.uniform1iv(this.addr,r),Xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Au,r[o])}function Ig(i){switch(i){case 5126:return dg;case 35664:return ug;case 35665:return hg;case 35666:return fg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return xg;case 35667:case 35671:return vg;case 35668:case 35672:return yg;case 35669:case 35673:return _g;case 5125:return bg;case 36294:return Sg;case 36295:return Mg;case 36296:return wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Tg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Cg}}var uc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cg(t.type)}},hc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ig(t.type)}},fc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let l=s[r];l.setValue(e,t[l.id],n)}}},lc=/(\w+)(\])?(\[|\.)?/g;function hu(i,e){i.seq.push(e),i.map[e.id]=e}function Pg(i,e,t){let n=i.name,s=n.length;for(lc.lastIndex=0;;){let r=lc.exec(n),o=lc.lastIndex,l=r[1],d=r[2]==="]",c=r[3];if(d&&(l=l|0),c===void 0||c==="["&&o+2===s){hu(t,c===void 0?new uc(l,i,e):new hc(l,i,e));break}else{let g=t.map[l];g===void 0&&(g=new fc(l),hu(t,g)),t=g}}}var Es=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let l=e.getActiveUniform(t,o),d=e.getUniformLocation(t,l.name);Pg(l,d,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let l=t[r],d=n[l.id];d.needsUpdate!==!1&&l.setValue(e,d.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};function fu(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var Dg=37297,Rg=0;function Lg(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let l=o+1;n.push(`${l===e?">":" "} ${l}: ${t[o]}`)}return n.join(`
`)}var pu=new $e;function Ng(i){ot._getMatrix(pu,ot.workingColorSpace,i);let e=`mat3( ${pu.elements.map(t=>t.toFixed(4))} )`;switch(ot.getTransfer(i)){case Hs:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function mu(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let l=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Lg(i.getShaderSource(e),l)}else return r}function Ug(i,e){let t=Ng(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Fg={[Rl]:"Linear",[Ll]:"Reinhard",[Nl]:"Cineon",[Ul]:"ACESFilmic",[Ol]:"AgX",[Bl]:"Neutral",[Fl]:"Custom"};function Og(i,e){let t=Fg[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Na=new B;function Bg(){ot.getLuminanceCoefficients(Na);let i=Na.x.toFixed(4),e=Na.y.toFixed(4),t=Na.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function zg(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Vg(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,l=1;r.type===i.FLOAT_MAT2&&(l=2),r.type===i.FLOAT_MAT3&&(l=3),r.type===i.FLOAT_MAT4&&(l=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:l}}return t}function Mr(i){return i!==""}function gu(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function xu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function pc(i){return i.replace(Hg,Wg)}var Gg=new Map;function Wg(i,e){let t=et[e];if(t===void 0){let n=Gg.get(e);if(n!==void 0)t=et[n],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return pc(t)}var Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vu(i){return i.replace(Xg,qg)}function qg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function yu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Yg={[hr]:"SHADOWMAP_TYPE_PCF",[Ss]:"SHADOWMAP_TYPE_VSM"};function $g(i){return Yg[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Zg={[Si]:"ENVMAP_TYPE_CUBE",[zi]:"ENVMAP_TYPE_CUBE",[fr]:"ENVMAP_TYPE_CUBE_UV"};function Jg(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Zg[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Kg={[zi]:"ENVMAP_MODE_REFRACTION"};function jg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Kg[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Qg={[Dl]:"ENVMAP_BLENDING_MULTIPLY",[Od]:"ENVMAP_BLENDING_MIX",[Bd]:"ENVMAP_BLENDING_ADD"};function e0(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Qg[i.combine]||"ENVMAP_BLENDING_NONE"}function t0(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function n0(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,l=t.fragmentShader,d=$g(t),c=Jg(t),p=jg(t),g=e0(t),h=t0(t),u=kg(t),x=zg(r),_=s.createProgram(),m,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Mr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Mr).join(`
`),f.length>0&&(f+=`
`)):(m=[yu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),f=[yu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?et.tonemapping_pars_fragment:"",t.toneMapping!==Cn?Og("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",et.colorspace_pars_fragment,Ug("linearToOutputTexel",t.outputColorSpace),Bg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Mr).join(`
`)),o=pc(o),o=gu(o,t),o=xu(o,t),l=pc(l),l=gu(l,t),l=xu(l,t),o=vu(o),l=vu(l),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===$l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===$l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let A=M+m+o,I=M+f+l,D=fu(s,s.VERTEX_SHADER,A),S=fu(s,s.FRAGMENT_SHADER,I);s.attachShader(_,D),s.attachShader(_,S),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(w){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(_)||"",G=s.getShaderInfoLog(D)||"",$=s.getShaderInfoLog(S)||"",O=F.trim(),H=G.trim(),X=$.trim(),re=!0,ce=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(re=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,D,S);else{let me=mu(s,D,"vertex"),we=mu(s,S,"fragment");Ve("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+O+`
`+me+`
`+we)}else O!==""?ke("WebGLProgram: Program Info Log:",O):(H===""||X==="")&&(ce=!1);ce&&(w.diagnostics={runnable:re,programLog:O,vertexShader:{log:H,prefix:m},fragmentShader:{log:X,prefix:f}})}s.deleteShader(D),s.deleteShader(S),y=new Es(s,_),C=Vg(s,_)}let y;this.getUniforms=function(){return y===void 0&&R(this),y};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,Dg)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=D,this.fragmentShader=S,this}var i0=0,mc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new gc(e),t.set(e,n)),n}},gc=class{constructor(e){this.id=i0++,this.code=e,this.usedTimes=0}};function s0(i){return i===Ti||i===yr||i===_r}function r0(i,e,t,n,s,r){let o=new us,l=new mc,d=new Set,c=[],p=new Map,g=n.logarithmicDepthBuffer,h=n.precision,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return d.add(y),y===0?"uv":`uv${y}`}function _(y,C,P,w,F,G){let $=w.fog,O=F.geometry,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?w.environment:null,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,re=e.get(y.envMap||H,X),ce=re&&re.mapping===fr?re.image.height:null,me=u[y.type];y.precision!==null&&(h=n.getMaxPrecision(y.precision),h!==y.precision&&ke("WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));let we=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ce=we!==void 0?we.length:0,je=0;O.morphAttributes.position!==void 0&&(je=1),O.morphAttributes.normal!==void 0&&(je=2),O.morphAttributes.color!==void 0&&(je=3);let rt,K,L,j;if(me){let Je=Yn[me];rt=Je.vertexShader,K=Je.fragmentShader}else rt=y.vertexShader,K=y.fragmentShader,l.update(y),L=l.getVertexShaderID(y),j=l.getFragmentShaderID(y);let ie=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),Fe=F.isInstancedMesh===!0,De=F.isBatchedMesh===!0,We=!!y.map,ge=!!y.matcap,le=!!re,oe=!!y.aoMap,be=!!y.lightMap,Ye=!!y.bumpMap,Ze=!!y.normalMap,ft=!!y.displacementMap,N=!!y.emissiveMap,at=!!y.metalnessMap,ze=!!y.roughnessMap,Le=y.anisotropy>0,Y=y.clearcoat>0,Te=y.dispersion>0,T=y.iridescence>0,v=y.sheen>0,k=y.transmission>0,V=Le&&!!y.anisotropyMap,Q=Y&&!!y.clearcoatMap,se=Y&&!!y.clearcoatNormalMap,te=Y&&!!y.clearcoatRoughnessMap,J=T&&!!y.iridescenceMap,ee=T&&!!y.iridescenceThicknessMap,pe=v&&!!y.sheenColorMap,xe=v&&!!y.sheenRoughnessMap,ue=!!y.specularMap,de=!!y.specularColorMap,Pe=!!y.specularIntensityMap,qe=k&&!!y.transmissionMap,lt=k&&!!y.thicknessMap,U=!!y.gradientMap,fe=!!y.alphaMap,ne=y.alphaTest>0,Se=!!y.alphaHash,ve=!!y.extensions,ae=Cn;y.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(ae=i.toneMapping);let Ne={shaderID:me,shaderType:y.type,shaderName:y.name,vertexShader:rt,fragmentShader:K,defines:y.defines,customVertexShaderID:L,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:De,batchingColor:De&&F._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&F.instanceColor!==null,instancingMorph:Fe&&F.morphTexture!==null,outputColorSpace:ie===null?i.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:ot.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:We,matcap:ge,envMap:le,envMapMode:le&&re.mapping,envMapCubeUVHeight:ce,aoMap:oe,lightMap:be,bumpMap:Ye,normalMap:Ze,displacementMap:ft,emissiveMap:N,normalMapObjectSpace:Ze&&y.normalMapType===Vd,normalMapTangentSpace:Ze&&y.normalMapType===Yl,packedNormalMap:Ze&&y.normalMapType===Yl&&s0(y.normalMap.format),metalnessMap:at,roughnessMap:ze,anisotropy:Le,anisotropyMap:V,clearcoat:Y,clearcoatMap:Q,clearcoatNormalMap:se,clearcoatRoughnessMap:te,dispersion:Te,iridescence:T,iridescenceMap:J,iridescenceThicknessMap:ee,sheen:v,sheenColorMap:pe,sheenRoughnessMap:xe,specularMap:ue,specularColorMap:de,specularIntensityMap:Pe,transmission:k,transmissionMap:qe,thicknessMap:lt,gradientMap:U,opaque:y.transparent===!1&&y.blending===Fi&&y.alphaToCoverage===!1,alphaMap:fe,alphaTest:ne,alphaHash:Se,combine:y.combine,mapUv:We&&x(y.map.channel),aoMapUv:oe&&x(y.aoMap.channel),lightMapUv:be&&x(y.lightMap.channel),bumpMapUv:Ye&&x(y.bumpMap.channel),normalMapUv:Ze&&x(y.normalMap.channel),displacementMapUv:ft&&x(y.displacementMap.channel),emissiveMapUv:N&&x(y.emissiveMap.channel),metalnessMapUv:at&&x(y.metalnessMap.channel),roughnessMapUv:ze&&x(y.roughnessMap.channel),anisotropyMapUv:V&&x(y.anisotropyMap.channel),clearcoatMapUv:Q&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:se&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:ee&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:pe&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:xe&&x(y.sheenRoughnessMap.channel),specularMapUv:ue&&x(y.specularMap.channel),specularColorMapUv:de&&x(y.specularColorMap.channel),specularIntensityMapUv:Pe&&x(y.specularIntensityMap.channel),transmissionMapUv:qe&&x(y.transmissionMap.channel),thicknessMapUv:lt&&x(y.thicknessMap.channel),alphaMapUv:fe&&x(y.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ze||Le),vertexNormals:!!O.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!O.attributes.uv&&(We||fe),fog:!!$,useFog:y.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||O.attributes.normal===void 0&&Ze===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:Ie,skinning:F.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Ce,morphTextureStride:je,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:We&&y.map.isVideoTexture===!0&&ot.getTransfer(y.map.colorSpace)===ht,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&ot.getTransfer(y.emissiveMap.colorSpace)===ht,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===hn,flipSided:y.side===dn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ne.vertexUv1s=d.has(1),Ne.vertexUv2s=d.has(2),Ne.vertexUv3s=d.has(3),d.clear(),Ne}function m(y){let C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(let P in y.defines)C.push(P),C.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(f(C,y),M(C,y),C.push(i.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function f(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function M(y,C){o.disableAll(),C.instancing&&o.enable(0),C.instancingColor&&o.enable(1),C.instancingMorph&&o.enable(2),C.matcap&&o.enable(3),C.envMap&&o.enable(4),C.normalMapObjectSpace&&o.enable(5),C.normalMapTangentSpace&&o.enable(6),C.clearcoat&&o.enable(7),C.iridescence&&o.enable(8),C.alphaTest&&o.enable(9),C.vertexColors&&o.enable(10),C.vertexAlphas&&o.enable(11),C.vertexUv1s&&o.enable(12),C.vertexUv2s&&o.enable(13),C.vertexUv3s&&o.enable(14),C.vertexTangents&&o.enable(15),C.anisotropy&&o.enable(16),C.alphaHash&&o.enable(17),C.batching&&o.enable(18),C.dispersion&&o.enable(19),C.batchingColor&&o.enable(20),C.gradientMap&&o.enable(21),C.packedNormalMap&&o.enable(22),C.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),C.fog&&o.enable(0),C.useFog&&o.enable(1),C.flatShading&&o.enable(2),C.logarithmicDepthBuffer&&o.enable(3),C.reversedDepthBuffer&&o.enable(4),C.skinning&&o.enable(5),C.morphTargets&&o.enable(6),C.morphNormals&&o.enable(7),C.morphColors&&o.enable(8),C.premultipliedAlpha&&o.enable(9),C.shadowMapEnabled&&o.enable(10),C.doubleSided&&o.enable(11),C.flipSided&&o.enable(12),C.useDepthPacking&&o.enable(13),C.dithering&&o.enable(14),C.transmission&&o.enable(15),C.sheen&&o.enable(16),C.opaque&&o.enable(17),C.pointsUvs&&o.enable(18),C.decodeVideoTexture&&o.enable(19),C.decodeVideoTextureEmissive&&o.enable(20),C.alphaToCoverage&&o.enable(21),C.numLightProbeGrids>0&&o.enable(22),y.push(o.mask)}function A(y){let C=u[y.type],P;if(C){let w=Yn[C];P=eu.clone(w.uniforms)}else P=y.uniforms;return P}function I(y,C){let P=p.get(C);return P!==void 0?++P.usedTimes:(P=new n0(i,C,y,s),c.push(P),p.set(C,P)),P}function D(y){if(--y.usedTimes===0){let C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),p.delete(y.cacheKey),y.destroy()}}function S(y){l.remove(y)}function R(){l.dispose()}return{getParameters:_,getProgramCacheKey:m,getUniforms:A,acquireProgram:I,releaseProgram:D,releaseShaderCache:S,programs:c,dispose:R}}function o0(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let l=i.get(o);return l===void 0&&(l={},i.set(o,l)),l}function n(o){i.delete(o)}function s(o,l,d){i.get(o)[l]=d}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function a0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function _u(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(h){let u=0;return h.isInstancedMesh&&(u+=2),h.isSkinnedMesh&&(u+=1),u}function l(h,u,x,_,m,f){let M=i[e];return M===void 0?(M={id:h.id,object:h,geometry:u,material:x,materialVariant:o(h),groupOrder:_,renderOrder:h.renderOrder,z:m,group:f},i[e]=M):(M.id=h.id,M.object=h,M.geometry=u,M.material=x,M.materialVariant=o(h),M.groupOrder=_,M.renderOrder=h.renderOrder,M.z=m,M.group=f),e++,M}function d(h,u,x,_,m,f){let M=l(h,u,x,_,m,f);x.transmission>0?n.push(M):x.transparent===!0?s.push(M):t.push(M)}function c(h,u,x,_,m,f){let M=l(h,u,x,_,m,f);x.transmission>0?n.unshift(M):x.transparent===!0?s.unshift(M):t.unshift(M)}function p(h,u){t.length>1&&t.sort(h||a0),n.length>1&&n.sort(u||_u),s.length>1&&s.sort(u||_u)}function g(){for(let h=e,u=i.length;h<u;h++){let x=i[h];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:d,unshift:c,finish:g,sort:p}}function l0(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new bu,i.set(n,[o])):s>=r.length?(o=new bu,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function c0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new Ge};break;case"SpotLight":t={position:new B,direction:new B,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function d0(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var u0=0;function h0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function f0(i){let e=new c0,t=d0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let s=new B,r=new bt,o=new bt;function l(c){let p=0,g=0,h=0;for(let C=0;C<9;C++)n.probe[C].set(0,0,0);let u=0,x=0,_=0,m=0,f=0,M=0,A=0,I=0,D=0,S=0,R=0;c.sort(h0);for(let C=0,P=c.length;C<P;C++){let w=c[C],F=w.color,G=w.intensity,$=w.distance,O=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Ti?O=w.shadow.map.texture:O=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)p+=F.r*G,g+=F.g*G,h+=F.b*G;else if(w.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(w.sh.coefficients[H],G);R++}else if(w.isDirectionalLight){let H=e.get(w);if(H.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){let X=w.shadow,re=t.get(w);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,n.directionalShadow[u]=re,n.directionalShadowMap[u]=O,n.directionalShadowMatrix[u]=w.shadow.matrix,M++}n.directional[u]=H,u++}else if(w.isSpotLight){let H=e.get(w);H.position.setFromMatrixPosition(w.matrixWorld),H.color.copy(F).multiplyScalar(G),H.distance=$,H.coneCos=Math.cos(w.angle),H.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),H.decay=w.decay,n.spot[_]=H;let X=w.shadow;if(w.map&&(n.spotLightMap[D]=w.map,D++,X.updateMatrices(w),w.castShadow&&S++),n.spotLightMatrix[_]=X.matrix,w.castShadow){let re=t.get(w);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,n.spotShadow[_]=re,n.spotShadowMap[_]=O,I++}_++}else if(w.isRectAreaLight){let H=e.get(w);H.color.copy(F).multiplyScalar(G),H.halfWidth.set(w.width*.5,0,0),H.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=H,m++}else if(w.isPointLight){let H=e.get(w);if(H.color.copy(w.color).multiplyScalar(w.intensity),H.distance=w.distance,H.decay=w.decay,w.castShadow){let X=w.shadow,re=t.get(w);re.shadowIntensity=X.intensity,re.shadowBias=X.bias,re.shadowNormalBias=X.normalBias,re.shadowRadius=X.radius,re.shadowMapSize=X.mapSize,re.shadowCameraNear=X.camera.near,re.shadowCameraFar=X.camera.far,n.pointShadow[x]=re,n.pointShadowMap[x]=O,n.pointShadowMatrix[x]=w.shadow.matrix,A++}n.point[x]=H,x++}else if(w.isHemisphereLight){let H=e.get(w);H.skyColor.copy(w.color).multiplyScalar(G),H.groundColor.copy(w.groundColor).multiplyScalar(G),n.hemi[f]=H,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=g,n.ambient[2]=h;let y=n.hash;(y.directionalLength!==u||y.pointLength!==x||y.spotLength!==_||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==M||y.numPointShadows!==A||y.numSpotShadows!==I||y.numSpotMaps!==D||y.numLightProbes!==R)&&(n.directional.length=u,n.spot.length=_,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=I+D-S,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=R,y.directionalLength=u,y.pointLength=x,y.spotLength=_,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=M,y.numPointShadows=A,y.numSpotShadows=I,y.numSpotMaps=D,y.numLightProbes=R,n.version=u0++)}function d(c,p){let g=0,h=0,u=0,x=0,_=0,m=p.matrixWorldInverse;for(let f=0,M=c.length;f<M;f++){let A=c[f];if(A.isDirectionalLight){let I=n.directional[g];I.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(m),g++}else if(A.isSpotLight){let I=n.spot[u];I.position.setFromMatrixPosition(A.matrixWorld),I.position.applyMatrix4(m),I.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(m),u++}else if(A.isRectAreaLight){let I=n.rectArea[x];I.position.setFromMatrixPosition(A.matrixWorld),I.position.applyMatrix4(m),o.identity(),r.copy(A.matrixWorld),r.premultiply(m),o.extractRotation(r),I.halfWidth.set(A.width*.5,0,0),I.halfHeight.set(0,A.height*.5,0),I.halfWidth.applyMatrix4(o),I.halfHeight.applyMatrix4(o),x++}else if(A.isPointLight){let I=n.point[h];I.position.setFromMatrixPosition(A.matrixWorld),I.position.applyMatrix4(m),h++}else if(A.isHemisphereLight){let I=n.hemi[_];I.direction.setFromMatrixPosition(A.matrixWorld),I.direction.transformDirection(m),_++}}}return{setup:l,setupView:d,state:n}}function Su(i){let e=new f0(i),t=[],n=[],s=[];function r(h){g.camera=h,t.length=0,n.length=0,s.length=0}function o(h){t.push(h)}function l(h){n.push(h)}function d(h){s.push(h)}function c(){e.setup(t)}function p(h){e.setupView(t,h)}let g={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:g,setupLights:c,setupLightsView:p,pushLight:o,pushShadow:l,pushLightProbeGrid:d}}function p0(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),l;return o===void 0?(l=new Su(i),e.set(s,[l])):r>=o.length?(l=new Su(i),o.push(l)):l=o[r],l}function n(){e=new WeakMap}return{get:t,dispose:n}}var m0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,x0=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],v0=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],Mu=new bt,Sr=new B,cc=new B;function y0(i,e,t){let n=new ps,s=new Xe,r=new Xe,o=new Dt,l=new Do,d=new Ro,c={},p=t.maxTextureSize,g={[An]:dn,[dn]:An,[hn]:hn},h=new cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:m0,fragmentShader:g0}),u=h.clone();u.defines.HORIZONTAL_PASS=1;let x=new kt;x.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Kt(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hr;let f=this.type;this.render=function(S,R,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;this.type===vd&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=hr);let C=i.getRenderTarget(),P=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Gn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let G=f!==this.type;G&&R.traverse(function($){$.material&&(Array.isArray($.material)?$.material.forEach(O=>O.needsUpdate=!0):$.material.needsUpdate=!0)});for(let $=0,O=S.length;$<O;$++){let H=S[$],X=H.shadow;if(X===void 0){ke("WebGLShadowMap:",H,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let re=X.getFrameExtents();s.multiply(re),r.copy(X.mapSize),(s.x>p||s.y>p)&&(s.x>p&&(r.x=Math.floor(p/re.x),s.x=r.x*re.x,X.mapSize.x=r.x),s.y>p&&(r.y=Math.floor(p/re.y),s.y=r.y*re.y,X.mapSize.y=r.y));let ce=i.state.buffers.depth.getReversed();if(X.camera._reversedDepth=ce,X.map===null||G===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Ss){if(H.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new vn(s.x,s.y,{format:Ti,type:Xn,minFilter:Jt,magFilter:Jt,generateMipmaps:!1}),X.map.texture.name=H.name+".shadowMap",X.map.depthTexture=new ni(s.x,s.y,Pn),X.map.depthTexture.name=H.name+".shadowMapDepth",X.map.depthTexture.format=Bn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=$t,X.map.depthTexture.magFilter=$t}else H.isPointLight?(X.map=new Fa(s.x),X.map.depthTexture=new Co(s.x,In)):(X.map=new vn(s.x,s.y),X.map.depthTexture=new ni(s.x,s.y,In)),X.map.depthTexture.name=H.name+".shadowMap",X.map.depthTexture.format=Bn,this.type===hr?(X.map.depthTexture.compareFunction=ce?Ra:Da,X.map.depthTexture.minFilter=Jt,X.map.depthTexture.magFilter=Jt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=$t,X.map.depthTexture.magFilter=$t);X.camera.updateProjectionMatrix()}let me=X.map.isWebGLCubeRenderTarget?6:1;for(let we=0;we<me;we++){if(X.map.isWebGLCubeRenderTarget)i.setRenderTarget(X.map,we),i.clear();else{we===0&&(i.setRenderTarget(X.map),i.clear());let Ce=X.getViewport(we);o.set(r.x*Ce.x,r.y*Ce.y,r.x*Ce.z,r.y*Ce.w),F.viewport(o)}if(H.isPointLight){let Ce=X.camera,je=X.matrix,rt=H.distance||Ce.far;rt!==Ce.far&&(Ce.far=rt,Ce.updateProjectionMatrix()),Sr.setFromMatrixPosition(H.matrixWorld),Ce.position.copy(Sr),cc.copy(Ce.position),cc.add(x0[we]),Ce.up.copy(v0[we]),Ce.lookAt(cc),Ce.updateMatrixWorld(),je.makeTranslation(-Sr.x,-Sr.y,-Sr.z),Mu.multiplyMatrices(Ce.projectionMatrix,Ce.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Mu,Ce.coordinateSystem,Ce.reversedDepth)}else X.updateMatrices(H);n=X.getFrustum(),I(R,y,X.camera,H,this.type)}X.isPointLightShadow!==!0&&this.type===Ss&&M(X,y),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(C,P,w)};function M(S,R){let y=e.update(_);h.defines.VSM_SAMPLES!==S.blurSamples&&(h.defines.VSM_SAMPLES=S.blurSamples,u.defines.VSM_SAMPLES=S.blurSamples,h.needsUpdate=!0,u.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new vn(s.x,s.y,{format:Ti,type:Xn})),h.uniforms.shadow_pass.value=S.map.depthTexture,h.uniforms.resolution.value=S.mapSize,h.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(R,null,y,h,_,null),u.uniforms.shadow_pass.value=S.mapPass.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(R,null,y,u,_,null)}function A(S,R,y,C){let P=null,w=y.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(w!==void 0)P=w;else if(P=y.isPointLight===!0?d:l,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let F=P.uuid,G=R.uuid,$=c[F];$===void 0&&($={},c[F]=$);let O=$[G];O===void 0&&(O=P.clone(),$[G]=O,R.addEventListener("dispose",D)),P=O}if(P.visible=R.visible,P.wireframe=R.wireframe,C===Ss?P.side=R.shadowSide!==null?R.shadowSide:R.side:P.side=R.shadowSide!==null?R.shadowSide:g[R.side],P.alphaMap=R.alphaMap,P.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,P.map=R.map,P.clipShadows=R.clipShadows,P.clippingPlanes=R.clippingPlanes,P.clipIntersection=R.clipIntersection,P.displacementMap=R.displacementMap,P.displacementScale=R.displacementScale,P.displacementBias=R.displacementBias,P.wireframeLinewidth=R.wireframeLinewidth,P.linewidth=R.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let F=i.properties.get(P);F.light=y}return P}function I(S,R,y,C,P){if(S.visible===!1)return;if(S.layers.test(R.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&P===Ss)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,S.matrixWorld);let G=e.update(S),$=S.material;if(Array.isArray($)){let O=G.groups;for(let H=0,X=O.length;H<X;H++){let re=O[H],ce=$[re.materialIndex];if(ce&&ce.visible){let me=A(S,ce,C,P);S.onBeforeShadow(i,S,R,y,G,me,re),i.renderBufferDirect(y,null,G,me,S,re),S.onAfterShadow(i,S,R,y,G,me,re)}}}else if($.visible){let O=A(S,$,C,P);S.onBeforeShadow(i,S,R,y,G,O,null),i.renderBufferDirect(y,null,G,O,S,null),S.onAfterShadow(i,S,R,y,G,O,null)}}let F=S.children;for(let G=0,$=F.length;G<$;G++)I(F[G],R,y,C,P)}function D(S){S.target.removeEventListener("dispose",D);for(let y in c){let C=c[y],P=S.target.uuid;P in C&&(C[P].dispose(),delete C[P])}}}function _0(i,e){function t(){let U=!1,fe=new Dt,ne=null,Se=new Dt(0,0,0,0);return{setMask:function(ve){ne!==ve&&!U&&(i.colorMask(ve,ve,ve,ve),ne=ve)},setLocked:function(ve){U=ve},setClear:function(ve,ae,Ne,Je,Ut){Ut===!0&&(ve*=Je,ae*=Je,Ne*=Je),fe.set(ve,ae,Ne,Je),Se.equals(fe)===!1&&(i.clearColor(ve,ae,Ne,Je),Se.copy(fe))},reset:function(){U=!1,ne=null,Se.set(-1,0,0,0)}}}function n(){let U=!1,fe=!1,ne=null,Se=null,ve=null;return{setReversed:function(ae){if(fe!==ae){let Ne=e.get("EXT_clip_control");ae?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT),fe=ae;let Je=ve;ve=null,this.setClear(Je)}},getReversed:function(){return fe},setTest:function(ae){ae?ie(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(ae){ne!==ae&&!U&&(i.depthMask(ae),ne=ae)},setFunc:function(ae){if(fe&&(ae=Kd[ae]),Se!==ae){switch(ae){case oo:i.depthFunc(i.NEVER);break;case ao:i.depthFunc(i.ALWAYS);break;case lo:i.depthFunc(i.LESS);break;case Oi:i.depthFunc(i.LEQUAL);break;case co:i.depthFunc(i.EQUAL);break;case uo:i.depthFunc(i.GEQUAL);break;case ho:i.depthFunc(i.GREATER);break;case fo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Se=ae}},setLocked:function(ae){U=ae},setClear:function(ae){ve!==ae&&(ve=ae,fe&&(ae=1-ae),i.clearDepth(ae))},reset:function(){U=!1,ne=null,Se=null,ve=null,fe=!1}}}function s(){let U=!1,fe=null,ne=null,Se=null,ve=null,ae=null,Ne=null,Je=null,Ut=null;return{setTest:function(pt){U||(pt?ie(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(pt){fe!==pt&&!U&&(i.stencilMask(pt),fe=pt)},setFunc:function(pt,Zn,Dn){(ne!==pt||Se!==Zn||ve!==Dn)&&(i.stencilFunc(pt,Zn,Dn),ne=pt,Se=Zn,ve=Dn)},setOp:function(pt,Zn,Dn){(ae!==pt||Ne!==Zn||Je!==Dn)&&(i.stencilOp(pt,Zn,Dn),ae=pt,Ne=Zn,Je=Dn)},setLocked:function(pt){U=pt},setClear:function(pt){Ut!==pt&&(i.clearStencil(pt),Ut=pt)},reset:function(){U=!1,fe=null,ne=null,Se=null,ve=null,ae=null,Ne=null,Je=null,Ut=null}}}let r=new t,o=new n,l=new s,d=new WeakMap,c=new WeakMap,p={},g={},h={},u=new WeakMap,x=[],_=null,m=!1,f=null,M=null,A=null,I=null,D=null,S=null,R=null,y=new Ge(0,0,0),C=0,P=!1,w=null,F=null,G=null,$=null,O=null,H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,re=0,ce=i.getParameter(i.VERSION);ce.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(ce)[1]),X=re>=1):ce.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ce)[1]),X=re>=2);let me=null,we={},Ce=i.getParameter(i.SCISSOR_BOX),je=i.getParameter(i.VIEWPORT),rt=new Dt().fromArray(Ce),K=new Dt().fromArray(je);function L(U,fe,ne,Se){let ve=new Uint8Array(4),ae=i.createTexture();i.bindTexture(U,ae),i.texParameteri(U,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(U,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ne=0;Ne<ne;Ne++)U===i.TEXTURE_3D||U===i.TEXTURE_2D_ARRAY?i.texImage3D(fe,0,i.RGBA,1,1,Se,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(fe+Ne,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return ae}let j={};j[i.TEXTURE_2D]=L(i.TEXTURE_2D,i.TEXTURE_2D,1),j[i.TEXTURE_CUBE_MAP]=L(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[i.TEXTURE_2D_ARRAY]=L(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),j[i.TEXTURE_3D]=L(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),l.setClear(0),ie(i.DEPTH_TEST),o.setFunc(Oi),Ye(!1),Ze(Cl),ie(i.CULL_FACE),oe(Gn);function ie(U){p[U]!==!0&&(i.enable(U),p[U]=!0)}function Ie(U){p[U]!==!1&&(i.disable(U),p[U]=!1)}function Fe(U,fe){return h[U]!==fe?(i.bindFramebuffer(U,fe),h[U]=fe,U===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=fe),U===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=fe),!0):!1}function De(U,fe){let ne=x,Se=!1;if(U){ne=u.get(fe),ne===void 0&&(ne=[],u.set(fe,ne));let ve=U.textures;if(ne.length!==ve.length||ne[0]!==i.COLOR_ATTACHMENT0){for(let ae=0,Ne=ve.length;ae<Ne;ae++)ne[ae]=i.COLOR_ATTACHMENT0+ae;ne.length=ve.length,Se=!0}}else ne[0]!==i.BACK&&(ne[0]=i.BACK,Se=!0);Se&&i.drawBuffers(ne)}function We(U){return _!==U?(i.useProgram(U),_=U,!0):!1}let ge={[pi]:i.FUNC_ADD,[_d]:i.FUNC_SUBTRACT,[bd]:i.FUNC_REVERSE_SUBTRACT};ge[Sd]=i.MIN,ge[Md]=i.MAX;let le={[wd]:i.ZERO,[Td]:i.ONE,[Ed]:i.SRC_COLOR,[so]:i.SRC_ALPHA,[Rd]:i.SRC_ALPHA_SATURATE,[Pd]:i.DST_COLOR,[Cd]:i.DST_ALPHA,[Ad]:i.ONE_MINUS_SRC_COLOR,[ro]:i.ONE_MINUS_SRC_ALPHA,[Dd]:i.ONE_MINUS_DST_COLOR,[Id]:i.ONE_MINUS_DST_ALPHA,[Ld]:i.CONSTANT_COLOR,[Nd]:i.ONE_MINUS_CONSTANT_COLOR,[Ud]:i.CONSTANT_ALPHA,[Fd]:i.ONE_MINUS_CONSTANT_ALPHA};function oe(U,fe,ne,Se,ve,ae,Ne,Je,Ut,pt){if(U===Gn){m===!0&&(Ie(i.BLEND),m=!1);return}if(m===!1&&(ie(i.BLEND),m=!0),U!==yd){if(U!==f||pt!==P){if((M!==pi||D!==pi)&&(i.blendEquation(i.FUNC_ADD),M=pi,D=pi),pt)switch(U){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wn:i.blendFunc(i.ONE,i.ONE);break;case Il:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Pl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ve("WebGLState: Invalid blending: ",U);break}else switch(U){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Wn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Il:Ve("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pl:Ve("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ve("WebGLState: Invalid blending: ",U);break}A=null,I=null,S=null,R=null,y.set(0,0,0),C=0,f=U,P=pt}return}ve=ve||fe,ae=ae||ne,Ne=Ne||Se,(fe!==M||ve!==D)&&(i.blendEquationSeparate(ge[fe],ge[ve]),M=fe,D=ve),(ne!==A||Se!==I||ae!==S||Ne!==R)&&(i.blendFuncSeparate(le[ne],le[Se],le[ae],le[Ne]),A=ne,I=Se,S=ae,R=Ne),(Je.equals(y)===!1||Ut!==C)&&(i.blendColor(Je.r,Je.g,Je.b,Ut),y.copy(Je),C=Ut),f=U,P=!1}function be(U,fe){U.side===hn?Ie(i.CULL_FACE):ie(i.CULL_FACE);let ne=U.side===dn;fe&&(ne=!ne),Ye(ne),U.blending===Fi&&U.transparent===!1?oe(Gn):oe(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);let Se=U.stencilWrite;l.setTest(Se),Se&&(l.setMask(U.stencilWriteMask),l.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),l.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),N(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ie(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ye(U){w!==U&&(U?i.frontFace(i.CW):i.frontFace(i.CCW),w=U)}function Ze(U){U!==gd?(ie(i.CULL_FACE),U!==F&&(U===Cl?i.cullFace(i.BACK):U===xd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),F=U}function ft(U){U!==G&&(X&&i.lineWidth(U),G=U)}function N(U,fe,ne){U?(ie(i.POLYGON_OFFSET_FILL),($!==fe||O!==ne)&&($=fe,O=ne,o.getReversed()&&(fe=-fe),i.polygonOffset(fe,ne))):Ie(i.POLYGON_OFFSET_FILL)}function at(U){U?ie(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function ze(U){U===void 0&&(U=i.TEXTURE0+H-1),me!==U&&(i.activeTexture(U),me=U)}function Le(U,fe,ne){ne===void 0&&(me===null?ne=i.TEXTURE0+H-1:ne=me);let Se=we[ne];Se===void 0&&(Se={type:void 0,texture:void 0},we[ne]=Se),(Se.type!==U||Se.texture!==fe)&&(me!==ne&&(i.activeTexture(ne),me=ne),i.bindTexture(U,fe||j[U]),Se.type=U,Se.texture=fe)}function Y(){let U=we[me];U!==void 0&&U.type!==void 0&&(i.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function Te(){try{i.compressedTexImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function v(){try{i.texSubImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function k(){try{i.texSubImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function Q(){try{i.compressedTexSubImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function se(){try{i.texStorage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function te(){try{i.texStorage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function J(){try{i.texImage2D(...arguments)}catch(U){Ve("WebGLState:",U)}}function ee(){try{i.texImage3D(...arguments)}catch(U){Ve("WebGLState:",U)}}function pe(U){return g[U]!==void 0?g[U]:i.getParameter(U)}function xe(U,fe){g[U]!==fe&&(i.pixelStorei(U,fe),g[U]=fe)}function ue(U){rt.equals(U)===!1&&(i.scissor(U.x,U.y,U.z,U.w),rt.copy(U))}function de(U){K.equals(U)===!1&&(i.viewport(U.x,U.y,U.z,U.w),K.copy(U))}function Pe(U,fe){let ne=c.get(fe);ne===void 0&&(ne=new WeakMap,c.set(fe,ne));let Se=ne.get(U);Se===void 0&&(Se=i.getUniformBlockIndex(fe,U.name),ne.set(U,Se))}function qe(U,fe){let Se=c.get(fe).get(U);d.get(fe)!==Se&&(i.uniformBlockBinding(fe,Se,U.__bindingPointIndex),d.set(fe,Se))}function lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),p={},g={},me=null,we={},h={},u=new WeakMap,x=[],_=null,m=!1,f=null,M=null,A=null,I=null,D=null,S=null,R=null,y=new Ge(0,0,0),C=0,P=!1,w=null,F=null,G=null,$=null,O=null,rt.set(0,0,i.canvas.width,i.canvas.height),K.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),l.reset()}return{buffers:{color:r,depth:o,stencil:l},enable:ie,disable:Ie,bindFramebuffer:Fe,drawBuffers:De,useProgram:We,setBlending:oe,setMaterial:be,setFlipSided:Ye,setCullFace:Ze,setLineWidth:ft,setPolygonOffset:N,setScissorTest:at,activeTexture:ze,bindTexture:Le,unbindTexture:Y,compressedTexImage2D:Te,compressedTexImage3D:T,texImage2D:J,texImage3D:ee,pixelStorei:xe,getParameter:pe,updateUBOMapping:Pe,uniformBlockBinding:qe,texStorage2D:se,texStorage3D:te,texSubImage2D:v,texSubImage3D:k,compressedTexSubImage2D:V,compressedTexSubImage3D:Q,scissor:ue,viewport:de,reset:lt}}function b0(i,e,t,n,s,r,o){let l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Xe,p=new WeakMap,g=new Set,h,u=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,v){return x?new OffscreenCanvas(T,v):Gs("canvas")}function m(T,v,k){let V=1,Q=Te(T);if((Q.width>k||Q.height>k)&&(V=k/Math.max(Q.width,Q.height)),V<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){let se=Math.floor(V*Q.width),te=Math.floor(V*Q.height);h===void 0&&(h=_(se,te));let J=v?_(se,te):h;return J.width=se,J.height=te,J.getContext("2d").drawImage(T,0,0,se,te),ke("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+se+"x"+te+")."),J}else return"data"in T&&ke("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),T;return T}function f(T){return T.generateMipmaps}function M(T){i.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?i.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function I(T,v,k,V,Q,se=!1){if(T!==null){if(i[T]!==void 0)return i[T];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let te;V&&(te=e.get("EXT_texture_norm16"),te||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=v;if(v===i.RED&&(k===i.FLOAT&&(J=i.R32F),k===i.HALF_FLOAT&&(J=i.R16F),k===i.UNSIGNED_BYTE&&(J=i.R8),k===i.UNSIGNED_SHORT&&te&&(J=te.R16_EXT),k===i.SHORT&&te&&(J=te.R16_SNORM_EXT)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.R8UI),k===i.UNSIGNED_SHORT&&(J=i.R16UI),k===i.UNSIGNED_INT&&(J=i.R32UI),k===i.BYTE&&(J=i.R8I),k===i.SHORT&&(J=i.R16I),k===i.INT&&(J=i.R32I)),v===i.RG&&(k===i.FLOAT&&(J=i.RG32F),k===i.HALF_FLOAT&&(J=i.RG16F),k===i.UNSIGNED_BYTE&&(J=i.RG8),k===i.UNSIGNED_SHORT&&te&&(J=te.RG16_EXT),k===i.SHORT&&te&&(J=te.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RG8UI),k===i.UNSIGNED_SHORT&&(J=i.RG16UI),k===i.UNSIGNED_INT&&(J=i.RG32UI),k===i.BYTE&&(J=i.RG8I),k===i.SHORT&&(J=i.RG16I),k===i.INT&&(J=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGB8UI),k===i.UNSIGNED_SHORT&&(J=i.RGB16UI),k===i.UNSIGNED_INT&&(J=i.RGB32UI),k===i.BYTE&&(J=i.RGB8I),k===i.SHORT&&(J=i.RGB16I),k===i.INT&&(J=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),k===i.UNSIGNED_INT&&(J=i.RGBA32UI),k===i.BYTE&&(J=i.RGBA8I),k===i.SHORT&&(J=i.RGBA16I),k===i.INT&&(J=i.RGBA32I)),v===i.RGB&&(k===i.UNSIGNED_SHORT&&te&&(J=te.RGB16_EXT),k===i.SHORT&&te&&(J=te.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),v===i.RGBA){let ee=se?Hs:ot.getTransfer(Q);k===i.FLOAT&&(J=i.RGBA32F),k===i.HALF_FLOAT&&(J=i.RGBA16F),k===i.UNSIGNED_BYTE&&(J=ee===ht?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&te&&(J=te.RGBA16_EXT),k===i.SHORT&&te&&(J=te.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&e.get("EXT_color_buffer_float"),J}function D(T,v){let k;return T?v===null||v===In||v===ws?k=i.DEPTH24_STENCIL8:v===Pn?k=i.DEPTH32F_STENCIL8:v===Ms&&(k=i.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===In||v===ws?k=i.DEPTH_COMPONENT24:v===Pn?k=i.DEPTH_COMPONENT32F:v===Ms&&(k=i.DEPTH_COMPONENT16),k}function S(T,v){return f(T)===!0||T.isFramebufferTexture&&T.minFilter!==$t&&T.minFilter!==Jt?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function R(T){let v=T.target;v.removeEventListener("dispose",R),C(v),v.isVideoTexture&&p.delete(v),v.isHTMLTexture&&g.delete(v)}function y(T){let v=T.target;v.removeEventListener("dispose",y),w(v)}function C(T){let v=n.get(T);if(v.__webglInit===void 0)return;let k=T.source,V=u.get(k);if(V){let Q=V[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&P(T),Object.keys(V).length===0&&u.delete(k)}n.remove(T)}function P(T){let v=n.get(T);i.deleteTexture(v.__webglTexture);let k=T.source,V=u.get(k);delete V[v.__cacheKey],o.memory.textures--}function w(T){let v=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(v.__webglFramebuffer[V]))for(let Q=0;Q<v.__webglFramebuffer[V].length;Q++)i.deleteFramebuffer(v.__webglFramebuffer[V][Q]);else i.deleteFramebuffer(v.__webglFramebuffer[V]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[V])}else{if(Array.isArray(v.__webglFramebuffer))for(let V=0;V<v.__webglFramebuffer.length;V++)i.deleteFramebuffer(v.__webglFramebuffer[V]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let V=0;V<v.__webglColorRenderbuffer.length;V++)v.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[V]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let k=T.textures;for(let V=0,Q=k.length;V<Q;V++){let se=n.get(k[V]);se.__webglTexture&&(i.deleteTexture(se.__webglTexture),o.memory.textures--),n.remove(k[V])}n.remove(T)}let F=0;function G(){F=0}function $(){return F}function O(T){F=T}function H(){let T=F;return T>=s.maxTextures&&ke("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),F+=1,T}function X(T){let v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function re(T,v){let k=n.get(T);if(T.isVideoTexture&&Le(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&k.__version!==T.version){let V=T.image;if(V===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)ke("WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(k,T,v);return}}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function ce(T,v){let k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Ie(k,T,v);return}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function me(T,v){let k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){Ie(k,T,v);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function we(T,v){let k=n.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&k.__version!==T.version){Fe(k,T,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}let Ce={[po]:i.REPEAT,[On]:i.CLAMP_TO_EDGE,[mo]:i.MIRRORED_REPEAT},je={[$t]:i.NEAREST,[kd]:i.NEAREST_MIPMAP_NEAREST,[pr]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[$o]:i.LINEAR_MIPMAP_NEAREST,[Mi]:i.LINEAR_MIPMAP_LINEAR},rt={[Hd]:i.NEVER,[Yd]:i.ALWAYS,[Gd]:i.LESS,[Da]:i.LEQUAL,[Wd]:i.EQUAL,[Ra]:i.GEQUAL,[Xd]:i.GREATER,[qd]:i.NOTEQUAL};function K(T,v){if(v.type===Pn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Jt||v.magFilter===$o||v.magFilter===pr||v.magFilter===Mi||v.minFilter===Jt||v.minFilter===$o||v.minFilter===pr||v.minFilter===Mi)&&ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,Ce[v.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,Ce[v.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,Ce[v.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,je[v.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,je[v.minFilter]),v.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,rt[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===$t||v.minFilter!==pr&&v.minFilter!==Mi||v.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function L(T,v){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",R));let V=v.source,Q=u.get(V);Q===void 0&&(Q={},u.set(V,Q));let se=X(v);if(se!==T.__cacheKey){Q[se]===void 0&&(Q[se]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[se].usedTimes++;let te=Q[T.__cacheKey];te!==void 0&&(Q[T.__cacheKey].usedTimes--,te.usedTimes===0&&P(v)),T.__cacheKey=se,T.__webglTexture=Q[se].texture}return k}function j(T,v,k){return Math.floor(Math.floor(T/k)/v)}function ie(T,v,k,V){let se=T.updateRanges;if(se.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,V,v.data);else{se.sort((xe,ue)=>xe.start-ue.start);let te=0;for(let xe=1;xe<se.length;xe++){let ue=se[te],de=se[xe],Pe=ue.start+ue.count,qe=j(de.start,v.width,4),lt=j(ue.start,v.width,4);de.start<=Pe+1&&qe===lt&&j(de.start+de.count-1,v.width,4)===qe?ue.count=Math.max(ue.count,de.start+de.count-ue.start):(++te,se[te]=de)}se.length=te+1;let J=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),pe=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let xe=0,ue=se.length;xe<ue;xe++){let de=se[xe],Pe=Math.floor(de.start/4),qe=Math.ceil(de.count/4),lt=Pe%v.width,U=Math.floor(Pe/v.width),fe=qe,ne=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,lt),t.pixelStorei(i.UNPACK_SKIP_ROWS,U),t.texSubImage2D(i.TEXTURE_2D,0,lt,U,fe,ne,k,V,v.data)}T.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,J),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function Ie(T,v,k){let V=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(V=i.TEXTURE_3D);let Q=L(T,v),se=v.source;t.bindTexture(V,T.__webglTexture,i.TEXTURE0+k);let te=n.get(se);if(se.version!==te.__version||Q===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){let ne=ot.getPrimaries(ot.workingColorSpace),Se=v.colorSpace===ii?null:ot.getPrimaries(v.colorSpace),ve=v.colorSpace===ii||ne===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let ee=m(v.image,!1,s.maxTextureSize);ee=Y(v,ee);let pe=r.convert(v.format,v.colorSpace),xe=r.convert(v.type),ue=I(v.internalFormat,pe,xe,v.normalized,v.colorSpace,v.isVideoTexture);K(V,v);let de,Pe=v.mipmaps,qe=v.isVideoTexture!==!0,lt=te.__version===void 0||Q===!0,U=se.dataReady,fe=S(v,ee);if(v.isDepthTexture)ue=D(v.format===wi,v.type),lt&&(qe?t.texStorage2D(i.TEXTURE_2D,1,ue,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,ue,ee.width,ee.height,0,pe,xe,null));else if(v.isDataTexture)if(Pe.length>0){qe&&lt&&t.texStorage2D(i.TEXTURE_2D,fe,ue,Pe[0].width,Pe[0].height);for(let ne=0,Se=Pe.length;ne<Se;ne++)de=Pe[ne],qe?U&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,pe,xe,de.data):t.texImage2D(i.TEXTURE_2D,ne,ue,de.width,de.height,0,pe,xe,de.data);v.generateMipmaps=!1}else qe?(lt&&t.texStorage2D(i.TEXTURE_2D,fe,ue,ee.width,ee.height),U&&ie(v,ee,pe,xe)):t.texImage2D(i.TEXTURE_2D,0,ue,ee.width,ee.height,0,pe,xe,ee.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){qe&&lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ue,Pe[0].width,Pe[0].height,ee.depth);for(let ne=0,Se=Pe.length;ne<Se;ne++)if(de=Pe[ne],v.format!==Sn)if(pe!==null)if(qe){if(U)if(v.layerUpdates.size>0){let ve=jl(de.width,de.height,v.format,v.type);for(let ae of v.layerUpdates){let Ne=de.data.subarray(ae*ve/de.data.BYTES_PER_ELEMENT,(ae+1)*ve/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,ae,de.width,de.height,1,pe,Ne)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,ee.depth,pe,de.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,ue,de.width,de.height,ee.depth,0,de.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?U&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,de.width,de.height,ee.depth,pe,xe,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,ue,de.width,de.height,ee.depth,0,pe,xe,de.data)}else{qe&&lt&&t.texStorage2D(i.TEXTURE_2D,fe,ue,Pe[0].width,Pe[0].height);for(let ne=0,Se=Pe.length;ne<Se;ne++)de=Pe[ne],v.format!==Sn?pe!==null?qe?U&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,pe,de.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,ue,de.width,de.height,0,de.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?U&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,de.width,de.height,pe,xe,de.data):t.texImage2D(i.TEXTURE_2D,ne,ue,de.width,de.height,0,pe,xe,de.data)}else if(v.isDataArrayTexture)if(qe){if(lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,fe,ue,ee.width,ee.height,ee.depth),U)if(v.layerUpdates.size>0){let ne=jl(ee.width,ee.height,v.format,v.type);for(let Se of v.layerUpdates){let ve=ee.data.subarray(Se*ne/ee.data.BYTES_PER_ELEMENT,(Se+1)*ne/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Se,ee.width,ee.height,1,pe,xe,ve)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,pe,xe,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ue,ee.width,ee.height,ee.depth,0,pe,xe,ee.data);else if(v.isData3DTexture)qe?(lt&&t.texStorage3D(i.TEXTURE_3D,fe,ue,ee.width,ee.height,ee.depth),U&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,pe,xe,ee.data)):t.texImage3D(i.TEXTURE_3D,0,ue,ee.width,ee.height,ee.depth,0,pe,xe,ee.data);else if(v.isFramebufferTexture){if(lt)if(qe)t.texStorage2D(i.TEXTURE_2D,fe,ue,ee.width,ee.height);else{let ne=ee.width,Se=ee.height;for(let ve=0;ve<fe;ve++)t.texImage2D(i.TEXTURE_2D,ve,ue,ne,Se,0,pe,xe,null),ne>>=1,Se>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){let ne=i.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),ee.parentNode!==ne){ne.appendChild(ee),g.add(v),ne.onpaint=Je=>{let Ut=Je.changedElements;for(let pt of g)Ut.includes(pt.image)&&(pt.needsUpdate=!0)},ne.requestPaint();return}let Se=0,ve=i.RGBA,ae=i.RGBA,Ne=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,Se,ve,ae,Ne,ee),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Pe.length>0){if(qe&&lt){let ne=Te(Pe[0]);t.texStorage2D(i.TEXTURE_2D,fe,ue,ne.width,ne.height)}for(let ne=0,Se=Pe.length;ne<Se;ne++)de=Pe[ne],qe?U&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,pe,xe,de):t.texImage2D(i.TEXTURE_2D,ne,ue,pe,xe,de);v.generateMipmaps=!1}else if(qe){if(lt){let ne=Te(ee);t.texStorage2D(i.TEXTURE_2D,fe,ue,ne.width,ne.height)}U&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,xe,ee)}else t.texImage2D(i.TEXTURE_2D,0,ue,pe,xe,ee);f(v)&&M(V),te.__version=se.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function Fe(T,v,k){if(v.image.length!==6)return;let V=L(T,v),Q=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+k);let se=n.get(Q);if(Q.version!==se.__version||V===!0){t.activeTexture(i.TEXTURE0+k);let te=ot.getPrimaries(ot.workingColorSpace),J=v.colorSpace===ii?null:ot.getPrimaries(v.colorSpace),ee=v.colorSpace===ii||te===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);let pe=v.isCompressedTexture||v.image[0].isCompressedTexture,xe=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let ae=0;ae<6;ae++)!pe&&!xe?ue[ae]=m(v.image[ae],!0,s.maxCubemapSize):ue[ae]=xe?v.image[ae].image:v.image[ae],ue[ae]=Y(v,ue[ae]);let de=ue[0],Pe=r.convert(v.format,v.colorSpace),qe=r.convert(v.type),lt=I(v.internalFormat,Pe,qe,v.normalized,v.colorSpace),U=v.isVideoTexture!==!0,fe=se.__version===void 0||V===!0,ne=Q.dataReady,Se=S(v,de);K(i.TEXTURE_CUBE_MAP,v);let ve;if(pe){U&&fe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,lt,de.width,de.height);for(let ae=0;ae<6;ae++){ve=ue[ae].mipmaps;for(let Ne=0;Ne<ve.length;Ne++){let Je=ve[Ne];v.format!==Sn?Pe!==null?U?ne&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,Je.width,Je.height,Pe,Je.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,lt,Je.width,Je.height,0,Je.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,0,0,Je.width,Je.height,Pe,qe,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne,lt,Je.width,Je.height,0,Pe,qe,Je.data)}}}else{if(ve=v.mipmaps,U&&fe){ve.length>0&&Se++;let ae=Te(ue[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Se,lt,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(xe){U?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,ue[ae].width,ue[ae].height,Pe,qe,ue[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,lt,ue[ae].width,ue[ae].height,0,Pe,qe,ue[ae].data);for(let Ne=0;Ne<ve.length;Ne++){let Ut=ve[Ne].image[ae].image;U?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,Ut.width,Ut.height,Pe,qe,Ut.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,lt,Ut.width,Ut.height,0,Pe,qe,Ut.data)}}else{U?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Pe,qe,ue[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,lt,Pe,qe,ue[ae]);for(let Ne=0;Ne<ve.length;Ne++){let Je=ve[Ne];U?ne&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,0,0,Pe,qe,Je.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Ne+1,lt,Pe,qe,Je.image[ae])}}}f(v)&&M(i.TEXTURE_CUBE_MAP),se.__version=Q.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function De(T,v,k,V,Q,se){let te=r.convert(k.format,k.colorSpace),J=r.convert(k.type),ee=I(k.internalFormat,te,J,k.normalized,k.colorSpace),pe=n.get(v),xe=n.get(k);if(xe.__renderTarget=v,!pe.__hasExternalTextures){let ue=Math.max(1,v.width>>se),de=Math.max(1,v.height>>se);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?t.texImage3D(Q,se,ee,ue,de,v.depth,0,te,J,null):t.texImage2D(Q,se,ee,ue,de,0,te,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),ze(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,Q,xe.__webglTexture,0,at(v)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,Q,xe.__webglTexture,se),t.bindFramebuffer(i.FRAMEBUFFER,null)}function We(T,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,T),v.depthBuffer){let V=v.depthTexture,Q=V&&V.isDepthTexture?V.type:null,se=D(v.stencilBuffer,Q),te=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ze(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at(v),se,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,at(v),se,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,se,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,T)}else{let V=v.textures;for(let Q=0;Q<V.length;Q++){let se=V[Q],te=r.convert(se.format,se.colorSpace),J=r.convert(se.type),ee=I(se.internalFormat,te,J,se.normalized,se.colorSpace);ze(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at(v),ee,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,at(v),ee,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,ee,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(T,v,k){let V=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let Q=n.get(v.depthTexture);if(Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),V){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,v.depthTexture.addEventListener("dispose",R)),Q.__webglTexture===void 0){Q.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),K(i.TEXTURE_CUBE_MAP,v.depthTexture);let pe=r.convert(v.depthTexture.format),xe=r.convert(v.depthTexture.type),ue;v.depthTexture.format===Bn?ue=i.DEPTH_COMPONENT24:v.depthTexture.format===wi&&(ue=i.DEPTH24_STENCIL8);for(let de=0;de<6;de++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,ue,v.width,v.height,0,pe,xe,null)}}else re(v.depthTexture,0);let se=Q.__webglTexture,te=at(v),J=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ee=v.depthTexture.format===wi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===Bn)ze(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,se,0);else if(v.depthTexture.format===wi)ze(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,J,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ee,J,se,0);else throw new Error("Unknown depthTexture format")}function le(T){let v=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){let V=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),V){let Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,V.removeEventListener("dispose",Q)};V.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=V}if(T.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let V=0;V<6;V++)ge(v.__webglFramebuffer[V],T,V);else{let V=T.texture.mipmaps;V&&V.length>0?ge(v.__webglFramebuffer[0],T,0):ge(v.__webglFramebuffer,T,0)}else if(k){v.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[V]),v.__webglDepthbuffer[V]===void 0)v.__webglDepthbuffer[V]=i.createRenderbuffer(),We(v.__webglDepthbuffer[V],T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,se)}}else{let V=T.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),We(v.__webglDepthbuffer,T,!1);else{let Q=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,se)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function oe(T,v,k){let V=n.get(T);v!==void 0&&De(V.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&le(T)}function be(T){let v=T.texture,k=n.get(T),V=n.get(v);T.addEventListener("dispose",y);let Q=T.textures,se=T.isWebGLCubeRenderTarget===!0,te=Q.length>1;if(te||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=v.version,o.memory.textures++),se){k.__webglFramebuffer=[];for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer[J]=[];for(let ee=0;ee<v.mipmaps.length;ee++)k.__webglFramebuffer[J][ee]=i.createFramebuffer()}else k.__webglFramebuffer[J]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){k.__webglFramebuffer=[];for(let J=0;J<v.mipmaps.length;J++)k.__webglFramebuffer[J]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(te)for(let J=0,ee=Q.length;J<ee;J++){let pe=n.get(Q[J]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&ze(T)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let J=0;J<Q.length;J++){let ee=Q[J];k.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[J]);let pe=r.convert(ee.format,ee.colorSpace),xe=r.convert(ee.type),ue=I(ee.internalFormat,pe,xe,ee.normalized,ee.colorSpace,T.isXRRenderTarget===!0),de=at(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,de,ue,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,k.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),We(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),K(i.TEXTURE_CUBE_MAP,v);for(let J=0;J<6;J++)if(v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)De(k.__webglFramebuffer[J][ee],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,ee);else De(k.__webglFramebuffer[J],T,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);f(v)&&M(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){for(let J=0,ee=Q.length;J<ee;J++){let pe=Q[J],xe=n.get(pe),ue=i.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ue,xe.__webglTexture),K(ue,pe),De(k.__webglFramebuffer,T,pe,i.COLOR_ATTACHMENT0+J,ue,0),f(pe)&&M(ue)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(J=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,V.__webglTexture),K(J,v),v.mipmaps&&v.mipmaps.length>0)for(let ee=0;ee<v.mipmaps.length;ee++)De(k.__webglFramebuffer[ee],T,v,i.COLOR_ATTACHMENT0,J,ee);else De(k.__webglFramebuffer,T,v,i.COLOR_ATTACHMENT0,J,0);f(v)&&M(J),t.unbindTexture()}T.depthBuffer&&le(T)}function Ye(T){let v=T.textures;for(let k=0,V=v.length;k<V;k++){let Q=v[k];if(f(Q)){let se=A(T),te=n.get(Q).__webglTexture;t.bindTexture(se,te),M(se),t.unbindTexture()}}}let Ze=[],ft=[];function N(T){if(T.samples>0){if(ze(T)===!1){let v=T.textures,k=T.width,V=T.height,Q=i.COLOR_BUFFER_BIT,se=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=n.get(T),J=v.length>1;if(J)for(let pe=0;pe<v.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,te.__webglMultisampledFramebuffer);let ee=T.texture.mipmaps;ee&&ee.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglFramebuffer);for(let pe=0;pe<v.length;pe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,te.__webglColorRenderbuffer[pe]);let xe=n.get(v[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,xe,0)}i.blitFramebuffer(0,0,k,V,0,0,k,V,Q,i.NEAREST),d===!0&&(Ze.length=0,ft.length=0,Ze.push(i.COLOR_ATTACHMENT0+pe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ze.push(se),ft.push(se),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ft)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ze))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let pe=0;pe<v.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,te.__webglColorRenderbuffer[pe]);let xe=n.get(v[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,xe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&d){let v=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function at(T){return Math.min(s.maxSamples,T.samples)}function ze(T){let v=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Le(T){let v=o.render.frame;p.get(T)!==v&&(p.set(T,v),T.update())}function Y(T,v){let k=T.colorSpace,V=T.format,Q=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Vs&&k!==ii&&(ot.getTransfer(k)===ht?(V!==Sn||Q!==fn)&&ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ve("WebGLTextures: Unsupported texture color space:",k)),v}function Te(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.getTextureUnits=$,this.setTextureUnits=O,this.setTexture2D=re,this.setTexture2DArray=ce,this.setTexture3D=me,this.setTextureCube=we,this.rebindTextures=oe,this.setupRenderTarget=be,this.updateRenderTargetMipmap=Ye,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=De,this.useMultisampledRTT=ze,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function S0(i,e){function t(n,s=ii){let r,o=ot.getTransfer(s);if(n===fn)return i.UNSIGNED_BYTE;if(n===Jo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ko)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Hl)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Gl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zl)return i.BYTE;if(n===Vl)return i.SHORT;if(n===Ms)return i.UNSIGNED_SHORT;if(n===Zo)return i.INT;if(n===In)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===Xn)return i.HALF_FLOAT;if(n===Wl)return i.ALPHA;if(n===Xl)return i.RGB;if(n===Sn)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===wi)return i.DEPTH_STENCIL;if(n===ql)return i.RED;if(n===jo)return i.RED_INTEGER;if(n===Ti)return i.RG;if(n===Qo)return i.RG_INTEGER;if(n===ea)return i.RGBA_INTEGER;if(n===mr||n===gr||n===xr||n===vr)if(o===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===vr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ta||n===na||n===ia||n===sa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ta)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ia)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ra||n===oa||n===aa||n===la||n===ca||n===yr||n===da)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ra||n===oa)return o===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===aa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===la)return r.COMPRESSED_R11_EAC;if(n===ca)return r.COMPRESSED_SIGNED_R11_EAC;if(n===yr)return r.COMPRESSED_RG11_EAC;if(n===da)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ua||n===ha||n===fa||n===pa||n===ma||n===ga||n===xa||n===va||n===ya||n===_a||n===ba||n===Sa||n===Ma||n===wa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ua)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ha)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===pa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ma)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ga)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===va)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ya)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_a)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ba)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ma)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wa)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ta||n===Ea||n===Aa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ta)return o===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ea)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Aa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ca||n===Ia||n===_r||n===Pa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ca)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ia)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Pa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ws?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var M0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new js(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new cn({vertexShader:M0,fragmentShader:w0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Kt(new nr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},vc=class extends kn{constructor(e,t){super();let n=this,s=null,r=1,o=null,l="local-floor",d=1,c=null,p=null,g=null,h=null,u=null,x=null,_=typeof XRWebGLBinding<"u",m=new xc,f={},M=t.getContextAttributes(),A=null,I=null,D=[],S=[],R=new Xe,y=null,C=new nn;C.viewport=new Dt;let P=new nn;P.viewport=new Dt;let w=[C,P],F=new Wo,G=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(L){let j=D[L];return j===void 0&&(j=new hs,D[L]=j),j.getTargetRaySpace()},this.getControllerGrip=function(L){let j=D[L];return j===void 0&&(j=new hs,D[L]=j),j.getGripSpace()},this.getHand=function(L){let j=D[L];return j===void 0&&(j=new hs,D[L]=j),j.getHandSpace()};function O(L){let j=S.indexOf(L.inputSource);if(j===-1)return;let ie=D[j];ie!==void 0&&(ie.update(L.inputSource,L.frame,c||o),ie.dispatchEvent({type:L.type,data:L.inputSource}))}function H(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",X);for(let L=0;L<D.length;L++){let j=S[L];j!==null&&(S[L]=null,D[L].disconnect(j))}G=null,$=null,m.reset();for(let L in f)delete f[L];e.setRenderTarget(A),u=null,h=null,g=null,s=null,I=null,K.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(L){r=L,n.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(L){l=L,n.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(L){c=L},this.getBaseLayer=function(){return h!==null?h:u},this.getBinding=function(){return g===null&&_&&(g=new XRWebGLBinding(s,t)),g},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(L){if(s=L,s!==null){if(A=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",H),s.addEventListener("inputsourceschange",X),M.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ie=null,Ie=null,Fe=null;M.depth&&(Fe=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=M.stencil?wi:Bn,Ie=M.stencil?ws:In);let De={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:r};g=this.getBinding(),h=g.createProjectionLayer(De),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),I=new vn(h.textureWidth,h.textureHeight,{format:Sn,type:fn,depthTexture:new ni(h.textureWidth,h.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let ie={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:u}),e.setPixelRatio(1),e.setSize(u.framebufferWidth,u.framebufferHeight,!1),I=new vn(u.framebufferWidth,u.framebufferHeight,{format:Sn,type:fn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(d),c=null,o=await s.requestReferenceSpace(l),K.setContext(s),K.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(L){for(let j=0;j<L.removed.length;j++){let ie=L.removed[j],Ie=S.indexOf(ie);Ie>=0&&(S[Ie]=null,D[Ie].disconnect(ie))}for(let j=0;j<L.added.length;j++){let ie=L.added[j],Ie=S.indexOf(ie);if(Ie===-1){for(let De=0;De<D.length;De++)if(De>=S.length){S.push(ie),Ie=De;break}else if(S[De]===null){S[De]=ie,Ie=De;break}if(Ie===-1)break}let Fe=D[Ie];Fe&&Fe.connect(ie)}}let re=new B,ce=new B;function me(L,j,ie){re.setFromMatrixPosition(j.matrixWorld),ce.setFromMatrixPosition(ie.matrixWorld);let Ie=re.distanceTo(ce),Fe=j.projectionMatrix.elements,De=ie.projectionMatrix.elements,We=Fe[14]/(Fe[10]-1),ge=Fe[14]/(Fe[10]+1),le=(Fe[9]+1)/Fe[5],oe=(Fe[9]-1)/Fe[5],be=(Fe[8]-1)/Fe[0],Ye=(De[8]+1)/De[0],Ze=We*be,ft=We*Ye,N=Ie/(-be+Ye),at=N*-be;if(j.matrixWorld.decompose(L.position,L.quaternion,L.scale),L.translateX(at),L.translateZ(N),L.matrixWorld.compose(L.position,L.quaternion,L.scale),L.matrixWorldInverse.copy(L.matrixWorld).invert(),Fe[10]===-1)L.projectionMatrix.copy(j.projectionMatrix),L.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let ze=We+N,Le=ge+N,Y=Ze-at,Te=ft+(Ie-at),T=le*ge/Le*ze,v=oe*ge/Le*ze;L.projectionMatrix.makePerspective(Y,Te,T,v,ze,Le),L.projectionMatrixInverse.copy(L.projectionMatrix).invert()}}function we(L,j){j===null?L.matrixWorld.copy(L.matrix):L.matrixWorld.multiplyMatrices(j.matrixWorld,L.matrix),L.matrixWorldInverse.copy(L.matrixWorld).invert()}this.updateCamera=function(L){if(s===null)return;let j=L.near,ie=L.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(ie=m.depthFar)),F.near=P.near=C.near=j,F.far=P.far=C.far=ie,(G!==F.near||$!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),G=F.near,$=F.far),F.layers.mask=L.layers.mask|6,C.layers.mask=F.layers.mask&-5,P.layers.mask=F.layers.mask&-3;let Ie=L.parent,Fe=F.cameras;we(F,Ie);for(let De=0;De<Fe.length;De++)we(Fe[De],Ie);Fe.length===2?me(F,C,P):F.projectionMatrix.copy(C.projectionMatrix),Ce(L,F,Ie)};function Ce(L,j,ie){ie===null?L.matrix.copy(j.matrixWorld):(L.matrix.copy(ie.matrixWorld),L.matrix.invert(),L.matrix.multiply(j.matrixWorld)),L.matrix.decompose(L.position,L.quaternion,L.scale),L.updateMatrixWorld(!0),L.projectionMatrix.copy(j.projectionMatrix),L.projectionMatrixInverse.copy(j.projectionMatrixInverse),L.isPerspectiveCamera&&(L.fov=yo*2*Math.atan(1/L.projectionMatrix.elements[5]),L.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&u===null))return d},this.setFoveation=function(L){d=L,h!==null&&(h.fixedFoveation=L),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=L)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(L){return f[L]};let je=null;function rt(L,j){if(p=j.getViewerPose(c||o),x=j,p!==null){let ie=p.views;u!==null&&(e.setRenderTargetFramebuffer(I,u.framebuffer),e.setRenderTarget(I));let Ie=!1;ie.length!==F.cameras.length&&(F.cameras.length=0,Ie=!0);for(let ge=0;ge<ie.length;ge++){let le=ie[ge],oe=null;if(u!==null)oe=u.getViewport(le);else{let Ye=g.getViewSubImage(h,le);oe=Ye.viewport,ge===0&&(e.setRenderTargetTextures(I,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(I))}let be=w[ge];be===void 0&&(be=new nn,be.layers.enable(ge),be.viewport=new Dt,w[ge]=be),be.matrix.fromArray(le.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(le.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(oe.x,oe.y,oe.width,oe.height),ge===0&&(F.matrix.copy(be.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ie===!0&&F.cameras.push(be)}let Fe=s.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){g=n.getBinding();let ge=g.getDepthInformation(ie[0]);ge&&ge.isValid&&ge.texture&&m.init(ge,s.renderState)}if(Fe&&Fe.includes("camera-access")&&_){e.state.unbindTexture(),g=n.getBinding();for(let ge=0;ge<ie.length;ge++){let le=ie[ge].camera;if(le){let oe=f[le];oe||(oe=new js,f[le]=oe);let be=g.getCameraImage(le);oe.sourceTexture=be}}}}for(let ie=0;ie<D.length;ie++){let Ie=S[ie],Fe=D[ie];Ie!==null&&Fe!==void 0&&Fe.update(Ie,j,c||o)}je&&je(L,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),x=null}let K=new wu;K.setAnimationLoop(rt),this.setAnimationLoop=function(L){je=L},this.dispose=function(){}}},T0=new bt,Pu=new $e;Pu.set(-1,0,0,0,1,0,0,0,1);function E0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Zl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,M,A,I){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),g(m,f)):f.isMeshPhongMaterial?(r(m,f),p(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),h(m,f),f.isMeshPhysicalMaterial&&u(m,f,I)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),_(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&l(m,f)):f.isPointsMaterial?d(m,f,M,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===dn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===dn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let M=e.get(f),A=M.envMap,I=M.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(T0.makeRotationFromEuler(I)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Pu),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function l(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function d(m,f,M,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*M,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function p(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function g(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function u(m,f,M){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===dn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){let M=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function A0(i,e,t,n){let s={},r={},o=[],l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function d(M,A){let I=A.program;n.uniformBlockBinding(M,I)}function c(M,A){let I=s[M.id];I===void 0&&(x(M),I=p(M),s[M.id]=I,M.addEventListener("dispose",m));let D=A.program;n.updateUBOMapping(M,D);let S=e.render.frame;r[M.id]!==S&&(h(M),r[M.id]=S)}function p(M){let A=g();M.__bindingPointIndex=A;let I=i.createBuffer(),D=M.__size,S=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,I),i.bufferData(i.UNIFORM_BUFFER,D,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,I),I}function g(){for(let M=0;M<l;M++)if(o.indexOf(M)===-1)return o.push(M),M;return Ve("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){let A=s[M.id],I=M.uniforms,D=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let S=0,R=I.length;S<R;S++){let y=Array.isArray(I[S])?I[S]:[I[S]];for(let C=0,P=y.length;C<P;C++){let w=y[C];if(u(w,S,C,D)===!0){let F=w.__offset,G=Array.isArray(w.value)?w.value:[w.value],$=0;for(let O=0;O<G.length;O++){let H=G[O],X=_(H);typeof H=="number"||typeof H=="boolean"?(w.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+$,w.__data)):H.isMatrix3?(w.__data[0]=H.elements[0],w.__data[1]=H.elements[1],w.__data[2]=H.elements[2],w.__data[3]=0,w.__data[4]=H.elements[3],w.__data[5]=H.elements[4],w.__data[6]=H.elements[5],w.__data[7]=0,w.__data[8]=H.elements[6],w.__data[9]=H.elements[7],w.__data[10]=H.elements[8],w.__data[11]=0):ArrayBuffer.isView(H)?w.__data.set(new H.constructor(H.buffer,H.byteOffset,w.__data.length)):(H.toArray(w.__data,$),$+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(M,A,I,D){let S=M.value,R=A+"_"+I;if(D[R]===void 0)return typeof S=="number"||typeof S=="boolean"?D[R]=S:ArrayBuffer.isView(S)?D[R]=S.slice():D[R]=S.clone(),!0;{let y=D[R];if(typeof S=="number"||typeof S=="boolean"){if(y!==S)return D[R]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(y.equals(S)===!1)return y.copy(S),!0}}return!1}function x(M){let A=M.uniforms,I=0,D=16;for(let R=0,y=A.length;R<y;R++){let C=Array.isArray(A[R])?A[R]:[A[R]];for(let P=0,w=C.length;P<w;P++){let F=C[P],G=Array.isArray(F.value)?F.value:[F.value];for(let $=0,O=G.length;$<O;$++){let H=G[$],X=_(H),re=I%D,ce=re%X.boundary,me=re+ce;I+=ce,me!==0&&D-me<X.storage&&(I+=D-me),F.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=I,I+=X.storage}}}let S=I%D;return S>0&&(I+=D-S),M.__size=I,M.__cache={},this}function _(M){let A={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(A.boundary=4,A.storage=4):M.isVector2?(A.boundary=8,A.storage=8):M.isVector3||M.isColor?(A.boundary=16,A.storage=12):M.isVector4?(A.boundary=16,A.storage=16):M.isMatrix3?(A.boundary=48,A.storage=48):M.isMatrix4?(A.boundary=64,A.storage=64):M.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(A.boundary=16,A.storage=M.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",M),A}function m(M){let A=M.target;A.removeEventListener("dispose",m);let I=o.indexOf(A.__bindingPointIndex);o.splice(I,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function f(){for(let M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:d,update:c,dispose:f}}var C0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qn=null;function I0(){return qn===null&&(qn=new wo(C0,16,16,Ti,Xn),qn.name="DFG_LUT",qn.minFilter=Jt,qn.magFilter=Jt,qn.wrapS=On,qn.wrapT=On,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}var Oa=class{constructor(e={}){let{canvas:t=$d(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:c=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:h=!1,outputBufferType:u=fn}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;let _=u,m=new Set([ea,Qo,jo]),f=new Set([fn,In,Ms,ws,Jo,Ko]),M=new Uint32Array(4),A=new Int32Array(4),I=new B,D=null,S=null,R=[],y=[],C=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,w=!1,F=null;this._outputColorSpace=an;let G=0,$=0,O=null,H=-1,X=null,re=new Dt,ce=new Dt,me=null,we=new Ge(0),Ce=0,je=t.width,rt=t.height,K=1,L=null,j=null,ie=new Dt(0,0,je,rt),Ie=new Dt(0,0,je,rt),Fe=!1,De=new ps,We=!1,ge=!1,le=new bt,oe=new B,be=new Dt,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ze=!1;function ft(){return O===null?K:1}let N=n;function at(b,z){return t.getContext(b,z)}try{let b={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:d,preserveDrawingBuffer:c,powerPreference:p,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"184"}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",Ne,!1),t.addEventListener("webglcontextcreationerror",Je,!1),N===null){let z="webgl2";if(N=at(z,b),N===null)throw at(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw Ve("WebGLRenderer: "+b.message),b}let ze,Le,Y,Te,T,v,k,V,Q,se,te,J,ee,pe,xe,ue,de,Pe,qe,lt,U,fe,ne;function Se(){ze=new Fm(N),ze.init(),U=new S0(N,ze),Le=new Cm(N,ze,e,U),Y=new _0(N,ze),Le.reversedDepthBuffer&&h&&Y.buffers.depth.setReversed(!0),Te=new km(N),T=new o0,v=new b0(N,ze,Y,T,Le,U,Te),k=new Um(P),V=new Hh(N),fe=new Em(N,V),Q=new Om(N,V,Te,fe),se=new Vm(N,Q,V,fe,Te),Pe=new zm(N,Le,v),xe=new Im(T),te=new r0(P,k,ze,Le,fe,xe),J=new E0(P,T),ee=new l0,pe=new p0(ze),de=new Tm(P,k,Y,se,x,d),ue=new y0(P,se,Le),ne=new A0(N,Te,Le,Y),qe=new Am(N,ze,Te),lt=new Bm(N,ze,Te),Te.programs=te.programs,P.capabilities=Le,P.extensions=ze,P.properties=T,P.renderLists=ee,P.shadowMap=ue,P.state=Y,P.info=Te}Se(),_!==fn&&(C=new Gm(_,t.width,t.height,s,r));let ve=new vc(P,N);this.xr=ve,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let b=ze.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=ze.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(b){b!==void 0&&(K=b,this.setSize(je,rt,!1))},this.getSize=function(b){return b.set(je,rt)},this.setSize=function(b,z,Z=!0){if(ve.isPresenting){ke("WebGLRenderer: Can't change size while VR device is presenting.");return}je=b,rt=z,t.width=Math.floor(b*K),t.height=Math.floor(z*K),Z===!0&&(t.style.width=b+"px",t.style.height=z+"px"),C!==null&&C.setSize(t.width,t.height),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(je*K,rt*K).floor()},this.setDrawingBufferSize=function(b,z,Z){je=b,rt=z,K=Z,t.width=Math.floor(b*Z),t.height=Math.floor(z*Z),this.setViewport(0,0,b,z)},this.setEffects=function(b){if(_===fn){Ve("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let z=0;z<b.length;z++)if(b[z].isOutputPass===!0){ke("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(re)},this.getViewport=function(b){return b.copy(ie)},this.setViewport=function(b,z,Z,W){b.isVector4?ie.set(b.x,b.y,b.z,b.w):ie.set(b,z,Z,W),Y.viewport(re.copy(ie).multiplyScalar(K).round())},this.getScissor=function(b){return b.copy(Ie)},this.setScissor=function(b,z,Z,W){b.isVector4?Ie.set(b.x,b.y,b.z,b.w):Ie.set(b,z,Z,W),Y.scissor(ce.copy(Ie).multiplyScalar(K).round())},this.getScissorTest=function(){return Fe},this.setScissorTest=function(b){Y.setScissorTest(Fe=b)},this.setOpaqueSort=function(b){L=b},this.setTransparentSort=function(b){j=b},this.getClearColor=function(b){return b.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(b=!0,z=!0,Z=!0){let W=0;if(b){let q=!1;if(O!==null){let Me=O.texture.format;q=m.has(Me)}if(q){let Me=O.texture.type,Ae=f.has(Me),_e=de.getClearColor(),Re=de.getClearAlpha(),Oe=_e.r,Ke=_e.g,tt=_e.b;Ae?(M[0]=Oe,M[1]=Ke,M[2]=tt,M[3]=Re,N.clearBufferuiv(N.COLOR,0,M)):(A[0]=Oe,A[1]=Ke,A[2]=tt,A[3]=Re,N.clearBufferiv(N.COLOR,0,A))}else W|=N.COLOR_BUFFER_BIT}z&&(W|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),F=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",Ne,!1),t.removeEventListener("webglcontextcreationerror",Je,!1),de.dispose(),ee.dispose(),pe.dispose(),T.dispose(),k.dispose(),se.dispose(),fe.dispose(),ne.dispose(),te.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",Sc),ve.removeEventListener("sessionend",Mc),Ci.stop()};function ae(b){b.preventDefault(),Ws("WebGLRenderer: Context Lost."),w=!0}function Ne(){Ws("WebGLRenderer: Context Restored."),w=!1;let b=Te.autoReset,z=ue.enabled,Z=ue.autoUpdate,W=ue.needsUpdate,q=ue.type;Se(),Te.autoReset=b,ue.enabled=z,ue.autoUpdate=Z,ue.needsUpdate=W,ue.type=q}function Je(b){Ve("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ut(b){let z=b.target;z.removeEventListener("dispose",Ut),pt(z)}function pt(b){Zn(b),T.remove(b)}function Zn(b){let z=T.get(b).programs;z!==void 0&&(z.forEach(function(Z){te.releaseProgram(Z)}),b.isShaderMaterial&&te.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,Z,W,q,Me){z===null&&(z=Ye);let Ae=q.isMesh&&q.matrixWorld.determinant()<0,_e=Zu(b,z,Z,W,q);Y.setMaterial(W,Ae);let Re=Z.index,Oe=1;if(W.wireframe===!0){if(Re=Q.getWireframeAttribute(Z),Re===void 0)return;Oe=2}let Ke=Z.drawRange,tt=Z.attributes.position,Be=Ke.start*Oe,mt=(Ke.start+Ke.count)*Oe;Me!==null&&(Be=Math.max(Be,Me.start*Oe),mt=Math.min(mt,(Me.start+Me.count)*Oe)),Re!==null?(Be=Math.max(Be,0),mt=Math.min(mt,Re.count)):tt!=null&&(Be=Math.max(Be,0),mt=Math.min(mt,tt.count));let Ft=mt-Be;if(Ft<0||Ft===1/0)return;fe.setup(q,W,_e,Z,Re);let Lt,xt=qe;if(Re!==null&&(Lt=V.get(Re),xt=lt,xt.setIndex(Lt)),q.isMesh)W.wireframe===!0?(Y.setLineWidth(W.wireframeLinewidth*ft()),xt.setMode(N.LINES)):xt.setMode(N.TRIANGLES);else if(q.isLine){let Qt=W.linewidth;Qt===void 0&&(Qt=1),Y.setLineWidth(Qt*ft()),q.isLineSegments?xt.setMode(N.LINES):q.isLineLoop?xt.setMode(N.LINE_LOOP):xt.setMode(N.LINE_STRIP)}else q.isPoints?xt.setMode(N.POINTS):q.isSprite&&xt.setMode(N.TRIANGLES);if(q.isBatchedMesh)if(ze.get("WEBGL_multi_draw"))xt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Qt=q._multiDrawStarts,Ee=q._multiDrawCounts,pn=q._multiDrawCount,ut=Re?V.get(Re).bytesPerElement:1,_n=T.get(W).currentProgram.getUniforms();for(let Rn=0;Rn<pn;Rn++)_n.setValue(N,"_gl_DrawID",Rn),xt.render(Qt[Rn]/ut,Ee[Rn])}else if(q.isInstancedMesh)xt.renderInstances(Be,Ft,q.count);else if(Z.isInstancedBufferGeometry){let Qt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,Ee=Math.min(Z.instanceCount,Qt);xt.renderInstances(Be,Ft,Ee)}else xt.render(Be,Ft)};function Dn(b,z,Z){b.transparent===!0&&b.side===hn&&b.forceSinglePass===!1?(b.side=dn,b.needsUpdate=!0,Tr(b,z,Z),b.side=An,b.needsUpdate=!0,Tr(b,z,Z),b.side=hn):Tr(b,z,Z)}this.compile=function(b,z,Z=null){Z===null&&(Z=b),S=pe.get(Z),S.init(z),y.push(S),Z.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),b!==Z&&b.traverseVisible(function(q){q.isLight&&q.layers.test(z.layers)&&(S.pushLight(q),q.castShadow&&S.pushShadow(q))}),S.setupLights();let W=new Set;return b.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Me=q.material;if(Me)if(Array.isArray(Me))for(let Ae=0;Ae<Me.length;Ae++){let _e=Me[Ae];Dn(_e,Z,q),W.add(_e)}else Dn(Me,Z,q),W.add(Me)}),S=y.pop(),W},this.compileAsync=function(b,z,Z=null){let W=this.compile(b,z,Z);return new Promise(q=>{function Me(){if(W.forEach(function(Ae){T.get(Ae).currentProgram.isReady()&&W.delete(Ae)}),W.size===0){q(b);return}setTimeout(Me,10)}ze.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Va=null;function Yu(b){Va&&Va(b)}function Sc(){Ci.stop()}function Mc(){Ci.start()}let Ci=new wu;Ci.setAnimationLoop(Yu),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(b){Va=b,ve.setAnimationLoop(b),b===null?Ci.stop():Ci.start()},ve.addEventListener("sessionstart",Sc),ve.addEventListener("sessionend",Mc),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){Ve("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;F!==null&&F.renderStart(b,z);let Z=ve.enabled===!0&&ve.isPresenting===!0,W=C!==null&&(O===null||Z)&&C.begin(P,O);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(z),z=ve.getCamera()),b.isScene===!0&&b.onBeforeRender(P,b,z,O),S=pe.get(b,y.length),S.init(z),S.state.textureUnits=v.getTextureUnits(),y.push(S),le.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),De.setFromProjectionMatrix(le,En,z.reversedDepth),ge=this.localClippingEnabled,We=xe.init(this.clippingPlanes,ge),D=ee.get(b,R.length),D.init(),R.push(D),ve.enabled===!0&&ve.isPresenting===!0){let Ae=P.xr.getDepthSensingMesh();Ae!==null&&Ha(Ae,z,-1/0,P.sortObjects)}Ha(b,z,0,P.sortObjects),D.finish(),P.sortObjects===!0&&D.sort(L,j),Ze=ve.enabled===!1||ve.isPresenting===!1||ve.hasDepthSensing()===!1,Ze&&de.addToRenderList(D,b),this.info.render.frame++,We===!0&&xe.beginShadows();let q=S.state.shadowsArray;if(ue.render(q,b,z),We===!0&&xe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(W&&C.hasRenderPass())===!1){let Ae=D.opaque,_e=D.transmissive;if(S.setupLights(),z.isArrayCamera){let Re=z.cameras;if(_e.length>0)for(let Oe=0,Ke=Re.length;Oe<Ke;Oe++){let tt=Re[Oe];Tc(Ae,_e,b,tt)}Ze&&de.render(b);for(let Oe=0,Ke=Re.length;Oe<Ke;Oe++){let tt=Re[Oe];wc(D,b,tt,tt.viewport)}}else _e.length>0&&Tc(Ae,_e,b,z),Ze&&de.render(b),wc(D,b,z)}O!==null&&$===0&&(v.updateMultisampleRenderTarget(O),v.updateRenderTargetMipmap(O)),W&&C.end(P),b.isScene===!0&&b.onAfterRender(P,b,z),fe.resetDefaultState(),H=-1,X=null,y.pop(),y.length>0?(S=y[y.length-1],v.setTextureUnits(S.state.textureUnits),We===!0&&xe.setGlobalState(P.clippingPlanes,S.state.camera)):S=null,R.pop(),R.length>0?D=R[R.length-1]:D=null,F!==null&&F.renderEnd()};function Ha(b,z,Z,W){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLightProbeGrid)S.pushLightProbeGrid(b);else if(b.isLight)S.pushLight(b),b.castShadow&&S.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||De.intersectsSprite(b)){W&&be.setFromMatrixPosition(b.matrixWorld).applyMatrix4(le);let Ae=se.update(b),_e=b.material;_e.visible&&D.push(b,Ae,_e,Z,be.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||De.intersectsObject(b))){let Ae=se.update(b),_e=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),be.copy(b.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),be.copy(Ae.boundingSphere.center)),be.applyMatrix4(b.matrixWorld).applyMatrix4(le)),Array.isArray(_e)){let Re=Ae.groups;for(let Oe=0,Ke=Re.length;Oe<Ke;Oe++){let tt=Re[Oe],Be=_e[tt.materialIndex];Be&&Be.visible&&D.push(b,Ae,Be,Z,be.z,tt)}}else _e.visible&&D.push(b,Ae,_e,Z,be.z,null)}}let Me=b.children;for(let Ae=0,_e=Me.length;Ae<_e;Ae++)Ha(Me[Ae],z,Z,W)}function wc(b,z,Z,W){let{opaque:q,transmissive:Me,transparent:Ae}=b;S.setupLightsView(Z),We===!0&&xe.setGlobalState(P.clippingPlanes,Z),W&&Y.viewport(re.copy(W)),q.length>0&&wr(q,z,Z),Me.length>0&&wr(Me,z,Z),Ae.length>0&&wr(Ae,z,Z),Y.buffers.depth.setTest(!0),Y.buffers.depth.setMask(!0),Y.buffers.color.setMask(!0),Y.setPolygonOffset(!1)}function Tc(b,z,Z,W){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(S.state.transmissionRenderTarget[W.id]===void 0){let Be=ze.has("EXT_color_buffer_half_float")||ze.has("EXT_color_buffer_float");S.state.transmissionRenderTarget[W.id]=new vn(1,1,{generateMipmaps:!0,type:Be?Xn:fn,minFilter:Mi,samples:Math.max(4,Le.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ot.workingColorSpace})}let Me=S.state.transmissionRenderTarget[W.id],Ae=W.viewport||re;Me.setSize(Ae.z*P.transmissionResolutionScale,Ae.w*P.transmissionResolutionScale);let _e=P.getRenderTarget(),Re=P.getActiveCubeFace(),Oe=P.getActiveMipmapLevel();P.setRenderTarget(Me),P.getClearColor(we),Ce=P.getClearAlpha(),Ce<1&&P.setClearColor(16777215,.5),P.clear(),Ze&&de.render(Z);let Ke=P.toneMapping;P.toneMapping=Cn;let tt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),S.setupLightsView(W),We===!0&&xe.setGlobalState(P.clippingPlanes,W),wr(b,Z,W),v.updateMultisampleRenderTarget(Me),v.updateRenderTargetMipmap(Me),ze.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let mt=0,Ft=z.length;mt<Ft;mt++){let Lt=z[mt],{object:xt,geometry:Qt,material:Ee,group:pn}=Lt;if(Ee.side===hn&&xt.layers.test(W.layers)){let ut=Ee.side;Ee.side=dn,Ee.needsUpdate=!0,Ec(xt,Z,W,Qt,Ee,pn),Ee.side=ut,Ee.needsUpdate=!0,Be=!0}}Be===!0&&(v.updateMultisampleRenderTarget(Me),v.updateRenderTargetMipmap(Me))}P.setRenderTarget(_e,Re,Oe),P.setClearColor(we,Ce),tt!==void 0&&(W.viewport=tt),P.toneMapping=Ke}function wr(b,z,Z){let W=z.isScene===!0?z.overrideMaterial:null;for(let q=0,Me=b.length;q<Me;q++){let Ae=b[q],{object:_e,geometry:Re,group:Oe}=Ae,Ke=Ae.material;Ke.allowOverride===!0&&W!==null&&(Ke=W),_e.layers.test(Z.layers)&&Ec(_e,z,Z,Re,Ke,Oe)}}function Ec(b,z,Z,W,q,Me){b.onBeforeRender(P,z,Z,W,q,Me),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),q.onBeforeRender(P,z,Z,W,b,Me),q.transparent===!0&&q.side===hn&&q.forceSinglePass===!1?(q.side=dn,q.needsUpdate=!0,P.renderBufferDirect(Z,z,W,q,b,Me),q.side=An,q.needsUpdate=!0,P.renderBufferDirect(Z,z,W,q,b,Me),q.side=hn):P.renderBufferDirect(Z,z,W,q,b,Me),b.onAfterRender(P,z,Z,W,q,Me)}function Tr(b,z,Z){z.isScene!==!0&&(z=Ye);let W=T.get(b),q=S.state.lights,Me=S.state.shadowsArray,Ae=q.state.version,_e=te.getParameters(b,q.state,Me,z,Z,S.state.lightProbeGridArray),Re=te.getProgramCacheKey(_e),Oe=W.programs;W.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?z.environment:null,W.fog=z.fog;let Ke=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;W.envMap=k.get(b.envMap||W.environment,Ke),W.envMapRotation=W.environment!==null&&b.envMap===null?z.environmentRotation:b.envMapRotation,Oe===void 0&&(b.addEventListener("dispose",Ut),Oe=new Map,W.programs=Oe);let tt=Oe.get(Re);if(tt!==void 0){if(W.currentProgram===tt&&W.lightsStateVersion===Ae)return Cc(b,_e),tt}else _e.uniforms=te.getUniforms(b),F!==null&&b.isNodeMaterial&&F.build(b,Z,_e),b.onBeforeCompile(_e,P),tt=te.acquireProgram(_e,Re),Oe.set(Re,tt),W.uniforms=_e.uniforms;let Be=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Be.clippingPlanes=xe.uniform),Cc(b,_e),W.needsLights=Ku(b),W.lightsStateVersion=Ae,W.needsLights&&(Be.ambientLightColor.value=q.state.ambient,Be.lightProbe.value=q.state.probe,Be.directionalLights.value=q.state.directional,Be.directionalLightShadows.value=q.state.directionalShadow,Be.spotLights.value=q.state.spot,Be.spotLightShadows.value=q.state.spotShadow,Be.rectAreaLights.value=q.state.rectArea,Be.ltc_1.value=q.state.rectAreaLTC1,Be.ltc_2.value=q.state.rectAreaLTC2,Be.pointLights.value=q.state.point,Be.pointLightShadows.value=q.state.pointShadow,Be.hemisphereLights.value=q.state.hemi,Be.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Be.spotLightMatrix.value=q.state.spotLightMatrix,Be.spotLightMap.value=q.state.spotLightMap,Be.pointShadowMatrix.value=q.state.pointShadowMatrix),W.lightProbeGrid=S.state.lightProbeGridArray.length>0,W.currentProgram=tt,W.uniformsList=null,tt}function Ac(b){if(b.uniformsList===null){let z=b.currentProgram.getUniforms();b.uniformsList=Es.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function Cc(b,z){let Z=T.get(b);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.batchingColor=z.batchingColor,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function $u(b,z){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;I.setFromMatrixPosition(z.matrixWorld);for(let Z=0,W=b.length;Z<W;Z++){let q=b[Z];if(q.texture!==null&&q.boundingBox.containsPoint(I))return q}return null}function Zu(b,z,Z,W,q){z.isScene!==!0&&(z=Ye),v.resetTextureUnits();let Me=z.fog,Ae=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?z.environment:null,_e=O===null?P.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ot.workingColorSpace,Re=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Oe=k.get(W.envMap||Ae,Re),Ke=W.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,tt=!!Z.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Be=!!Z.morphAttributes.position,mt=!!Z.morphAttributes.normal,Ft=!!Z.morphAttributes.color,Lt=Cn;W.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Lt=P.toneMapping);let xt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Qt=xt!==void 0?xt.length:0,Ee=T.get(W),pn=S.state.lights;if(We===!0&&(ge===!0||b!==X)){let Mt=b===X&&W.id===H;xe.setState(W,b,Mt)}let ut=!1;W.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==pn.state.version||Ee.outputColorSpace!==_e||q.isBatchedMesh&&Ee.batching===!1||!q.isBatchedMesh&&Ee.batching===!0||q.isBatchedMesh&&Ee.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Ee.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Ee.instancing===!1||!q.isInstancedMesh&&Ee.instancing===!0||q.isSkinnedMesh&&Ee.skinning===!1||!q.isSkinnedMesh&&Ee.skinning===!0||q.isInstancedMesh&&Ee.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Ee.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Ee.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Ee.instancingMorph===!1&&q.morphTexture!==null||Ee.envMap!==Oe||W.fog===!0&&Ee.fog!==Me||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==xe.numPlanes||Ee.numIntersection!==xe.numIntersection)||Ee.vertexAlphas!==Ke||Ee.vertexTangents!==tt||Ee.morphTargets!==Be||Ee.morphNormals!==mt||Ee.morphColors!==Ft||Ee.toneMapping!==Lt||Ee.morphTargetsCount!==Qt||!!Ee.lightProbeGrid!=S.state.lightProbeGridArray.length>0)&&(ut=!0):(ut=!0,Ee.__version=W.version);let _n=Ee.currentProgram;ut===!0&&(_n=Tr(W,z,q),F&&W.isNodeMaterial&&F.onUpdateProgram(W,_n,Ee));let Rn=!1,si=!1,Gi=!1,vt=_n.getUniforms(),Ot=Ee.uniforms;if(Y.useProgram(_n.program)&&(Rn=!0,si=!0,Gi=!0),W.id!==H&&(H=W.id,si=!0),Ee.needsLights){let Mt=$u(S.state.lightProbeGridArray,q);Ee.lightProbeGrid!==Mt&&(Ee.lightProbeGrid=Mt,si=!0)}if(Rn||X!==b){Y.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),vt.setValue(N,"projectionMatrix",b.projectionMatrix),vt.setValue(N,"viewMatrix",b.matrixWorldInverse);let oi=vt.map.cameraPosition;oi!==void 0&&oi.setValue(N,oe.setFromMatrixPosition(b.matrixWorld)),Le.logarithmicDepthBuffer&&vt.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&vt.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),X!==b&&(X=b,si=!0,Gi=!0)}if(Ee.needsLights&&(pn.state.directionalShadowMap.length>0&&vt.setValue(N,"directionalShadowMap",pn.state.directionalShadowMap,v),pn.state.spotShadowMap.length>0&&vt.setValue(N,"spotShadowMap",pn.state.spotShadowMap,v),pn.state.pointShadowMap.length>0&&vt.setValue(N,"pointShadowMap",pn.state.pointShadowMap,v)),q.isSkinnedMesh){vt.setOptional(N,q,"bindMatrix"),vt.setOptional(N,q,"bindMatrixInverse");let Mt=q.skeleton;Mt&&(Mt.boneTexture===null&&Mt.computeBoneTexture(),vt.setValue(N,"boneTexture",Mt.boneTexture,v))}q.isBatchedMesh&&(vt.setOptional(N,q,"batchingTexture"),vt.setValue(N,"batchingTexture",q._matricesTexture,v),vt.setOptional(N,q,"batchingIdTexture"),vt.setValue(N,"batchingIdTexture",q._indirectTexture,v),vt.setOptional(N,q,"batchingColorTexture"),q._colorsTexture!==null&&vt.setValue(N,"batchingColorTexture",q._colorsTexture,v));let ri=Z.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0)&&Pe.update(q,Z,_n),(si||Ee.receiveShadow!==q.receiveShadow)&&(Ee.receiveShadow=q.receiveShadow,vt.setValue(N,"receiveShadow",q.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&z.environment!==null&&(Ot.envMapIntensity.value=z.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=I0()),si){if(vt.setValue(N,"toneMappingExposure",P.toneMappingExposure),Ee.needsLights&&Ju(Ot,Gi),Me&&W.fog===!0&&J.refreshFogUniforms(Ot,Me),J.refreshMaterialUniforms(Ot,W,K,rt,S.state.transmissionRenderTarget[b.id]),Ee.needsLights&&Ee.lightProbeGrid){let Mt=Ee.lightProbeGrid;Ot.probesSH.value=Mt.texture,Ot.probesMin.value.copy(Mt.boundingBox.min),Ot.probesMax.value.copy(Mt.boundingBox.max),Ot.probesResolution.value.copy(Mt.resolution)}Es.upload(N,Ac(Ee),Ot,v)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Es.upload(N,Ac(Ee),Ot,v),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&vt.setValue(N,"center",q.center),vt.setValue(N,"modelViewMatrix",q.modelViewMatrix),vt.setValue(N,"normalMatrix",q.normalMatrix),vt.setValue(N,"modelMatrix",q.matrixWorld),W.uniformsGroups!==void 0){let Mt=W.uniformsGroups;for(let oi=0,Wi=Mt.length;oi<Wi;oi++){let Ic=Mt[oi];ne.update(Ic,_n),ne.bind(Ic,_n)}}return _n}function Ju(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function Ku(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(b,z,Z){let W=T.get(b);W.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),T.get(b.texture).__webglTexture=z,T.get(b.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:Z,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,z){let Z=T.get(b);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0};let ju=N.createFramebuffer();this.setRenderTarget=function(b,z=0,Z=0){O=b,G=z,$=Z;let W=null,q=!1,Me=!1;if(b){let _e=T.get(b);if(_e.__useDefaultFramebuffer!==void 0){Y.bindFramebuffer(N.FRAMEBUFFER,_e.__webglFramebuffer),re.copy(b.viewport),ce.copy(b.scissor),me=b.scissorTest,Y.viewport(re),Y.scissor(ce),Y.setScissorTest(me),H=-1;return}else if(_e.__webglFramebuffer===void 0)v.setupRenderTarget(b);else if(_e.__hasExternalTextures)v.rebindTextures(b,T.get(b.texture).__webglTexture,T.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let Ke=b.depthTexture;if(_e.__boundDepthTexture!==Ke){if(Ke!==null&&T.has(Ke)&&(b.width!==Ke.image.width||b.height!==Ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");v.setupDepthRenderbuffer(b)}}let Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(Me=!0);let Oe=T.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Oe[z])?W=Oe[z][Z]:W=Oe[z],q=!0):b.samples>0&&v.useMultisampledRTT(b)===!1?W=T.get(b).__webglMultisampledFramebuffer:Array.isArray(Oe)?W=Oe[Z]:W=Oe,re.copy(b.viewport),ce.copy(b.scissor),me=b.scissorTest}else re.copy(ie).multiplyScalar(K).floor(),ce.copy(Ie).multiplyScalar(K).floor(),me=Fe;if(Z!==0&&(W=ju),Y.bindFramebuffer(N.FRAMEBUFFER,W)&&Y.drawBuffers(b,W),Y.viewport(re),Y.scissor(ce),Y.setScissorTest(me),q){let _e=T.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,_e.__webglTexture,Z)}else if(Me){let _e=z;for(let Re=0;Re<b.textures.length;Re++){let Oe=T.get(b.textures[Re]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+Re,Oe.__webglTexture,Z,_e)}}else if(b!==null&&Z!==0){let _e=T.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_e.__webglTexture,Z)}H=-1},this.readRenderTargetPixels=function(b,z,Z,W,q,Me,Ae,_e=0){if(!(b&&b.isWebGLRenderTarget)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=T.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Re=Re[Ae]),Re){Y.bindFramebuffer(N.FRAMEBUFFER,Re);try{let Oe=b.textures[_e],Ke=Oe.format,tt=Oe.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_e),!Le.textureFormatReadable(Ke)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Le.textureTypeReadable(tt)){Ve("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-W&&Z>=0&&Z<=b.height-q&&N.readPixels(z,Z,W,q,U.convert(Ke),U.convert(tt),Me)}finally{let Oe=O!==null?T.get(O).__webglFramebuffer:null;Y.bindFramebuffer(N.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(b,z,Z,W,q,Me,Ae,_e=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=T.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ae!==void 0&&(Re=Re[Ae]),Re)if(z>=0&&z<=b.width-W&&Z>=0&&Z<=b.height-q){Y.bindFramebuffer(N.FRAMEBUFFER,Re);let Oe=b.textures[_e],Ke=Oe.format,tt=Oe.type;if(b.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+_e),!Le.textureFormatReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Le.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Be=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Be),N.bufferData(N.PIXEL_PACK_BUFFER,Me.byteLength,N.STREAM_READ),N.readPixels(z,Z,W,q,U.convert(Ke),U.convert(tt),0);let mt=O!==null?T.get(O).__webglFramebuffer:null;Y.bindFramebuffer(N.FRAMEBUFFER,mt);let Ft=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Jd(N,Ft,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Be),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Me),N.deleteBuffer(Be),N.deleteSync(Ft),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,z=null,Z=0){let W=Math.pow(2,-Z),q=Math.floor(b.image.width*W),Me=Math.floor(b.image.height*W),Ae=z!==null?z.x:0,_e=z!==null?z.y:0;v.setTexture2D(b,0),N.copyTexSubImage2D(N.TEXTURE_2D,Z,0,0,Ae,_e,q,Me),Y.unbindTexture()};let Qu=N.createFramebuffer(),eh=N.createFramebuffer();this.copyTextureToTexture=function(b,z,Z=null,W=null,q=0,Me=0){let Ae,_e,Re,Oe,Ke,tt,Be,mt,Ft,Lt=b.isCompressedTexture?b.mipmaps[Me]:b.image;if(Z!==null)Ae=Z.max.x-Z.min.x,_e=Z.max.y-Z.min.y,Re=Z.isBox3?Z.max.z-Z.min.z:1,Oe=Z.min.x,Ke=Z.min.y,tt=Z.isBox3?Z.min.z:0;else{let Ot=Math.pow(2,-q);Ae=Math.floor(Lt.width*Ot),_e=Math.floor(Lt.height*Ot),b.isDataArrayTexture?Re=Lt.depth:b.isData3DTexture?Re=Math.floor(Lt.depth*Ot):Re=1,Oe=0,Ke=0,tt=0}W!==null?(Be=W.x,mt=W.y,Ft=W.z):(Be=0,mt=0,Ft=0);let xt=U.convert(z.format),Qt=U.convert(z.type),Ee;z.isData3DTexture?(v.setTexture3D(z,0),Ee=N.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(v.setTexture2DArray(z,0),Ee=N.TEXTURE_2D_ARRAY):(v.setTexture2D(z,0),Ee=N.TEXTURE_2D),Y.activeTexture(N.TEXTURE0),Y.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,z.flipY),Y.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),Y.pixelStorei(N.UNPACK_ALIGNMENT,z.unpackAlignment);let pn=Y.getParameter(N.UNPACK_ROW_LENGTH),ut=Y.getParameter(N.UNPACK_IMAGE_HEIGHT),_n=Y.getParameter(N.UNPACK_SKIP_PIXELS),Rn=Y.getParameter(N.UNPACK_SKIP_ROWS),si=Y.getParameter(N.UNPACK_SKIP_IMAGES);Y.pixelStorei(N.UNPACK_ROW_LENGTH,Lt.width),Y.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Lt.height),Y.pixelStorei(N.UNPACK_SKIP_PIXELS,Oe),Y.pixelStorei(N.UNPACK_SKIP_ROWS,Ke),Y.pixelStorei(N.UNPACK_SKIP_IMAGES,tt);let Gi=b.isDataArrayTexture||b.isData3DTexture,vt=z.isDataArrayTexture||z.isData3DTexture;if(b.isDepthTexture){let Ot=T.get(b),ri=T.get(z),Mt=T.get(Ot.__renderTarget),oi=T.get(ri.__renderTarget);Y.bindFramebuffer(N.READ_FRAMEBUFFER,Mt.__webglFramebuffer),Y.bindFramebuffer(N.DRAW_FRAMEBUFFER,oi.__webglFramebuffer);for(let Wi=0;Wi<Re;Wi++)Gi&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(b).__webglTexture,q,tt+Wi),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,T.get(z).__webglTexture,Me,Ft+Wi)),N.blitFramebuffer(Oe,Ke,Ae,_e,Be,mt,Ae,_e,N.DEPTH_BUFFER_BIT,N.NEAREST);Y.bindFramebuffer(N.READ_FRAMEBUFFER,null),Y.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(q!==0||b.isRenderTargetTexture||T.has(b)){let Ot=T.get(b),ri=T.get(z);Y.bindFramebuffer(N.READ_FRAMEBUFFER,Qu),Y.bindFramebuffer(N.DRAW_FRAMEBUFFER,eh);for(let Mt=0;Mt<Re;Mt++)Gi?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ot.__webglTexture,q,tt+Mt):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Ot.__webglTexture,q),vt?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ri.__webglTexture,Me,Ft+Mt):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ri.__webglTexture,Me),q!==0?N.blitFramebuffer(Oe,Ke,Ae,_e,Be,mt,Ae,_e,N.COLOR_BUFFER_BIT,N.NEAREST):vt?N.copyTexSubImage3D(Ee,Me,Be,mt,Ft+Mt,Oe,Ke,Ae,_e):N.copyTexSubImage2D(Ee,Me,Be,mt,Oe,Ke,Ae,_e);Y.bindFramebuffer(N.READ_FRAMEBUFFER,null),Y.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else vt?b.isDataTexture||b.isData3DTexture?N.texSubImage3D(Ee,Me,Be,mt,Ft,Ae,_e,Re,xt,Qt,Lt.data):z.isCompressedArrayTexture?N.compressedTexSubImage3D(Ee,Me,Be,mt,Ft,Ae,_e,Re,xt,Lt.data):N.texSubImage3D(Ee,Me,Be,mt,Ft,Ae,_e,Re,xt,Qt,Lt):b.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,Me,Be,mt,Ae,_e,xt,Qt,Lt.data):b.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,Me,Be,mt,Lt.width,Lt.height,xt,Lt.data):N.texSubImage2D(N.TEXTURE_2D,Me,Be,mt,Ae,_e,xt,Qt,Lt);Y.pixelStorei(N.UNPACK_ROW_LENGTH,pn),Y.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ut),Y.pixelStorei(N.UNPACK_SKIP_PIXELS,_n),Y.pixelStorei(N.UNPACK_SKIP_ROWS,Rn),Y.pixelStorei(N.UNPACK_SKIP_IMAGES,si),Me===0&&z.generateMipmaps&&N.generateMipmap(Ee),Y.unbindTexture()},this.initRenderTarget=function(b){T.get(b).__webglFramebuffer===void 0&&v.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?v.setTextureCube(b,0):b.isData3DTexture?v.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?v.setTexture2DArray(b,0):v.setTexture2D(b,0),Y.unbindTexture()},this.resetState=function(){G=0,$=0,O=null,Y.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ot._getDrawingBufferColorSpace(e),t.unpackColorSpace=ot._getUnpackColorSpace()}};var D0="/api/plugins/mnemosyne-native-dashboard",zt=i=>`rgba(234,234,234,${i})`,Du=.45,Ru=4,Lu=52,R0=46,L0=340,yc=820,N0=660,Nu=i=>i==="neural"?{bg:"#06100f",bgVec:new Ge(397327),core:new Ge(2261615).multiplyScalar(.28),star:new Ge(6744262),memory:new Ge(16736087),edge:new Ge(5428917),edgeMemory:new Ge(16736087),edgeHot:new Ge(5959364),text:"#f6fbf7"}:{bg:"#050711",bgVec:new Ge(329489),core:new Ge(6674175).multiplyScalar(.14),star:new Ge(6674175),memory:new Ge(16769162),edge:new Ge(13033727),edgeMemory:new Ge(16769162),edgeHot:new Ge(6674175),text:"#f7f8ff"},U0=(i,e=22)=>i.length>e?`${i.slice(0,e-3)}...`:i,F0=i=>{let e=String(i||"").replace(/^memory:/,"mem ");return/^[A-Z][A-Z_\s-]{2,}$/.test(e)?e.toLowerCase().replace(/(^|[_\s-])([a-z])/g,(t,n,s)=>(n==="_"?" ":n)+s.toUpperCase()):e},O0=i=>{let e=(i.match(/[A-Za-z]/g)||[]).length;return/^[a-f0-9]{10,}$/i.test(i)||/^mem\s+[a-f0-9]{6,}$/i.test(i)||e<4};function B0(i,e){let t=e==="neural"?170:160,n=e==="neural"?340:300,s=(i?.nodes||[]).slice(0,t),r=new Set(s.map(m=>m.id)),o=(i?.edges||[]).filter(m=>r.has(m.source)&&r.has(m.target)).slice(0,n),l=[...new Set(s.map(m=>String(m.category||"Other")))],d=Object.fromEntries(l.map((m,f)=>[m,f])),c=new Map;o.forEach(m=>{c.set(m.source,(c.get(m.source)||0)+1),c.set(m.target,(c.get(m.target)||0)+1)});let p=l.map((m,f)=>{let M=l.length===1?0:f/Math.max(1,l.length-1)*2-1,A=-Math.PI/2+f*2.399963,I=Math.sqrt(Math.max(0,1-M*M));return{label:m,angle:A,cx:Math.cos(A)*I*230,cy:M*150+Math.sin(A*.7)*24,cz:Math.sin(A)*I*190+(f%2===0?-28:28),spread:78+f%4*12}}),g=Object.fromEntries(p.map(m=>[m.label,m])),h=s.map((m,f)=>{let M=String(m.category||"Other"),A=Number(d[M]||0),I=Math.max(1,Number(m.weight||m.count||1)),D=0,S=0,R=0;if(e==="neural"){let G=g[M]||p[0]||{cx:0,cy:0,cz:0,angle:0},$=m.kind==="memory"?70+f%6*15+Math.min(42,Math.sqrt(I)*9):f%9*20,O=G.angle+f*2.399963+A*.18,H=((f*43+A*17)%97+.5)/97*2-1,X=Math.sqrt(Math.max(0,1-H*H));D=G.cx+Math.cos(O)*X*$,S=G.cy+H*$*.82,R=G.cz+Math.sin(O)*X*$*.86}else{let G=f/Math.max(s.length,1)*Math.PI*2+A*.62,$=m.kind==="memory"?1.28:.72+A%4*.16,O=L0*$+f%7*16;D=Math.cos(G)*O,S=Math.sin(G*1.23)*(100+A%5*24)+(f*53%131-65)*.82,R=Math.sin(G)*O*.82+(f*97%181-90)*1.55+(A%5-2)*42}let y=c.get(m.id)||0,C=e==="neural"?.8:.54,F=Math.min(e==="neural"?30:22,(e==="neural"?8:4)+Math.sqrt(I+y)*(m.kind==="memory"?3.2:4.1))*C;return{...m,wx:D,wy:S,wz:R,radius:Math.max(4,F),twinkle:f%17/17,twinkleFreq:(e==="neural"?.0017:.00115)+f*31%90/1e5,twinkleAmp:.075+f*19%55/1e3}}),u=o.map(m=>({id:String(m.id||`${m.source}-${m.target}`),source:m.source,target:m.target,kind:m.kind})),_=Array.from({length:e==="neural"?80:160},(m,f)=>{let M=f%13===0,A=1800;return{x:f*73%1e3/1e3*A-A/2,y:f*191%680/680*A-A/2,z:f*137%1e3/1e3*A-A/2,r:.8+f*37%100/50,a:.12+f*29%100/(e==="neural"?340:240),phase:f*47%628/100,freq:M?.0058+f*41%80/1e5:48e-5+f*41%95/1e5}});return{nodes:h,edges:u,regions:p,stars:_}}var Ai=new Map,Cs=new Map;function k0(i,e){let t=`${i}|${e}`;if(Ai.has(t))return Cs.set(t,(Cs.get(t)||0)+1),Ai.get(t);let n=document.createElement("canvas"),s=n.getContext("2d"),r=26;s.font=`${r}px system-ui, sans-serif`;let o=Math.ceil(s.measureText(i).width)+24,l=r+16;n.width=o,n.height=l,s.font=`${r}px system-ui, sans-serif`,s.lineWidth=6,s.strokeStyle="rgba(0,0,0,0.82)",s.fillStyle=e,s.strokeText(i,12,r+2),s.fillText(i,12,r+2);let d=new xs(n);return d.needsUpdate=!0,Ai.set(t,d),Cs.set(t,1),d}function z0(i,e){let t=`${i}|${e}`,n=(Cs.get(t)||0)-1;n<=0?(Ai.get(t)?.dispose(),Ai.delete(t),Cs.delete(t)):Cs.set(t,n)}function V0(i,e){let t=`glow:${i}:${e}`;if(Ai.has(t))return Ai.get(t);let n=128,s=document.createElement("canvas");s.width=s.height=n;let r=s.getContext("2d"),o=r.createRadialGradient(n/2,n/2,0,n/2,n/2,n/2);o.addColorStop(0,"rgba(255,255,255,1)"),o.addColorStop(.18,i),o.addColorStop(.55,e?"rgba(255,180,80,0.35)":"rgba(100,200,255,0.2)"),o.addColorStop(1,"rgba(0,0,0,0)"),r.fillStyle=o,r.fillRect(0,0,n,n);let l=new xs(s);return l.needsUpdate=!0,Ai.set(t,l),l}var Uu=({onInspectMemory:i})=>{let e=Tt(null),t=Tt(null),n=Tt(null),s=Tt(null),r=Tt(null),o=Tt(null),l=Tt(new ur),d=Tt([]),c=Tt([]),p=Tt([]),g=Tt([]),h=Tt([]),u=Tt([]),x=Tt([]),_=Tt(null),m=Tt(null),f=Tt(null),M=Tt({spherical:new bs(yc,Math.PI/2-.34,-.42),panOffset:new B,zoom:1,autoRotate:!0,rotateSpeed:65e-5,dragMode:null,dragStart:new Xe,dragSphStart:new bs,dragPanStart:new B,pinchStartDist:0,pinchStartZoom:1,pointers:new Map,cameraMode:"rotate"}),[A,I]=he(!0),[D,S]=he(""),[R,y]=he(null),[C,P]=he(()=>window.localStorage.getItem("mnemosyne-dashboard-visualiser-mode")==="neural"?"neural":"constellation"),[w,F]=he(!1),[G,$]=he("rotate"),[O,H]=he(null),[X,re]=he(null),ce=Tt(C),me=Tt(w),we=Tt(null),Ce=Tt(null);it(()=>{ce.current=C},[C]),it(()=>{me.current=w},[w]),it(()=>{we.current=O},[O]),it(()=>{Ce.current=X},[X]),it(()=>{let ge=e.current;if(!ge)return;let le=new Oa({antialias:!0,alpha:!1,powerPreference:"high-performance"});le.setPixelRatio(Math.min(window.devicePixelRatio,2)),le.setSize(ge.clientWidth||1e3,ge.clientHeight||680),le.outputColorSpace=an,ge.appendChild(le.domElement),le.domElement.style.width="100%",le.domElement.style.height="100%",le.domElement.style.cursor="grab",n.current=le;let oe=new qs;s.current=oe;let be=new nn(Lu,(ge.clientWidth||1e3)/(ge.clientHeight||680),1,6e3);be.position.set(0,0,yc),r.current=be,oe.add(new cr(16777215,.6));let Ye=new lr(16777215,.5);Ye.position.set(200,400,300),oe.add(Ye);let Ze=new ir(1,1.12,48),ft=new Hn({color:16769162,side:hn,transparent:!0,opacity:.95,depthWrite:!1}),N=new Hn({color:16251135,side:hn,transparent:!0,opacity:.72,depthWrite:!1}),at=new Kt(Ze,ft),ze=new Kt(Ze.clone(),N);return at.visible=ze.visible=!1,at.renderOrder=ze.renderOrder=999,oe.add(at,ze),m.current=at,f.current=ze,()=>{o.current&&cancelAnimationFrame(o.current),le.dispose(),ge.contains(le.domElement)&&ge.removeChild(le.domElement),n.current=null,s.current=null,r.current=null}},[]),it(()=>{let ge=t.current;if(!ge)return;let le=new ResizeObserver(()=>{let oe=ge.clientWidth||1e3,be=ge.clientHeight||680,Ye=n.current,Ze=r.current;Ye&&Ye.setSize(oe,be,!1),Ze&&(Ze.aspect=oe/be,Ze.updateProjectionMatrix())});return le.observe(ge),()=>le.disconnect()},[]);let je=Ds(()=>{I(!0),S(""),st(`${D0}/constellation?limit=240`).then(ge=>y(ge)).catch(ge=>S(ge?.message||E("visualiser.loadError"))).finally(()=>I(!1))},[]);it(()=>{je()},[]);let rt=Ds(()=>{let ge=s.current;ge&&(g.current.forEach(le=>{ge.remove(le),le.geometry.dispose(),le.material.dispose()}),g.current=[],h.current.forEach(le=>{ge.remove(le),"geometry"in le&&le.geometry.dispose(),"material"in le&&le.material.dispose()}),h.current=[],u.current.forEach(le=>{ge.remove(le);let oe=le.userData.labelKey,be=le.userData.labelColor;oe&&be&&z0(oe,be),le.material.dispose()}),u.current=[],x.current.forEach(le=>{ge.remove(le),le.geometry.dispose(),le.material.dispose()}),x.current=[],_.current&&(ge.remove(_.current),_.current.geometry.dispose(),_.current.material.dispose(),_.current=null))},[]),K=Ds((ge,le)=>{let oe=s.current;if(!oe)return;rt();let{nodes:be,edges:Ye,regions:Ze,stars:ft}=B0(ge,le);d.current=be,c.current=Ye,p.current=Ze;let N=Nu(le);oe.background=N.bgVec;{let Le=new kt,Y=new Float32Array(ft.length*3),Te=new Float32Array(ft.length),T=new Float32Array(ft.length);ft.forEach((V,Q)=>{Y[Q*3]=V.x,Y[Q*3+1]=V.y,Y[Q*3+2]=V.z,Te[Q]=V.r,T[Q]=V.a}),Le.setAttribute("position",new Yt(Y,3)),Le.setAttribute("size",new Yt(Te,1)),Le.setAttribute("alpha",new Yt(T,1));let v=new cn({uniforms:{color:{value:N.star},time:{value:0}},vertexShader:`
          attribute float size;
          attribute float alpha;
          varying float vAlpha;
          void main() {
            vAlpha = alpha;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (350.0 / -mv.z);
            gl_Position  = projectionMatrix * mv;
          }
        `,fragmentShader:`
          uniform vec3 color;
          varying float vAlpha;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.0, d) * vAlpha;
            gl_FragColor = vec4(color, a);
          }
        `,transparent:!0,depthWrite:!1,blending:Wn}),k=new Js(Le,v);k.userData.starData=ft,oe.add(k),_.current=k}le==="neural"&&Ze.slice(0,10).forEach((Le,Y)=>{let Te=new ys(1,16,10),v=[5024670,6674175,16765286][Y%3],k=new Hn({color:v,transparent:!0,opacity:.055,side:An,depthWrite:!1,blending:Wn}),V=new Kt(Te,k);V.position.set(Le.cx,Le.cy,Le.cz);let Q=Le.spread*3.2,se=Le.spread*2,te=Le.spread*2.6;V.scale.set(Q,se,te),V.rotation.y=Le.angle*.42,oe.add(V),x.current.push(V);let J=new er(new ys(.72,10,6)),ee=new vi({color:Y%3===2?16769162:6674175,transparent:!0,opacity:.12,depthWrite:!1,blending:Wn}),pe=new gs(J,ee);pe.position.copy(V.position),pe.scale.copy(V.scale),pe.rotation.copy(V.rotation),oe.add(pe),x.current.push(pe)});{let Le={};be.forEach(V=>{Le[V.id]=V});let Y=new Map;Ye.forEach(V=>{Y.set(V.source,(Y.get(V.source)||0)+1),Y.set(V.target,(Y.get(V.target)||0)+1)});let Te=le==="neural"?260:200,T=6,v=new Map,k=0;for(let V of Ye){if(k>=Te)break;let Q=Le[V.source],se=Le[V.target];if(!Q||!se)continue;let te=v.get(V.source)||0,J=v.get(V.target)||0;if(te>=T||J>=T)continue;v.set(V.source,te+1),v.set(V.target,J+1),k++;let ee=V.kind==="memory"?N.edgeMemory:N.edge,pe=V.kind==="memory"?.42:.28;if(le==="neural"){let xe=new B(Q.wx,Q.wy,Q.wz),ue=new B(se.wx,se.wy,se.wz),de=xe.clone().add(ue).multiplyScalar(.5),Pe=new B(-(ue.y-xe.y),ue.x-xe.x,0).normalize(),qe=Math.min(48,xe.distanceTo(ue)*.16)*(V.id.length%2?1:-1);de.addScaledVector(Pe,qe);let U=new tr(xe,de,ue).getPoints(20),fe=new kt().setFromPoints(U),ne=new vi({color:ee,transparent:!0,opacity:pe,depthWrite:!1,blending:Wn}),Se=new ms(fe,ne);Se.renderOrder=1,oe.add(Se),h.current.push(Se)}else{let xe=[new B(Q.wx,Q.wy,Q.wz),new B(se.wx,se.wy,se.wz)],ue=new kt().setFromPoints(xe),de=new sr({color:ee,transparent:!0,opacity:pe,dashSize:8,gapSize:10,depthWrite:!1,blending:Wn}),Pe=new gs(ue,de);Pe.computeLineDistances(),Pe.renderOrder=1,oe.add(Pe),h.current.push(Pe)}}}{let Le={};be.forEach(Te=>{Le[Te.id]=Te});let Y=new Map;Ye.forEach(Te=>{Y.set(Te.source,(Y.get(Te.source)||0)+1),Y.set(Te.target,(Y.get(Te.target)||0)+1)}),be.forEach((Te,T)=>{let v=Te.kind==="memory",k=Math.max(1,Number(Te.weight||Te.count||1)),V=v?`#${N.memory.getHexString()}`:`#${N.star.getHexString()}`,Q=V0(V,v),se=new Bi({map:Q,transparent:!0,depthWrite:!1,blending:Wn,opacity:v?.88:.75}),te=new fs(se);te.position.set(Te.wx,Te.wy,Te.wz);let J=Te.radius*(v?4.5:3.4);te.scale.set(J,J,1),te.renderOrder=2,te.userData.nodeId=Te.id,te.userData.nodeIndex=T,te.userData.isGlow=!0,oe.add(te),g.current.push(te);let ee=new Qs(Te.radius*.38,16),pe=new Hn({color:16777215,transparent:!0,opacity:.97,depthWrite:!1,side:hn}),xe=new Kt(ee,pe);xe.position.set(Te.wx,Te.wy,Te.wz),xe.renderOrder=3,xe.userData.nodeId=Te.id,xe.userData.nodeIndex=T,xe.userData.isCore=!0,xe.userData.weight=k,oe.add(xe),g.current.push(xe)})}{let Le=new Map;Ye.forEach(Y=>{Le.set(Y.source,(Le.get(Y.source)||0)+1),Le.set(Y.target,(Le.get(Y.target)||0)+1)}),be.forEach(Y=>{let Te=F0(Y.label||"");if(O0(Te))return;let T=Math.max(1,Number(Y.weight||Y.count||1)),v=Le.get(Y.id)||0;if(Math.log1p(T)*.52+Math.log1p(v)*.38+(Y.kind!=="memory"?.9:.1)<1.8)return;let V=U0(Te),Q=k0(V,N.text),se=new Bi({map:Q,transparent:!0,depthWrite:!1}),te=new fs(se),J=Q.image.width/Q.image.height,ee=Y.radius*3.2*J,pe=Y.radius*3.2;te.scale.set(ee,pe,1),te.position.set(Y.wx+Y.radius*1.8,Y.wy+Y.radius*.6,Y.wz),te.renderOrder=4,te.userData.labelKey=V,te.userData.labelColor=N.text,te.userData.nodeId=Y.id,oe.add(te),u.current.push(te)})}let at=m.current,ze=f.current;at&&(at.visible=!1),ze&&(ze.visible=!1)},[rt]),L=Ds((ge=ce.current)=>{let le=M.current,oe=ge==="neural"?N0:yc;le.spherical.set(oe,Math.PI/2-.34,-.42),le.panOffset.set(0,0,0),le.zoom=1,le.autoRotate=!0;let be=r.current;be&&(be.fov=ge==="neural"?R0:Lu,be.updateProjectionMatrix()),F(!1),me.current=!1},[]);it(()=>{R&&(window.localStorage.setItem("mnemosyne-dashboard-visualiser-mode",C),K(R,C),L(C),H(null),re(null))},[R,C,K,L]),it(()=>{if(A||D||!R)return;let ge=n.current,le=s.current,oe=r.current;if(!ge||!le||!oe)return;let be=M.current,Ye,Ze=()=>{Ye=requestAnimationFrame(Ze),o.current=Ye;let ft=l.current.getElapsedTime()*1e3,N=l.current.getDelta()*1e3,at=ce.current;if(!me.current&&be.dragMode===null&&be.autoRotate){let te=at==="neural"?32e-6:65e-6;be.spherical.theta+=N*te}let ze=be.spherical.radius*be.zoom,Le=Math.max(.15,Math.min(Math.PI-.15,be.spherical.phi)),Y=ze*Math.sin(Le)*Math.sin(be.spherical.theta),Te=ze*Math.cos(Le),T=ze*Math.sin(Le)*Math.cos(be.spherical.theta);oe.position.set(Y,Te,T).add(be.panOffset),oe.lookAt(be.panOffset);let v=d.current;if(g.current.forEach(te=>{if(!te.userData.isGlow)return;let J=te.userData.nodeIndex,ee=v[J];if(!ee)return;let pe=1+Math.sin(ft*ee.twinkleFreq+ee.twinkle*6.28)*ee.twinkleAmp,xe=te.scale.x/pe,de=ee.radius*(ee.kind==="memory"?4.5:3.4)*pe;te.scale.set(de,de,1)}),_.current){let te=_.current.material;te.uniforms.time.value=ft*.001}g.current.forEach(te=>{te.userData.isCore&&te.quaternion.copy(oe.quaternion)});let k=we.current,V=Ce.current,Q=m.current,se=f.current;if(Q)if(k){Q.visible=!0,Q.position.set(k.wx,k.wy,k.wz),Q.quaternion.copy(oe.quaternion);let te=k.radius*2.6;Q.scale.set(te,te,te)}else Q.visible=!1;if(se)if(V&&V.id!==k?.id){se.visible=!0,se.position.set(V.wx,V.wy,V.wz),se.quaternion.copy(oe.quaternion);let te=V.radius*2.6;se.scale.set(te,te,te)}else se.visible=!1;ge.render(le,oe)};return Ze(),()=>{cancelAnimationFrame(Ye)}},[R,A,D]),it(()=>{if(A||D||!R)return;let ge=e.current,le=n.current?.domElement;if(!ge||!le)return;let oe=M.current,be=new dr;be.params.Points.threshold=8;let Ye=(Y,Te)=>{let T=le.getBoundingClientRect();return new Xe((Y-T.left)/T.width*2-1,-((Te-T.top)/T.height)*2+1)},Ze=(Y,Te)=>{let T=r.current;if(!T)return null;let v=Ye(Y,Te);be.setFromCamera(v,T);let k=d.current,V={};k.forEach(Pe=>{V[Pe.id]=Pe});let Q=g.current.filter(Pe=>Pe.userData.isCore),se=be.intersectObjects(Q);if(se.length>0){let Pe=se[0].object.userData.nodeId;return V[Pe]||null}let te=le.getBoundingClientRect(),J=Y-te.left,ee=Te-te.top,pe=te.width,xe=te.height,ue=null,de=1/0;for(let Pe of k){let qe=new B(Pe.wx,Pe.wy,Pe.wz).project(T),lt=(qe.x+1)/2*pe,U=(1-(qe.y+1)/2)*xe,fe=Math.hypot(lt-J,U-ee),ne=Math.max(18,Pe.radius*2.2);fe<ne&&fe<de&&(ue=Pe,de=fe)}return ue},ft=Y=>{Y.preventDefault();let Te=Math.exp(-Y.deltaY*.0012);oe.zoom=Math.max(Du,Math.min(Ru,oe.zoom*Te))},N=Y=>{Y.cancelable&&Y.preventDefault();try{le.setPointerCapture(Y.pointerId)}catch{}oe.pointers.set(Y.pointerId,new Xe(Y.clientX,Y.clientY)),oe.pointers.size===1&&(oe.dragMode=oe.cameraMode==="pan"||Y.shiftKey||Y.button===1||Y.button===2?"pan":"rotate",oe.dragStart.set(Y.clientX,Y.clientY),oe.dragSphStart.copy(oe.spherical),oe.dragPanStart.copy(oe.panOffset)),le.style.cursor="grabbing"},at=Y=>{if(oe.pointers.set(Y.pointerId,new Xe(Y.clientX,Y.clientY)),oe.pointers.size===2){let v=[...oe.pointers.values()],k=v[0].distanceTo(v[1]);oe.pinchStartDist===0?(oe.pinchStartDist=k,oe.pinchStartZoom=oe.zoom):oe.zoom=Math.max(Du,Math.min(Ru,oe.pinchStartZoom*(k/oe.pinchStartDist)));return}if(oe.dragMode===null){let v=Ze(Y.clientX,Y.clientY);v?.id!==Ce.current?.id&&(Ce.current=v,re(v)),le.style.cursor=v?"pointer":"grab";return}Y.cancelable&&Y.preventDefault();let Te=Y.clientX-oe.dragStart.x,T=Y.clientY-oe.dragStart.y;if(oe.dragMode==="rotate")oe.spherical.theta=oe.dragSphStart.theta-Te*.008,oe.spherical.phi=Math.max(.15,Math.min(Math.PI-.15,oe.dragSphStart.phi+T*.006));else{let v=r.current;if(!v)return;let k=new B,V=new B;v.getWorldDirection(new B),k.setFromMatrixColumn(v.matrix,0),V.setFromMatrixColumn(v.matrix,1);let Q=oe.zoom*oe.spherical.radius*.0014;oe.panOffset.copy(oe.dragPanStart).addScaledVector(k,-Te*Q).addScaledVector(V,T*Q)}},ze=Y=>{let Te=oe.pointers.get(Y.pointerId),T=Te?Te.distanceTo(new Xe(Y.clientX,Y.clientY))>5:!1;if(oe.pointers.delete(Y.pointerId),oe.pointers.size===0){if(oe.pinchStartDist=0,!T){let v=Ze(Y.clientX,Y.clientY);we.current=v,H(v)}oe.dragMode=null,le.style.cursor="grab"}},Le=Y=>Y.preventDefault();return le.addEventListener("wheel",ft,{passive:!1}),le.addEventListener("pointerdown",N),le.addEventListener("pointermove",at),le.addEventListener("pointerup",ze),le.addEventListener("pointercancel",ze),le.addEventListener("contextmenu",Le),()=>{le.removeEventListener("wheel",ft),le.removeEventListener("pointerdown",N),le.removeEventListener("pointermove",at),le.removeEventListener("pointerup",ze),le.removeEventListener("pointercancel",ze),le.removeEventListener("contextmenu",Le)}},[A,D,R]);let j=()=>{let ge=!me.current;me.current=ge,M.current.autoRotate=!ge,F(ge)},ie=()=>{let ge=M.current.cameraMode==="pan"?"rotate":"pan";M.current.cameraMode=ge,$(ge)},Ie=()=>{let ge=t.current;ge&&(document.fullscreenElement?document.exitFullscreen():ge.requestFullscreen?.())},Fe={nodes:R?.nodes?.length||0,edges:R?.edges?.length||0},De=Nu(C),We=O||X;return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",gap:"16px",alignItems:"flex-end",flexWrap:"wrap"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600}},E("visualiser.workspaceTitle")),a.createElement("div",{style:{fontSize:"12px",color:zt(.45),marginTop:"4px",textTransform:"uppercase",letterSpacing:"0.08em"}},E("visualiser.workspaceSubtitle"))),a.createElement(He,null,Fe.nodes," ",E("visualiser.nodes")," \xB7 ",Fe.edges," ",E("visualiser.edges"))),a.createElement("div",{style:{display:"flex",gap:"10px",padding:"12px",border:`1px solid ${zt(.09)}`,borderRadius:"6px",background:zt(.03),flexWrap:"wrap"}},a.createElement(Ue,{primary:C==="constellation",ghost:C!=="constellation",onClick:()=>P("constellation")},E("visualiser.constellationMode")),a.createElement(Ue,{primary:C==="neural",ghost:C!=="neural",onClick:()=>P("neural")},E("visualiser.neuralMode"))),a.createElement("div",{style:{display:"flex",gap:"10px",alignItems:"center",padding:"12px",border:`1px solid ${zt(.09)}`,borderRadius:"6px",background:zt(.03),flexWrap:"wrap"}},a.createElement(Ue,{primary:!0,onClick:je},E("visualiser.refresh")),a.createElement(Ue,{ghost:!0,onClick:()=>L()},E("visualiser.resetView")),a.createElement(Ue,{ghost:!0,onClick:ie},G==="pan"?E("visualiser.rotateMode"):E("visualiser.panMode")),a.createElement(Ue,{ghost:!0,onClick:j},w?E("visualiser.resume"):C==="neural"?E("visualiser.pauseDrift"):E("visualiser.pauseRotation")),a.createElement(Ue,{ghost:!0,onClick:Ie},E("visualiser.fullscreen")),a.createElement("span",{style:{fontSize:"12px",color:zt(.45)}},C==="neural"?E("visualiser.neuralHelp"):E("visualiser.constellationHelp"))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"minmax(0, 2.5fr) minmax(280px, 1fr)",gap:"16px",alignItems:"stretch"}},a.createElement("div",{ref:t,style:{position:"relative",minHeight:"680px",border:`1px solid ${zt(.1)}`,borderRadius:"6px",overflow:"hidden",background:C==="neural"?"#06100f":"#050711"}},A?a.createElement("div",{style:{height:"680px",display:"grid",placeItems:"center",color:zt(.4),fontSize:"12px"}},E("visualiser.loadingEngine")):D?a.createElement("div",{style:{height:"680px",display:"grid",placeItems:"center",color:"#f87171",padding:"24px",textAlign:"center"}},D):Fe.nodes>0?a.createElement(a.Fragment,null,a.createElement("div",{ref:e,"aria-label":E("visualiser.canvasLabel"),style:{width:"100%",height:"100%",minHeight:"680px",display:"block"}}),a.createElement("div",{"aria-label":E("visualiser.legend"),style:{position:"absolute",right:"16px",bottom:"14px",display:"flex",gap:"14px",alignItems:"center",padding:"8px 10px",border:`1px solid ${zt(.12)}`,background:"rgba(5,7,17,0.72)",borderRadius:"4px",color:zt(.72),fontSize:"11px",backdropFilter:"blur(8px)",pointerEvents:"none"}},a.createElement("span",null,a.createElement("span",{style:{color:`#${De.star.getHexString()}`}},"\u25CF")," ",C==="neural"?E("visualiser.neuronHub"):E("visualiser.entityTopic")),a.createElement("span",null,a.createElement("span",{style:{color:`#${De.memory.getHexString()}`}},"\u25CF")," ",C==="neural"?E("visualiser.memorySoma"):E("visualiser.memory")),a.createElement("span",{style:{color:zt(.55)}},"\u2500 ",C==="neural"?E("visualiser.synapse"):E("visualiser.link")))):a.createElement("div",{style:{height:"680px",display:"grid",placeItems:"center",color:zt(.4),fontSize:"12px"}},E("visualiser.noNodes"))),a.createElement("aside",{style:{border:`1px solid ${zt(.1)}`,borderRadius:"6px",background:zt(.02),minHeight:"680px"}},a.createElement("div",{style:{padding:"18px 20px",borderBottom:`1px solid ${zt(.08)}`}},a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.14em",color:zt(.45),fontWeight:700}},C==="neural"?E("visualiser.neuralInspector"):E("visualiser.constellationInspector")),a.createElement("div",{style:{fontSize:"24px",fontWeight:700,marginTop:"12px"}},We?We.label:E("visualiser.nothingSelected"))),a.createElement("div",{style:{padding:"20px",display:"flex",flexDirection:"column",gap:"14px"}},We?a.createElement(a.Fragment,null,a.createElement("div",{style:{color:zt(.5),fontSize:"12px",lineHeight:1.6}},We.category||E("common.unknown")," \xB7 ",Number(We.count||0).toLocaleString()," ",E("visualiser.signals")," \xB7 ",E("visualiser.weight")," ",yt(We.weight,2,"n/a")),We.preview&&a.createElement("div",{style:{fontSize:"13px",lineHeight:1.55,color:zt(.74),padding:"12px",border:`1px solid ${zt(.08)}`,background:zt(.03),borderRadius:"4px"}},We.preview),a.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},a.createElement(He,null,We.kind||E("common.unknown")),a.createElement(He,null,We.category||E("common.unknown"))),We.memory_id&&a.createElement(Ue,{primary:!0,onClick:()=>i(We.memory_id)},E("visualiser.openMemory"))):a.createElement("div",{style:{color:zt(.45),fontSize:"13px",lineHeight:1.6}},C==="neural"?E("visualiser.neuralPickPrompt"):E("visualiser.constellationPickPrompt"))))),!!R?.clusters?.length&&a.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},R.clusters.slice(0,10).map(ge=>a.createElement(He,{key:ge.label},ge.label,": ",ge.count))))};var Is="/api/plugins/mnemosyne-native-dashboard",Nt=i=>`rgba(234,234,234,${i})`,H0={stated:"#065f46",inferred:"#1e3a8a",tool:"#581c87",imported:"#78350f"},Fu=({onInspectMemory:i,onInspectSession:e,onApplyFilters:t,adminMode:n})=>{let[s,r]=he([]),[o,l]=he("contaminated"),[d,c]=he(""),[p,g]=he("0"),[h,u]=he(!0),[x,_]=he([]),[m,f]=he(0),[M,A]=he(0),[I,D]=he(!1),[S,R]=he(null),[y,C]=he(new Set),[P,w]=he(!1),[F,G]=he("");it(()=>{$(!1)},[o]);async function $(L=!1){u(!0);try{let j=new URLSearchParams({queue:o,limit:"100",offset:L?String(M):"0"});d.trim()&&j.append("q",d.trim()),Number(p)>0&&j.append("min_importance",p);let ie=await st(`${Is}/review?${j.toString()}`);r(ie.cards||[]);let Ie=ie.queues?.[o]?.items||[];L?_(Fe=>{let De=new Map(Fe.map(We=>[We.id,We]));return Ie.forEach(We=>De.set(We.id,We)),Array.from(De.values())}):(_(Ie),C(new Set)),f(ie.total||0),D(!!ie.has_more),R(ie.next_offset!==void 0?ie.next_offset:null)}catch(j){console.error(j)}finally{u(!1)}}let O=()=>{A(0),$(!1)},H=()=>{c(""),g("0"),A(0),u(!0);let L=new URLSearchParams({queue:o,limit:"100",offset:"0"});st(`${Is}/review?${L.toString()}`).then(j=>{r(j.cards||[]),_(j.queues?.[o]?.items||[]),C(new Set),f(j.total||0),D(!!j.has_more),R(j.next_offset!==void 0?j.next_offset:null)}).catch(console.error).finally(()=>u(!1))},X=()=>{S!==null&&(A(S),setTimeout(()=>$(!0),0))},re=L=>{C(j=>{let ie=new Set(j);return ie.has(L)?ie.delete(L):ie.add(L),ie})},ce=()=>{x.every(L=>y.has(L.id))?C(L=>{let j=new Set(L);return x.forEach(ie=>j.delete(ie.id)),j}):C(L=>{let j=new Set(L);return x.forEach(ie=>j.add(ie.id)),j})};async function me(L,j){w(!0);try{let ie=Array.from(y);for(let Ie of ie)await st(L,{method:"POST",body:JSON.stringify(j(Ie))});C(new Set),$(!1)}catch(ie){alert(ie.message||"Operation failed")}finally{w(!1)}}let we=()=>{y.size&&confirm(`Mark ${y.size} selected memories as stated?`)&&me(`${Is}/admin/memory/veracity`,L=>({memory_id:L,veracity:"stated",backup:!0}))},Ce=L=>{!y.size||!L||me(`${Is}/admin/memory/veracity`,j=>({memory_id:j,veracity:L,backup:!0}))},je=()=>{y.size&&me(`${Is}/admin/memory/expiry`,L=>({memory_id:L,valid_until:F,backup:!0}))},rt=()=>{y.size&&confirm(`Expire ${y.size} selected memories?`)&&me(`${Is}/admin/memory/invalidate`,L=>({memory_id:L,backup:!0}))},K=s.find(L=>L.key===o);return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600,marginBottom:"4px"}},E("review.title")),a.createElement("div",{style:{fontSize:"12px",color:Nt(.45)}},E("review.subtitle"))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"12px"}},s.map(L=>a.createElement("div",{key:L.key,onClick:()=>{l(L.key),A(0)},style:{padding:"12px",borderRadius:"4px",background:o===L.key?Nt(.08):Nt(.03),border:`1px solid ${o===L.key?Nt(.2):Nt(.07)}`,cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"80px",transition:"background 0.15s"},onMouseEnter:j=>{o!==L.key&&(j.currentTarget.style.background=Nt(.06))},onMouseLeave:j=>{o!==L.key&&(j.currentTarget.style.background=Nt(.03))}},a.createElement("div",{style:{fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.08em",color:Nt(.45)}},L.title),a.createElement("div",{style:{fontSize:"24px",fontWeight:700,marginTop:"8px"}},L.count.toLocaleString())))),a.createElement(ct,null,a.createElement(dt,null,a.createElement("div",{style:{display:"flex",gap:"12px",alignItems:"center",flexWrap:"wrap"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px",minWidth:"160px"}},a.createElement("span",{style:{fontSize:"10px",color:Nt(.4),textTransform:"uppercase"}},E("review.title")),a.createElement(mn,{value:o,onValueChange:L=>{l(L),A(0)}},s.map(L=>a.createElement(Qe,{key:L.key,value:L.key},L.title," (",L.count,")")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px",flex:1,minWidth:"200px"}},a.createElement("span",{style:{fontSize:"10px",color:Nt(.4),textTransform:"uppercase"}},"Search"),a.createElement(un,{placeholder:E("review.searchPlaceholder"),value:d,onChange:L=>c(L.target.value),onKeyDown:L=>L.key==="Enter"&&O()})),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px",width:"150px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"10px",color:Nt(.4),textTransform:"uppercase"}},a.createElement("span",null,E("review.minImportance")),a.createElement("span",{style:{fontFamily:"var(--theme-font-mono)"}},Number(p)>0?`\u2265 ${Number(p).toFixed(2)}`:"any")),a.createElement("input",{type:"range",min:"0",max:"1",step:"0.05",value:p,onChange:L=>g(L.target.value),style:{width:"100%",height:"36px",background:"none",cursor:"pointer"}})),a.createElement("div",{style:{display:"flex",gap:"6px",alignSelf:"flex-end",height:"36px"}},a.createElement(Ue,{onClick:O,primary:!0},E("review.applyFilters")),a.createElement(Ue,{onClick:H,ghost:!0},E("review.clear")))))),n&&x.length>0&&a.createElement(ct,{style:{borderLeft:"4px solid var(--theme-color-warn, #f59e0b)"}},a.createElement(dt,{style:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}},a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},a.createElement("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",cursor:"pointer"}},a.createElement("input",{type:"checkbox",checked:x.length>0&&x.every(L=>y.has(L.id)),onChange:ce}),a.createElement("span",null,E("review.selectListed"))),a.createElement(He,null,y.size," ",E("review.selectedCount"))),a.createElement("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"}},a.createElement(Ue,{onClick:we,disabled:!y.size||P,primary:!0},E("review.confirmSelected")),a.createElement("div",{style:{width:"120px"}},a.createElement(mn,{value:"",onValueChange:Ce,disabled:!y.size||P},a.createElement(Qe,{value:""},E("review.setTrust")),a.createElement(Qe,{value:"stated"},"stated"),a.createElement(Qe,{value:"inferred"},"inferred"),a.createElement(Qe,{value:"tool"},"tool"),a.createElement(Qe,{value:"imported"},"imported"),a.createElement(Qe,{value:"unknown"},"unknown"))),a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"4px"}},a.createElement(un,{type:"datetime-local",value:F,onChange:L=>G(L.target.value),style:{width:"150px",height:"36px"},disabled:!y.size||P}),a.createElement(Ue,{onClick:je,disabled:!y.size||P,ghost:!0},E("memories.setExpiry"))),a.createElement(Ue,{onClick:rt,disabled:!y.size||P,style:{background:"#ef4444",color:"#fff"}},E("review.expire")),a.createElement(Ue,{onClick:()=>C(new Set),disabled:!y.size,ghost:!0},E("review.clearSelection"))))),a.createElement("div",null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"14px",fontWeight:600}},K?.title||o),a.createElement("div",{style:{fontSize:"12px",color:Nt(.4)}},K?.description||"")),a.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},a.createElement("span",{style:{fontSize:"12px",color:Nt(.5)}},m," ",E("review.totalCount")," \xB7 ",x.length," ",E("review.listedCount")),a.createElement(Ue,{onClick:()=>{K&&t({contaminated:{veracity:"",contaminated_only:"1"},important_contaminated:{veracity:"",contaminated_only:"1",sort:"importance"},degraded:{veracity:"",degraded_only:"1"},due_degradation:{veracity:"",due_for_degradation:"1"}}[o]||{})},ghost:!0},E("review.openBrowser")))),h&&x.length===0?a.createElement("div",{style:{padding:"60px",textAlign:"center",color:Nt(.4)}},E("review.loadingTriage")):x.length>0?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},x.map(L=>a.createElement("div",{key:L.id,style:{padding:"12px",borderRadius:"4px",background:Nt(.03),border:`1px solid ${Nt(.07)}`,display:"flex",alignItems:"flex-start",gap:"12px"}},n&&a.createElement("input",{type:"checkbox",checked:y.has(L.id),onChange:()=>re(L.id),style:{marginTop:"4px",cursor:"pointer"}}),a.createElement("div",{style:{flex:1,minWidth:0}},a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",alignItems:"center",marginBottom:"8px"}},a.createElement(He,null,L.memory_kind||"memory"),a.createElement(He,null,L.status||"active"),a.createElement(He,{style:{background:H0[String(L.veracity).toLowerCase()]||Nt(.1)}},L.veracity),L.degradation_label&&a.createElement(He,null,L.degradation_label),a.createElement("span",{style:{fontSize:"11px",color:Nt(.4)}},"importance:",yt(L.importance,2)),L.session_id&&a.createElement("span",{onClick:()=>e(L.session_id),style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:Nt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(L.session_id)),a.createElement("span",{style:{fontSize:"11px",color:Nt(.4)}},rn(L.created_at))),a.createElement("div",{onClick:()=>i(L),style:{fontSize:"13px",lineHeight:"1.6",cursor:"pointer",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"}},L.content),a.createElement("div",{style:{display:"flex",gap:"4px",marginTop:"8px",flexWrap:"wrap"}},(o==="contaminated"||L.veracity!=="stated")&&a.createElement("span",{style:{fontSize:"10px",background:"rgba(239,68,68,0.1)",color:"#f87171",padding:"2px 6px",borderRadius:"2px"}},"Needs review"),(o==="important_contaminated"||L.importance>=.75)&&a.createElement("span",{style:{fontSize:"10px",background:"rgba(245,158,11,0.1)",color:"#fbbf24",padding:"2px 6px",borderRadius:"2px"}},"High importance"),(o==="degraded"||L.degradation_tier&&L.degradation_tier>1)&&a.createElement("span",{style:{fontSize:"10px",background:"rgba(96,165,250,0.1)",color:"#60a5fa",padding:"2px 6px",borderRadius:"2px"}},"Degraded"),o==="due_degradation"&&a.createElement("span",{style:{fontSize:"10px",background:"rgba(167,139,250,0.1)",color:"#a78bfa",padding:"2px 6px",borderRadius:"2px"}},"Due for degradation"))))),I&&a.createElement("div",{style:{display:"flex",justifyContent:"center",marginTop:"16px"}},a.createElement(Ue,{onClick:X,primary:!0},E("review.loadMore")))):a.createElement("div",{style:{padding:"40px",border:`1px dashed ${Nt(.15)}`,borderRadius:"4px",textAlign:"center",color:Nt(.4),fontSize:"13px"}},E("review.noItems"))))};var Ps="/api/plugins/mnemosyne-native-dashboard",St=i=>`rgba(234,234,234,${i})`,Ou=({onInspectMemory:i,onInspectSession:e,adminMode:t,filters:n,setFilters:s})=>{let[r,o]=he([]),[l,d]=he(!0),[c,p]=he(null),[g,h]=he(null),[u,x]=he(""),[_,m]=he(""),[f,M]=he(!1);it(()=>{st(`${Ps}/stats`).then(w=>h(w)).catch(console.error)},[]),it(()=>{A()},[n]);async function A(){d(!0);try{let w={kind:n.kind||"all",q:(n.q||"").trim(),status:n.status||"active",sort:n.sort||"recent",source:n.source||"",scope:n.scope||"",session_id:n.session_id||"",veracity:n.veracity||"",degradation_tier:n.degradation_tier||"",contaminated_only:n.trust_preset==="contaminated"?"1":"",degraded_only:n.trust_preset==="degraded"?"1":"",due_for_degradation:n.trust_preset==="due"?"1":"",limit:"150"};Object.keys(w).forEach(O=>{w[O]===""&&delete w[O]});let F=new URLSearchParams(w).toString(),$=(await st(`${Ps}/memories?${F}`)).items||[];o($),p($.length>0?$[0]:null)}catch{}finally{d(!1)}}let I=(w,F)=>{s(G=>({...G,[w]:F}))},D=()=>{s({q:"",kind:"all",status:"active",sort:"recent",source:"",scope:"",session_id:"",veracity:"",degradation_tier:"",trust_preset:""})};async function S(w,F){M(!0);try{await st(w,{method:"POST",body:JSON.stringify(F)}),A()}catch(G){alert(G.message||"Operation failed")}finally{M(!1)}}let R=w=>{confirm("Invalidate this memory?")&&S(`${Ps}/admin/memory/invalidate`,{memory_id:w,backup:!0})},y=w=>{u.trim()&&S(`${Ps}/admin/memory/supersede`,{memory_id:w,content:u,backup:!0})},C=w=>S(`${Ps}/admin/memory/expiry`,{memory_id:w,valid_until:_,backup:!0}),P=(w,F)=>S(`${Ps}/admin/memory/veracity`,{memory_id:w,veracity:F,backup:!0});return a.createElement("div",{style:{display:"grid",gridTemplateColumns:"3fr 2fr",gap:"16px",alignItems:"start"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},a.createElement(ct,null,a.createElement(dt,{style:{padding:"16px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},a.createElement("div",{style:{display:"flex",gap:"8px"}},a.createElement(un,{placeholder:E("memories.searchPlaceholder"),value:n.q||"",onChange:w=>I("q",w.target.value),style:{flex:1}}),a.createElement(Ue,{onClick:A,ghost:!0},E("memories.refresh")),a.createElement(Ue,{onClick:D,ghost:!0},E("memories.clear"))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"8px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.kind")),a.createElement(mn,{value:n.kind||"all",onValueChange:w=>I("kind",w)},a.createElement(Qe,{value:"all"},E("memories.allTiers")),a.createElement(Qe,{value:"working"},E("memories.working")),a.createElement(Qe,{value:"episodic"},E("memories.episodic")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.status")),a.createElement(mn,{value:n.status||"active",onValueChange:w=>I("status",w)},a.createElement(Qe,{value:"active"},E("memories.activeOnly")),a.createElement(Qe,{value:"expired"},E("memories.expiredOnly")),a.createElement(Qe,{value:"all"},E("memories.allStatuses")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.sort")),a.createElement(mn,{value:n.sort||"recent",onValueChange:w=>I("sort",w)},a.createElement(Qe,{value:"recent"},E("memories.recent")),a.createElement(Qe,{value:"importance"},E("memories.importance")),a.createElement(Qe,{value:"oldest"},E("memories.oldest")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.trustPreset")),a.createElement(mn,{value:n.trust_preset||"",onValueChange:w=>I("trust_preset",w)},a.createElement(Qe,{value:""},E("memories.allConfidence")),a.createElement(Qe,{value:"contaminated"},E("memories.contaminated")),a.createElement(Qe,{value:"degraded"},E("memories.degradedOnly")),a.createElement(Qe,{value:"due"},E("memories.due")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.veracity")),a.createElement(mn,{value:n.veracity||"",onValueChange:w=>I("veracity",w)},a.createElement(Qe,{value:""},E("memories.allTrust")),a.createElement(Qe,{value:"stated"},"stated"),a.createElement(Qe,{value:"inferred"},"inferred"),a.createElement(Qe,{value:"tool"},"tool"),a.createElement(Qe,{value:"imported"},"imported"),a.createElement(Qe,{value:"unknown"},"unknown")))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.source")),a.createElement(mn,{value:n.source||"",onValueChange:w=>I("source",w)},a.createElement(Qe,{value:""},E("memories.allSources")),(g?.by_source||[]).map(w=>a.createElement(Qe,{key:w.source,value:w.source},w.source||"unknown")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.scope")),a.createElement(mn,{value:n.scope||"",onValueChange:w=>I("scope",w)},a.createElement(Qe,{value:""},E("memories.allScopes")),(g?.by_scope||[]).map(w=>a.createElement(Qe,{key:w.scope,value:w.scope},w.scope||"unknown")))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},a.createElement("span",{style:{fontSize:"9px",color:St(.4),textTransform:"uppercase"}},E("memories.session")),a.createElement(mn,{value:n.session_id||"",onValueChange:w=>I("session_id",w)},a.createElement(Qe,{value:""},E("memories.allSessions")),(g?.by_session||[]).map(w=>a.createElement(Qe,{key:w.session_id,value:w.session_id},Bt(w.session_id))))))))),a.createElement("div",{style:{maxHeight:"600px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"4px"}},l?a.createElement("div",{style:{textAlign:"center",padding:"40px",color:St(.4)}},E("memories.loadingList")):r.length>0?r.map(w=>a.createElement("div",{key:w.id,onClick:()=>p(w),style:{padding:"10px 12px",borderRadius:"4px",cursor:"pointer",background:c?.id===w.id?St(.08):St(.03),border:`1px solid ${c?.id===w.id?St(.2):St(.07)}`,transition:"background 0.15s"},onMouseEnter:F=>{c?.id!==w.id&&(F.currentTarget.style.background=St(.06))},onMouseLeave:F=>{c?.id!==w.id&&(F.currentTarget.style.background=St(.03))}},a.createElement("div",{style:{fontSize:"12px",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",marginBottom:"6px"}},w.content),a.createElement("div",{style:{display:"flex",gap:"6px",alignItems:"center",flexWrap:"wrap"}},a.createElement(He,null,w.veracity),a.createElement("span",{style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:St(.4)}},"imp:",yt(w.importance,2,"n/a")),w.scope&&a.createElement("span",{style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:St(.4)}},w.scope),w.session_id&&a.createElement("span",{onClick:F=>{F.stopPropagation(),e(w.session_id)},style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:St(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(w.session_id))))):a.createElement("div",{style:{textAlign:"center",padding:"40px",color:St(.35),fontSize:"13px"}},E("memories.noMatching")))),a.createElement(ct,{style:{alignSelf:"stretch",minHeight:"300px"}},a.createElement(It,null,a.createElement(Pt,null,E("memories.inspector"))),a.createElement(dt,null,c?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},a.createElement("div",null,a.createElement("span",{style:{fontSize:"10px",color:St(.4),textTransform:"uppercase"}},E("memories.contentLabel")),a.createElement("div",{style:{padding:"10px",background:St(.03),border:`1px solid ${St(.07)}`,borderRadius:"4px",fontSize:"13px",lineHeight:"1.5",whiteSpace:"pre-wrap",marginTop:"4px"}},c.content)),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",fontSize:"12px"}},a.createElement("div",null,E("common.id"),": ",a.createElement("span",{style:{fontFamily:"var(--theme-font-mono)",color:St(.5)}},c.id.slice(0,8))),a.createElement("div",null,E("common.status"),": ",a.createElement("strong",null,c.status)),a.createElement("div",null,E("common.veracity"),": ",a.createElement("strong",null,c.veracity)),a.createElement("div",null,E("common.importance"),": ",a.createElement("strong",null,yt(c.importance,2))),a.createElement("div",null,E("common.source"),": ",a.createElement("strong",null,c.source||"unknown")),a.createElement("div",null,E("common.scope"),": ",a.createElement("strong",null,c.scope||"session")),c.session_id&&a.createElement("div",{style:{gridColumn:"span 2"}},E("common.session"),":"," ",a.createElement("span",{onClick:()=>e(c.session_id),style:{textDecoration:"underline",cursor:"pointer",color:St(.7),fontFamily:"var(--theme-font-mono)"}},c.session_id)),a.createElement("div",{style:{gridColumn:"span 2"}},E("memories.createdLabel"),": ",a.createElement("span",null,Ga(c.created_at))),c.valid_until&&a.createElement("div",{style:{gridColumn:"span 2"}},E("memories.expiresLabel"),": ",a.createElement("span",null,Ga(c.valid_until)))),a.createElement("div",{style:{display:"flex",gap:"6px"}},a.createElement(Ue,{onClick:()=>i(c),primary:!0},E("memories.viewDetails"))),t&&a.createElement("div",{style:{borderTop:`1px solid ${St(.1)}`,paddingTop:"12px",marginTop:"8px",display:"flex",flexDirection:"column",gap:"10px"}},a.createElement("div",{style:{fontSize:"11px",textTransform:"uppercase",color:St(.45)}},E("memories.adminActions")),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}},a.createElement(un,{placeholder:E("memories.supersedePlaceholder"),value:u,onChange:w=>x(w.target.value)}),a.createElement(Ue,{onClick:()=>y(c.id),disabled:f||!u.trim(),primary:!0},E("memories.supersedeBtn"))),a.createElement("div",{style:{display:"flex",gap:"4px",alignItems:"center"}},a.createElement("div",{style:{flex:1}},a.createElement(mn,{value:"",onValueChange:w=>w&&P(c.id,w),disabled:f},a.createElement(Qe,{value:""},E("memories.adjustVeracity")),a.createElement(Qe,{value:"stated"},"stated"),a.createElement(Qe,{value:"inferred"},"inferred"),a.createElement(Qe,{value:"tool"},"tool"),a.createElement(Qe,{value:"imported"},"imported"),a.createElement(Qe,{value:"unknown"},"unknown")))),a.createElement("div",{style:{display:"flex",gap:"4px",alignItems:"center"}},a.createElement(un,{type:"datetime-local",value:_,onChange:w=>m(w.target.value),style:{flex:1,height:"36px"}}),a.createElement(Ue,{onClick:()=>C(c.id),disabled:f,ghost:!0},E("memories.setExpiry"))),a.createElement(Ue,{onClick:()=>R(c.id),disabled:f,style:{background:"#ef4444",color:"#fff",marginTop:"4px"}},E("memories.invalidateBtn")))):a.createElement("div",{style:{color:St(.4),fontSize:"13px",textAlign:"center",padding:"40px"}},E("memories.selectPrompt")))))};var G0="/api/plugins/mnemosyne-native-dashboard",$n=i=>`rgba(234,234,234,${i})`,Bu=()=>{let[i,e]=he([]),[t,n]=he(!0);return it(()=>{st(`${G0}/profile/inferred?limit=10`).then(s=>e(s?.sections||[])).catch(()=>{}).finally(()=>n(!1))},[]),t?a.createElement("div",{style:{padding:"32px",color:$n(.4),textAlign:"center"}},E("contextBank.loading")):a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600,marginBottom:"4px"}},E("contextBank.title")),a.createElement("div",{style:{fontSize:"12px",color:$n(.45)}},E("contextBank.subtitle"))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px"}},i.length>0?i.map((s,r)=>a.createElement(ct,{key:r},a.createElement(It,null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},a.createElement(Pt,null,s.name.replace(/_/g," ")),a.createElement(He,null,s.count," ",s.count===1?E("contextBank.item"):E("contextBank.items")))),a.createElement(dt,null,a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},s.items&&s.items.length>0?s.items.map((o,l)=>a.createElement("div",{key:l,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 10px",background:$n(.04),borderRadius:"4px",border:`1px solid ${$n(.07)}`,fontSize:"12px"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",flex:1,minWidth:0,paddingRight:"8px"}},a.createElement("span",{style:{fontWeight:500,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},o.label),a.createElement("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginTop:"4px"}},o.context_type&&a.createElement(He,null,o.context_type),o.confidence_label&&a.createElement(He,null,o.confidence_label),o.source&&a.createElement("span",{style:{fontSize:"10px",color:$n(.45)}},o.source)),o.preview&&a.createElement("span",{style:{fontSize:"11px",color:$n(.4),overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:"4px"}},o.preview)),a.createElement("div",{style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:$n(.45),whiteSpace:"nowrap",display:"flex",gap:"8px"}},a.createElement("span",null,"count:",o.count),a.createElement("span",null,"w:",yt(o.confidence_pct??o.importance??o.count,2,"n/a"))))):a.createElement("div",{style:{fontSize:"12px",color:$n(.35),textAlign:"center",padding:"12px"}},E("contextBank.noActiveContext")))))):a.createElement("div",{style:{gridColumn:"span 2",padding:"40px",textAlign:"center",color:$n(.35),border:`1px dashed ${$n(.15)}`,borderRadius:"4px",fontSize:"13px"}},E("contextBank.noRecords"))))};var W0="/api/plugins/mnemosyne-native-dashboard",Gt=i=>`rgba(234,234,234,${i})`,X0={stated:"#065f46",inferred:"#1e3a8a",tool:"#581c87",imported:"#78350f"},ku=({onInspectMemory:i,onInspectSession:e,onApplyFilters:t})=>{let[n,s]=he(!0),[r,o]=he(null),[l,d]=he([]),[c,p]=he({});if(it(()=>{st(`${W0}/lifecycle?limit=80`).then(h=>{o(h.thresholds||{}),d(h.cards||[]),p(h.queues||{})}).catch(console.error).finally(()=>s(!1))},[]),n)return a.createElement("div",{style:{padding:"32px",color:Gt(.4),textAlign:"center"}},E("lifecycle.loadingLifecycle"));let g=r?.weights||{};return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600,marginBottom:"4px"}},E("lifecycle.title")),a.createElement("div",{style:{fontSize:"12px",color:Gt(.45)}},E("lifecycle.subtitle"))),a.createElement(ct,{style:{background:Gt(.02)}},a.createElement(dt,{style:{padding:"12px 16px"}},a.createElement("div",{style:{display:"flex",gap:"20px",flexWrap:"wrap",fontSize:"12px",color:Gt(.7)}},a.createElement("span",null,E("lifecycle.tier2After")," ",a.createElement("strong",null,r?.tier2_days??30," ",E("lifecycle.days"))),a.createElement("span",null,E("lifecycle.tier3After")," ",a.createElement("strong",null,r?.tier3_days??180," ",E("lifecycle.days"))),a.createElement("span",null,E("lifecycle.weights"),": hot \xD7",yt(g[1]??1,2)," \xB7 warm \xD7",yt(g[2]??.5,2)," \xB7 cold \xD7",yt(g[3]??.25,2)),a.createElement("span",{style:{color:"#fbbf24"}},E("lifecycle.readOnlyNotice"))))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px"}},l.map(h=>a.createElement("div",{key:h.key,onClick:()=>{c[h.key]?.filter&&t(c[h.key].filter)},style:{padding:"12px 16px",borderRadius:"4px",background:Gt(.03),border:`1px solid ${Gt(.07)}`,cursor:"pointer",display:"flex",flexDirection:"column",justifyContent:"space-between",minHeight:"100px",transition:"background 0.15s"},onMouseEnter:u=>u.currentTarget.style.background=Gt(.06),onMouseLeave:u=>u.currentTarget.style.background=Gt(.03)},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}},a.createElement("div",{style:{fontSize:"11px",textTransform:"uppercase",letterSpacing:"0.08em",color:Gt(.45)}},h.title),a.createElement("div",{style:{fontSize:"24px",fontWeight:700}},h.count.toLocaleString())),a.createElement("div",{style:{fontSize:"11px",color:Gt(.4),marginTop:"8px",lineHeight:"1.4"}},h.description)))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"20px",marginTop:"12px"}},Object.entries(c).map(([h,u])=>a.createElement("div",{key:h},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:"8px",borderBottom:`1px solid ${Gt(.08)}`,paddingBottom:"6px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"14px",fontWeight:600}},u.title||h),a.createElement("div",{style:{fontSize:"12px",color:Gt(.4)}},u.description||"")),a.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},a.createElement("span",{style:{fontSize:"11px",color:Gt(.5)}},u.items?.length||0," ",E("lifecycle.listed")),a.createElement(Ue,{onClick:()=>t(u.filter||{}),ghost:!0},E("lifecycle.openFilter")))),u.items&&u.items.length>0?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},u.items.map(x=>a.createElement("div",{key:x.id,style:{padding:"10px 12px",borderRadius:"4px",background:Gt(.02),border:`1px solid ${Gt(.06)}`,display:"flex",flexDirection:"column",gap:"4px"}},a.createElement("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",alignItems:"center",fontSize:"11px"}},a.createElement(He,{style:{background:X0[String(x.veracity).toLowerCase()]||Gt(.1)}},x.veracity),x.degradation_label&&a.createElement(He,null,x.degradation_label),a.createElement("span",{style:{color:Gt(.4)}},"importance:",yt(x.importance,2)),x.session_id&&a.createElement("span",{onClick:()=>e(x.session_id),style:{fontFamily:"var(--theme-font-mono)",color:Gt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(x.session_id)),a.createElement("span",{style:{color:Gt(.4)}},rn(x.created_at))),a.createElement("div",{onClick:()=>i(x),style:{fontSize:"13px",lineHeight:"1.5",cursor:"pointer",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},x.content)))):a.createElement("div",{style:{padding:"16px",textAlign:"center",color:Gt(.35),fontSize:"12px"}},E("lifecycle.noItems"))))))};var zu=({onInspectMemory:i,onNavigateToTab:e})=>{let[t,n]=he("graph"),[s,r]=he(""),[o,l]=he({nodes:[],edges:[]}),[d,c]=he([]),[p,g]=he([]),[h,u]=he(!1),[x,_]=he(null),[m,f]=he(null),[M,A]=he(""),[I,D]=he([]),[S,R]=he(!1),[y,C]=he(null),P=Tt(null),[w,F]=he({scale:1,x:0,y:0,dragging:!1,startX:0,startY:0,originX:0,originY:0});async function G(K=""){u(!0),_(null),f(null);try{let L=encodeURIComponent(K.trim()),j=await st(`/api/plugins/mnemosyne-native-dashboard/graph?q=${L}&limit=300`),ie=1e3,Ie=650,Fe=ie/2,De=Ie/2,We=260,le=(j.nodes||[]).slice(0,160).map((Ye,Ze,ft)=>{let N=Ze/ft.length*Math.PI*2,at=.65+Ze%5/10;return{...Ye,x:Fe+Math.cos(N)*We*at,y:De+Math.sin(N)*We*at}}),oe=new Map;le.forEach(Ye=>oe.set(Ye.id,Ye));let be=(j.edges||[]).filter(Ye=>oe.has(Ye.source)&&oe.has(Ye.target)).slice(0,300);l(j),c(le),g(be)}catch(L){console.error("Failed to load graph data",L)}finally{u(!1)}}async function $(K=""){R(!0);try{let L=encodeURIComponent(K.trim()),j=await st(`/api/plugins/mnemosyne-native-dashboard/triples?q=${L}&limit=200`);D(j.items||[])}catch(L){console.error("Failed to load triples data",L)}finally{R(!1)}}it(()=>{G()},[]),it(()=>{t==="triples"&&$(M)},[t]);let O=K=>{if(K.preventDefault(),!P.current)return;let L=P.current.getBoundingClientRect(),j=(K.clientX-L.left)/L.width*1e3,ie=(K.clientY-L.top)/L.height*650,Ie=w.scale,Fe=Math.max(.35,Math.min(4,Ie*(K.deltaY<0?1.12:.88)));F(De=>({...De,x:j-(j-De.x)*(Fe/Ie),y:ie-(ie-De.y)*(Fe/Ie),scale:Fe}))},H=K=>{let L=K.target;L.closest(".interactive-node")||L.closest(".interactive-edge")||(F(j=>({...j,dragging:!0,startX:K.clientX,startY:K.clientY,originX:j.x,originY:j.y})),P.current&&P.current.setPointerCapture(K.pointerId))},X=K=>{if(!w.dragging)return;let L=K.clientX-w.startX,j=K.clientY-w.startY;F(ie=>({...ie,x:ie.originX+L,y:ie.originY+j}))},re=K=>{if(w.dragging&&(F(L=>({...L,dragging:!1})),P.current))try{P.current.releasePointerCapture(K.pointerId)}catch{}},ce=()=>{F({scale:1,x:0,y:0,dragging:!1,startX:0,startY:0,originX:0,originY:0})},me=K=>{f(null),_(K)},we=K=>{_(null),f(K)},Ce=K=>x?x.id===K?!1:!p.some(j=>j.source===x.id&&j.target===K||j.target===x.id&&j.source===K):m?m.source!==K&&m.target!==K:!1,je=K=>{if(m)return m.id!==K;if(x){let L=p.find(j=>j.id===K);return L?L.source!==x.id&&L.target!==x.id:!0}return!1},rt=K=>p.filter(L=>L.source===K||L.target===K);return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("style",null,`
        .interactive-node {
          cursor: pointer;
          transition: transform 0.2s ease, fill 0.2s ease;
        }
        .interactive-node:hover {
          fill: #eaeaea !important;
          stroke: #ffffff !important;
        }
        .interactive-edge {
          cursor: pointer;
          stroke-width: 1.5;
          stroke: rgba(234,234,234,0.3);
          opacity: 0.6;
          transition: stroke-width 0.2s ease, stroke 0.2s ease, opacity 0.2s ease;
        }
        .interactive-edge:hover, .interactive-edge.selected {
          stroke-width: 3.5;
          stroke: #f59e0b !important;
          opacity: 1;
        }
        .interactive-label {
          font-size: 10px;
          cursor: pointer;
          fill: #f59e0b;
          paint-order: stroke;
          stroke: #0e0e0e;
          stroke-width: 3px;
          transition: fill 0.2s ease;
        }
        .interactive-label:hover, .interactive-label.selected {
          fill: #eaeaea !important;
          font-weight: bold;
        }
        .interactive-text {
          font-size: 11px;
          cursor: pointer;
          fill: rgba(234,234,234,0.85);
          paint-order: stroke;
          stroke: #0e0e0e;
          stroke-width: 3px;
        }
        .dimmed {
          opacity: 0.15 !important;
        }
        .panning-svg {
          cursor: grabbing !important;
        }
      `),a.createElement("div",{style:{display:"flex",gap:"4px",borderBottom:"1px solid rgba(234,234,234,0.1)",paddingBottom:"0",marginBottom:"16px"}},["graph","triples"].map(K=>a.createElement("button",{key:K,onClick:()=>n(K),style:{padding:"6px 16px",fontSize:"12px",fontWeight:500,background:"none",border:"none",borderBottom:t===K?"2px solid rgba(234,234,234,0.8)":"2px solid transparent",cursor:"pointer",color:t===K?"rgba(234,234,234,0.9)":"rgba(234,234,234,0.4)",transition:"color 0.15s, border-color 0.15s"}},K==="graph"?E("graph.relationshipGraph"):E("graph.factsTable")))),t==="graph"&&a.createElement("div",{className:"space-y-4"},a.createElement("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"12px 16px",borderRadius:"4px",background:"rgba(234,234,234,0.04)",border:"1px solid rgba(234,234,234,0.1)"}},a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"8px",flex:1,minWidth:"280px"}},a.createElement(un,{placeholder:E("graph.filterGraphPlaceholder"),value:s,onChange:K=>r(K.target.value),onKeyDown:K=>{K.key==="Enter"&&G(s)},style:{flex:1}}),a.createElement(Ue,{onClick:()=>G(s)},E("graph.refreshGraph")),a.createElement(Ue,{ghost:!0,onClick:()=>{r(""),G("")}},E("graph.clear"))),a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"12px"}},a.createElement(Ue,{ghost:!0,onClick:ce},E("graph.resetView")),a.createElement("span",{style:{fontSize:"11px",color:"rgba(234,234,234,0.4)"}},E("graph.helpText")))),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px",alignItems:"stretch"}},a.createElement("div",{style:{border:"1px solid rgba(234,234,234,0.1)",borderRadius:"4px",overflow:"hidden",background:"rgba(0,0,0,0.35)",position:"relative",minHeight:"500px"}},h&&a.createElement("div",{style:{position:"absolute",inset:0,background:"rgba(14,14,14,0.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:10,fontSize:"13px",color:"rgba(234,234,234,0.5)"}},E("graph.queryingGraph")),a.createElement("svg",{ref:P,viewBox:"0 0 1000 650",className:`w-full h-[550px] select-none ${w.dragging?"panning-svg":"cursor-grab"}`,onWheel:O,onPointerDown:H,onPointerMove:X,onPointerUp:re,onPointerLeave:re},a.createElement("defs",null,a.createElement("linearGradient",{id:"edgeGrad",x1:"0%",y1:"0%",x2:"100%",y2:"0%"},a.createElement("stop",{offset:"0%",stopColor:"#38bdf8",stopOpacity:"0.4"}),a.createElement("stop",{offset:"50%",stopColor:"#6366f1",stopOpacity:"0.8"}),a.createElement("stop",{offset:"100%",stopColor:"#fbbf24",stopOpacity:"0.4"}))),a.createElement("g",{transform:`translate(${w.x}, ${w.y}) scale(${w.scale})`},d.length===0&&!h&&a.createElement("text",{x:"500",y:"325",textAnchor:"middle",fill:"#94a3b8",className:"text-sm"},E("graph.noTriples")),p.map(K=>{let L=d.find(We=>We.id===K.source),j=d.find(We=>We.id===K.target);if(!L||!j)return null;let ie=je(K.id),Ie=m?.id===K.id,Fe=((L.x??0)+(j.x??0))/2,De=((L.y??0)+(j.y??0))/2;return a.createElement("g",{key:K.id},a.createElement("line",{x1:L.x,y1:L.y,x2:j.x,y2:j.y,onClick:()=>we(K),className:`interactive-edge ${Ie?"selected":""} ${ie?"dimmed":""}`,stroke:"url(#edgeGrad)"}),a.createElement("text",{x:Fe,y:De,textAnchor:"middle",onClick:()=>we(K),className:`interactive-label ${Ie?"selected":""} ${ie?"dimmed":""}`},K.predicate))}),d.map(K=>{let L=Ce(K.id),j=x?.id===K.id,ie=Math.min(15,7+Math.sqrt(K.count||1));return a.createElement("g",{key:K.id,onClick:()=>me(K)},a.createElement("circle",{cx:K.x,cy:K.y,r:ie,fill:j?"#fbbf24":"#60a5fa",stroke:"#ffffff",strokeWidth:j?2.5:1.2,className:`interactive-node ${L?"dimmed":""}`}),a.createElement("text",{x:(K.x??0)+12,y:(K.y??0)+4,className:`interactive-text ${L?"dimmed":""}`},K.label.length>25?K.label.slice(0,22)+"...":K.label))})))),a.createElement("div",{style:{display:"flex",flexDirection:"column"}},a.createElement(ct,{style:{flex:1,height:"100%",display:"flex",flexDirection:"column"}},a.createElement(dt,{style:{display:"flex",flexDirection:"column",gap:"16px",flex:1}},a.createElement("div",{style:{paddingBottom:"12px",borderBottom:"1px solid rgba(234,234,234,0.1)"}},a.createElement("span",{style:{fontSize:"10px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(234,234,234,0.45)"}},E("graph.inspectorTitle"))),x&&a.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"12px",overflowY:"auto"}},a.createElement("div",null,a.createElement(He,null,E("graph.entityNode")),a.createElement("div",{style:{fontSize:"16px",fontWeight:700,fontFamily:"var(--theme-font-mono)",marginTop:"8px",wordBreak:"break-all"}},x.label),a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginTop:"4px"}},E("graph.connectedCount").replace("{count}",String(rt(x.id).length)))),a.createElement("div",{style:{display:"flex",gap:"8px"}},a.createElement(Ue,{style:{flex:1},onClick:()=>{A(x.label),n("triples")}},E("graph.showInTriples")),a.createElement(Ue,{ghost:!0,style:{flex:1},onClick:()=>e("memories")},E("graph.searchMemories"))),a.createElement("div",{style:{flex:1}},a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginBottom:"8px"}},E("graph.connectedTriples")),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"220px",overflowY:"auto"}},rt(x.id).map(K=>a.createElement("button",{key:K.id,onClick:()=>we(K),style:{textAlign:"left",padding:"8px 10px",border:"1px solid rgba(234,234,234,0.1)",borderRadius:"4px",background:"rgba(234,234,234,0.04)",cursor:"pointer",width:"100%"},onMouseEnter:L=>L.currentTarget.style.background="rgba(234,234,234,0.08)",onMouseLeave:L=>L.currentTarget.style.background="rgba(234,234,234,0.04)"},a.createElement("div",{style:{color:"#f59e0b",fontFamily:"var(--theme-font-mono)",fontSize:"11px",fontWeight:600}},K.predicate),a.createElement("div",{style:{color:"rgba(234,234,234,0.5)",fontSize:"11px",marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},K.subject," \u2192 ",K.object)))))),m&&a.createElement("div",{style:{flex:1,display:"flex",flexDirection:"column",gap:"12px"}},a.createElement("div",null,a.createElement(He,null,E("graph.predicateLink")),a.createElement("div",{style:{fontSize:"16px",fontWeight:700,color:"#f59e0b",fontFamily:"var(--theme-font-mono)",marginTop:"8px"}},m.predicate),a.createElement("div",{style:{marginTop:"12px",padding:"12px",background:"rgba(234,234,234,0.04)",border:"1px solid rgba(234,234,234,0.1)",borderRadius:"4px",fontSize:"11px",fontFamily:"var(--theme-font-mono)"}},a.createElement("div",{style:{marginBottom:"8px"}},a.createElement("div",{style:{color:"rgba(234,234,234,0.4)",marginBottom:"2px"}},E("graph.subject")),a.createElement("div",{style:{fontWeight:600,wordBreak:"break-all"}},m.subject)),a.createElement("div",{style:{borderTop:"1px solid rgba(234,234,234,0.08)",paddingTop:"8px"}},a.createElement("div",{style:{color:"rgba(234,234,234,0.4)",marginBottom:"2px"}},E("graph.object")),a.createElement("div",{style:{fontWeight:600,wordBreak:"break-all"}},m.object))),a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginTop:"8px"}},E("graph.confidence")," ",m.confidence!=null?m.confidence.toFixed(2):"n/a"),m.created_at&&a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.4)",fontFamily:"var(--theme-font-mono)",marginTop:"4px"}},E("graph.recorded")," ",new Date(m.created_at).toLocaleString())),a.createElement("div",{style:{display:"flex",gap:"8px"}},a.createElement(Ue,{style:{flex:1},onClick:()=>C(m)},E("graph.inspectJson")),a.createElement(Ue,{ghost:!0,style:{flex:1},onClick:()=>{A(`${m.subject} ${m.predicate} ${m.object}`),n("triples")}},E("graph.showInTriples")))),!x&&!m&&a.createElement("div",{style:{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",border:"1px dashed rgba(234,234,234,0.15)",borderRadius:"4px",textAlign:"center"}},a.createElement("p",{style:{fontSize:"12px",color:"rgba(234,234,234,0.4)"}},E("graph.pickNodePrompt")))))))),t==="triples"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},a.createElement("div",{style:{display:"flex",gap:"8px",maxWidth:"600px"}},a.createElement(un,{placeholder:E("graph.searchTriplesPlaceholder"),value:M,onChange:K=>A(K.target.value),onKeyDown:K=>{K.key==="Enter"&&$(M)},style:{flex:1}}),a.createElement(Ue,{onClick:()=>$(M)},E("graph.search"))),a.createElement("div",{style:{border:"1px solid rgba(234,234,234,0.1)",borderRadius:"4px",overflow:"hidden"}},a.createElement("div",{style:{overflowX:"auto",maxHeight:"500px"}},a.createElement("table",{style:{width:"100%",borderCollapse:"collapse",textAlign:"left",fontSize:"12px"}},a.createElement("thead",{style:{background:"rgba(234,234,234,0.05)",position:"sticky",top:0,zIndex:10,borderBottom:"1px solid rgba(234,234,234,0.1)"}},a.createElement("tr",null,["Subject","Predicate","Object","Confidence",""].map(K=>a.createElement("th",{key:K,style:{padding:"10px 12px",fontSize:"10px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.08em",color:"rgba(234,234,234,0.45)"}},K)))),a.createElement("tbody",null,S?a.createElement("tr",null,a.createElement("td",{colSpan:5,style:{padding:"32px",textAlign:"center",color:"rgba(234,234,234,0.4)"}},E("graph.searchingKg"))):I.length===0?a.createElement("tr",null,a.createElement("td",{colSpan:5,style:{padding:"32px",textAlign:"center",color:"rgba(234,234,234,0.4)"}},E("graph.noTriplesMatch"))):I.map(K=>a.createElement("tr",{key:K.id,style:{borderBottom:"1px solid rgba(234,234,234,0.06)"},onMouseEnter:L=>L.currentTarget.style.background="rgba(234,234,234,0.04)",onMouseLeave:L=>L.currentTarget.style.background=""},a.createElement("td",{style:{padding:"10px 12px",fontFamily:"var(--theme-font-mono)",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:K.subject},K.subject),a.createElement("td",{style:{padding:"10px 12px",fontFamily:"var(--theme-font-mono)",color:"#f59e0b",fontWeight:600,maxWidth:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:K.predicate},K.predicate),a.createElement("td",{style:{padding:"10px 12px",fontFamily:"var(--theme-font-mono)",maxWidth:"250px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:K.object},K.object),a.createElement("td",{style:{padding:"10px 12px",fontFamily:"var(--theme-font-mono)",textAlign:"center"}},K.confidence!=null?K.confidence.toFixed(2):"n/a"),a.createElement("td",{style:{padding:"10px 12px",textAlign:"right"}},a.createElement(Ue,{ghost:!0,onClick:()=>C(K)},E("common.details")))))))))),y&&a.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"}},a.createElement(ct,{style:{width:"100%",maxWidth:"680px"}},a.createElement(dt,null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"12px",borderBottom:"1px solid rgba(234,234,234,0.1)",marginBottom:"12px"}},a.createElement("span",{style:{fontSize:"13px",fontWeight:600}},E("graph.relationalFactDetails")),a.createElement("button",{onClick:()=>C(null),style:{background:"none",border:"none",cursor:"pointer",color:"rgba(234,234,234,0.5)",fontSize:"16px",lineHeight:1}},"\u2715")),a.createElement("pre",{style:{padding:"12px",borderRadius:"4px",background:"rgba(234,234,234,0.04)",fontSize:"11px",overflowX:"auto",maxHeight:"400px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.7)",lineHeight:1.6}},JSON.stringify(y,null,2)),a.createElement("div",{style:{display:"flex",justifyContent:"flex-end",paddingTop:"12px"}},a.createElement(Ue,{onClick:()=>C(null)},E("common.close")))))))};var Vu="/api/plugins/mnemosyne-native-dashboard",Rt=i=>`rgba(234,234,234,${i})`,Hu={facts:"Facts",timelines:"Timelines",instructions:"Instructions",kg:"KG",preferences:"Preferences"},Gu=({onInspectSession:i})=>{let[e,t]=he("overview"),[n,s]=he(null),[r,o]=he(!0),[l,d]=he({facts:"",timelines:"",instructions:"",kg:"",preferences:""}),[c,p]=he({facts:[],timelines:[],instructions:[],kg:[],preferences:[]}),[g,h]=he(!1);it(()=>{u()},[]),it(()=>{e!=="overview"&&x(e)},[e]);async function u(){o(!0);try{let P=await st(`${Vu}/memoria/stats`);s(P)}catch(P){console.error(P)}finally{o(!1)}}async function x(P){if(P!=="overview"){h(!0);try{let w=l[P].trim(),G=await st(`${Vu}/memoria/${P==="kg"?"kg":P}?q=${encodeURIComponent(w)}&limit=200`);p($=>({...$,[P]:G.items||[]}))}catch(w){console.error(w)}finally{h(!1)}}}let _=P=>{x(P)},m=(P,w)=>{d(F=>({...F,[P]:w}))},f=P=>{let w=P.key||"",F=P.value||"",G=P.context_snippet||"";return a.createElement("div",{key:P.id||w,style:{padding:"10px 12px",background:Rt(.03),border:`1px solid ${Rt(.07)}`,borderRadius:"4px"}},a.createElement("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"6px"}},P.fact_type&&a.createElement(He,null,P.fact_type),P.importance&&a.createElement(He,null,"imp ",Number(P.importance).toFixed(2)),P.session_id&&P.session_id!=="default"&&a.createElement("span",{onClick:()=>i(P.session_id),style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:Rt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(P.session_id))),a.createElement("div",{style:{fontSize:"13px"}},a.createElement("strong",null,w),F?`: ${F}`:""),G&&a.createElement("div",{style:{fontSize:"11px",color:Rt(.45),marginTop:"4px",wordBreak:"break-all"}},G))},M=(P,w)=>{let F=P.description||"",G=P.date||"";return a.createElement("div",{key:P.id||w,style:{padding:"10px 12px",background:Rt(.03),border:`1px solid ${Rt(.07)}`,borderRadius:"4px"}},a.createElement("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"6px"}},G&&a.createElement(He,null,G),P.source&&a.createElement(He,null,P.source),P.session_id&&P.session_id!=="default"&&a.createElement("span",{onClick:()=>i(P.session_id),style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:Rt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(P.session_id))),a.createElement("div",{style:{fontSize:"13px"}},F))},A=P=>{let w=P.instruction||"",F=P.topic||"",G=P.context_snippet||"",$=P.active==1;return a.createElement("div",{key:P.id||w,style:{padding:"10px 12px",background:Rt(.03),border:`1px solid ${Rt(.07)}`,borderRadius:"4px"}},a.createElement("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"6px"}},F&&a.createElement(He,null,F),a.createElement(He,{style:{background:$?"#065f46":"#991b1b"}},$?E("common.active"):E("common.inactive")),P.session_id&&P.session_id!=="default"&&a.createElement("span",{onClick:()=>i(P.session_id),style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:Rt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(P.session_id))),a.createElement("div",{style:{fontSize:"13px"}},w),G&&a.createElement("div",{style:{fontSize:"11px",color:Rt(.45),marginTop:"4px",wordBreak:"break-all"}},G))},I=(P,w)=>{let F=P.preference||P.instruction||P.description||P.value||JSON.stringify(P),G=new Set(["id","message_idx","updated_msg_idx","valid_from_msg_idx","valid_to_msg_idx","version_id","previous_value"]),$=Object.entries(P).filter(([O,H])=>!G.has(O)&&H!==null&&H!==void 0&&H!==""&&!["preference","instruction","description","value","context_snippet","key"].includes(O)).map(([O,H])=>`${O}: ${String(H).slice(0,40)}`);return a.createElement("div",{key:P.id||w,style:{padding:"10px 12px",background:Rt(.03),border:`1px solid ${Rt(.07)}`,borderRadius:"4px"}},a.createElement("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"6px"}},$.map(O=>a.createElement(He,{key:O},O))),a.createElement("div",{style:{fontSize:"13px"}},String(F).slice(0,500)))},D=["overview","facts","timelines","instructions","kg","preferences"],S={overview:"Overview",facts:E("memoria.facts"),timelines:E("memoria.timelines"),instructions:E("memoria.instructions"),kg:E("memoria.kg"),preferences:E("memoria.preferences")},R={facts:E("memoria.searchFacts"),timelines:E("memoria.searchTimelines"),instructions:E("memoria.searchInstructions"),kg:E("memoria.searchKg"),preferences:E("memoria.searchPreferences")},y={facts:`${E("memoria.searching")} facts...`,timelines:`${E("memoria.searching")} timelines...`,instructions:`${E("memoria.searching")} instructions...`,kg:`${E("memoria.searching")} KG...`,preferences:`${E("memoria.searching")} preferences...`},C={facts:E("memoria.factsTitle"),timelines:E("memoria.timelinesTitle"),instructions:E("memoria.instructionsTitle"),kg:E("memoria.kgTitle"),preferences:E("memoria.preferencesTitle")};return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"15px",fontWeight:600,marginBottom:"4px"}},E("memoria.title")),a.createElement("div",{style:{fontSize:"12px",color:Rt(.45)}},E("memoria.subtitle"))),a.createElement("div",{style:{display:"flex",gap:"4px",borderBottom:`1px solid ${Rt(.1)}`,paddingBottom:"8px"}},D.map(P=>a.createElement(Ue,{key:P,onClick:()=>t(P),ghost:e!==P,primary:e===P,style:{fontSize:"12px",textTransform:"capitalize",padding:"6px 12px",height:"30px"}},S[P]||P))),r?a.createElement("div",{style:{padding:"20px",color:Rt(.4),textAlign:"center"}},E("memoria.loadingMetrics")):e==="overview"&&a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"10px"}},Object.entries(n?.tables||{}).map(([P,w])=>{let F=Hu[P.replace("memoria_","")]||P.replace("memoria_","");return a.createElement(ct,{key:P},a.createElement(dt,{style:{padding:"12px"}},a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",color:Rt(.45),letterSpacing:"0.05em"}},F),a.createElement("div",{style:{fontSize:"20px",fontWeight:700,marginTop:"4px"}},w.count.toLocaleString())))})),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px"}},a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("memoria.tableCounts"))),a.createElement(dt,null,a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},Object.entries(n?.tables||{}).map(([P,w])=>{let F=Hu[P.replace("memoria_","")]||P.replace("memoria_","");return a.createElement("div",{key:P,style:{display:"flex",justifyContent:"space-between",fontSize:"13px"}},a.createElement("span",null,F),a.createElement("strong",null,w.count.toLocaleString()))})))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("memoria.topSessions"))),a.createElement(dt,null,a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},n?.top_sessions&&n.top_sessions.length>0?n.top_sessions.map((P,w)=>a.createElement("div",{key:w,onClick:()=>i(P.session_id),style:{display:"flex",justifyContent:"space-between",fontSize:"13px",cursor:"pointer"}},a.createElement("span",{style:{textDecoration:"underline",fontFamily:"var(--theme-font-mono)"}},Bt(P.session_id)),a.createElement("strong",null,P.count))):a.createElement("div",{style:{color:Rt(.35),fontSize:"12px"}},E("memoria.noSessionData"))))))),["facts","timelines","instructions","kg","preferences"].map(P=>e===P&&a.createElement("div",{key:P,style:{display:"flex",flexDirection:"column",gap:"12px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},a.createElement("span",{style:{fontSize:"14px",fontWeight:600}},C[P]),a.createElement("span",{style:{fontSize:"11px",color:Rt(.4)}},c[P].length," ",E("memoria.entries"))),a.createElement("div",{style:{display:"flex",gap:"8px"}},a.createElement(un,{placeholder:R[P],value:l[P],onChange:w=>m(P,w.target.value),onKeyDown:w=>w.key==="Enter"&&_(P),style:{flex:1}}),a.createElement(Ue,{onClick:()=>_(P),primary:!0},E("memoria.search"))),g?a.createElement("div",{style:{textAlign:"center",color:Rt(.4),padding:"40px"}},y[P]):c[P].length>0?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},P==="facts"&&c.facts.map(f),P==="timelines"&&c.timelines.map(M),P==="instructions"&&c.instructions.map(A),P==="preferences"&&c.preferences.map(I),P==="kg"&&a.createElement(ct,{style:{overflowX:"auto"}},a.createElement("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"}},a.createElement("thead",null,a.createElement("tr",{style:{borderBottom:`1px solid ${Rt(.15)}`,textAlign:"left"}},a.createElement("th",{style:{padding:"8px 12px"}},E("memoria.subject")),a.createElement("th",{style:{padding:"8px 12px"}},E("memoria.predicate")),a.createElement("th",{style:{padding:"8px 12px"}},E("memoria.object")),a.createElement("th",{style:{padding:"8px 12px"}},E("memoria.confidence")))),a.createElement("tbody",null,c.kg.map((w,F)=>a.createElement("tr",{key:F,style:{borderBottom:`1px solid ${Rt(.06)}`}},a.createElement("td",{style:{padding:"8px 12px"}},w.subject),a.createElement("td",{style:{padding:"8px 12px"}},w.predicate),a.createElement("td",{style:{padding:"8px 12px"}},w.object),a.createElement("td",{style:{padding:"8px 12px"}},w.confidence!==null&&w.confidence!==void 0?Number(w.confidence).toFixed(2):"\u2014"))))))):a.createElement("div",{style:{textAlign:"center",padding:"40px",color:Rt(.35)}},E("memoria.noData")))))};var _c="/api/plugins/mnemosyne-native-dashboard",wt=i=>`rgba(234,234,234,${i})`,q0={stated:"#065f46",inferred:"#1e3a8a",tool:"#581c87",imported:"#78350f"},Wu=({onInspectMemory:i})=>{let[e,t]=he([]),[n,s]=he([]),[r,o]=he(null),[l,d]=he("day"),[c,p]=he(!0);it(()=>{g()},[l]);async function g(){p(!0);try{let[u,x]=await Promise.all([st(`${_c}/timeline?group=${l}&limit=100`),st(`${_c}/consolidations?limit=50`)]);t(u.groups||u.items||[]),s(x.items||[])}catch{}finally{p(!1)}}async function h(u){try{let x=await st(`${_c}/session?id=${encodeURIComponent(u)}&limit=200`);o(x)}catch(x){alert(`Failed to load session details: ${x.message}`)}}return a.createElement("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px",alignItems:"start"}},a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"12px",borderBottom:`1px solid ${wt(.1)}`}},a.createElement("div",{style:{fontSize:"14px",fontWeight:600}},E("history.title")),a.createElement("div",{style:{display:"flex",gap:"4px"}},a.createElement(Ue,{onClick:()=>d("day"),outlined:l!=="day"},E("history.byDay")),a.createElement(Ue,{onClick:()=>d("session"),outlined:l!=="session"},E("history.bySession")))),c?a.createElement("div",{style:{padding:"32px",color:wt(.4),textAlign:"center"}},E("history.loadingTimeline")):e.length>0?a.createElement("div",{style:{maxHeight:"600px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"20px"}},e.map((u,x)=>a.createElement("div",{key:x,style:{display:"flex",flexDirection:"column",gap:"8px"}},a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,background:"var(--background-base)",padding:"6px 0",borderBottom:`1px solid ${wt(.1)}`,zIndex:5}},a.createElement("div",{style:{fontSize:"12px",fontWeight:700,fontFamily:"var(--theme-font-mono)",color:wt(.8)}},u.key),a.createElement(He,null,u.count," ",u.count===1?E("history.event"):E("history.events"))),a.createElement("div",{style:{paddingLeft:"12px",borderLeft:`2px solid ${wt(.15)}`,display:"flex",flexDirection:"column",gap:"6px"}},u.events.map(_=>a.createElement("div",{key:_.id||`${u.key}-${_.timestamp}-${_.title}`,onClick:()=>_.item&&i(_.item),style:{padding:"10px 12px",background:wt(.03),border:`1px solid ${wt(.07)}`,borderRadius:"4px",cursor:"pointer",transition:"background 0.15s"},onMouseEnter:m=>m.currentTarget.style.background=wt(.07),onMouseLeave:m=>m.currentTarget.style.background=wt(.03)},a.createElement("div",{style:{fontSize:"13px",lineHeight:"1.5",marginBottom:"6px"}},_.preview||_.title||_.item?.content||"No preview available"),a.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"}},a.createElement(He,{style:{background:q0[String(_.item?.veracity||_.type||"event").toLowerCase()]||wt(.1)}},_.item?.veracity||_.type||"event"),_.session_id&&a.createElement("span",{onClick:m=>{m.stopPropagation(),h(_.session_id)},style:{fontSize:"10px",fontFamily:"var(--theme-font-mono)",color:wt(.6),cursor:"pointer",textDecoration:"underline"}},"session:",Bt(_.session_id)),a.createElement("span",{style:{fontSize:"10px",color:wt(.4),fontFamily:"var(--theme-font-mono)"}},rn(_.timestamp||_.item?.created_at,"unknown"))))))))):a.createElement("div",{style:{padding:"32px",border:`1px dashed ${wt(.15)}`,borderRadius:"4px",textAlign:"center",color:wt(.35),fontSize:"13px"}},E("history.noEvents"))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},r&&a.createElement(ct,null,a.createElement(It,null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},a.createElement(Pt,null,E("history.sessionDetails")),a.createElement(Ue,{ghost:!0,onClick:()=>o(null)},E("common.close")))),a.createElement(dt,null,a.createElement("div",{style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",display:"flex",flexDirection:"column",gap:"4px",marginBottom:"12px",color:wt(.5)}},a.createElement("div",null,E("history.session"),": ",r.session_id),a.createElement("div",null,E("history.count"),": ",r.memories_count)),a.createElement("div",{style:{maxHeight:"300px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"6px"}},r.memories.map(u=>a.createElement("div",{key:u.id,onClick:()=>i(u),style:{padding:"10px",background:wt(.04),border:`1px solid ${wt(.08)}`,borderRadius:"4px",cursor:"pointer",fontSize:"12px"},onMouseEnter:x=>x.currentTarget.style.background=wt(.08),onMouseLeave:x=>x.currentTarget.style.background=wt(.04)},a.createElement("div",{style:{lineHeight:"1.5",marginBottom:"4px"}},u.content),a.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"10px",color:wt(.4),fontFamily:"var(--theme-font-mono)"}},a.createElement("span",null,u.veracity),a.createElement("span",null,"imp:",yt(u.importance,2,"n/a")))))))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("history.consolidationHistory"))),a.createElement(dt,null,a.createElement("div",{style:{maxHeight:"400px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"8px"}},n.length>0?n.map(u=>a.createElement("div",{key:u.id,onClick:()=>h(u.session_id),style:{padding:"10px 12px",background:wt(.03),border:`1px solid ${wt(.07)}`,borderRadius:"4px",cursor:"pointer"},onMouseEnter:x=>x.currentTarget.style.background=wt(.07),onMouseLeave:x=>x.currentTarget.style.background=wt(.03)},a.createElement("div",{style:{fontSize:"12px",lineHeight:"1.5",marginBottom:"6px"}},u.summary),a.createElement("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"10px",color:wt(.4),fontFamily:"var(--theme-font-mono)"}},a.createElement("span",{style:{textDecoration:"underline"}},"session:",Bt(u.session_id)),a.createElement("span",null,new Date(u.created_at).toLocaleDateString())))):a.createElement("div",{style:{textAlign:"center",color:wt(.35),fontSize:"12px",padding:"20px"}},E("history.noConsolidations")))))))};var za="/api/plugins/mnemosyne-native-dashboard",jt=i=>`rgba(234,234,234,${i})`,Xu=({adminMode:i,onToggleAdminMode:e})=>{let[t,n]=he(null),[s,r]=he([]),[o,l]=he(!1),[d,c]=he(!0),[p,g]=he("");it(()=>{h()},[]);async function h(){try{n(await st(`${za}/diagnostics`))}catch{}finally{c(!1)}}async function u(D){g(E("settings.saving"));try{let S=await st(`${za}/config`,{method:"POST",body:JSON.stringify({memory_admin_enabled:D})});e(S.config.memory_admin_enabled),g(E("settings.saved")),setTimeout(()=>g(""),2e3)}catch(S){g(`Error: ${S.message}`)}}async function x(){g(E("settings.creatingBackup"));try{let D=await st(`${za}/admin/backup`,{method:"POST"});g(`${E("settings.backupCreated")}: ${D.backup?.path||"done"}`),h()}catch(D){g(`Error: ${D.message}`)}}async function _(){try{let D=await st(`${za}/admin/audit?limit=100`);r(D.items||[]),l(!0)}catch(D){alert(`${E("settings.failedAuditLogs")}: ${D.message}`)}}let m=({ok:D})=>a.createElement("span",{style:{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:D?"#4ade80":"#f87171"}}),f=t?.exists??t?.db_exists??!1,M=t?.readable??t?.db_readable??!1,A=t?.writable??t?.db_writable,I=t?.size_bytes??t?.file_size_bytes??0;return a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"16px"}},a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("settings.memoryMaintenance"))),a.createElement(dt,null,a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("p",{style:{fontSize:"12px",color:jt(.55),lineHeight:"1.6"}},E("settings.maintenanceInfo")),a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},a.createElement(Pc,{id:"adminModeToggle",checked:i,onCheckedChange:D=>u(!!D)}),a.createElement("label",{htmlFor:"adminModeToggle",style:{fontSize:"13px",fontWeight:500,cursor:"pointer"}},E("settings.enableAdminMode"))),a.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},a.createElement(Ue,{ghost:!0,onClick:x},E("settings.createBackup")),i&&a.createElement(Ue,{ghost:!0,onClick:_},E("settings.viewAuditLogs"))),p&&a.createElement("div",{style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:jt(.6)}},p)))),a.createElement(ct,null,a.createElement(It,null,a.createElement(Pt,null,E("settings.databaseDiagnostics"))),a.createElement(dt,null,d?a.createElement("div",{style:{color:jt(.4),fontSize:"12px"}},E("settings.runningDiagnostics")):t?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px",fontSize:"12px",fontFamily:"var(--theme-font-mono)"}},[{label:"SQLite File Exists",ok:f},{label:"Read Permission",ok:M},{label:"Write Permission",ok:A}].map(D=>a.createElement("div",{key:D.label,style:{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:"6px",borderBottom:`1px solid ${jt(.07)}`}},a.createElement("span",{style:{color:jt(.5)}},D.label),a.createElement("div",{style:{display:"flex",gap:"6px",alignItems:"center"}},a.createElement(m,{ok:!!D.ok}),a.createElement("span",null,D.ok==null?"N/A":D.ok?"OK":"Fail")))),a.createElement("div",{style:{display:"flex",justifyContent:"space-between",paddingBottom:"6px",borderBottom:`1px solid ${jt(.07)}`}},a.createElement("span",{style:{color:jt(.5)}},E("settings.size")),a.createElement("span",null,yt(I/1024,1,"n/a")," KB")),a.createElement("div",{style:{paddingTop:"8px"}},a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.08em",color:jt(.4),marginBottom:"8px"}},E("settings.tableRows")),a.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"6px"}},Object.entries(t.table_counts).map(([D,S])=>a.createElement("div",{key:D,style:{display:"flex",justifyContent:"space-between",padding:"6px 8px",background:jt(.04),borderRadius:"4px",border:`1px solid ${jt(.07)}`}},a.createElement("span",{style:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginRight:"8px",color:jt(.55)}},D),a.createElement("span",null,S)))))):a.createElement("div",{style:{color:jt(.35),fontSize:"12px"}},E("settings.noDiagnostics"))))),o&&a.createElement(ct,null,a.createElement(It,null,a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},a.createElement(Pt,null,E("settings.auditLogsTitle")),a.createElement(Ue,{ghost:!0,onClick:()=>l(!1)},E("settings.closeLogs")))),a.createElement(dt,null,a.createElement("div",{style:{maxHeight:"300px",overflowY:"auto",display:"flex",flexDirection:"column",gap:"4px",fontFamily:"var(--theme-font-mono)",fontSize:"11px"}},s.length>0?s.map((D,S)=>a.createElement("div",{key:S,style:{padding:"8px 10px",background:jt(.04),borderRadius:"4px",border:`1px solid ${jt(.07)}`}},a.createElement("span",{style:{color:jt(.7),marginRight:"8px"}},"[",new Date(D.timestamp).toLocaleString(),"]"),a.createElement("strong",{style:{textTransform:"capitalize",color:jt(.5),marginRight:"8px"}},D.action,":"),a.createElement("span",null,D.details||D.memory_id))):a.createElement("div",{style:{textAlign:"center",color:jt(.35),padding:"20px"}},E("settings.noAuditLogs"))))))};var bc="/api/plugins/mnemosyne-native-dashboard",Y0=[{id:"overview"},{id:"today"},{id:"visualiser"},{id:"review"},{id:"memories"},{id:"profile"},{id:"lifecycle"},{id:"graph"},{id:"memoria"},{id:"activity"},{id:"settings"}],$0=i=>{let e=String(i||"unknown").toLowerCase();return e==="stated"?"#065f46":e==="inferred"?"#1e3a8a":e==="tool"?"#581c87":e==="imported"?"#78350f":"rgba(234,234,234,0.1)"},Z0=i=>{let e=String(i||"").toLowerCase();return e==="hot"?"#991b1b":e==="warm"?"#854d0e":e==="cold"?"#1e3a8a":"rgba(234,234,234,0.06)"},qu=()=>{let[i,e]=he("overview"),[t,n]=he(!1),[s,r]=he("0.1.0"),[o,l]=he(null),[d,c]=he(null),[p,g]=he(!1),[h,u]=he(null),[x,_]=he(null),[m,f]=he(!1),[M,A]=he({q:"",kind:"all",status:"active",sort:"recent",source:"",scope:"",session_id:"",veracity:"",degradation_tier:"",trust_preset:""}),I=(S,R)=>{A({q:"",kind:"all",status:"active",sort:"recent",source:"",scope:"",session_id:"",veracity:"",degradation_tier:"",trust_preset:"",...S}),R("memories")},D=S=>{if(!S){l(null),c(null);return}typeof S=="string"?(l(S),c(R=>R&&R.id===S?R:null)):S&&typeof S=="object"&&(l(S.id),c(S))};return it(()=>{st(`${bc}/config`).then(S=>{S?.config&&n(!!S.config.memory_admin_enabled),S?.version&&r(S.version)}).catch(()=>{})},[]),it(()=>{if(!o){c(null);return}o==="Consolidation detail"||o==="Triple detail"||o==="JSON"||(g(!0),st(`${bc}/memory?id=${encodeURIComponent(o)}`).then(S=>{S?.item&&c(R=>R&&R.id===S.item.id?{...R,...S.item}:S.item)}).catch(()=>{}).finally(()=>g(!1)))},[o]),it(()=>{if(!h){_(null);return}f(!0),st(`${bc}/session?id=${encodeURIComponent(h)}&limit=200`).then(S=>{S&&_(S)}).catch(()=>{}).finally(()=>f(!1))},[h]),a.createElement("div",{style:{display:"flex",flexDirection:"column",width:"100%",minHeight:0}},a.createElement("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",paddingBottom:"8px",borderBottom:"1px solid rgba(234,234,234,0.1)",fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.45)"}},a.createElement("span",null,"v",s),a.createElement("div",{style:{display:"flex",alignItems:"center",gap:"6px"}},a.createElement("span",{style:{width:"6px",height:"6px",borderRadius:"50%",background:t?"#4ade80":"rgba(234,234,234,0.3)",display:"inline-block"}}),a.createElement("span",null,t?E("index.adminActive"):E("index.readOnly")))),a.createElement(Dc,{defaultValue:"overview",className:""},(S,R)=>{let y=S||"overview";return a.createElement(a.Fragment,null,a.createElement(Rc,{style:{marginBottom:"20px",flexWrap:"wrap",height:"auto",gap:"2px"}},Y0.map(C=>a.createElement(Lc,{key:C.id,value:C.id,active:y===C.id,onClick:()=>R(C.id)},E("tabs."+C.id)))),a.createElement("div",{style:{minHeight:0}},y==="overview"&&a.createElement(Oc,{onInspectMemory:D,onInspectSession:u,onNavigateToTab:R,onApplyFilters:C=>I(C,R)}),y==="today"&&a.createElement(kc,{onInspectMemory:D,onInspectSession:u,onInspectJson:(C,P)=>{D({id:P||"JSON",content:JSON.stringify(C,null,2),veracity:"n/a",importance:0,source:"system",scope:"global",status:"n/a",created_at:""})}}),y==="visualiser"&&a.createElement(Uu,{onInspectMemory:D}),y==="review"&&a.createElement(Fu,{onInspectMemory:D,onInspectSession:u,onApplyFilters:C=>I(C,R),adminMode:t}),y==="memories"&&a.createElement(Ou,{onInspectMemory:D,onInspectSession:u,adminMode:t,filters:M,setFilters:A}),y==="profile"&&a.createElement(Bu,null),y==="lifecycle"&&a.createElement(ku,{onInspectMemory:D,onInspectSession:u,onApplyFilters:C=>I(C,R)}),y==="graph"&&a.createElement(zu,{onInspectMemory:D,onNavigateToTab:R}),y==="memoria"&&a.createElement(Gu,{onInspectSession:u}),y==="activity"&&a.createElement(Wu,{onInspectMemory:D}),y==="settings"&&a.createElement(Xu,{adminMode:t,onToggleAdminMode:n})))}),o&&a.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"}},a.createElement("div",{style:{width:"100%",maxWidth:"680px",maxHeight:"85vh",background:"var(--background-base)",border:"1px solid rgba(234,234,234,0.12)",borderRadius:"4px",overflow:"hidden",display:"flex",flexDirection:"column"}},a.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid rgba(234,234,234,0.1)",background:"rgba(234,234,234,0.03)"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(234,234,234,0.4)",marginBottom:"4px"}},E("index.memoryRecord")),a.createElement("div",{style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.6)",wordBreak:"break-all"}},o)),a.createElement("button",{onClick:()=>D(null),style:{background:"none",border:"none",cursor:"pointer",color:"rgba(234,234,234,0.5)",fontSize:"18px",lineHeight:1,padding:"0 0 0 12px"}},"\u2715")),a.createElement("div",{style:{flex:1,overflowY:"auto",padding:"20px",scrollBehavior:"smooth"}},p&&!d?a.createElement("div",{style:{textAlign:"center",color:"rgba(234,234,234,0.4)",padding:"40px"}},E("index.loadingRecord")):d?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},a.createElement(He,{style:{background:$0(d.veracity)}},d.veracity," ",E("index.trust")," (\xD7",yt(d.trust_weight,2,"1.00"),")"),a.createElement(He,{style:{background:Z0(d.degradation_label)}},d.degradation_label?`${d.degradation_label} ${E("index.tier")} ${d.degradation_tier}`:E("index.notDegraded"),d.degradation_weight!==void 0&&d.degradation_weight!==null?` (\xD7${yt(d.degradation_weight,2)})`:""),a.createElement(He,{style:{background:"rgba(234,234,234,0.06)",border:"1px solid rgba(234,234,234,0.15)"}},E("index.effectiveWeight")," \xD7",yt(d.effective_memory_weight,2,"0.00")),d.contaminated&&a.createElement(He,{style:{background:"#991b1b",color:"#fca5a5"}},E("index.needsReview"))),a.createElement("div",null,a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.08em"}},E("index.content")),a.createElement("div",{style:{padding:"14px",borderRadius:"4px",background:"rgba(234,234,234,0.04)",border:"1px solid rgba(234,234,234,0.1)",fontSize:"13px",lineHeight:"1.6",whiteSpace:"pre-wrap"}},d.content)),a.createElement("div",null,a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.08em"}},E("index.diagnostics")),a.createElement("div",{style:{fontSize:"12px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.5)",display:"flex",flexDirection:"column"}},[["Memory ID",d.id],["Kind / Tier",d.memory_kind||d.tier||"memory"],["Source",d.source||"unknown"],["Scope",d.scope||"session"],["Session ID",d.session_id],["Status",d.status],["Recall Count",d.recall_count!==void 0&&d.recall_count!==null?`${d.recall_count}\xD7`:"0\xD7"],["Last Recalled",rn(d.last_recalled,"never")],["Created At",rn(d.created_at,"unknown")],["Degraded At",rn(d.degraded_at,"never")],["Valid Until",rn(d.valid_until,"none")],["Superseded By",d.superseded_by||"none"]].map(([S,R])=>!R&&S!=="Valid Until"&&S!=="Superseded By"&&S!=="Last Recalled"&&S!=="Degraded At"?null:a.createElement("div",{key:S,style:{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid rgba(234,234,234,0.06)"}},a.createElement("span",null,S),S==="Session ID"&&R&&R!=="default"?a.createElement("span",{onClick:()=>{D(null),u(R)},style:{color:"rgba(234,234,234,0.75)",textDecoration:"underline",cursor:"pointer"}},R):a.createElement("span",{style:{color:"rgba(234,234,234,0.75)"}},String(R)))))),(()=>{if(!d.metadata)return null;let S=d.metadata;if(typeof S=="string")try{S=JSON.parse(S)}catch{S={value:S}}return typeof S=="object"&&Object.keys(S).length===0?null:a.createElement("div",null,a.createElement("div",{style:{fontSize:"11px",color:"rgba(234,234,234,0.45)",marginBottom:"8px",textTransform:"uppercase",letterSpacing:"0.08em"}},E("common.metadata")),a.createElement("pre",{style:{padding:"12px",borderRadius:"4px",background:"rgba(234,234,234,0.04)",fontSize:"11px",overflowX:"auto",maxHeight:"160px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.6)",margin:0}},JSON.stringify(S,null,2)))})()):a.createElement("div",{style:{textAlign:"center",color:"#f87171",padding:"40px",fontSize:"13px"}},E("index.noRecordFound"))),a.createElement("div",{style:{padding:"12px 20px",borderTop:"1px solid rgba(234,234,234,0.1)",display:"flex",justifyContent:"flex-end"}},a.createElement(Ue,{onClick:()=>D(null)},E("common.close"))))),h&&a.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:"16px"}},a.createElement("div",{style:{width:"100%",maxWidth:"680px",maxHeight:"85vh",background:"var(--background-base)",border:"1px solid rgba(234,234,234,0.12)",borderRadius:"4px",overflow:"hidden",display:"flex",flexDirection:"column"}},a.createElement("div",{style:{display:"flex",alignItems:"flex-start",justifyContent:"space-between",padding:"16px 20px",borderBottom:"1px solid rgba(234,234,234,0.1)",background:"rgba(234,234,234,0.03)"}},a.createElement("div",null,a.createElement("div",{style:{fontSize:"10px",textTransform:"uppercase",letterSpacing:"0.1em",color:"rgba(234,234,234,0.4)",marginBottom:"4px"}},E("index.sessionDetails")),a.createElement("div",{style:{fontSize:"11px",fontFamily:"var(--theme-font-mono)",color:"rgba(234,234,234,0.6)",wordBreak:"break-all"}},h)),a.createElement("button",{onClick:()=>u(null),style:{background:"none",border:"none",cursor:"pointer",color:"rgba(234,234,234,0.5)",fontSize:"18px",lineHeight:1,padding:"0 0 0 12px"}},"\u2715")),a.createElement("div",{style:{flex:1,overflowY:"auto",padding:"20px"}},m?a.createElement("div",{style:{textAlign:"center",color:"rgba(234,234,234,0.4)",padding:"40px"}},E("index.loadingSession")):x?a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},a.createElement("div",{style:{fontSize:"12px",color:"rgba(234,234,234,0.5)",fontFamily:"var(--theme-font-mono)",display:"flex",gap:"16px",borderBottom:"1px solid rgba(234,234,234,0.08)",paddingBottom:"10px"}},a.createElement("span",null,E("index.memories")," ",a.createElement("strong",null,x.counts?.memories??0)),a.createElement("span",null,E("index.facts")," ",a.createElement("strong",null,x.counts?.triples??0)),a.createElement("span",null,E("index.consolidations")," ",a.createElement("strong",null,x.counts?.consolidations??0))),a.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"6px"}},x.events&&x.events.length>0?x.events.map((S,R)=>a.createElement("div",{key:R,onClick:()=>S.item?.id&&l(S.item.id),style:{padding:"10px 12px",background:"rgba(234,234,234,0.03)",border:"1px solid rgba(234,234,234,0.07)",borderRadius:"4px",cursor:"pointer",display:"flex",flexDirection:"column",gap:"4px"}},a.createElement("div",{style:{display:"flex",gap:"6px",alignItems:"center"}},a.createElement(He,null,S.type),a.createElement("span",{style:{fontSize:"10px",color:"rgba(234,234,234,0.4)"}},rn(S.timestamp))),a.createElement("div",{style:{fontSize:"12px",fontWeight:600}},S.title),a.createElement("div",{style:{fontSize:"12px",color:"rgba(234,234,234,0.7)"}},S.preview))):a.createElement("div",{style:{textAlign:"center",padding:"40px",color:"rgba(234,234,234,0.35)",fontSize:"12px"}},E("index.noSessionEvents")))):a.createElement("div",{style:{textAlign:"center",color:"#f87171",padding:"40px",fontSize:"13px"}},E("index.sessionNotLoaded"))),a.createElement("div",{style:{padding:"12px 20px",borderTop:"1px solid rgba(234,234,234,0.1)",display:"flex",justifyContent:"flex-end"}},a.createElement(Ue,{onClick:()=>u(null)},E("common.close"))))))};typeof window<"u"&&window.__HERMES_PLUGINS__&&window.__HERMES_PLUGINS__.register("mnemosyne-native-dashboard",qu);var jb=qu;})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
