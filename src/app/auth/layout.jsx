export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout flex min-h-screen items-center justify-center bg-muted/50">
      {children}
    </div>
  );
}
