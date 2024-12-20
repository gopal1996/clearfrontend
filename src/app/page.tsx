import { routes } from "@/common/routes";
import { HomeNavBar } from "@/ui/components/common/home-nav-bar/home-nav-bar";
import { RadixNextLink } from "@/ui/components/core/radix-next-link/radix-next-link";
import { Heading } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <HomeNavBar />
      <div className="text-center">
        <Heading size="7" className="my-8 mx-4">
          Prepare for your next frontend coding interview
        </Heading>

        <RadixNextLink href={routes.challenges}>Get started</RadixNextLink>
      </div>
    </>
  );
}
