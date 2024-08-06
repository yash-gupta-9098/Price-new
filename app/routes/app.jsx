import { json, redirect } from "@remix-run/node";
import { Link, Navigate, NavLink, Outlet, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider} from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import "../utils/app.css"

import { authenticate } from "../shopify.server";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { Button, Icon } from "@shopify/polaris";

import { getSession, commitSession } from "~/sessions";


import {
  PlusCircleIcon
} from '@shopify/polaris-icons';

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];


export const loader = async ({ request }) => {
  await authenticate.admin(request);

  // Step 2: Get session and check for shop parameter
  const session = await getSession(request.headers.get("Cookie"));
  const scope = "read_products"; // Define your scope
  const shop = new URL(request.url).searchParams.get("shop");
  const LARAVEL_REDIRECT_URI = 'https://dynamicpricing.expertvillagemedia.com/public/auth/callback';
  const SHOP_DOMAIN = 'demo-evm.myshopify.com';

  if (!shop) {
    throw new Error("Shop parameter is missing");
  }

  // Step 3: Create the OAuth authorization URL
  const authUrl = `https://${SHOP_DOMAIN}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=${encodeURIComponent(scope)}&redirect_uri=${LARAVEL_REDIRECT_URI}&state=${session.id}`;

  // Step 4: Redirect to the OAuth authorization URL if not authenticated
  if (!session.get("accessToken")) {
    return redirect(authUrl);
  }

  // return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
  const polarisTranslations = await import("@shopify/polaris/locales/en.json");
  return json({
    apiKey: process.env.SHOPIFY_API_KEY,
    polarisTranslations: polarisTranslations,
  });


};

export default function App() {


  const navigate = useNavigate();
  const { apiKey , polarisTranslations} = useLoaderData();

  return (
    <AppProvider apiKey={apiKey} i18n={polarisTranslations}>
      <NavMenu>
        <Link to="/app">DashBoard</Link>
        <Link to="/app/products">Products</Link>
        <Link to="/app/rule">All rule</Link>
      </NavMenu>
      <Provider store={store} >
        <Outlet />
      </Provider>
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
