import ShutterPageTransition from "@/components/animation/shutterPageTransition";
import SlideInPageTransition from "@/components/animation/slideInPageTransition";
// see NextJS doc:
// https://nextjs.org/docs/app/api-reference/file-conventions/template
export default function Template({ children }) {
  return <SlideInPageTransition>{children}</SlideInPageTransition>;
}
