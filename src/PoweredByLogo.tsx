import { FC } from "react";

import commercetoolsLogo from './images/logo_no_claim_commercetools_RGB_horizontal_color-on-white.svg'

export const PoweredByLogo: FC = () => (
  <div style={{ float: 'right', padding: 10 }}>
    <span style={{ paddingRight: 5 }}>powered by</span>
    <img
      height={40}
      src={commercetoolsLogo}
      alt="Commercetools logo"
      title="Commercetools logo"
    />
  </div>
);

PoweredByLogo.displayName = 'PoweredByLogo';
