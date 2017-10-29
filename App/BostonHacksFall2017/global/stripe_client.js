var charge = function(amount) {

  bodyData = {
    amount: (amount * 100),
    currency: 'usd',
    source: 'tok_visa',
    description: 'Test payment for Boston Hacks Fall 2017!'
  }

  fetch('https://api.stripe.com/v1/charges?amount=' + bodyData.amount + '&currency=usd&source=tok_visa', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Bearer sk_test_sqRIxHYk32sVmgYvk6xbvSmm"
    }
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
  })
}

exports.charge = charge;
