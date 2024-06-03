import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Importe o guard de autenticação JWT

@Controller('movies')
@UseGuards(JwtAuthGuard) // Aplica o guard de autenticação JWT a todas as rotas neste controller
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAllMovies();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findMovieById(+id);
  }

  @Post()
  async create(@Body() createMovieDto: Partial<Movie>): Promise<Movie> {
    return this.movieService.createMovie(createMovieDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMovieDto: Partial<Movie>): Promise<Movie> {
    return this.movieService.updateMovie(+id, updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.movieService.deleteMovie(+id);
  }
}
