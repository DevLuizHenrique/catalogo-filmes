import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async createMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.create(movieData);
    return await this.save(movie);
  }

  async updateMovie(id: number, movieData: Partial<Movie>): Promise<Movie> {
    await this.update(id, movieData);
    return this.findOne(id);
  }

  async deleteMovie(id: number): Promise<void> {
    await this.delete(id);
  }

  async findAllMovies(): Promise<Movie[]> {
    return await this.find();
  }

  async findMovieById(id: number): Promise<Movie | undefined> {
    return await this.findOne({ where: { id } });
}
}
