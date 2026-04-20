function showToast(message, type='info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast ' + (type || 'info');
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('send');
  const input = document.getElementById('input');
  const response = document.getElementById('response');
  btn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) return;
    response.textContent = 'Thinking...';
    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 'demo', query: text })
      });
      if (!res.ok) {
        const err = await res.json();
        showToast(err?.error?.message || 'Error', 'error');
        response.textContent = '';
        return;
      }
      const data = await res.json();
      response.textContent = data.answer || 'No answer';
      showToast('Response received', 'success');
    } catch (e) {
      showToast('Network error', 'error');
    }
  });
});

// Expose to global scope for test pages
window.showToast = showToast;
