(function() {

	var app = {

		endpoint : 'http://localhost:2000',
		
		init : function() {
			this.listeners();
		},

		listeners : function(){
			$('#btnCreate').on('click', this.createArticle.bind(this));
		},

		createArticle : function(){
			var titleArticle = $('#inputTitle').val();
			var pathArticle = '/' + titleArticle + '.md';
			var contentArticle = $('#textAreaContent').val();
			if (titleArticle && contentArticle) {
				$.post({
					url : this.endpoint + '/createArticle',
					dataType : 'html',
					data: {title: titleArticle, path: pathArticle, content: contentArticle}
				})
				.done(this.requestDone)
				.fail(this.requestFail)
			}
		},

		// Communs à toutes les requêtes Ajax

		requestDone : function() {
			console.log("requete envoyée");
		},

		requestFail : function() {
			console.log("fail"); // alert utilisateur
		}
	}



	app.init();
})();