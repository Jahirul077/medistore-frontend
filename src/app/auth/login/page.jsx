import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-4xl font-bold tracking-tight">Login Page </h1>
      <Link href="/" className="text-primary hover:underline font-medium italic text-xl">
        Go to Home
      </Link>
    </div>
  );
}