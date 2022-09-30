// console.log("Hare Krishna");

const initialPriceInput = document.querySelector('#initial-price-input');
const quantityInput = document.querySelector('#quantity-input');
const currentPriceInput = document.querySelector('#current-price-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');

function showOutput(text, amount, amountPercent, profitOrLossCondition) {
  output.innerHTML = `
  Hey, the ${text} is
  <span style='color: ${profitOrLossCondition ? 'green' : 'red'}'>
  ${amount} Rs
  </span> 
  and the ${text} percent is 
  <span style='color: ${profitOrLossCondition ? 'green' : 'red'}'>
  ${amountPercent}%
  </span> ${profitOrLossCondition ? '🎉' : '😕'}
  `;
}

function displayErrorMsg(text) {
  output.innerHTML = `<span style="color:red">${text}</span>`;
}

function calculateProfitORLoss(initial, quant, current) {
  const cp = initial * quant;
  const sp = current * quant;

  if (cp < sp) {
    const myProfit = Number.isInteger(sp - cp) ? sp - cp : (sp - cp).toFixed(2);
    const myProfitPercent = ((myProfit / cp) * 100).toFixed(2);
    showOutput('profit', myProfit, myProfitPercent, true);
  } else if (cp > sp) {
    // Loss
    const myLoss = Number.isInteger(cp - sp) ? cp - sp : (cp - sp).toFixed(2);
    const myLossPercent = ((myLoss / cp) * 100).toFixed(2);
    showOutput('loss', myLoss, myLossPercent, false);
  } else if (cp === sp) {
    output.innerText = 'No Profit but No Loss. Invest in FD 😜';
  }
}

function handleContainerClick(e) {
  e.preventDefault();
  if (!('btn' in e.target.dataset)) {
    return;
  }

  const btnClicked = e.target.dataset.btn;
  const initialPrice = initialPriceInput.valueAsNumber;
  const quantity = quantityInput.valueAsNumber;
  const currentPrice = currentPriceInput.valueAsNumber;

  if (btnClicked === 'clear') {
    initialPriceInput.value = '';
    quantityInput.value = '';
    currentPriceInput.value = '';
    output.innerText = '';
    return;
  }

  if (
    !(initialPriceInput.value && quantityInput.value && currentPriceInput.value)
  ) {
    displayErrorMsg('Please fill all input fields 🙏');
    return;
  }
  if (initialPrice <= 0 || currentPrice <= 0 || quantity <= 0) {
    displayErrorMsg("Prices or Quantity can't be zero or negative ❌");
    return;
  }

  calculateProfitORLoss(initialPrice, quantity, currentPrice);
}

btnContainer.addEventListener('click', handleContainerClick);

[...document.querySelectorAll('input')].forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    output.innerText = '';
  });
});
