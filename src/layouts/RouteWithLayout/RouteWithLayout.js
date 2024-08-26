import React from "react";

function RouteWithLayout({ Component, Layout }) {
  return (
          <Layout>
            <Component />
          </Layout>
  );
}

export default RouteWithLayout;
