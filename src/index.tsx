import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { CommercetoolsProductSelector } from "./CommercetoolsProductSelector";
import { EnsureKontentAsParent } from "./EnsureKontentAsParent";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <EnsureKontentAsParent>
      <CommercetoolsProductSelector />
    </EnsureKontentAsParent>
  </React.StrictMode>
);
