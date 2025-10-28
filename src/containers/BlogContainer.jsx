import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { blogCategories } from '../resources/blogPosts.js';
import { setCategory, setQuery } from '../slices/blogSlice.js';
import './BlogContainer.css';

const BlogContainer = () => {
  const dispatch = useDispatch();
  const { posts, filters } = useSelector((state) => state.blog);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        filters.category === 'Усі' || post.category === filters.category;
      const q = filters.query.trim().toLowerCase();
      const matchQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [posts, filters]);

  return (
    <div className="container blog">
      <header className="blog__header">
        <div>
          <span className="badge">База знань</span>
          <h1>Блог спільноти «Хочу Яхту»</h1>
          <p>
            Глибокі гайди, ресерч та дайджести з DeFi, NFT, трейдингу та безпеки.
            Фільтруйте матеріали за категоріями або шукайте за ключовими словами.
          </p>
        </div>
        <div className="blog__search card">
          <label htmlFor="blog-query">Пошук по матеріалам</label>
          <input
            id="blog-query"
            type="search"
            placeholder="Наприклад: стейкінг SOL або халвінг"
            value={filters.query}
            onChange={(event) => dispatch(setQuery(event.target.value))}
          />
        </div>
      </header>

      <div className="tag-cloud">
        <button
          type="button"
          className={filters.category === 'Усі' ? 'active' : ''}
          onClick={() => dispatch(setCategory('Усі'))}
        >
          Усі
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
              <span>{post.readTime} хв читати</span>
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
            <h3>Нічого не знайдено</h3>
            <p>Спробуйте змінити категорію або уточнити пошуковий запит.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogContainer;
