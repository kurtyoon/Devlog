import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/categories/:category": {
    "category": string;
  };
  "/posts/:id/:slug": {
    "id": string;
    "slug": string;
  };
  "/posts/:id": {
    "id": string;
  };
  "/tags/:tag": {
    "tag": string;
  };
  "/archive": {};
  "/about": {};
};