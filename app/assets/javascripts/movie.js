	RP = {
	    setup: function() {
		// construct new DOM elements
		$('a.delete_movie_link').css({'visibility':'visible'});
	    }
	}
	$(RP.setup);

	RPShowMovie = {
		setup: function() {		
			// setup the show details for selected movie
			$('a.show_movie_link').click(RPShowMovie.getMovieInfo);
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
			$('#modalBox .modal-body').html(data);
			$('#modalBox .modal-header #header_title').html($('#box_title').hide().text());
			$('#action-link').hide();

			$('#modalBox').modal();
			$('#modalBox').modal('show');
		}
	}
	$(RPShowMovie.setup);

	RPEditMovie = {
		setup: function() {		
			// setup the show details for selected movie
			$('a.edit_movie_link').click(RPEditMovie.getEditMovieInfo);
		},
		getEditMovieInfo: function() {
			$.ajax({type: 'GET',
				url: $(this).attr('href'),
				timeout: 5000,
				success: RPEditMovie.showEditMovieInfo,
				error: function() { alert('Error!'); }
			});
			return(false);
		},
		showEditMovieInfo: function(data) {
			// once the AJAX request has been succesfull, render html data onto movieInfo box and display as Dialog
			$('#modalBox .modal-body').html(data);
			$('#modalBox .modal-header #header_title').html($('#box_title').hide().text());
			$('#action-link').show();
			$('#action-link').html('Update Movie').off("click").on("click", RPEditMovie.updateMovieInfo);

			$('#modalBox').modal();
			$('#modalBox').modal('show');
		},
		updateMovieInfo: function() {
			$.ajax({type: 'POST',
				url: $('#modalBox .modal-body form').attr('action'),
				data: $('#modalBox .modal-body form').serialize(),
				timeout: 5000,
				success: RPEditMovie.redirectToHome,
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
	$(RPEditMovie.setup);


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
			// once the AJAX request has been succesfull, render html data onto movieInfo box and display as Dialog
			$('#modalBox .modal-body').html(data);
			$('#modalBox .modal-header #header_title').html($('#box_title').hide().text());
			$('#action-link').show();
			$('#action-link').html('Add Movie').off("click").on("click", RPAddMovie.saveNewMovie);

			$('#modalBox').modal();
			$('#modalBox').modal('show');
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
				url: $('#modalBox .modal-body form').attr('action'),
				data: $('#modalBox .modal-body form').serialize(),
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



