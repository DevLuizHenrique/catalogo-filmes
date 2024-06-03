import { Injectable } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(private readonly movieRepository: MovieRepository) {}

  async createMovie(createMovieDto: Partial<Movie>): Promise<Movie> {
    return this.movieRepository.createMovie(createMovieDto);
  }

  async updateMovie(id: number, updateMovieDto: Partial<Movie>): Promise<Movie> {
    return this.movieRepository.updateMovie(id, updateMovieDto);
  }

  async deleteMovie(id: number): Promise<void> {
    return this.movieRepository.deleteMovie(id);
  }

  async findAllMovies(): Promise<Movie[]> {
    return this.movieRepository.findAllMovies();
  }

  async findMovieById(id: number): Promise<Movie | undefined> {
    return this.movieRepository.findMovieById(id);
  }
}
