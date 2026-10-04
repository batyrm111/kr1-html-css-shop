// ===== Модальное окно =====
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

// Открытие модального окна по кнопке "Заказать"
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productName = button.dataset.product;
    selectedProductInput.value = productName;
    orderDialog.showModal();
  });
});

// Закрытие модального окна
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// ===== Обработка формы =====
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы (backend не подключён)
  event.preventDefault();

  const formElements = Array.from(orderForm.elements);

  // Сбрасываем предыдущие признаки ошибок
  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });
    orderForm.reportValidity();
    return;
  }

  // Успешная отправка
  successMessage.hidden = false;
  orderForm.reset();
  orderDialog.close();
});