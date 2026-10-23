import React from 'react';

const ASSETS = `${import.meta.env.BASE_URL}assets/research/`;

export const researchTracks = [
  {
    slug: 'representation-learning',
    aliases: [],
    category: '01 / PHENOTYPIC REPRESENTATION LEARNING',
    title: 'Learning to Read Cellular Phenotypes',
    subtitle: 'How can AI learn robust and transferable representations of cellular morphology?',
    description: 'Exploring vision foundation models across morphological scales and contexts, alongside AI4AI research on agent-guided optimization of task-specific feature extraction.',
    image: 'phenotypic-representation-card.webp',
    imageWidth: 1200,
    imageHeight: 675,
    imageAlt: 'Layered cellular images become image patches, encoded features, and clusters of phenotypic embeddings.',
    scope: [
      'Pretrained Vision Transformers for Cell Painting feature extraction, building on prior CVPR and ICCV research.',
      'Relationships between ViT patch size, cell size, and representation quality.',
      'Cross-cell-line and cross-context transferability.',
      'AI4AI: scientific agents iteratively optimizing task-specific feature extraction pipelines.',
    ],
    context: 'A research foundation for cellular feature extraction and morphological analysis, including ongoing AI4AI investigation of agent-guided feature optimization.',
  },
  {
    slug: 'phenoair',
    aliases: [],
    category: '02 / MULTIMODAL SCIENTIFIC REASONING',
    title: 'PhenoAIR',
    subtitle: 'From cellular phenotypes to evidence-grounded mechanism inference.',
    description: 'Integrating morphological profiles, molecular evidence, and biological knowledge through scientific agents to generate evidence-grounded mechanistic hypotheses.',
    image: 'multimodal-reasoning-card.webp',
    imageWidth: 1200,
    imageHeight: 675,
    imageAlt: 'Cellular phenotypes, molecular evidence, and biological networks converge on an AI reasoning network and mechanistic hypotheses.',
    scope: [
      'Multimodal biological evidence integration.',
      'Cell Painting-based mechanism-of-action inference.',
      'Agentic scientific reasoning and hypothesis generation.',
      'Evidence-based interpretation of cellular perturbations.',
    ],
    context: 'This direction supports multimodal analysis and scientific interpretation within the discovery loop.',
  },
  {
    slug: 'scientific-intelligence',
    aliases: ['morphknow', 'phenobench'],
    category: '03 / SCIENTIFIC AGENT LEARNING & EVALUATION',
    title: 'From Scientific Reasoning to Research Capabilities',
    subtitle: 'Can AI agents carry out complete scientific investigations?',
    description: 'MorphKnow studies knowledge acquisition; MorphAnalysis investigates transfer to scientific analysis; PhenoBench evaluates scientific agents on realistic research tasks.',
    image: 'scientific-intelligence-card.webp',
    imageWidth: 1200,
    imageHeight: 675,
    imageAlt: 'Scientific literature, biological data, and knowledge feed an agent, with analysis plots, benchmark checklists, and evaluation feedback.',
    overviewImage: {
      file: 'phenobench-overview.png',
      width: 1774,
      height: 887,
      alt: 'Scientific data flows to a scientific agent using data analysis, computational tools, scientific knowledge, and literature search, then to scientific analysis and conclusions.',
      caption: 'PhenoBench / Scientific agent analysis & evaluation',
    },
    scope: [
      'MorphKnow: learning experimentally measured biological and phenotypic knowledge through language-model post-training.',
      'MorphAnalysis: investigating transfer of acquired biological knowledge to downstream scientific analysis and decision-making.',
      'PhenoBench: evaluating scientific agents on realistic phenotype-centered data analysis and research tasks.',
    ],
    context: 'These related research efforts provide a cross-cutting foundation for Pheno AI Scientist. They investigate complementary questions and are not presented as a single integrated technical system.',
  },
];

export default function ResearchFoundations({navigate}) {
  return (
    <section className="research section" id="research">
      <div className="research-heading">
        <div>
          <p className="eyebrow">03 / RESEARCH FOUNDATIONS</p>
          <h2>Built on questions.<br/>Grounded in research.</h2>
        </div>
        <p>From understanding cellular phenotypes to building scientific intelligence.<br/>Our research lays the foundation for closed-loop discovery.</p>
      </div>
      <div className="editorial-grid">
        {researchTracks.map((track, index) => (
          <a className={`research-card card-${index}`} key={track.slug}
            href={`/research/${track.slug}`} onClick={event => navigate(event, `/research/${track.slug}`)}>
            <div className="research-art">
              <img src={`${ASSETS}${track.image}`} alt={track.imageAlt}
                width={track.imageWidth} height={track.imageHeight} loading="lazy" decoding="async"/>
              <span className="art-arrow" aria-hidden="true">↗</span>
            </div>
            <p className="eyebrow">{track.category}</p>
            <div className="card-title"><h3>{track.title}</h3><span aria-hidden="true">↗</span></div>
            <h4>{track.subtitle}</h4>
            <span className="read-more">Explore research direction ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function ResearchOverview({track}) {
  return (
    <main className="detail">
      <a href="/#research">← All research foundations</a>
      <p className="eyebrow">{track.category}</p>
      <h1>{track.title}</h1>
      <h2>{track.subtitle}</h2>
      <p className="detail-intro">{track.description}</p>
      {track.overviewImage && (
        <figure className="research-overview-figure">
          <img src={`${ASSETS}${track.overviewImage.file}`} alt={track.overviewImage.alt}
            width={track.overviewImage.width} height={track.overviewImage.height} decoding="async"/>
          <figcaption>{track.overviewImage.caption}</figcaption>
        </figure>
      )}
      <div className="detail-panel">
        <p className="eyebrow">RESEARCH FOUNDATION / SCOPE</p>
        <h3>Research scope</h3>
        <ul className="research-scope">
          {track.scope.map(item => <li key={item}>{item}</li>)}
        </ul>
        <p>{track.context}</p>
      </div>
      <a className="button dark" href="/#platform">See how it connects to the platform ↗</a>
    </main>
  );
}
