export default {
  search(q: string): string {
    return `search${q ? `?q=${q}` : ''}`;
  },
  book(id: string): string {
    return `book/show/${id}`;
  },
  author(id: string): string {
    return `author/show/${id}`;
  },
};
