import { CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";

export function lazyLoadRoutes(componentName: string) {
  const LazyElement = lazy(
    () => import(`../pages/${componentName}/${componentName}.tsx`)
  );

  // Wrapping around the suspense component is mandatory
  return (
    <Suspense fallback={<CircularProgress />}>
      <LazyElement />
    </Suspense>
  );
}
