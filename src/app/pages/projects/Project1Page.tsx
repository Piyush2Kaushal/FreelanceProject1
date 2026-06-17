// app/pages/projects/Project1Page.tsx
// Route: /projects/project-1
import ProjectPage from "./ProjectPage";
import { project1Data } from "../../../data/project1";

export default function Project1Page() {
  return <ProjectPage project={project1Data} />;
}
