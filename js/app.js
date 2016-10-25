(function(){

	"use strict";
	var app = {

		init : function(){
			this.getArticle();
			this.getJson();
		},
		
		getArticle : function() {
			$.ajax('http://192.168.1.21:1337/alice.md')
			.done(this.getArticleDone)
			.fail(this.getArticleFail)
			.always(this.getArticleAlways)
		},

		getArticleDone : function(response) {
			console.log(response)

			var converter = new showdown.Converter();
			var articleHtml = converter.makeHtml(response);
			$("#md").html(articleHtml);
		},

		getArticleFail : function() {
			alert("fail");
		},

		getArticleAlways : function() {
			console.log("complete");
		},

		getJson : function() {
			$.ajax('http://192.168.1.21:1337/example.json')
			.done(this.getJsonDone)
		},

		getJsonDone : function(response) {
			console.log("JSON ?" + response)
		}


	};





	$(document).ready(function(){
		app.init();
	});

})();