import React, {useState, useEffect} from 'react';
import HeroVisual from './HeroVisual.jsx';
import DataEcosystem from './DataEcosystem.jsx';
import PhenoAIRPage from './PhenoAIRPage.jsx';
import RepresentationLearningPage from './RepresentationLearningPage.jsx';
import ScientificCapabilityPage from './ScientificCapabilityPage.jsx';
import ResearchFoundations, {researchTracks} from './ResearchFoundations.jsx';
import {createRoot} from 'react-dom/client';
import './styles.css';
const steps=[
 ['Hypothesis Generation','Start with a biological question.','Connect biological context and prior knowledge to formulate testable mechanistic hypotheses.','Biological question → candidate hypothesis'],
 ['Experiment Planning','Turn a question into an experiment.','Define perturbations, doses, controls, and readouts. Prioritize experiments that resolve key uncertainties within laboratory capacity, timelines, and budget.','Candidate hypothesis → assay design'],
 ['Wet-Lab Readout','Make biology visible.','Capture cellular responses with Cell Painting and follow-up assays. Connect experimental readouts to the evidence used in the next discovery cycle.','Perturbation → morphological readout'],
 ['Multimodal Analysis','Bring the evidence together.','Integrate morphological features, multi-omics, and biological knowledge to investigate mechanisms and build an interpretable evidence base.','Images + omics + knowledge → evidence'],
 ['Hypothesis Evaluation & Refinement','Evaluate the hypothesis. Refine the next experiment.','Evaluate hypotheses against experimental evidence, revise or reject explanations, and build reusable knowledge. Feed each cycle back into scientific reasoning and experiment planning.','Experimental evidence → revised hypotheses + updated knowledge']
];
function App(){const [path,setPath]=useState(location.pathname),[active,setActive]=useState(0),[menu,setMenu]=useState(false);useEffect(()=>{const fn=()=>{setPath(location.pathname);window.scrollTo(0,0)};window.addEventListener('popstate',fn);return()=>window.removeEventListener('popstate',fn)},[]);function navigate(e,p){e.preventDefault();history.pushState({},'',p);setPath(p);setMenu(false);window.scrollTo(0,0)}const track=researchTracks.find(t=>path==='/research/'+t.slug||t.aliases.some(alias=>path==='/research/'+alias));return <><header><a className="brand" href="/" onClick={e=>navigate(e,'/')}><span className="brand-mark">✳</span> Pheno AI Scientist</a><button className="menu-toggle" aria-expanded={menu} onClick={()=>setMenu(!menu)}>Menu {menu?'−':'+'}</button><nav className={menu?'open':''}><a href="/#platform" onClick={()=>setMenu(false)}>The platform</a><a href="/#research" onClick={()=>setMenu(false)}>Research</a><a href="/#about" onClick={()=>setMenu(false)}>Ecosystem</a><a className="nav-cta" href="/#demo" onClick={()=>setMenu(false)}>Explore the loop <span>↗</span></a></nav></header>
{track?(track.slug==='phenoair'?<PhenoAIRPage/>:track.slug==='representation-learning'?<RepresentationLearningPage/>:<ScientificCapabilityPage/>):<main><section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="live-dot"/> A LEARNING AI SCIENTIST</p><h1 className="hero-title"><span className="hero-title-line">Towards <span className="no-wrap">Closed-Loop</span></span><span className="hero-title-line"><em>Phenotypic</em>{' '}<span className="title-discovery">Drug Discovery</span></span></h1><div className="hero-bottom"><p>Automating drug discovery through cellular phenotypes.<br/>Closing the loop between hypothesis and experiment.</p><a className="circle-link" href="#platform" aria-label="Explore the platform">↓</a></div></div><HeroVisual/></section>
<section className="why section" id="evidence">
  <div className="section-heading">
    <p className="eyebrow">01 / PHENOTYPIC DRUG DISCOVERY</p>
    <h2>Drug discovery,<br/>through cellular phenotypes.</h2>
  </div>
  <div className="why-text">
    <p className="lead">Cell Painting captures rich cellular responses at scale.</p>
    <ul className="benefit-list">
      <li><h3>Read across cellular dimensions</h3><p>Cell shape, organelle structure, and spatial organization.</p></li>
      <li><h3>Connect phenotype with biology</h3><p>Multi-omics and biological knowledge add molecular context.</p></li>
      <li><h3>Guide experimental validation</h3><p>Investigate mechanisms and prioritize candidates.</p></li>
    </ul>
  </div>
</section>
<section className="intro section" id="platform">
  <div className="section-bar"><p className="eyebrow">02 / A CLOSED-LOOP AI SCIENTIST</p></div>
  <h2>Learning through<br/>experimental feedback.</h2>
  <div className="platform-pillars">
    <div><h3>Learn from every cycle.</h3><p>Connect hypotheses, experiments, and analysis. Accumulate knowledge to refine scientific reasoning and experimental strategies.</p></div>
    <div><h3>Make every experiment count.</h3><p>Prioritize experiments that resolve key uncertainties. Plan each batch around laboratory capacity, timelines, and budget.</p></div>
  </div>
</section>
<section className="workflow section" id="demo"><div className="section-bar"><span className="eyebrow">THE SCIENTIFIC DISCOVERY CYCLE</span></div><div className="loop-layout"><div className="loop"><svg className="loop-path" viewBox="0 0 600 510" aria-hidden="true"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke="currentColor"/></marker></defs><path d="M300 67 L520 215 L440 430 L160 430 L80 215 Z" markerMid="url(#arrow)" markerEnd="url(#arrow)"/><path className="moving" d="M300 67 L520 215 L440 430 L160 430 L80 215 Z"/></svg><div className="loop-center"><span className="orbit-icon">✳</span><strong>Closed-Loop<br/>AI Scientist</strong><span>LEARNING FROM EXPERIMENTS</span></div>{steps.map((s,i)=><button key={s[0]} className={`step step-${i} ${active===i?'selected':''}`} onMouseEnter={()=>setActive(i)} onFocus={()=>setActive(i)} onClick={()=>setActive(i)} aria-pressed={active===i}><span className="step-no">0{i+1}</span><span>{s[0]}{i===2&&<small>Cell Painting</small>}</span><b>↗</b></button>)}<p className="loop-return"><span aria-hidden="true">↺ </span>Feedback informs the next hypothesis</p></div><div className="step-detail" aria-live="polite"><div className="detail-count">0{active+1}<span> / 05</span></div><p className="eyebrow">{steps[active][0]}</p><h3>{steps[active][1]}</h3><p>{steps[active][2]}</p><div className="input-output">{steps[active][3]}</div><div className="step-controls"><button aria-label="Next discovery step" onClick={()=>setActive((active+1)%steps.length)}>Next step →</button></div></div></div><ul className="workflow-features" aria-label="AI scientist features"><li>End-to-End Agent Analysis</li><li>AI4AI Feature Extraction</li><li>Adaptive Experiment Planning</li><li>Self-Improvement</li></ul></section>

<ResearchFoundations navigate={navigate}/>
<DataEcosystem/></main>}
<footer><a className="brand" href="/" onClick={e=>navigate(e,'/')}><span className="brand-mark">✳</span> Pheno AI Scientist</a><div className="footer-links"><a href="/#about">Scientific resources ↗</a><a className="contact-link" href="mailto:jiaychen229@gmail.com">Contact us ↗</a></div></footer></>}
createRoot(document.getElementById('root')).render(<App/>);
