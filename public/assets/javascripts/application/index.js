$(function() {
	var loader = $(".loading-container");
	$("#requestTokens").on('click', function( e ) {
		e.preventDefault();
		$('#modalSuccess').hide();
		$('#modalError').hide();
		$this = $(this);
		loader.removeClass("hidden");
		var receiver = $("#receiver").val();
    	var captcha =  $("#g-recaptcha-response").val();
		$.ajax({
		  	url:"/",
		  	type:"POST",
		  	data: {
		  		receiver: receiver,
          		captcha: captcha
		  	}
		}).done(function(data) {
			console.log(data);
			if (!data.success) {
				loader.addClass("hidden");
				$('#modalSuccess').hide();
				$('#modalError').show();
				$('#modalErrorText').html(data.error.message);
				// swal(data.error.title, data.error.message, "error");
				return;
			} else {
				$('#modalSuccess').show();
				$('#modalError').hide();
				var hashLink = `
								<a href="http://devnetscan.apothem.network/tx/`+data.success.txHash+`"> Check Txhash :- `+data.success.txHash+`</a>
								`;
				$('#hashLink').html(hashLink)
			}

			getTxCallBack(data.success.txHash, function() {
				$("#receiver").val('');
				loader.addClass("hidden");
				// swal("Success",
				//   "15 TOMO is successfully transfered to " + receiver +" in Tx<br /><a href='https://scan.testnet.tomochain.com/txs/" + data.success.txHash + "' target='_blank'>" + data.success.txHash + "</a>",
				//   "success"
				// );
				grecaptcha.reset();
			});
		}).fail(function(err) {
			console.log('err', err);
			loader.addClass("hidden");
		});
	});
});
