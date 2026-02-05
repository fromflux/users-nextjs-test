import UserDetailPage from "./page";
import Error from './error';
import { ErrorBoundary } from "react-error-boundary";

export default function Layout({ params }: { params: Promise<{ userId: string }> }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <UserDetailPage params={params} />
    </ErrorBoundary>
  );
}