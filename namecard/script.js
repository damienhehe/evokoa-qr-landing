// Device detection
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        (window.innerWidth <= 768);
}

// Contact data
const contactData = {
    'dalton.vcf': {
        name: 'Dalton Prescott Ng',
        title: 'Chief Executive Officer',
        phone: '+6596796594',
        email: 'team@evokoa.com',
        company: 'Evokoa'
    },
    'dale.vcf': {
        name: 'Dale Everett Ng',
        title: 'Chief Marketing & Growth Officer',
        phone: '+6596351526',
        email: 'team@evokoa.com',
        company: 'Evokoa'
    },
    'damien.vcf': {
        name: 'Damien Lim',
        title: 'Chief Technology Officer',
        phone: '+6598168533',
        email: 'team@evokoa.com',
        company: 'Evokoa'
    }
};

// Create modal HTML
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close" aria-label="Close">&times;</button>
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <p class="modal-subtitle"></p>
                </div>
                <div class="modal-body">
                    <div class="contact-detail">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="contact-label">Phone:</span>
                        <span class="contact-value phone-value"></span>
                        <button class="copy-btn" data-copy-type="phone">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Copy
                        </button>
                    </div>
                    <div class="contact-detail">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="contact-label">Email:</span>
                        <span class="contact-value email-value"></span>
                        <button class="copy-btn" data-copy-type="email">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Copy
                        </button>
                    </div>
                    <div class="contact-detail">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="contact-label">Company:</span>
                        <span class="contact-value company-value"></span>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="#" class="modal-download-btn" download>
                        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Download vCard
                    </a>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close button handler
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Copy button handlers
    modal.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', handleCopy);
    });
}

// Show modal with contact info
function showContactModal(vcfFile) {
    const contact = contactData[vcfFile];
    if (!contact) return;

    let modal = document.getElementById('contact-modal');
    if (!modal) {
        createModal();
        modal = document.getElementById('contact-modal');
    }

    // Populate modal
    modal.querySelector('.modal-title').textContent = contact.name;
    modal.querySelector('.modal-subtitle').textContent = contact.title;
    modal.querySelector('.phone-value').textContent = contact.phone;
    modal.querySelector('.email-value').textContent = contact.email;
    modal.querySelector('.company-value').textContent = contact.company;
    
    // Set download link
    const downloadBtn = modal.querySelector('.modal-download-btn');
    downloadBtn.href = vcfFile;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Handle copy to clipboard
async function handleCopy(e) {
    const btn = e.currentTarget;
    const copyType = btn.dataset.copyType;
    const modal = document.getElementById('contact-modal');
    
    let textToCopy;
    if (copyType === 'phone') {
        textToCopy = modal.querySelector('.phone-value').textContent;
    } else if (copyType === 'email') {
        textToCopy = modal.querySelector('.email-value').textContent;
    }

    try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Visual feedback
        const originalText = btn.innerHTML;
        btn.innerHTML = `
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Copied!
        `;
        btn.classList.add('copied');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}

// Initialize contact buttons
function initContactButtons() {
    const contactButtons = document.querySelectorAll('a[href$=".vcf"]');
    
    contactButtons.forEach(button => {
        const vcfFile = button.getAttribute('href');
        
        if (isMobileDevice()) {
            // On mobile: remove download attribute to open in contact app
            button.removeAttribute('download');
        } else {
            // On desktop: show modal instead
            button.addEventListener('click', (e) => {
                e.preventDefault();
                showContactModal(vcfFile);
            });
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactButtons);
} else {
    initContactButtons();
}
