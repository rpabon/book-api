const getCdata = obj => (obj && obj.__cdata ? obj.__cdata : obj);

export const parseList = ({ results }) => {
  const bookList = results && Array.isArray(results.work) ? results.work : [];

  return bookList.map(
    ({ best_book = {}, average_rating, original_publication_year }) => {
      const { id, image_url, small_image_url, title, author } = best_book;

      return {
        id,
        url: image_url,
        url_small: small_image_url,
        title: (title || '').replace(/ *\([^)]*\) */g, ''),
        author: author && author.name,
        author_id: author && author.id,
        rating: average_rating,
        year: original_publication_year
      };
    }
  );
};

export const parseBook = ({
  id,
  title,
  title_without_series,
  isbn,
  image_url,
  small_image_url,
  publication_year,
  description,
  average_rating,
  num_pages,
  authors: { author = {} },
  similar_books = {},
  work = {}
}) => ({
  id,
  title: work.original_title || getCdata(title) || title_without_series,
  year: work.original_publication_year || publication_year,
  rating: average_rating,
  image_url: getCdata(image_url),
  small_image_url: getCdata(small_image_url),
  isbn: Number(getCdata(isbn)),
  description: getCdata(description),
  num_pages: Number(getCdata(num_pages)),
  author_id: Number(author.id),
  author: author.name,
  author_image_url: getCdata(author.image_url),
  similar_books: (
    (Array.isArray(similar_books.book) && similar_books.book) ||
    []
  ).map(similarBook => parseBook(similarBook))
});

export const parseAuthor = ({
  id,
  large_image_url,
  image_url,
  small_image_url,
  about,
  hometown,
  born_at,
  died_at,
  books = {}
}) => ({
  id,
  large_image_url: getCdata(large_image_url),
  image_url: getCdata(image_url),
  small_image_url: getCdata(small_image_url),
  about: getCdata(about),
  hometown,
  born_at,
  died_at,
  books: ((Array.isArray(books.book) && books.book) || []).map(book =>
    parseBook(book)
  )
});
