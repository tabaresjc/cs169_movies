Rottenpotatoes::Application.routes.draw do
  
  resources :movies do
	match "movies_by_director" => "movies#movies_by_director"
  end
  # map '/' to be a redirect to '/movies'
  root :to => redirect('/movies')
end
