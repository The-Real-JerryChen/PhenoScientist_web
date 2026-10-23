import React, {useEffect, useState} from 'react';
import './phenoair.css';

const ASSETS = `${import.meta.env.BASE_URL}assets/`;
const PAPER = `${ASSETS}phenoair/PhenoAIR-NeurIPS-2026.pdf`;
const CODE = 'https://github.com/The-Real-JerryChen/PhenoAIR_NeurIPS26';
const DATA = 'https://huggingface.co/datasets/Jerrychen229/PhenoAIR_MOA';

const settings = [
  {name: 'MoA-Verified', regime: 'Controlled · Closed-set', metric: 'Top-1 accuracy', detail: '200 test compounds · 26 MOA classes', secondary: 'Any-match accuracy'},
  {name: 'MoA-Extended', regime: 'Noisy references · Closed-set', metric: 'Top-1 accuracy', detail: '600 test compounds · 137 MOA classes', secondary: 'Any-match accuracy'},
  {name: 'MoA-Novel', regime: 'Unseen mechanisms · Open-set', metric: 'Overall accuracy', detail: '100 test compounds · 50% novel-MOA cases', secondary: 'Novel-detection F1'},
];

// Paper Table 2: means and standard deviations in percentage points.
export const publishedResults = {
  gpt: {
    name: 'GPT-5.1',
    phenoair: [[62.6, 0.7], [45.6, 0.2], [79.4, 2.2]],
    secondary: [[74.6, 0.6], [56.2, 0.3], [74.7, 2.9]],
    comparisons: [
      {name: 'CellCLIP + kNN', values: [[14.0, 0], [10.2, 0], null]},
      {name: 'ECFP + kNN', values: [[23.0, 0], [30.0, 0], null]},
      {name: 'Structure-only LLM', values: [[43.5, 1.4], [39.8, 0.3], [44.2, 3.4]]},
      {name: 'Fixed workflow', values: [[50.0, 1.2], [31.7, 0.5], [58.0, 0.3]]},
      {name: 'Single agent', values: [[39.1, 1.4], [30.9, 0.5], [48.8, 2.4]]},
    ],
  },
  claude: {
    name: 'Claude 4 Sonnet',
    phenoair: [[61.5, 0.5], [45.8, 0.3], [73.6, 3.1]],
    secondary: [[74.2, 0.7], [59.9, 0.1], [74.1, 2.0]],
    comparisons: [
      {name: 'CellCLIP + kNN', values: [[14.0, 0], [10.2, 0], null]},
      {name: 'ECFP + kNN', values: [[23.0, 0], [30.0, 0], null]},
      {name: 'Structure-only LLM', values: [[47.3, 0.8], [40.8, 0.3], [43.2, 1.1]]},
      {name: 'Fixed workflow', values: [[52.4, 0.9], [37.7, 0.6], [63.6, 1.5]]},
      {name: 'Single agent', values: [[40.5, 1.4], [32.1, 0.7], [52.0, 1.2]]},
    ],
  },
};

const principles = [
  {title: 'Calibrate the evidence.', text: 'Assess cross-source agreement, phenotype stability, and recurring mechanism confusions before query-time reasoning.'},
  {title: 'Keep hypotheses explicit.', text: 'Phenotype and mechanism agents update a shared candidate memory, tracking support, contradiction, and uncertainty across reasoning rounds.'},
  {title: 'Refine with purpose.', text: 'A controller selects the next evidence view. An arbiter and eligibility checks resolve supported mechanisms or an open-set novel decision.'},
];

const discoverySteps = [
  'Hypothesis Generation',
  'Experiment Planning',
  'Wet-Lab Readout',
  'Multimodal Analysis',
  'Hypothesis Evaluation & Refinement',
];

function ResultValue({value}) {
  if (!value) return <span className="air-not-applicable" aria-label="Not evaluated for open-set inference">—</span>;
  return <span className="air-table-value">{value[0].toFixed(1)}<span> ± {value[1].toFixed(1)}</span></span>;
}

function ResultsSummary() {
  const [backbone, setBackbone] = useState('gpt');
  const result = publishedResults[backbone];
  const rows = [...result.comparisons, {name: 'PhenoAIR', values: result.phenoair}];

  return (
    <>
      <div className="air-results-toolbar">
        <p>Published results · <strong>{result.name}</strong></p>
        <div className="air-model-switch" role="group" aria-label="Choose the language model used in the paper">
          {Object.entries(publishedResults).map(([key, item]) => (
            <button key={key} type="button" aria-pressed={backbone === key}
              onClick={() => setBackbone(key)}>{item.name}</button>
          ))}
        </div>
      </div>
      <div className="air-result-grid" aria-live="polite" aria-atomic="true">
        {settings.map((setting, index) => (
          <article className="air-result" key={setting.name}>
            <p className="air-small-label">{setting.regime}</p>
            <h3>{setting.name}</h3>
            <p className="air-score">{result.phenoair[index][0].toFixed(1)}<span>%</span></p>
            <p className="air-score-context">{setting.metric}<span>± {result.phenoair[index][1].toFixed(1)} s.d.</span></p>
            <p className="air-secondary-score">{setting.secondary}<strong>{result.secondary[index][0].toFixed(1)} ± {result.secondary[index][1].toFixed(1)}%</strong></p>
            <p className="air-sample-size">{setting.detail}</p>
          </article>
        ))}
      </div>
      <p className="air-result-caption">Means ± standard deviations over five independent LLM runs. The benchmark uses JUMP Cell Painting profiles and Drug Repurposing Hub annotations. <a href={`${PAPER}#page=8`} target="_blank" rel="noopener noreferrer">Table 2 ↗</a></p>
      <details className="air-comparisons">
        <summary>Compare retrieval, workflow, and agent baselines <span aria-hidden="true">+</span></summary>
        <div className="air-table-scroll" role="region" aria-label="Published baseline comparison" tabIndex={0}>
          <table className="air-results-table">
            <caption>{result.name} · Accuracy (%). Top-1 for MoA-Verified and MoA-Extended; overall accuracy for MoA-Novel.</caption>
            <thead><tr><th scope="col">Method</th>{settings.map(item => <th scope="col" key={item.name}>{item.name}</th>)}</tr></thead>
            <tbody>{rows.map(row => (
              <tr key={row.name} className={row.name === 'PhenoAIR' ? 'air-featured-row' : undefined}>
                <th scope="row">{row.name}</th>{row.values.map((value, index) => <td key={index}><ResultValue value={value}/></td>)}
              </tr>
            ))}</tbody>
          </table>
        </div>
        <p className="air-table-note">Phenotype-enabled LLM methods use the same CellCLIP features; the structure-only control omits phenotypic evidence. Retrieval baselines are deterministic; open-set results are not reported for kNN. Any-match accepts a prediction matching any curated ground-truth MOA; novel-detection F1 measures known-versus-novel discrimination.</p>
      </details>
      <aside className="air-evidence-control" aria-labelledby="air-control-title">
        <div>
          <p className="air-small-label">Evidence control · GPT-5.1</p>
          <h3 id="air-control-title">Matched phenotype evidence matters.</h3>
          <p>Shuffling phenotype evidence reduced accuracy on 100 selected MoA-Extended queries with informative phenotype neighborhoods. Structure-side inputs and the reasoning pipeline were held fixed.</p>
        </div>
        <div className="air-control-result">
          <p><strong>80.0<span>%</span></strong><span aria-hidden="true">→</span><strong>53.6<span>%</span></strong></p>
          <span>Matched phenotype → shuffled phenotype</span>
          <a href={`${PAPER}#page=9`} target="_blank" rel="noopener noreferrer">Selected-subset control · Table 4 ↗</a>
        </div>
      </aside>
    </>
  );
}

export default function PhenoAIRPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'PhenoAIR · NeurIPS 2026 | Pheno AI Scientist';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="phenoair-page">
      <section className="air-hero">
        <div className="air-hero-topline">
          <a className="air-back" href="/#research">← Research foundations</a>
          <span className="air-conference">NeurIPS 2026 · Main Conference</span>
        </div>
        <p className="eyebrow">MULTIMODAL SCIENTIFIC REASONING</p>
        <h1>PhenoAIR</h1>
        <h2 className="air-deck">From cellular phenotypes to<br className="air-wide-break"/> evidence-grounded mechanism inference.</h2>
        <div className="air-hero-grid">
          <div className="air-hero-copy">
            <p>A reliability-aware multi-agent framework for evaluating phenotypic evidence, comparing candidate mechanisms, and refining scientific conclusions.</p>
            <div className="air-resource-links">
              <a className="button dark" href={PAPER} target="_blank" rel="noopener noreferrer">Read the paper <span aria-hidden="true">↗</span></a>
              <a className="air-text-link" href={CODE} target="_blank" rel="noopener noreferrer">Code ↗</a>
              <a className="air-text-link" href={DATA} target="_blank" rel="noopener noreferrer">Dataset ↗</a>
            </div>
          </div>
          <img className="air-hero-illustration" src={`${ASSETS}research/multimodal-reasoning-card.webp`}
            width="1200" height="675" alt="Cellular phenotypes, chemical evidence, and biological knowledge converge on an AI reasoning network."/>
        </div>
        <div className="air-paper-credit">
          <p>From Retrieval to Reasoning: Agentic Mechanism Prediction from Cell Painting Profiles</p>
          <span>Jiayuan Chen · Botao Yu · Tianyu Liu · Thai-Hoang Pham · Meng Wu · Ping Zhang</span>
          <span>The Ohio State University · Yale University</span>
        </div>
      </section>

      <nav className="air-page-nav" aria-label="On this research page">
        <a href="#phenoair-idea">01 / Core idea</a>
        <a href="#phenoair-results">02 / Results</a>
        <a href="#phenoair-loop">03 / Closed-loop discovery</a>
      </nav>

      <section className="air-section" id="phenoair-idea" aria-labelledby="air-idea-title">
        <p className="eyebrow">01 / THE CORE IDEA</p>
        <div className="air-section-heading">
          <h2 id="air-idea-title">From similarity<br/>to evidence.</h2>
          <p>Nearby cellular phenotypes can reflect shared mechanisms, batch effects, toxicity, or convergent cell states. PhenoAIR evaluates which similarities constitute reliable mechanistic evidence.</p>
        </div>
        <div className="air-principles">
          {principles.map((item, index) => (
            <article key={item.title}>
              <span className="air-principle-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="air-reasoning-path" aria-label="Evidence reasoning overview">
          <span>Phenotypic + chemical evidence</span><span aria-hidden="true">→</span>
          <span>Calibrated candidate memory</span><span aria-hidden="true">→</span>
          <span>Supported MOA / novel</span>
        </div>
        <p className="air-path-note">In open-set inference, <em>novel</em> indicates that available evidence does not adequately support a known reference mechanism.</p>
        <details className="air-architecture">
          <summary>Explore the research framework <span aria-hidden="true">+</span></summary>
          <figure>
            <a href={`${PAPER}#page=3`} target="_blank" rel="noopener noreferrer" aria-label="Open the full architecture in the paper, page 3">
              <img src={`${ASSETS}phenoair/phenoair-architecture.png`} width="1820" height="1054" loading="lazy"
                alt="PhenoAIR architecture: offline reliability calibration, phenotype and mechanism agents sharing candidate memory, controller-guided refinement, and final arbitration."/>
            </a>
            <figcaption>Figure 1 from the paper. Phenotype evidence, mechanism-side reasoning, and controller actions are linked through persistent candidate states.</figcaption>
          </figure>
        </details>
      </section>

      <section className="air-section" id="phenoair-results" aria-labelledby="air-results-title">
        <p className="eyebrow">02 / EXPERIMENTAL RESULTS</p>
        <div className="air-section-heading">
          <h2 id="air-results-title">Three settings.<br/>One reasoning framework.</h2>
          <p>Controlled profiles, heterogeneous references, and unseen mechanisms. PhenoAIR improves over the reported retrieval, workflow, and single-agent baselines with both evaluated LLM backbones.</p>
        </div>
        <ResultsSummary/>
      </section>

      <section className="air-section air-loop-section" id="phenoair-loop" aria-labelledby="air-loop-title">
        <p className="eyebrow">03 / CONNECTING TO PHENO AI SCIENTIST</p>
        <div className="air-section-heading">
          <h2 id="air-loop-title">A reasoning foundation<br/>for the next discovery cycle.</h2>
          <p>Mechanistic evidence and unresolved hypotheses can help determine what to investigate next. PhenoAIR provides a research foundation for the analysis and interpretation stages of Pheno AI Scientist.</p>
        </div>
        <ol className="air-loop-map" aria-label="PhenoAIR's role in the Pheno AI Scientist discovery cycle">
          {discoverySteps.map((step, index) => (
            <li key={step} className={index >= 3 ? 'air-loop-focus' : undefined}>
              <span className="air-small-label">0{index + 1}</span>
              <h3>{step}</h3>
              {index === 2 && <span className="air-loop-detail">Cell Painting</span>}
              {index >= 3 && <span className="air-loop-detail">PhenoAIR foundation</span>}
            </li>
          ))}
        </ol>
        <p className="air-loop-feedback"><span aria-hidden="true">↺</span> Evidence and uncertainty feed the next hypothesis.</p>
        <div className="air-loop-columns">
          <article>
            <p className="air-small-label">Established in the paper</p>
            <h3>Evidence-grounded interpretation.</h3>
            <p>Calibrated phenotype–mechanism reasoning, auditable candidate states, and constrained known-versus-novel decisions. The evaluations establish computational MOA inference on public Cell Painting data.</p>
          </article>
          <article>
            <p className="air-small-label">Pheno AI Scientist research direction</p>
            <h3>Connect interpretation to experiment selection.</h3>
            <p>Use competing mechanisms and unresolved evidence to prioritize follow-up experiments, then incorporate new readouts into the next analysis round. Experimental planning and wet-lab orchestration are platform development beyond this paper's evaluations.</p>
          </article>
        </div>
        <div className="air-evolution">
          <div><p className="air-small-label">Learning from reasoning trajectories</p><h3>Refine the scientific decision process.</h3></div>
          <div>
            <p>PhenoAIR's offline self-evolution refines controller rules and arbiter heuristics using held-out development trajectories. The selected rules are fixed before test evaluation.</p>
            <p className="air-evolution-detail">This refinement improves open-set inference in the paper. Gains do not transfer consistently to the noisy closed-set setting, and the procedure is applied only to MoA-Novel. Connecting such refinement to new experimental feedback is a Pheno AI Scientist research direction.</p>
            <a className="air-text-link" href={`${PAPER}#page=9`} target="_blank" rel="noopener noreferrer">Self-evolving refinement · Figure 2 ↗</a>
          </div>
        </div>
        <div className="air-final-links">
          <a className="button dark" href={PAPER} target="_blank" rel="noopener noreferrer">Read the full paper ↗</a>
          <a className="air-text-link" href="/#demo">Explore the Pheno AI Scientist discovery loop ↗</a>
        </div>
      </section>
    </main>
  );
}
