import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Resources, blogCategories } from '../resources/Resources.ts';
import { setCategory, setQuery } from '../slices/blogSlice.js';
import './BlogContainer.css';

const BlogContainer = () => {
  const dispatch = useDispatch();
  const { posts, filters } = useSelector((state) => state.blog);
  const { blog } = Resources;
  const allCategory = blog.allCategoryLabel;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        filters.category === allCategory || post.category === filters.category;
      const q = filters.query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [posts, filters, allCategory]);

  return (
    <div className="container blog">
      <header className="blog__header">
        <div>
          <span className="badge">{blog.badge}</span>
          <h1>{blog.title}</h1>
          <p>{blog.description}</p>
        </div>
        <div className="blog__search card">
          <label htmlFor="blog-query">{blog.searchLabel}</label>
          <input
            id="blog-query"
            type="search"
            placeholder={blog.searchPlaceholder}
            value={filters.query}
            onChange={(event) => dispatch(setQuery(event.target.value))}
          />
        </div>
      </header>

      <div className="tag-cloud">
        <button
          type="button"
          className={filters.category === allCategory ? 'active' : ''}
          onClick={() => dispatch(setCategory(allCategory))}
        >
          {allCategory}
        </button>
        {blogCategories.map((category) => (
          <button
            key={category}
            type="button"
            className={filters.category === category ? 'active' : ''}
            onClick={() => dispatch(setCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="blog__grid">
        {filteredPosts.map((post) => (
          <article key={post.id} className="card blog__card">
            <div className="blog__meta">
              <span>{post.category}</span>
              <span>
                {post.readTime} {blog.readTimeSuffix}
              </span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <footer>
              <span>{post.author}</span>
              <span>
                {new Date(post.publishedAt).toLocaleDateString('uk-UA', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </footer>
          </article>
        ))}
        {filteredPosts.length === 0 && (
          <div className="blog__empty card">
            <h3>{blog.emptyState.title}</h3>
            <p>{blog.emptyState.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
