import { useParams } from "react-router-dom";
import BlogArticle from "../BlogArticle/BlogArticle";
import FeatureWhySie from "../FeatureWhySie/FeatureWhySie";
import Wireframe4 from "../Wireframe4/Wireframe4";
import { getArticleBySlug, article01 } from "../../data/articles";

export default function ArticlePage() {
  const { slug } = useParams<{ slug?: string }>();
  const article = slug ? (getArticleBySlug(slug) ?? null) : article01;

  if (!article) {
    return (
      <div className="w-full overflow-x-hidden bg-[#5f3223] flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div className="text-center" style={{ padding: "80px 32px" }}>
          <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(48px, 8vw, 96px)", color: "#DCD1B1", lineHeight: 1.1, marginBottom: 24 }}>
            Article Not Found
          </p>
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 20, color: "rgba(220,209,177,0.7)", lineHeight: 1.5, maxWidth: 480, margin: "0 auto 40px" }}>
            The article you are looking for does not exist or may have been moved.
          </p>
          <a href="/journal" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 16, color: "#5f3223", backgroundColor: "#DCD1B1", textDecoration: "none", borderRadius: 4, padding: "10px 28px", display: "inline-block" }}>
            Back to Journal
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden bg-[#5f3223]">
      <BlogArticle article={article} />
      <Wireframe4 />
      <FeatureWhySie />
    </div>
  );
}