// console.log("Hare Krishna");

const initialPriceInput = document.querySelector('#initial-price-input');
const quantityInput = document.querySelector('#quantity-input');
const currentPriceInput = document.querySelector('#current-price-input');
const btnContainer = document.querySelector('.btn-container');
const output = document.querySelector('.output-section');
const alertText = document.querySelector('.alert');

function alertMsg(type, msg, ms) {
  const tID = setInterval(() => {
    alertText.innerText = msg;
    alertText.classList.add(`alert-${type}`);
    alertText.classList.add('show-alert');
  }, 0);

  setTimeout(() => {
    clearInterval(tID);
    alertText.classList.remove(`alert-${type}`);
    alertText.classList.remove('show-alert');
  }, ms);
}

function showOutput(text, amount, amountPercent) {
  const profitOrLossCondition = text.startsWith('p');
  output.innerHTML = `
  Hey, the ${text} is
  <span style='color: ${profitOrLossCondition ? 'green' : 'red'}'>
  ${amount}
  </span> 
  Rs and the percent is 
  <span style='color: ${profitOrLossCondition ? 'green' : 'red'}'>
  ${amountPercent}%
  </span> ${profitOrLossCondition ? '🎉' : '😕'}
  `;
}

function calculateProfitORLoss(initial, quant, current) {
  if (initial < current) {
    const myProfit = ((current - initial) * quant).toFixed(2);
    const myProfitPercent = ((myProfit / initial) * 100).toFixed(2);
    showOutput('profit', myProfit, myProfitPercent);
  } else if (initial > current) {
    // Loss
    const myLoss = ((initial - current) * quant).toFixed(2);
    const myLossPercent = ((myLoss / initial) * 100).toFixed(2);
    showOutput('loss', myLoss, myLossPercent);
  } else if (initial === current) {
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
    alertMsg('success', 'Cleared', 1000);
    return;
  }

  if (
    !(initialPriceInput.value && quantityInput.value && currentPriceInput.value)
  ) {
    alertMsg('danger', 'Please fill all input fields 🙏', 1000);
    return;
  }
  if (initialPrice <= 0 || currentPrice <= 0 || quantity <= 0) {
    alertMsg('danger', "Prices or Quantity can't be negative ❌", 1000);
    return;
  }

  calculateProfitORLoss(initialPrice, quantity, currentPrice);
  alertMsg('success', 'Done ✅', 1000);
}

btnContainer.addEventListener('click', handleContainerClick);

document.querySelectorAll('input').forEach((singleInput) => {
  singleInput.addEventListener('click', () => {
    output.innerText = '';
  });
});
