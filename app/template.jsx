import PageTransition from "@/components/animation/pageTransition";
// see NextJS doc:
// https://nextjs.org/docs/app/api-reference/file-conventions/template
export default function Template({ children }) {
  return <PageTransition>{children}</PageTransition>;
}
