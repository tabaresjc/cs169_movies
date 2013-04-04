	RP = {
	    setup: function() {
		// construct new DOM elements
	    },
	}
	$(RP.setup);

	RPShowMovie = {
		setup: function() {		
			// setup the show details for selected movie			
			//$('<div id="showMovieBox"></div>').hide().appendTo($('body'));
			$('a.movie_link').click(RPShowMovie.getMovieInfo);
		},
		getMovieInfo: function() {
			// on click, request the html body of movie details from server using AJAX
			$.ajax({type: 'GET',
				url: $(this).attr('href'),
				timeout: 5000,
				success: RPShowMovie.showMovieBox,
				error: function() { alert('Error!'); }
			});
			return(false);
		},
		showMovieBox: function(data) {
			// once the AJAX request has been succesfull, render html data onto movieInfo box and display as Dialog			
			$('#showMovieBox .modal-body').html(data);
			$('#showMovieBox .modal-header #header_title').html($('#show_movie_title').hide().text());
			$('#showMovieBox #edit-movie-link').html('Edit Movie').off("click").on("click", RPShowMovie.getEditMovieInfo);

			$('#showMovieBox').modal();
			$('#showMovieBox').modal('show');

			/*
			$('#showMovieBox').html(data).dialog({
				title: $('#show_movie_title').text(),
				width: '50%',
				resizable: false,
				buttons: {
					Edit: RPShowMovie.getEditMovieInfo,
					Close: function() { $(this).dialog( "close" ); }
				}
			});
 			$('#show_movie_title').hide();
			$('#link_edit_movie').hide();
			*/
		},
		getEditMovieInfo: function() {
			$.ajax({type: 'GET',
				url: $('#link_edit_movie').attr('href'),
				timeout: 5000,
				success: RPShowMovie.showEditMovieInfo,
				error: function() { alert('Error!'); }
			});
			return(false);
		},
		showEditMovieInfo: function(data) {			
			$('#showMovieBox .modal-body').html(data);
			$('#showMovieBox .modal-header #header_title').html($('#edit_movie_title').hide().text());			
			$('#showMovieBox #edit-movie-link').html('Update Movie').off("click").on("click", RPShowMovie.updateMovieInfo);

			$('#showMovieBox').modal();
			$('#showMovieBox').modal('show');
			/*
			$('#showMovieBox').html(data).dialog({
				title: $('#edit_movie_title').text(),
				width: '50%',
				resizable: false,
				buttons: {
					Close: function() { $(this).dialog( "close" ); },
					Save: RPShowMovie.updateMovieInfo
				}
			});
		        $('#edit_movie_title').hide();
			*/
		},
		updateMovieInfo: function() {
			$.ajax({type: 'POST',
				url: $('#showMovieBox .modal-body form').attr('action'),
				data: $('#showMovieBox .modal-body form').serialize(),
				timeout: 5000,
				success: RPShowMovie.redirectToHome,
				error: function() { alert('Error!'); }
			       });
			return(false);
		},
		redirectToHome: function() {
			var url = $(location).attr('href');
			$(location).attr('href',url);
			return(false);
		}
	}
	$(RPShowMovie.setup);


	RPAddMovie = {
		setup: function(){			
			$('#add_movie').click(RPAddMovie.showEditMovie);        	
		},
		showEditMovie: function(){
			$.ajax({type: 'GET',
				url: $(this).attr('href'),
				timeout: 5000,
				success: RPAddMovie.showNewMovie,
				error: function() { alert('Error!'); }
			       });
			return(false);		
		},
		showNewMovie: function(data) {
			
			$('#newMovieBox .modal-body').html(data);
			$('#newMovieBox .modal-header #header_title').html($('#new_movie_title').hide().text());
			$('#newMovieBox #save-movie-link').off("click").on("click", RPAddMovie.saveNewMovie);

			$('#newMovieBox').modal();		
			$('#newMovieBox').modal('show');
			/*
			$('#newMovieBox').html(data).dialog({
				title: $('#new_movie_title').hide().text(),
			      	width: '50%',
			      	resizable: false,
			     	buttons: {
					Cancel: function() {
				  		$( this ).dialog( "close" );
					},
					Save: function() {
						$.ajax({type: 'POST',
							url: $('#newMovieBox form').attr('action'),
							data: $('#newMovieBox form').serialize(),
							timeout: 5000,
							success: RPAddMovie.redirectToHome,
							error: function() { alert('Error!'); }
						       });
						return(false);				
					}
			      	}
			});
			*/
		},
		saveNewMovie: function() {
			$.ajax({type: 'POST',
				url: $('#newMovieBox .modal-body form').attr('action'),
				data: $('#newMovieBox .modal-body form').serialize(),
				timeout: 5000,
				success: RPAddMovie.redirectToHome,
				error: function() { alert('Error!'); }
			       });
			return(false);				
		},
		redirectToHome: function() {
			var url = $(location).attr('href');
			$(location).attr('href',url);
			return(false);
		}
	}
	$(RPAddMovie.setup);

