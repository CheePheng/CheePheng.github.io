import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070d]">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-heading italic text-white">404</h1>
        <p className="mb-4 text-lg text-white/55 font-body">Page not found</p>
        <Link to="/" className="text-amber-200 font-body hover:text-amber-100 transition-colors">
          Return to Selected Work
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
