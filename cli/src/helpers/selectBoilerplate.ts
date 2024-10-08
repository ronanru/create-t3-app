import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "~/consts.js";
import { type InstallerOptions } from "~/installers/index.js";

type SelectBoilerplateProps = Required<
  Pick<InstallerOptions, "packages" | "projectDir">
>;
// This generates the _app.tsx file that is used to render the app
export const selectAppFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const appFileDir = path.join(PKG_ROOT, "template/extras/src/pages/_app");

  const usingTRPC = packages.trpc.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let appFile = "base.tsx";
  if (usingNextAuth && usingTRPC) {
    appFile = "with-nextauth-trpc.tsx";
  } else if (usingNextAuth && !usingTRPC) {
    appFile = "with-nextauth.tsx";
  } else if (!usingNextAuth && usingTRPC) {
    appFile = "with-trpc.tsx";
  }

  const appSrc = path.join(appFileDir, appFile);
  const appDest = path.join(projectDir, "src/pages/_app.tsx");
  fs.copySync(appSrc, appDest);
};

// Similar to _app, but for app router
export const selectLayoutFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const layoutFileDir = path.join(PKG_ROOT, "template/extras/src/app/layout");

  const usingTw = packages.tailwind.inUse;
  const usingTRPC = packages.trpc.inUse;
  let layoutFile = "base.tsx";
  if (usingTRPC && usingTw) {
    layoutFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    layoutFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
    layoutFile = "with-tw.tsx";
  }

  const appSrc = path.join(layoutFileDir, layoutFile);
  const appDest = path.join(projectDir, "src/app/layout.tsx");
  fs.copySync(appSrc, appDest);
};

// This selects the proper index.tsx to be used that showcases the chosen tech
export const selectIndexFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/pages/index");

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingNextAuth = packages.nextAuth.inUse;
  const usingLucia = packages.lucia.inUse;

  let indexFile = "base.tsx";
  if (usingTRPC && usingTw && usingNextAuth) {
    indexFile = "with-nextauth-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingNextAuth) {
    indexFile = "with-nextauth-trpc.tsx";
  } else if (usingTRPC && usingTw && usingLucia) {
    indexFile = "with-lucia-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingLucia) {
    indexFile = "with-lucia-trpc.tsx";
  } else if (usingTRPC && usingTw) {
    indexFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    indexFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
    indexFile = "with-tw.tsx";
  }

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/pages/index.tsx");
  fs.copySync(indexSrc, indexDest);
};

// Similar to index, but for app router
export const selectPageFile = ({
  projectDir,
  packages,
}: SelectBoilerplateProps) => {
  const indexFileDir = path.join(PKG_ROOT, "template/extras/src/app/page");

  const usingTRPC = packages.trpc.inUse;
  const usingTw = packages.tailwind.inUse;
  const usingLucia = packages.lucia.inUse;
  const usingNextAuth = packages.nextAuth.inUse;

  let indexFile = "base.tsx";
  if (usingTRPC && usingTw && usingNextAuth) {
    indexFile = "with-nextauth-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingNextAuth) {
    indexFile = "with-nextauth-trpc.tsx";
  } else if (usingTRPC && usingTw && usingLucia) {
    indexFile = "with-lucia-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw && usingLucia) {
    indexFile = "with-lucia-trpc.tsx";
  } else if (!usingTRPC && usingTw && usingLucia) {
    indexFile = "with-lucia-tw.tsx";
  } else if (!usingTRPC && !usingTw && usingLucia) {
    indexFile = "with-lucia.tsx";
  } else if (usingTRPC && usingTw) {
    indexFile = "with-trpc-tw.tsx";
  } else if (usingTRPC && !usingTw) {
    indexFile = "with-trpc.tsx";
  } else if (!usingTRPC && usingTw) {
    indexFile = "with-tw.tsx";
  }

  const indexSrc = path.join(indexFileDir, indexFile);
  const indexDest = path.join(projectDir, "src/app/page.tsx");
  fs.copySync(indexSrc, indexDest);
};
