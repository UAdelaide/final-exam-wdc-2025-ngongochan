function logout(async () => {
    await fetch('/logout', { method: 'POST' });
    // window.location.href = '/login.html';
});
