function setClasses(el) {
    const isScrollable = el.scrollHeight > el.clientHeight;
    
    // GUARD: If element is not scrollable, remove all classes
    if (!isScrollable) {
      el.classList.remove('is-bottom-overflowing', 'is-top-overflowing');
      return;
    }
    
    // Otherwise, the element is overflowing!
    // Now we just need to find out which direction it is overflowing to (can be both)
    const isScrolledToBottom = el.scrollHeight <= el.clientHeight + el.scrollTop;
    const isScroledlToTop = el.scrollTop === 0;
    el.classList.toggle('is-bottom-overflowing', !isScrolledToBottom);
    el.classList.toggle('is-top-overflowing', !isScroledlToTop);
  }
  
  document.querySelector('#content').addEventListener('scroll', (e) => {
    const el = e.currentTarget;
    setClasses(el);
  });
  
  setClasses(document.querySelector('#content'));