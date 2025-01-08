import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany();

      expect(result).toHaveLength(posts.length); // 4 поста
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
      expect(result[2].text).toBe('Post 3');
      expect(result[3].text).toBe('Post 4');
    });

    it('should return correct posts for skip and limit options', () => {
      // реализуйте тест-кейс
      const result = postsService.findMany({ skip: 1, limit: 2 });

      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 2');
      expect(result[1].text).toBe('Post 3');
    });

    // реализуйте недостающие тест-кейсы
    it('should return correct posts for skip option', () => {
      const result = postsService.findMany({ skip: 2 });

      // Ожидаем, что пропущены первые два поста, а остальные возвращены
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 3');
      expect(result[1].text).toBe('Post 4');
    });

    it('should return correct posts for limit option', () => {
      const result = postsService.findMany({ limit: 2 });

      // Ожидаем, что возвращены только первые два поста
      expect(result).toHaveLength(2);
      expect(result[0].text).toBe('Post 1');
      expect(result[1].text).toBe('Post 2');
    });

    it('should return empty array if skip is greater than the number of posts', () => {
      const result = postsService.findMany({ skip: 5 });

      // Ожидаем, что будет возвращен пустой массив, так как мы пытаемся пропустить больше, чем есть постов
      expect(result).toHaveLength(0);
    });

    it('should return empty array if limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });

      // Ожидаем, что будет возвращен пустой массив, так как лимит равен 0
      expect(result).toHaveLength(0);
    });
  });
});