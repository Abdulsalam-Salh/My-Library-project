document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('search');
    const typeFilter = document.getElementById('typeFilter');
    const bookElements = document.querySelectorAll('.allBooks a');
    
    // Function to filter books
    function filterBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;
        
        bookElements.forEach(bookElement => {
            // Get book title and type from the element
            const titleElement = bookElement.querySelector('.titleName');
            const typeElement = bookElement.querySelector('.bookType');
            
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const type = typeElement ? typeElement.textContent.toLowerCase() : '';
            
            // Check if book matches search criteria
            const matchesSearch = title.includes(searchTerm);
            const matchesType = selectedType === 'all' || type === selectedType.toLowerCase();
            
            // Show or hide book based on filters
            if (matchesSearch && matchesType) {
                bookElement.style.display = 'inline-block';
            } else {
                bookElement.style.display = 'none';
            }
        });
    }
    
    // Add event listeners
    searchInput.addEventListener('input', filterBooks);
    typeFilter.addEventListener('change', filterBooks);
    
    // Initial filter to show all books
    filterBooks();
});