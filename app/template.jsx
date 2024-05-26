import Transition from "@/components/animation/transition";
// see NextJS doc:
// https://nextjs.org/docs/app/api-reference/file-conventions/template
export default function Template({ children }) {
  return <Transition>{children}</Transition>;
}
