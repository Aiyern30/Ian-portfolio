import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center -p-5">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl font-medium text-white">Oops!</h1>
        <div className="relative w-[300px] h-[200px] mx-auto">
          <Image
            src="Logo/404.svg"
            alt="404 Construction Barrier"
            fill
            className="object-contain ml-12"
            priority
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            PAGE NOT FOUND
          </h2>
          <p className="text-white max-w-[400px] mx-auto">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. If you
            think somethin is broken, report a problem.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button variant="secondary" asChild>
            <Link href="/" className="text-white">
              GO HOME
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/contact" className="text-white">
              CONTACT US
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
