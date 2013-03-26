class MoviesController < ApplicationController
  def show
    id = params[:id] # retrieve movie ID from URI route
    @movie = Movie.find(id) # look up movie by unique ID
    render(:partial => 'movie', :object => @movie) if request.xhr?
    # will render app/views/movies/show.<extension> by default    
  end

  def index
    sort = params[:sort] || session[:sort]
    case sort
    when 'title'
      ordering,@title_header = {:order => :title}, 'hilite'
    when 'release_date'
      ordering,@date_header = {:order => :release_date}, 'hilite'
    end
    @all_ratings = Movie.all_ratings
    @selected_ratings = params[:ratings] || session[:ratings] || {}
    
    if @selected_ratings == {}
      @selected_ratings = Hash[@all_ratings.map {|rating| [rating, rating]}]
    end
    
    if params[:sort] != session[:sort] or params[:ratings] != session[:ratings]
      session[:sort] = sort
      session[:ratings] = @selected_ratings
      redirect_to :sort => sort, :ratings => @selected_ratings and return
    end
    @movies = Movie.find_all_by_rating(@selected_ratings.keys, ordering)
  end

  def new
    # default: render 'new' template
    render(:partial => 'movie_new') if request.xhr?
  end

  def create
    @movie = Movie.create!(params[:movie])
    flash[:notice] = "#{@movie.title} was successfully created."
    if request.xhr? 
	render(:nothing => true) 
    else
    	redirect_to movies_path
    end
  end

  def edit
    @movie = Movie.find params[:id]
    render(:partial => 'movie_edit') if request.xhr?
  end

  def update
    @movie = Movie.find params[:id]
    @movie.update_attributes!(params[:movie])
    flash[:notice] = "#{@movie.title} was successfully updated."
    if request.xhr? 
	render(:nothing => true) 
    else
    	redirect_to movie_path(@movie)
    end    
  end

  def destroy
    @movie = Movie.find(params[:id])
    @movie.destroy
    flash[:notice] = "Movie '#{@movie.title}' deleted."
    redirect_to movies_path
  end

  def movies_by_director
	id = params[:movie_id]
	movie = Movie.find(id)

	if movie.director.to_s.empty? 
		flash[:notice] = "'#{movie.title}' has no director info"
		redirect_to movies_path
	end
	@movies = Movie.find_all_by_director(movie.director)
  end
end
