import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Blogs from './pages/Blogs/Blogs.jsx'
import Publications from './pages/Publications/Publications.jsx'
import Gallery from './pages/Gallery/Gallery.jsx'
import Contact from './pages/Contact/Contact.jsx'
import CV from './pages/CV/CV.jsx'

// Blog posts pull in react-markdown + highlight.js, so load them on demand
// to keep the main bundle small.
const BlogPost = lazy(() => import('./pages/Blogs/BlogPost.jsx'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/cv" element={<CV />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
