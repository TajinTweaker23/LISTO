import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {
  Grid, Folder, HardDrive, Settings, LogOut, Search, Upload,
  Image as ImageIcon, Music, Play, AlignLeft, Layers, ArrowDownCircle
} from 'lucide-react';
import '../styles/docs.css'; // We will create this file next

const DocsPage = () => {
  return (
    <>
      <Head>
        <title>My Documents - LISTO</title>
        <link href="https://fonts.googleapis.com/css?family=DM+Sans:400,500,700&display=swap" rel="stylesheet" />
      </Head>
      <div className="docs-app-container">
        {/* This left-area sidebar is specific to the docs page */}
        <div className="docs-left-area">
          <div className="app-name">MyDocs</div>
          <a href="#" className="item-link active"><Grid /></a>
          <a href="#" className="item-link"><Folder /></a>
          <a href="#" className="item-link"><HardDrive /></a>
          <a href="#" className="item-link"><Settings /></a>
          <button className="btn-logout"><LogOut /></button>
        </div>

        {/* Main content area for documents */}
        <div className="docs-main-area">
          <div className="main-area-header">
            <div className="search-wrapper" id="searchLine">
              <input className="search-input" type="text" placeholder="e.g. files.doc" />
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="feather feather-search" viewBox="0 0 24 24">
                <defs />
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            {/* Add this new button for uploading files */}
            <button className="btn btn-upload">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-upload">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              Upload
            </button>

          </div>
          <section className="content-section">
            <h1 className="section-header">Quick Access</h1>
            <div className="access-links">
              {/* Quick access items would be mapped here */}
            </div>
          </section>
          <section className="content-section">
            <div className="section-header-wrapper">
              <h1 className="section-header">Recent Files</h1>
              <a className="section-header-link">View all files</a>
            </div>
            <div className="files-table">
              {/* File rows would be mapped here */}
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

// This page will use the main app layout (with the primary sidebar)
// but you could define a different layout if needed.
export default DocsPage;