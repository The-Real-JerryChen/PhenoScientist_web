import React, {useEffect, useState} from 'react';
import './representation.css';

const ASSETS = `${import.meta.env.BASE_URL}assets/`;
const RESEARCH = `${ASSETS}representation/`;
const publications = {
  iccv: {
    conference: 'ICCV 2025',
    title: 'Integrating Biological Knowledge for Robust Microscopy Image Profiling on De Novo Cell Lines',
    pdf: `${RESEARCH}biological-context-ICCV-2025.pdf`,
    url: 'https://openaccess.thecvf.com/content/ICCV2025/html/Chen_Integrating_Biological_Knowledge_for_Robust_Microscopy_Image_Profiling_on_De_ICCV_2025_paper.html',
    figure: 'iccv-framework.png', width: 1639, height: 651, page: 3,
    alt: 'Biological interaction knowledge and cell-line transcriptomic tokens guide a microscopy image encoder for transfer to unseen cell lines.',
    caption: 'Figure 2. Biological knowledge guides perturbation-specific learning, while transcriptomic tokens encode cell-line context.',
  },
  cvpr: {
    conference: 'CVPR 2026',
    title: 'Intervention-Aware Multiscale Representation Learning from Imaging Phenomics and Perturbation Transcriptomics',
    pdf: `${RESEARCH}TIDE-CVPR-2026.pdf`,
    url: 'https://openaccess.thecvf.com/content/CVPR2026/html/Chen_Intervention-Aware_Multiscale_Representation_Learning_from_Imaging_Phenomics_and_Perturbation_Transcriptomics_CVPR_2026_paper.html',
    figure: 'tide-framework.png', width: 1800, height: 793, page: 4,
    alt: 'TIDE distills a transcriptome-conditioned teacher into an image student using a chemistry-aware codebook and self-supervised image learning.',
    caption: 'Figure 2. Transcriptomic guidance shapes image representations during training. The image student operates from microscopy alone at inference.',
  },
};

export const scaleFigures = [
  {
    label: 'Pretraining scale', file: 'scale-comparison.png', width: 1723, height: 661,
    alt: 'DINO and MAE performance curves across four datasets, plotted against patch size in nuclear-diameter units. DINO shows a nuclear-scale preference that MAE does not consistently reproduce.',
    caption: "DINO and MAE across four evaluated datasets. Each curve is normalized to its own maximum: 100 denotes the best point on that curve, not 100% balanced accuracy.",
  },
  {
    label: 'Nuclear units', file: 'nuclear-units.png', width: 1845, height: 614,
    alt: 'DINO optima in U2OS and HUVEC expressed as source-pixel patch sizes and as ratios to measured nuclear diameters.',
    caption: 'Observed DINO optima expressed in source pixels and nuclear units. The arms also differ in dataset and model configuration; this comparison does not isolate cell size as the only factor.',
  },
  {
    label: 'Image tiling', file: 'tiling-gain.png', width: 1123, height: 567,
    alt: 'Ratios of best-tested tiled extraction performance to whole-image extraction for DINO and MAE on cpg17, cpg5, rxrx2, and rxrx19b.',
    caption: 'Best-tested tiling versus whole-image extraction in the evaluated pipelines. Bars are ratios of balanced accuracy, not percentage-point gains. Crop count and aggregation remain important confounds.',
  },
];

function Publication({paper}) {
  return (
    <div className="rep-publication">
      <div className="rep-publication-credit">
        <span className="rep-paper-tag">{paper.conference}</span>
        <p>{paper.title}</p>
      </div>
      <div className="rep-publication-links">
        <a href={paper.pdf} target="_blank" rel="noopener noreferrer">Read paper ↗</a>
        <a href={paper.url} target="_blank" rel="noopener noreferrer">Publication page ↗</a>
      </div>
      <details className="rep-framework">
        <summary>View the research framework <span aria-hidden="true">+</span></summary>
        <figure>
          <a href={`${paper.pdf}#page=${paper.page}`} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${paper.conference} framework in the paper`}>
            <img src={`${RESEARCH}${paper.figure}`} width={paper.width} height={paper.height} loading="lazy" alt={paper.alt}/>
          </a>
          <figcaption>{paper.caption}</figcaption>
        </figure>
      </details>
    </div>
  );
}

function ScaleInvestigation() {
  const [selected, setSelected] = useState(0);
  const figure = scaleFigures[selected];
  return (
    <div className="rep-investigation">
      <div className="rep-chart-toolbar">
        <p className="rep-small-label">Ongoing investigations · Preliminary results</p>
        <div className="rep-chart-switch" role="group" aria-label="Choose a representation learning experiment">
          {scaleFigures.map((item, index) => (
            <button type="button" key={item.file} aria-pressed={selected === index}
              onClick={() => setSelected(index)}>{item.label}</button>
          ))}
        </div>
      </div>
      <figure className="rep-chart" aria-live="polite">
        <a href={`${RESEARCH}${figure.file}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${figure.label.toLowerCase()} figure at full size`}>
          <img src={`${RESEARCH}${figure.file}`} width={figure.width} height={figure.height} loading="lazy" alt={figure.alt}/>
        </a>
        <figcaption>{figure.caption}<a href={`${RESEARCH}${figure.file}`} target="_blank" rel="noopener noreferrer">Open full size ↗</a></figcaption>
      </figure>
      <div className="rep-evidence-boundary">
        <h3>What these findings establish.</h3>
        <p>The nuclear-scale preference is clearest for DINO on U2OS; gains on HUVEC are small, and MAE does not reproduce the same pattern. The analysis uses single-seed training, with some runs unfinished or affected by training issues. These findings do not establish a universal optimal patch scale.</p>
      </div>
    </div>
  );
}

const adaptationSteps = [
  {title: 'Configure', text: 'Choose the encoder, image sampling strategy, and feature aggregation for the scientific question.'},
  {title: 'Adapt', text: 'Investigate task-specific fine-tuning and other adaptations using the available training data.'},
  {title: 'Evaluate', text: 'Compare against reproducible baselines using held-out validation and task-level evidence.'},
  {title: 'Refine', text: 'Identify limitations, retain useful changes, and select the next configuration to investigate.'},
];

export default function RepresentationLearningPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Phenotypic Representation Learning | Pheno AI Scientist';
    return () => { document.title = previous; };
  }, []);

  return (
    <main className="representation-page">
      <section className="rep-hero">
        <div className="rep-topline">
          <a href="/#research">← Research foundations</a>
          <span className="rep-small-label">Research direction 01</span>
        </div>
        <p className="eyebrow">PHENOTYPIC REPRESENTATION LEARNING</p>
        <h1>Learning to Read<br/>Cellular Phenotypes</h1>
        <p className="rep-deck">Biology-aware representations,<br/>adapted to the scientific task.</p>
        <div className="rep-intro-grid">
          <div className="rep-intro-copy">
            <p>Representation learning determines which biological signals become available to downstream analysis.</p>
            <p>Cellular morphology reflects perturbations, cell identity, and experimental context across multiple spatial scales. Learning useful features requires understanding which signals to preserve—and how to evaluate them for the question being asked.</p>
          </div>
          <img className="rep-hero-image" src={`${ASSETS}research/phenotypic-representation-card.webp`} width="1200" height="675"
            alt="Cellular images become image patches, encoded features, and phenotypic embeddings."/>
        </div>
      </section>

      <div className="rep-page-nav" role="navigation" aria-label="On this representation learning page">
        <a href="#representation-context">01 / Biological context</a>
        <a href="#representation-molecular">02 / Molecular supervision</a>
        <a href="#representation-scale">03 / Biological scale</a>
        <a href="#representation-ai4ai">04 / AI4AI in cellular images</a>
      </div>

      <section className="rep-section" id="representation-context" aria-labelledby="rep-context-title">
        <p className="eyebrow">01 / BIOLOGICAL CONTEXT</p>
        <div className="rep-story-grid">
          <h2 id="rep-context-title">Biological context<br/>shapes the signal.</h2>
          <div className="rep-body-copy">
            <p>The same perturbation can produce different morphological responses across cell lines. <strong className="rep-highlight">Learning transferable features requires separating perturbation-related patterns from the biological background in which they appear.</strong></p>
            <p>Research published at ICCV 2025 investigates how <strong className="rep-term rep-term-knowledge">biological interaction knowledge</strong> and <strong className="rep-term rep-term-context">cell-line transcriptomic context</strong> can improve microscopy profiling on previously unseen cell lines.</p>
          </div>
        </div>
        <Publication paper={publications.iccv}/>
      </section>

      <section className="rep-section" id="representation-molecular" aria-labelledby="rep-molecular-title">
        <p className="eyebrow">02 / MOLECULAR SUPERVISION</p>
        <div className="rep-story-grid">
          <h2 id="rep-molecular-title">Molecular evidence<br/>can guide visual learning.</h2>
          <div className="rep-body-copy">
            <p>Morphology and molecular measurements provide complementary views of cellular responses. Perturbational transcriptomics can guide image encoders toward features that better reflect intervention effects.</p>
            <p>TIDE, published at CVPR 2026, investigates this through <strong className="rep-highlight">transcriptome-guided distillation that accounts for cell context and dose differences in weakly paired data.</strong> The resulting image student operates from microscopy alone at inference.</p>
          </div>
        </div>
        <div className="rep-distillation-path" aria-label="Transcriptome-guided image learning">
          <div><span className="rep-small-label">During training</span><p>Images + transcriptomics<br/>+ intervention context</p></div>
          <span className="rep-distillation-arrow" aria-hidden="true">→</span>
          <div><span className="rep-small-label">Knowledge distillation</span><p>Biologically informed<br/>image representations</p></div>
          <span className="rep-distillation-arrow" aria-hidden="true">→</span>
          <div><span className="rep-small-label">At inference</span><p>Microscopy images</p></div>
        </div>
        <Publication paper={publications.cvpr}/>
      </section>

      <section className="rep-section" id="representation-scale" aria-labelledby="rep-scale-title">
        <p className="eyebrow">03 / BIOLOGICAL SCALE</p>
        <div className="rep-story-grid">
          <h2 id="rep-scale-title">Scale changes<br/>what a model can see.</h2>
          <div className="rep-body-copy">
            <p>A patch captures a different biological view depending on cell size, image resolution, and sampling strategy. Feature aggregation further shapes the information available for downstream analysis.</p>
            <p>Ongoing experiments examine how these choices interact with pretraining objectives and task performance. Preliminary findings motivate evaluating biological scale and extraction strategy together, with their effects tested across models and datasets.</p>
          </div>
        </div>
        <ScaleInvestigation/>
      </section>

      <section className="rep-section rep-ai4ai" id="representation-ai4ai" aria-labelledby="rep-ai4ai-title">
        <p className="eyebrow">04 / AI4AI IN CELLULAR IMAGES · PHENO AI SCIENTIST</p>
        <h2 id="rep-ai4ai-title">AI4AI in cellular images:<br/>adapt the representation to the task.</h2>
        <p className="rep-ai4ai-lead">Developing scientific agents that select and adapt feature extraction pipelines to the biological context, available data, and downstream objective.</p>
        <p className="rep-ai4ai-copy">This research spans encoder selection, image sampling, feature aggregation, and task-specific fine-tuning. The goal is an iterative process: configure a pipeline, evaluate its representations, identify limitations, and refine the choices using reproducible task-level evidence.</p>
        <ol className="rep-adaptation-loop" aria-label="AI4AI research process">
          {adaptationSteps.map((step, index) => (
            <li key={step.title}>
              <span className="rep-small-label">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="rep-loop-feedback"><span aria-hidden="true">↺</span> Task-level evidence informs the next configuration.</p>
        <p className="rep-premise">A strong foundation model provides a starting point.<br/>Its suitability must be evaluated for each biological context and scientific task.</p>
      </section>

      <section className="rep-section rep-discovery" aria-labelledby="rep-discovery-title">
        <p className="eyebrow">CONNECTING TO PHENO AI SCIENTIST</p>
        <div className="rep-story-grid">
          <h2 id="rep-discovery-title">A foundation for<br/>multi-agent discovery.</h2>
          <div className="rep-body-copy">
            <p>Feature extraction, representation learning, and the resulting phenotypic evidence form the foundation of Pheno AI Scientist’s multi-agent system (MAS). Integrated with molecular evidence and biological knowledge, they ground mechanistic reasoning, hypothesis evaluation, and discovery decisions.</p>
            <div className="rep-closing-links">
              <a className="button dark" href="/research/phenoair">Explore PhenoAIR ↗</a>
              <a className="rep-text-link" href="/#demo">Explore the discovery loop ↗</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
