import Transition from "@/components/ui/animation/transition";
// see NextJS doc:
// https://nextjs.org/docs/app/api-reference/file-conventions/template
export default function Template({ children }) {
  return <Transition>{children}</Transition>;
}
