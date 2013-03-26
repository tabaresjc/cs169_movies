require 'simplecov'
SimpleCov.start 'rails'

require 'spec_helper'

describe MoviesController do

	describe 'add director to existing movie' do
		before :each do
			@movie=mock(Movie, :id => "1", :title => "Star Wars", :director => "George Lucas")
			Movie.stub!(:find).with("1").and_return(@movie)
		end

		it 'should call show movie and render view' do
			get :show, {:id => "1"}
			response.should render_template('show')
		end

		it 'update and validate if director was properly saved with a message' do
			@movie.stub(:update_attributes!).and_return(true)

			put :update, {:id => "1", :movie => @movie }		
			response.should redirect_to(movie_path(@movie))

			flash[:notice].should_not be_blank
		end
	end

	describe 'find movie with same director' do
		before :each do
			@movie=mock(Movie, :id => "1", :title => "Star Wars", :director => "George Lucas")
			Movie.stub!(:find).with("1").and_return(@movie)
		end

		it 'check if movies by director can be rendered' do
			get :movies_by_director, :movie_id => "1"
			response.should render_template('movies_by_director')
		end
	end

end
