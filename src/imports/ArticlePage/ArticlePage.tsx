import BlogArticle from "../BlogArticle/BlogArticle";
import FeatureWhySie from "../FeatureWhySie/FeatureWhySie";
import Wireframe4 from "../Wireframe4/Wireframe4";

export default function ArticlePage() {
  return (
    <div className="w-full overflow-x-hidden bg-[#5f3223]">
      <div className="relative w-full" style={{ height: 4120 }}>
        <BlogArticle />
      </div>
      <div className="relative w-full" style={{ height: 578 }}>
        <Wireframe4 />
      </div>
      <div className="relative w-full" style={{ height: 660 }}>
        <FeatureWhySie />
      </div>
    </div>
  );
}