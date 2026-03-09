import { NotFoundContent } from "./components/NotFoundContent";

export const NotFound = () => {
  const handleRouteNotFound = (pathname: string) => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  };

  return (
    <NotFoundContent onRouteNotFound={handleRouteNotFound} />
  );
};

export default NotFound;
