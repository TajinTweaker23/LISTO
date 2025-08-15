// 🍽️ Lunch Ordering Dashboard JavaScript
// Completely separate from LISTO Medical App functionality

// Global configuration
const CONFIG = {
    sharePointSiteUrl: '', // To be configured during setup
    lists: {
        voting: 'LunchVoting',
        orders: 'LunchOrders', 
        sessions: 'LunchSessions',
        restaurants: 'RestaurantMaster'
    },
    refreshInterval: 30000, // 30 seconds
    currentSession: null,
    currentUser: null
};

// State management
let dashboardState = {
    currentSession: null,
    restaurants: [],
    orders: [],
    votingResults: [],
    isLoading: false
};

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setupEventListeners();
    startAutoRefresh();
});

// Initialize dashboard
async function initializeDashboard() {
    showLoading(true);
    try {
        await loadConfiguration();
        await refreshDashboard();
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        showToast('Failed to load dashboard. Please refresh the page.', 'error');
    } finally {
        showLoading(false);
    }
}

// Load configuration (in real implementation, this would come from SharePoint)
function loadConfiguration() {
    // Mock configuration - in real implementation, load from SharePoint list or web part properties
    CONFIG.sharePointSiteUrl = window.location.origin;
    return Promise.resolve();
}

// Setup event listeners
function setupEventListeners() {
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', refreshDashboard);
    
    // Form submissions
    document.getElementById('votingForm').addEventListener('submit', submitVote);
    document.getElementById('orderForm').addEventListener('submit', submitOrder);
    document.getElementById('newSessionForm').addEventListener('submit', createNewSession);
    
    // Modal close handlers
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
}

// Auto refresh dashboard
function startAutoRefresh() {
    setInterval(refreshDashboard, CONFIG.refreshInterval);
}

// Main refresh function
async function refreshDashboard() {
    try {
        // Load current session
        await loadCurrentSession();
        
        // Load restaurants
        await loadRestaurants();
        
        // Load orders
        await loadOrders();
        
        // Load voting results
        await loadVotingResults();
        
        // Update UI
        updateDashboardUI();
        
    } catch (error) {
        console.error('Error refreshing dashboard:', error);
        showToast('Error refreshing data', 'error');
    }
}

// Load current session (mock implementation)
async function loadCurrentSession() {
    // Mock data - in real implementation, query SharePoint Lists
    dashboardState.currentSession = {
        ID: 1,
        SessionDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        VotingDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        OrderDeadline: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
        SessionStatus: 'Voting',
        SelectedRestaurant: null,
        TotalOrders: 0,
        Coordinator: 'admin@company.com'
    };
}

// Load restaurants (mock implementation)
async function loadRestaurants() {
    // Mock data - in real implementation, query SharePoint Lists
    dashboardState.restaurants = [
        { ID: 1, RestaurantName: "Mario's Pizza Palace", Cuisine: "Italian", MenuUrl: "#", IsActive: true },
        { ID: 2, RestaurantName: "Taco Fiesta", Cuisine: "Mexican", MenuUrl: "#", IsActive: true },
        { ID: 3, RestaurantName: "Dragon Garden", Cuisine: "Chinese", MenuUrl: "#", IsActive: true }
    ];
}

// Load orders (mock implementation)
async function loadOrders() {
    // Mock data - in real implementation, query SharePoint Lists
    dashboardState.orders = [
        { ID: 1, UserName: "John Smith", RestaurantName: "Mario's Pizza Palace", MenuItems: "Margherita Pizza\nCaesar Salad", TotalCost: 21.98, OrderStatus: "Confirmed" },
        { ID: 2, UserName: "Sarah Johnson", RestaurantName: "Mario's Pizza Palace", MenuItems: "Pepperoni Pizza\nGarlic Bread", TotalCost: 19.98, OrderStatus: "Confirmed" }
    ];
}

// Load voting results (mock implementation)
async function loadVotingResults() {
    // Mock data - in real implementation, query SharePoint Lists
    dashboardState.votingResults = [
        { RestaurantName: "Mario's Pizza Palace", VoteCount: 5 },
        { RestaurantName: "Taco Fiesta", VoteCount: 3 },
        { RestaurantName: "Dragon Garden", VoteCount: 7 }
    ];
}

// Update dashboard UI
function updateDashboardUI() {
    updateStatusCards();
    updateActionButtons();
    updateOrdersList();
    updateStatistics();
    updateRestaurantOptions();
}

// Update status cards
function updateStatusCards() {
    const session = dashboardState.currentSession;
    
    if (!session) {
        document.getElementById('votingStatus').textContent = 'No active session';
        document.getElementById('orderStatus').textContent = 'No active session';
        document.getElementById('selectedRestaurant').textContent = 'No session';
        return;
    }
    
    // Voting status
    const now = new Date();
    const votingDeadline = new Date(session.VotingDeadline);
    const orderDeadline = new Date(session.OrderDeadline);
    
    if (session.SessionStatus === 'Voting') {
        document.getElementById('votingStatus').textContent = 'Voting Open';
        document.getElementById('votingDeadline').textContent = `Closes: ${formatDateTime(votingDeadline)}`;
    } else {
        document.getElementById('votingStatus').textContent = 'Voting Closed';
        document.getElementById('votingDeadline').textContent = '';
    }
    
    // Order status
    if (session.SessionStatus === 'OrderCollection') {
        document.getElementById('orderStatus').textContent = 'Orders Open';
        document.getElementById('orderDeadline').textContent = `Closes: ${formatDateTime(orderDeadline)}`;
    } else if (session.SessionStatus === 'Voting') {
        document.getElementById('orderStatus').textContent = 'Awaiting Restaurant Selection';
        document.getElementById('orderDeadline').textContent = '';
    } else {
        document.getElementById('orderStatus').textContent = 'Orders Closed';
        document.getElementById('orderDeadline').textContent = '';
    }
    
    // Selected restaurant
    if (session.SelectedRestaurant) {
        document.getElementById('selectedRestaurant').textContent = session.SelectedRestaurant;
        document.getElementById('totalOrders').textContent = `${session.TotalOrders} orders placed`;
    } else {
        document.getElementById('selectedRestaurant').textContent = 'Not selected yet';
        document.getElementById('totalOrders').textContent = '';
    }
}

// Update action buttons
function updateActionButtons() {
    const session = dashboardState.currentSession;
    const voteBtn = document.getElementById('voteBtn');
    const orderBtn = document.getElementById('orderBtn');
    
    if (!session) {
        voteBtn.disabled = true;
        orderBtn.disabled = true;
        return;
    }
    
    // Vote button
    voteBtn.disabled = session.SessionStatus !== 'Voting';
    
    // Order button
    orderBtn.disabled = session.SessionStatus !== 'OrderCollection';
    
    // Show/hide restaurant voting section
    const votingSection = document.getElementById('restaurantVoting');
    if (session.SessionStatus === 'Voting') {
        votingSection.style.display = 'block';
    } else {
        votingSection.style.display = 'none';
    }
}

// Update orders list
function updateOrdersList() {
    const ordersList = document.getElementById('ordersList');
    const orders = dashboardState.orders;
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="loading">No orders yet</div>';
        return;
    }
    
    const ordersHtml = orders.map(order => `
        <div class="order-item">
            <div class="order-info">
                <h4>${escapeHtml(order.UserName)}</h4>
                <div class="order-details">${escapeHtml(order.MenuItems).replace(/\n/g, ' • ')}</div>
            </div>
            <div class="order-cost">$${order.TotalCost.toFixed(2)}</div>
        </div>
    `).join('');
    
    ordersList.innerHTML = ordersHtml;
}

// Update statistics
function updateStatistics() {
    const session = dashboardState.currentSession;
    const orders = dashboardState.orders;
    const voting = dashboardState.votingResults;
    
    // Total participants (unique users who voted or ordered)
    const participants = new Set();
    orders.forEach(order => participants.add(order.UserName));
    document.getElementById('totalParticipants').textContent = participants.size;
    
    // Total votes
    const totalVotes = voting.reduce((sum, result) => sum + result.VoteCount, 0);
    document.getElementById('totalVotes').textContent = totalVotes;
    
    // Total orders
    document.getElementById('totalOrderCount').textContent = orders.length;
    
    // Estimated total cost
    const totalCost = orders.reduce((sum, order) => sum + order.TotalCost, 0);
    document.getElementById('estimatedTotal').textContent = `$${totalCost.toFixed(2)}`;
}

// Update restaurant options
function updateRestaurantOptions() {
    const restaurantOptions = document.getElementById('restaurantOptions');
    const restaurants = dashboardState.restaurants.filter(r => r.IsActive);
    
    const optionsHtml = restaurants.map(restaurant => `
        <div class="restaurant-option" onclick="selectRestaurant(${restaurant.ID})">
            <h4>${escapeHtml(restaurant.RestaurantName)}</h4>
            <p>${escapeHtml(restaurant.Cuisine)} Cuisine</p>
            ${restaurant.MenuUrl !== '#' ? `<a href="${restaurant.MenuUrl}" target="_blank">View Menu</a>` : ''}
        </div>
    `).join('');
    
    restaurantOptions.innerHTML = optionsHtml;
    
    // Update modal choices
    updateRestaurantChoices();
}

// Update restaurant choices in voting modal
function updateRestaurantChoices() {
    const restaurantChoices = document.getElementById('restaurantChoices');
    const restaurants = dashboardState.restaurants.filter(r => r.IsActive);
    
    const choicesHtml = restaurants.map(restaurant => `
        <label class="choice-option">
            <input type="radio" name="restaurant" value="${restaurant.ID}" required>
            <span>
                <strong>${escapeHtml(restaurant.RestaurantName)}</strong> - ${escapeHtml(restaurant.Cuisine)}
            </span>
        </label>
    `).join('');
    
    restaurantChoices.innerHTML = choicesHtml;
}

// Modal functions
function openVotingModal() {
    document.getElementById('votingModal').style.display = 'block';
}

function closeVotingModal() {
    document.getElementById('votingModal').style.display = 'none';
}

function openOrderModal() {
    const session = dashboardState.currentSession;
    if (session && session.SelectedRestaurant) {
        document.getElementById('orderRestaurant').value = session.SelectedRestaurant;
    }
    document.getElementById('orderModal').style.display = 'block';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
    loadAdminData();
}

function closeAdminModal() {
    document.getElementById('adminModal').style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Tab handling
function openTab(evt, tabName) {
    // Hide all tab contents
    const tabContents = document.getElementsByClassName('tab-content');
    for (let content of tabContents) {
        content.classList.remove('active');
    }
    
    // Remove active class from all tab buttons
    const tabBtns = document.getElementsByClassName('tab-btn');
    for (let btn of tabBtns) {
        btn.classList.remove('active');
    }
    
    // Show selected tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Form submissions
async function submitVote(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        showLoading(true);
        
        // Mock submission - in real implementation, create SharePoint list item
        const voteData = {
            RestaurantID: formData.get('restaurant'),
            VoterName: formData.get('voterName') || 'Anonymous',
            VotingDate: new Date().toISOString(),
            SessionID: dashboardState.currentSession?.ID
        };
        
        console.log('Submitting vote:', voteData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showToast('Vote submitted successfully!', 'success');
        closeVotingModal();
        form.reset();
        
        // Refresh data
        await refreshDashboard();
        
    } catch (error) {
        console.error('Error submitting vote:', error);
        showToast('Failed to submit vote. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

async function submitOrder(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        showLoading(true);
        
        // Mock submission - in real implementation, create SharePoint list item
        const orderData = {
            UserName: formData.get('customerName'),
            UserEmail: formData.get('customerEmail'),
            RestaurantName: formData.get('orderRestaurant'),
            MenuItems: formData.get('menuItems'),
            TotalCost: parseFloat(formData.get('totalCost')) || 0,
            SpecialInstructions: formData.get('specialInstructions'),
            OrderDate: new Date().toISOString(),
            OrderStatus: 'Pending',
            SessionID: dashboardState.currentSession?.ID
        };
        
        console.log('Submitting order:', orderData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showToast('Order submitted successfully!', 'success');
        closeOrderModal();
        form.reset();
        
        // Refresh data
        await refreshDashboard();
        
    } catch (error) {
        console.error('Error submitting order:', error);
        showToast('Failed to submit order. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

async function createNewSession(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    try {
        showLoading(true);
        
        // Mock submission - in real implementation, create SharePoint list item
        const sessionData = {
            SessionDate: formData.get('sessionDate'),
            VotingDeadline: formData.get('votingDeadline'),
            OrderDeadline: formData.get('orderDeadline'),
            Coordinator: formData.get('coordinator'),
            SessionStatus: 'Planning',
            TotalParticipants: 0,
            TotalOrders: 0
        };
        
        console.log('Creating new session:', sessionData);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showToast('New session created successfully!', 'success');
        form.reset();
        
        // Refresh data
        await refreshDashboard();
        
    } catch (error) {
        console.error('Error creating session:', error);
        showToast('Failed to create session. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

// Admin functions
function loadAdminData() {
    // Set default dates for new session
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12, 0, 0, 0);
    
    const votingDeadline = new Date(tomorrow);
    votingDeadline.setHours(10, 0, 0, 0);
    
    const orderDeadline = new Date(tomorrow);
    orderDeadline.setHours(11, 30, 0, 0);
    
    document.getElementById('sessionDate').value = formatDateTimeLocal(tomorrow);
    document.getElementById('votingDeadlineInput').value = formatDateTimeLocal(votingDeadline);
    document.getElementById('orderDeadlineInput').value = formatDateTimeLocal(orderDeadline);
}

function generateOrderSummary() {
    const orders = dashboardState.orders;
    const session = dashboardState.currentSession;
    
    if (!session || orders.length === 0) {
        showToast('No orders to summarize', 'warning');
        return;
    }
    
    let summary = `<h4>Order Summary for ${session.SelectedRestaurant}</h4>`;
    summary += `<p><strong>Session Date:</strong> ${formatDateTime(new Date(session.SessionDate))}</p>`;
    summary += `<p><strong>Total Orders:</strong> ${orders.length}</p>`;
    summary += `<hr><h5>Individual Orders:</h5><ul>`;
    
    orders.forEach(order => {
        summary += `<li><strong>${escapeHtml(order.UserName)}</strong>: ${escapeHtml(order.MenuItems).replace(/\n/g, ', ')} - $${order.TotalCost.toFixed(2)}</li>`;
    });
    
    const totalCost = orders.reduce((sum, order) => sum + order.TotalCost, 0);
    summary += `</ul><hr><p><strong>Estimated Total: $${totalCost.toFixed(2)}</strong></p>`;
    
    document.getElementById('orderSummary').innerHTML = summary;
}

function exportOrders() {
    const orders = dashboardState.orders;
    
    if (orders.length === 0) {
        showToast('No orders to export', 'warning');
        return;
    }
    
    // Create CSV content
    let csv = 'Name,Email,Restaurant,Items,Cost,Special Instructions,Status\n';
    orders.forEach(order => {
        csv += `"${order.UserName}","${order.UserEmail || ''}","${order.RestaurantName}","${order.MenuItems.replace(/"/g, '""')}","${order.TotalCost}","${order.SpecialInstructions || ''}","${order.OrderStatus}"\n`;
    });
    
    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lunch-orders-${formatDate(new Date())}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showToast('Orders exported successfully!', 'success');
}

function closeOrdering() {
    if (confirm('Are you sure you want to close order collection? This action cannot be undone.')) {
        // In real implementation, update SharePoint list item
        showToast('Order collection closed', 'info');
    }
}

// Utility functions
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = getToastIcon(type);
    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${escapeHtml(message)}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 5000);
}

function getToastIcon(type) {
    switch (type) {
        case 'success': return 'fas fa-check-circle';
        case 'error': return 'fas fa-exclamation-circle';
        case 'warning': return 'fas fa-exclamation-triangle';
        default: return 'fas fa-info-circle';
    }
}

function showLoading(show) {
    // In real implementation, show/hide loading spinner
    console.log('Loading:', show);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDateTime(date) {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }).format(new Date(date));
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).format(new Date(date));
}

function formatDateTimeLocal(date) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
}

function selectRestaurant(restaurantId) {
    // Remove previous selections
    document.querySelectorAll('.restaurant-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selection to clicked restaurant
    event.target.closest('.restaurant-option').classList.add('selected');
    
    // Auto-select in voting modal
    const radio = document.querySelector(`input[value="${restaurantId}"]`);
    if (radio) {
        radio.checked = true;
    }
}

// Export for SharePoint integration
window.LunchOrderingDashboard = {
    config: CONFIG,
    state: dashboardState,
    refresh: refreshDashboard,
    showToast: showToast
};