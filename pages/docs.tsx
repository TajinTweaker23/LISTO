import React from 'react';
import Head from 'next/head';
import { Search, Upload } from 'lucide-react';
import '../styles/docs.css';

const DocsPage = () => {
  return (
    <>
      <Head>
        <title>My Documents - LISTO</title>
      </Head>
      <div className="docs-app-container">
        <div className="docs-main-area">
          <div className="main-area-header">
            <div className="search-wrapper" id="searchLine">
              <input className="search-input" type="text" placeholder="Search my documents..." />
              <Search className="feather" />
            </div>
            <button className="btn btn-upload">
              <Upload className="feather" />
              Upload
            </button>
          </div>
          <section className="content-section">
            <div className="section-header-wrapper">
              <h1 className="section-header">Recent Files</h1>
              <a className="section-header-link">View all files</a>
            </div>
            <div className="files-table">
              <div className="files-table-row">
                <div className="table-cell name-cell pdf">Brandenburg.pdf</div>
                <div className="table-cell">42 MB</div>
                <div className="table-cell">July 21, 2025</div>
                <div className="table-cell action-cell">
                  <button className="more-action"></button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default DocsPage;