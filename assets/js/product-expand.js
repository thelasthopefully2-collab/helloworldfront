// Product Page Expand/Collapse Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // "Ver todas las especificaciones" & "Ver descripción completa" buttons
    document.querySelectorAll('.sc-a459b27b-4').forEach(button => {
        const container = button.closest('.sc-a459b27b-0');
        if (!container) return;
        
        const contentDiv = container.querySelector('.sc-a459b27b-2');
        const gradientDiv = container.querySelector('.sc-a459b27b-3');
        const svgIcon = button.querySelector('svg');
        let isExpanded = false;
        
        button.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                contentDiv.style.maxHeight = 'none';
                contentDiv.style.overflow = 'visible';
                if (gradientDiv) gradientDiv.style.display = 'none';
                if (svgIcon) svgIcon.style.transform = 'rotate(0deg)';
                
                if (button.textContent.includes('especificaciones')) {
                    button.firstChild.textContent = 'Ocultar especificaciones';
                } else {
                    button.firstChild.textContent = 'Ocultar descripción';
                }
            } else {
                contentDiv.style.maxHeight = '500px';
                contentDiv.style.overflow = 'hidden';
                if (gradientDiv) gradientDiv.style.display = 'block';
                if (svgIcon) svgIcon.style.transform = 'rotate(180deg)';
                
                if (button.textContent.includes('Ocultar especificaciones')) {
                    button.firstChild.textContent = 'Ver todas las especificaciones';
                } else {
                    button.firstChild.textContent = 'Ver descripción completa';
                }
            }
        });
    });
    
    // "Información del fabricante" accordion
    document.querySelectorAll('.sc-f1ea2f89-1').forEach(header => {
        const container = header.closest('.sc-f1ea2f89-0');
        if (!container) return;
        
        const contentDiv = container.querySelector('.sc-f1ea2f89-3');
        const svgIcon = header.querySelector('svg');
        let isExpanded = false;
        
        header.style.cursor = 'pointer';
        
        header.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                contentDiv.style.maxHeight = '500px';
                contentDiv.style.padding = '16px';
                contentDiv.style.overflow = 'visible';
                if (svgIcon) svgIcon.style.transform = 'rotate(0deg)';
            } else {
                contentDiv.style.maxHeight = '0px';
                contentDiv.style.padding = '0';
                contentDiv.style.overflow = 'hidden';
                if (svgIcon) svgIcon.style.transform = 'rotate(180deg)';
            }
        });
    });
});
