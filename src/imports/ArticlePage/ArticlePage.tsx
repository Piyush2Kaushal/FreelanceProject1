import BlogArticle from "../BlogArticle/BlogArticle";
import FeatureWhySie from "../FeatureWhySie/FeatureWhySie";
import Wireframe4 from "../Wireframe4/Wireframe4";

export default function ArticlePage() {
  return (
    <div className="w-full overflow-x-auto bg-[#5f3223]">
      <div style={{ width: 1440, height: 4120 }}>
        <BlogArticle />
      </div>
      <div style={{ width: 1440, height: 578 }}>
        <Wireframe4 />
      </div>
      <div style={{ width: 1440, height: 660 }}>
        <FeatureWhySie />
      </div>
    </div>
  );
}
