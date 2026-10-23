import React, {useEffect, useState} from 'react';
import './scientific-capability.css';

const ASSETS = `${import.meta.env.BASE_URL}assets/`;
const RESEARCH = `${ASSETS}scientific-capability/`;
const BENCH_PAPER = `${RESEARCH}PhenoBench-pilot-manuscript.pdf`;
const BENCH_DATASET = 'https://huggingface.co/datasets/Jerrychen229/PhenoBench';

// MorphKnow / MorphAnalysis manuscript, Table 9. Raw accuracies, expressed as percentages.
const knowledgeResults = [
  {method: 'Base model', values: [44.1, 53.8, 33.3]},
  {method: 'SFT', values: [99.1, 42.9, 25.6]},
  {method: 'Self-distillation', values: [99.0, 51.4, 31.9]},
  {method: 'On-policy distillation', values: [99.0, 43.7, 36.0]},
  {method: 'GRPO', values: [51.5, 54.5, 40.4]},
];

// PhenoBench pilot manuscript, Figure 2. Each task has three independent runs per model.
const benchmarkResults = [
  {model: 'GPT-5.6 Sol', values: [69.4, 66.7, 66.7, 75.0]},
  {model: 'Claude Opus 4.8', values: [61.1, 50.0, 50.0, 83.3]},
  {model: 'Grok 4.6', values: [61.1, 50.0, 50.0, 83.3]},
  {model: 'Gemini 3.6 Flash', values: [47.2, 33.3, 58.3, 50.0]},
];
const benchmarkViews = [
  {label: 'Overall', description: '12 tasks · 36 independent trajectories per model'},
  {label: 'Characterization & quality', description: '4 tasks · 12 independent trajectories per model'},
  {label: 'Biological interpretation', description: '4 tasks · 12 independent trajectories per model'},
  {label: 'Translation & prioritization', description: '4 tasks · 12 independent trajectories per model'},
];

function PaperFigure({file, width, height, alt, children}) {
  return (
    <figure className="cap-paper-figure">
      <a href={`${RESEARCH}${file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size figure: ${alt}`}>
        <img src={`${RESEARCH}${file}`} width={width} height={height} alt={alt} loading="lazy" decoding="async"/>
      </a>
      <figcaption>{children}<a href={`${RESEARCH}${file}`} target="_blank" rel="noopener noreferrer">Open full size ↗</a></figcaption>
    </figure>
  );
}

function SourceDetails({label, children}) {
  return (
    <details className="cap-source-details">
      <summary>{label}<span aria-hidden="true">+</span></summary>
      {children}
    </details>
  );
}

function KnowledgeSummary() {
  return (
    <div className="cap-knowledge-results">
      <h3>Test whether learned knowledge becomes useful.</h3>
      <p>Post-training makes measured phenotypic knowledge accessible, while gains on scientific analysis remain uneven. Knowledge acquisition and analytical application are evaluated separately.</p>
      <div className="cap-table-scroll" role="region" aria-label="Selected knowledge and analysis accuracies" tabIndex={0}>
        <table className="cap-results-table">
          <caption>Qwen3.5-9B · Selected accuracies (%)</caption>
          <thead><tr><th scope="col">Post-training</th><th scope="col">Knowledge access<small>1,000 questions</small></th><th scope="col">Readout design<small>247 tasks</small></th><th scope="col">Context transfer<small>240 tasks</small></th></tr></thead>
          <tbody>{knowledgeResults.map(row => <tr key={row.method}><th scope="row">{row.method}</th>{row.values.map((value, i) => <td key={i}>{value.toFixed(1)}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="cap-note">Mean accuracy over three responses per item. SFT: supervised fine-tuning; GRPO: outcome-based reinforcement learning.</p>
    </div>
  );
}

function BenchmarkEvidence() {
  const [view, setView] = useState(0);
  return (
    <div className="cap-evidence">
      <div className="cap-story-grid">
        <h3>Frontier models, tested<br/>on research workflows.</h3>
        <div className="cap-body"><p>In the 12-task pilot, overall pass rates range from 47.2% to 69.4%. Performance varies across scientific objectives, and no evaluated model succeeds consistently across the benchmark.</p></div>
      </div>
      <div className="cap-benchmark-results">
        <div className="cap-results-topline"><span className="cap-small-label">Pilot evaluation / Endpoint pass rate</span><span className="cap-small-label">0–100%</span></div>
        <div className="cap-view-switch" role="group" aria-label="Choose a PhenoBench scientific objective">
          {benchmarkViews.map((item, index) => <button type="button" key={item.label} aria-pressed={view === index} onClick={() => setView(index)}>{item.label}</button>)}
        </div>
        <div className="cap-chart" aria-live="polite" aria-atomic="true">
          <p className="cap-chart-context">{benchmarkViews[view].label} · {benchmarkViews[view].description}</p>
          {benchmarkResults.map(item => <div className="cap-chart-row" key={item.model}>
            <span className="cap-model-name">{item.model}</span>
            <div className="cap-bar-track" aria-hidden="true"><span style={{width: `${item.values[view]}%`}}/></div>
            <strong>{item.values[view].toFixed(1)}<span>%</span></strong>
          </div>)}
        </div>
        <p className="cap-note">Four frontier LLMs · 144 trajectories · One common agent harness. Each task is run independently three times per model and scored automatically by a frozen verifier. <a href={`${BENCH_PAPER}#page=5`} target="_blank" rel="noopener noreferrer">Benchmark results ↗</a></p>
      </div>
      <SourceDetails label="View the original performance & efficiency figure">
        <PaperFigure file="phenobench-pilot-results.png" width={1213} height={579}
          alt="PhenoBench Figure 2 compares four models by scientific objective, overall pass rate, API cost, and runtime.">
          <span>PhenoBench · Performance and efficiency.</span>
        </PaperFigure>
      </SourceDetails>
      <div className="cap-failure-intro"><h3>Find where scientific execution breaks down.</h3><p>Analyzing failure trajectories reveals gaps that aggregate pass rates can hide.</p></div>
      <div className="cap-failure-grid">
        <article><p className="cap-small-label">Gene-function recovery</p><h4>Reproducible profiles can lose biological structure.</h4><p>An agent selected an unwhitened representation for better replicate reproducibility, but the representation failed to preserve the required functional neighborhoods.</p></article>
        <article><p className="cap-small-label">Drug-resistance analysis</p><h4>Internal validation can miss transfer failure.</h4><p>A signature perfectly separated the observed clones in leave-one-out validation, but omitted a specificity control and failed to transfer to unseen clones.</p></article>
      </div>
      <SourceDetails label="Explore the two failure trajectories · Figure 4">
        <PaperFigure file="phenobench-failure-cases.png" width={1213} height={1301}
          alt="PhenoBench Figure 4 contrasts observed failures with evaluator-supported alternatives for gene-function recovery and drug-resistance transfer.">
          <span>Failure trajectories · Evaluator-supported alternatives and observed model decisions.</span>
        </PaperFigure>
      </SourceDetails>
      <div className="cap-iteration">
        <p className="cap-small-label">Next / Failure-driven model & harness iteration</p>
        <h3>Turn error patterns into<br/>the next improvement.</h3>
        <p>Observed failure modes will guide updates to both the underlying model and the agent harness. Changes will be re-evaluated on held-out scientific tasks to test whether they improve execution and scientific conclusions.</p>
        <ol className="cap-iteration-loop"><li><span>01</span>Diagnose failures</li><li><span>02</span>Refine model & harness</li><li><span>03</span>Re-evaluate capability</li></ol>
        <p className="cap-iteration-goal">This evaluation–improvement cycle will support the next stage of research toward self-evolving AI scientists.</p>
      </div>
      <p className="cap-boundary">Pilot benchmark: 12 tasks under a common harness. Original study data are used directly when gradable; controlled semi-synthetic variants are used where needed to distinguish valid outcomes from predefined analytical failures.</p>
    </div>
  );
}

export default function ScientificCapabilityPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'What Does It Take for AI to Do Science? | Pheno AI Scientist';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="capability-page">
      <section className="cap-hero">
        <div className="cap-topline"><a href="/#research">← Research foundations</a><span className="cap-small-label">Research direction 03</span></div>
        <p className="eyebrow">SCIENTIFIC AGENT LEARNING & EVALUATION</p>
        <h1>What Does It Take<br/>for AI to Do Science?</h1>
        <p className="cap-deck"><strong>Beyond scientific reasoning, toward end-to-end research capabilities.</strong></p>
        <p className="cap-hero-copy">Scientific research requires more than answering questions. AI agents must process experimental data, write and execute analysis code, interpret results, and draw evidence-based conclusions. Our research investigates how AI systems acquire and apply biological knowledge, and evaluates their ability to carry out complete, verifiable scientific analysis workflows.</p>
      </section>

      <nav className="cap-page-nav" aria-label="On this scientific capability page"><a href="#capability-agents">01 / PhenoBench</a><a href="#capability-knowledge">02 / Knowledge for analysis</a><a href="#capability-discovery">03 / Towards capable AI scientists</a></nav>

      <section className="cap-section cap-benchmark-section" id="capability-agents" aria-labelledby="cap-agents-title">
        <div className="cap-section-topline"><p className="eyebrow">01 / PHENOBENCH</p><span className="cap-small-label">Pilot benchmark</span></div>
        <div className="cap-story-grid">
          <h2 id="cap-agents-title">Evaluating End-to-End<br/>Scientific Analysis</h2>
          <div className="cap-body"><p><strong className="cap-highlight">PhenoBench evaluates frontier LLMs on complete, real-world biological data-analysis tasks: processing experimental data, writing and executing code, interpreting results, and producing a verifiable scientific conclusion.</strong></p><p>Each task reconstructs a scientific question from a published study. Agents receive the experimental context and staged data, then choose and execute their own analysis.</p><div className="cap-resource-links"><a href={BENCH_DATASET} target="_blank" rel="noopener noreferrer">Dataset on Hugging Face ↗</a></div></div>
        </div>
        <figure className="cap-concept-figure"><a href={`${ASSETS}research/phenobench-overview.png`} target="_blank" rel="noopener noreferrer" aria-label="Open the PhenoBench illustration at full size"><img src={`${ASSETS}research/phenobench-overview.png`} width={1774} height={887} loading="lazy" decoding="async" alt="Scientific data feeds an agent using analytical tools, scientific knowledge, and literature search to produce scientific analyses and conclusions."/></a><figcaption>Experimental data → agent-led investigation → verifiable conclusions.<a href={BENCH_PAPER} target="_blank" rel="noopener noreferrer">Read the benchmark paper ↗</a></figcaption></figure>
        <div className="cap-focus-grid">
          <article><span className="cap-small-label">Grounded in publications</span><h3>Start from a real scientific question.</h3><p>Tasks preserve the biological setting and research objective of published perturbation studies, using public measurements and complementary evidence where required.</p></article>
          <article><span className="cap-small-label">End-to-end analysis</span><h3>Carry out the complete workflow.</h3><p>Agents inspect files, select methods, write and run analysis code, interpret outputs, and submit a structured scientific endpoint.</p></article>
          <article><span className="cap-small-label">Automated verification</span><h3>Score the scientific outcome.</h3><p>Calibrated acceptance intervals and task-specific rules enable reproducible grading while allowing defensible alternative analyses.</p></article>
        </div>
        <div className="cap-grading" aria-labelledby="cap-grading-title">
          <div><p className="cap-small-label">How an endpoint becomes gradable</p><h3 id="cap-grading-title">Define an acceptable range.<br/>Check the result automatically.</h3></div>
          <div><p>Acceptable analysis variants establish a calibrated interval for a numerical endpoint. Predefined failure variants check that the interval excludes consequential analytical errors. The agent’s submitted result is then checked by a frozen verifier.</p><p className="cap-note">Categorical, ranked, and set-valued endpoints use corresponding deterministic grading rules. Controlled semi-synthetic variants are used when the original data do not provide sufficient separation.</p></div>
        </div>
        <SourceDetails label="Explore tasks grounded in published studies">
          <div className="cap-task-examples">
            <article><p className="cap-small-label">Characterization & quality</p><h3>Correct chromosome-arm bias.</h3><p>Analyze genome-wide CRISPR Cell Painting profiles and genomic metadata. Reduce chromosome-arm artifacts while preserving recoverable biological relationships.</p></article>
            <article><p className="cap-small-label">Biological interpretation</p><h3>Recover cross-modal relationships.</h3><p>Combine morphology with matched L1000 expression profiles to identify signed gene relationships and functional modules supported across modalities.</p></article>
            <article><p className="cap-small-label">Translation & prioritization</p><h3>Prioritize compounds for follow-up.</h3><p>Use genetic-perturbation and compound-treatment profiles to rank compounds that phenocopy or oppose the target perturbation.</p></article>
          </div>
        </SourceDetails>
        <BenchmarkEvidence/>
      </section>

      <section className="cap-section cap-knowledge-section" id="capability-knowledge" aria-labelledby="cap-knowledge-title">
        <p className="eyebrow">02 / MORPHKNOW & MORPHANALYSIS</p>
        <div className="cap-story-grid"><h2 id="cap-knowledge-title">Learning Knowledge<br/>for Scientific Analysis</h2><div className="cap-body"><p>End-to-end analysis raises a capability question: <strong className="cap-highlight">can biological knowledge learned from past experiments support decisions about new data?</strong> MorphKnow and MorphAnalysis study this through experimentally derived datasets and controlled post-training.</p></div></div>
        <figure className="cap-concept-figure"><a href={`${RESEARCH}morphknow-overview.png`} target="_blank" rel="noopener noreferrer" aria-label="Open the MorphKnow and MorphAnalysis illustration at full size"><img src={`${RESEARCH}morphknow-overview.png`} width={2061} height={763} loading="lazy" decoding="async" alt="Experimental perturbation data provides measured phenotypic knowledge for language-model post-training, followed by evaluation on scientific analysis tasks."/></a></figure>
        <div className="cap-knowledge-modules">
          <article><p className="cap-small-label">Dataset</p><h3>Turn measured biology into learnable knowledge.</h3><p>MorphKnow contains <strong>15,004 phenotypic knowledge items</strong> from eight datasets across six cell lines. MorphAnalysis pairs this knowledge with <strong>967 analysis tasks</strong> testing processing choices, readout design, and context transfer.</p></article>
          <article><p className="cap-small-label">Post-training</p><h3>Learn the knowledge. Evaluate its use.</h3><p>Fine-tuning, distillation, and outcome-based reinforcement learning investigate how models acquire biological knowledge and apply it beyond recall. Analysis tasks test how that knowledge combines with evidence from the current experiment.</p></article>
        </div>
        <KnowledgeSummary/>
        <p className="cap-boundary">MorphAnalysis uses controlled numerical evidence within empirically observed ranges. Selected results above use Qwen3.5-9B; the broader study includes selected replication on another 9B-scale model.</p>
      </section>

      <section className="cap-discovery" id="capability-discovery" aria-labelledby="cap-discovery-title">
        <p className="eyebrow">03 / TOWARDS CAPABLE AI SCIENTISTS</p>
        <h2 id="cap-discovery-title">From reasoning to reliable execution.</h2>
        <p className="cap-discovery-lead">Build scientific capability, evaluate complete investigations, and use the failures to guide improvement.</p>
        <p className="cap-discovery-context">PhenoBench makes end-to-end analysis measurable. MorphKnow / MorphAnalysis investigates how learned biological knowledge can support that analysis. These insights inform model and harness development for Pheno AI Scientist, with reproducible execution and evidence-grounded conclusions as the foundation for closed-loop discovery.</p>
        <div className="cap-closing-links"><a className="button" href="/#demo">Explore the discovery loop ↗</a><a href="/research/phenoair">Explore PhenoAIR ↗</a><a href="/research/representation-learning">Representation learning ↗</a></div>
      </section>
    </main>
  );
}
