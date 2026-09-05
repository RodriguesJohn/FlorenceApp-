import React from "react";
import { NavMenu } from "./NavMenu.jsx";
import { NewsletterCta } from "./NewsletterCta.jsx";
import { blogPosts, getBlogPost } from "./blogData.js";
import "./blog.css";

const bookingLink = "john-rodrigues-rqt2lg/15min";
const bookingNamespace = "15min";
const bookingUrl = `https://cal.com/${bookingLink}`;
const bookingConfig = {
  layout: "month_view",
  useSlotsViewOnSmallScreen: "true"
};
const bookingAttributes = {
  "data-cal-link": bookingLink,
  "data-cal-namespace": bookingNamespace,
  "data-cal-config": JSON.stringify(bookingConfig)
};

function openBookingModal(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const calApi = window.Cal?.ns?.[bookingNamespace] || window.Cal;
  if (!calApi) return;

  event.preventDefault();
  calApi("modal", {
    calLink: bookingLink,
    config: bookingConfig
  });
}

function BlogShell({ children }) {
  return (
    <div className="blog-page">
      <nav className="nav nav-dark" aria-label="Primary">
        <a className="brand" href="/#top" aria-label="Human AI Studio home">
          <span className="brand-mark" aria-hidden="true" />
          Human AI Studio
        </a>
        <div className="nav-actions">
          <NavMenu />
        </div>
      </nav>
      {children}
      <div className="page-bottom-blur" aria-hidden="true" />
      <footer className="blog-footer">
        <a href="/">Studio</a>
        <a href="/blog">Blog</a>
        <a href="/academy">Academy</a>
        <a href={bookingUrl} {...bookingAttributes} onClick={openBookingModal}>
          Book a call
        </a>
      </footer>
    </div>
  );
}

function BlogIndex() {
  return (
    <BlogShell>
      <main className="blog-main">
        <section className="blog-hero" aria-labelledby="blog-title">
          <p className="blog-eyebrow">Blog</p>
          <h1 id="blog-title">Notes on AI products, design systems, and studio work.</h1>
          <p>
            Short, practical writing from Human AI Studio on building AI-native products,
            agent-ready interfaces, and workflows that help teams ship.
          </p>
        </section>

        {blogPosts.length > 0 ? (
          <section className="blog-list" aria-label="Blog posts">
            {blogPosts.map((post) => (
              <a className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <time dateTime={post.date}>{post.displayDate}</time>
              </a>
            ))}
          </section>
        ) : (
          <section className="blog-empty" aria-label="No blog posts yet">
            <h2>Posts are coming soon.</h2>
            <p>
              The blog structure is ready. Add the first studio article to publish it here.
            </p>
            <a href={bookingUrl} {...bookingAttributes} onClick={openBookingModal}>
              Talk to the studio
            </a>
          </section>
        )}

        <NewsletterCta className="blog-newsletter" />
      </main>
    </BlogShell>
  );
}

function BlogPost({ post }) {
  return (
    <BlogShell>
      <main className="blog-main blog-main--article">
        <article className="blog-article">
          <a className="blog-back" href="/blog">Back to blog</a>
          <p className="blog-eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="blog-article-description">{post.description}</p>
          <time dateTime={post.date}>{post.displayDate}</time>
          <div className="blog-article-body">
            {post.body.map((block, index) => {
              if (block.type === "heading") return <h2 key={index}>{block.text}</h2>;
              if (block.type === "list") {
                return (
                  <ul key={index}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
          </div>
        </article>
      </main>
    </BlogShell>
  );
}

export default function BlogPage() {
  const route = window.location.pathname.replace(/\/+$/, "") || "/blog";
  const slug = route.match(/^\/blog\/([^/]+)$/)?.[1];
  const post = slug ? getBlogPost(slug) : null;

  if (slug && !post) {
    return (
      <BlogShell>
        <main className="blog-main">
          <section className="blog-empty">
            <p className="blog-eyebrow">Blog</p>
            <h1>Post not found.</h1>
            <p>This article is not published yet.</p>
            <a href="/blog">Back to blog</a>
          </section>
        </main>
      </BlogShell>
    );
  }

  return post ? <BlogPost post={post} /> : <BlogIndex />;
}
