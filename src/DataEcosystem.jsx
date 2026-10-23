import React, {useState} from 'react';

const ASSETS = `${import.meta.env.BASE_URL}assets/ecosystem/`;
const imaging = [
  {id:'gallery', name:'Cell Painting Gallery', provider:'Broad Institute', url:'https://broadinstitute.github.io/cellpainting-gallery/', description:'Cell Painting images, morphological profiles, and experimental metadata.'},
  {id:'jump', name:'JUMP Cell Painting', logo:'jump.png', url:'https://jump-cellpainting.broadinstitute.org/', description:'Chemical and genetic perturbation profiles within the Cell Painting Gallery.'},
  {id:'rxrx', name:'Recursion · RxRx', logo:'rxrx.png', url:'https://www.rxrx.ai/', description:'High-content cellular imaging and perturbation datasets.'},
  {id:'idr', name:'Image Data Resource', logo:'idr.svg', url:'https://idr.openmicroscopy.org/', description:'Published bioimaging studies for external exploration and validation.'},
];
const molecular = [
  {id:'cmap', name:'LINCS / Connectivity Map', logo:'cmap.svg', url:'https://clue.io/', description:'Perturbational gene-expression signatures for mechanism investigation.'},
  {id:'geo', name:'NCBI GEO', url:'https://www.ncbi.nlm.nih.gov/geo/', description:'Functional genomics and expression studies for disease context.'},
  {id:'cellxgene', name:'CZ CELLxGENE', logo:'cellxgene.svg', url:'https://cellxgene.cziscience.com/', description:'Single-cell expression data for cell-state and tissue context.'},
  {id:'depmap', name:'DepMap', logo:'depmap.svg', url:'https://depmap.org/portal/', description:'Cancer dependencies and molecular profiles for target prioritization.'},
];

function ResourceMark({resource}) {
  const [failed, setFailed] = useState(false);
  if (resource.id === 'gallery') return <span className="resource-wordmark gallery-wordmark"><span>Broad Institute</span>Cell Painting<br/>Gallery</span>;
  if (resource.id === 'geo') return <span className="resource-wordmark geo-wordmark"><span>NCBI</span> GEO</span>;
  if (!resource.logo || failed) return <span className="resource-wordmark">{resource.name}</span>;
  return <span className={`resource-mark resource-mark--${resource.id}`}><img src={`${ASSETS}${resource.logo}`} alt="" loading="lazy" onError={()=>setFailed(true)}/>{resource.id==='jump' && <span>JUMP</span>}</span>;
}

function ResourceGroup({title, resources, context}) {
  const [active, setActive] = useState(null);
  return <div className="ecosystem-group">
    <div className="ecosystem-group-heading"><h3>{title}</h3><span>Public data resources</span></div>
    <ul className="resource-grid">
      {resources.map(resource=><li key={resource.id}>
        <a className="resource-link" href={resource.url} target="_blank" rel="noopener noreferrer"
          aria-label={`${resource.name}: ${resource.description} (opens in a new tab)`}
          onMouseEnter={()=>setActive(resource)} onMouseLeave={()=>setActive(null)}
          onFocus={()=>setActive(resource)} onBlur={()=>setActive(null)}>
          <ResourceMark resource={resource}/>
          <span className="resource-name">{resource.name}<span aria-hidden="true"> ↗</span></span>
        </a>
      </li>)}
    </ul>
    <p className={`resource-context ${active?'is-active':''}`}>{active ? active.description : context}</p>
  </div>;
}

export default function DataEcosystem() {
  return <section className="ecosystem section" id="about" aria-labelledby="ecosystem-title">
    <p className="eyebrow">04 / SCIENTIFIC DATA &amp; EXPERIMENTAL ECOSYSTEM</p>
    <div className="ecosystem-intro">
      <h2 id="ecosystem-title">Connecting phenotypes<br/>to biological evidence.</h2>
      <p>Cellular imaging, molecular perturbation data, and experimental resources for hypothesis-driven discovery.</p>
    </div>
    <div className="ecosystem-grid">
      <ResourceGroup title="Cellular Imaging" resources={imaging} context="Morphological profiles and perturbation responses."/>
      <ResourceGroup title="Molecular Evidence" resources={molecular} context="Expression signatures, cell states, and gene dependencies."/>
      <div className="ecosystem-group experimental-group">
        <div className="ecosystem-group-heading"><h3>Experimental Discovery</h3><span>Current collaborator</span></div>
        <a className="experimental-resource" href="https://pharmacy.osu.edu/research-discovery/research-facilities" target="_blank" rel="noopener noreferrer" aria-label="The Ohio State University College of Pharmacy research facilities (opens in a new tab)">
          <img className="experimental-logo" src={`${ASSETS}ohio-state.svg`} alt="The Ohio State University" loading="lazy"/>
          <span className="experimental-college">College of Pharmacy</span>
          <span className="experimental-lab">DDSR High-Throughput<br/>Screening Lab</span>
          <span className="experimental-capabilities">Assay development · HTS · High-content screening</span>
          <span className="experimental-cta">Explore facilities <span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </div>
  </section>;
}
