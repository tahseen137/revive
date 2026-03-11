/**
 * Revive Payment Wall - Embeddable Widget
 * 
 * Blocks app access for users with failed payments until they update their payment method.
 * Adds 4-12% recovery lift beyond email dunning alone.
 * 
 * Installation:
 * 
 * <script src="https://revive-hq.com/revive-payment-wall.js"></script>
 * <script>
 *   RevivePaymentWall.init({
 *     accountId: 'your-stripe-connect-account-id',
 *     customerId: 'cus_xxx', // Current user's Stripe customer ID
 *     apiUrl: 'https://revive-hq.com' // Optional, defaults to production
 *   });
 * </script>
 * 
 * Features:
 * - Non-dismissible modal for failed payments
 * - Auto-detection of payment status
 * - Responsive design
 * - Customizable branding (Pro plan)
 * - Real-time status updates
 */

(function(window) {
  'use strict';

  const RevivePaymentWall = {
    config: {
      accountId: null,
      customerId: null,
      apiUrl: 'https://revive-hq.com',
      checkInterval: 60000, // Check every 60 seconds
      theme: 'light',
      brandColor: '#7c3aed', // violet-600
    },

    isInitialized: false,
    isShowing: false,
    checkTimer: null,

    /**
     * Initialize the payment wall
     */
    init: function(options) {
      if (this.isInitialized) {
        console.warn('[RevivePaymentWall] Already initialized');
        return;
      }

      // Merge config
      Object.assign(this.config, options);

      // Validate required params
      if (!this.config.accountId) {
        console.error('[RevivePaymentWall] accountId is required');
        return;
      }

      if (!this.config.customerId) {
        console.error('[RevivePaymentWall] customerId is required');
        return;
      }

      this.isInitialized = true;

      // Check payment status immediately
      this.checkPaymentStatus();

      // Set up periodic checks
      this.checkTimer = setInterval(() => {
        if (!this.isShowing) {
          this.checkPaymentStatus();
        }
      }, this.config.checkInterval);

      console.log('[RevivePaymentWall] Initialized');
    },

    /**
     * Check if user has failed payment
     */
    checkPaymentStatus: async function() {
      try {
        const url = `${this.config.apiUrl}/api/payment-status?customerId=${encodeURIComponent(this.config.customerId)}&accountId=${encodeURIComponent(this.config.accountId)}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.hasFailedPayment && !this.isShowing) {
          this.showWall(data.payment, data.updateUrl);
        } else if (!data.hasFailedPayment && this.isShowing) {
          this.hideWall();
        }
      } catch (error) {
        console.error('[RevivePaymentWall] Error checking payment status:', error);
      }
    },

    /**
     * Show the payment wall modal
     */
    showWall: function(payment, updateUrl) {
      if (this.isShowing) return;
      
      this.isShowing = true;

      // Create modal HTML
      const modalHTML = this.createModalHTML(payment, updateUrl);
      
      // Inject into DOM
      const container = document.createElement('div');
      container.id = 'revive-payment-wall';
      container.innerHTML = modalHTML;
      document.body.appendChild(container);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      console.log('[RevivePaymentWall] Payment wall displayed');
    },

    /**
     * Hide the payment wall
     */
    hideWall: function() {
      const container = document.getElementById('revive-payment-wall');
      if (container) {
        container.remove();
        document.body.style.overflow = '';
        this.isShowing = false;
        console.log('[RevivePaymentWall] Payment wall hidden');
      }
    },

    /**
     * Create modal HTML
     */
    createModalHTML: function(payment, updateUrl) {
      const amount = this.formatAmount(payment.amount, payment.currency);
      const message = this.getDeclineMessage(payment.failureCode);

      return `
        <style>
          #revive-payment-wall * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          
          #revive-payment-wall {
            position: fixed;
            inset: 0;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          }

          .revive-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(8px);
          }

          .revive-modal {
            position: fixed;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            overflow-y: auto;
          }

          .revive-modal-content {
            position: relative;
            background: white;
            border-radius: 1rem;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            max-width: 28rem;
            width: 100%;
            padding: 2rem;
            animation: revive-slide-in 0.3s ease-out;
          }

          @keyframes revive-slide-in {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .revive-icon {
            display: flex;
            justify-content: center;
            margin-bottom: 1.5rem;
          }

          .revive-icon-circle {
            background: #fee2e2;
            border-radius: 9999px;
            padding: 1rem;
          }

          .revive-icon-svg {
            width: 3rem;
            height: 3rem;
            color: #dc2626;
          }

          .revive-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
            text-align: center;
            margin-bottom: 0.75rem;
          }

          .revive-description {
            color: #6b7280;
            text-align: center;
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }

          .revive-details {
            background: #f9fafb;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
          }

          .revive-detail-row {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
          }

          .revive-detail-row:last-child {
            margin-bottom: 0;
          }

          .revive-detail-label {
            color: #6b7280;
          }

          .revive-detail-value {
            font-weight: 600;
            color: #111827;
          }

          .revive-status {
            color: #dc2626;
            text-transform: uppercase;
            font-weight: 600;
          }

          .revive-error-message {
            border-top: 1px solid #e5e7eb;
            padding-top: 0.75rem;
            margin-top: 0.75rem;
            font-size: 0.875rem;
            color: #6b7280;
            display: flex;
            align-items: start;
            gap: 0.5rem;
          }

          .revive-button {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            background: linear-gradient(to right, ${this.config.brandColor}, #6366f1);
            color: white;
            font-weight: 600;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            font-size: 1rem;
          }

          .revive-button:hover {
            transform: scale(1.02);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          }

          .revive-help {
            text-align: center;
            font-size: 0.75rem;
            color: #9ca3af;
            margin-top: 1rem;
          }

          .revive-help a {
            color: ${this.config.brandColor};
            text-decoration: none;
          }

          .revive-help a:hover {
            text-decoration: underline;
          }

          @media (max-width: 640px) {
            .revive-modal-content {
              padding: 1.5rem;
            }
            
            .revive-title {
              font-size: 1.25rem;
            }
          }
        </style>

        <div class="revive-backdrop"></div>
        <div class="revive-modal">
          <div class="revive-modal-content">
            <!-- Icon -->
            <div class="revive-icon">
              <div class="revive-icon-circle">
                <svg class="revive-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            <!-- Title -->
            <h2 class="revive-title">Payment Required</h2>

            <!-- Description -->
            <p class="revive-description">
              Your subscription payment has failed. Please update your payment method to continue using our service.
            </p>

            <!-- Payment Details -->
            <div class="revive-details">
              <div class="revive-detail-row">
                <span class="revive-detail-label">Amount Due:</span>
                <span class="revive-detail-value">${amount}</span>
              </div>
              <div class="revive-detail-row">
                <span class="revive-detail-label">Status:</span>
                <span class="revive-status">${payment.status}</span>
              </div>
              <div class="revive-error-message">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <span>${message}</span>
              </div>
            </div>

            <!-- CTA Button -->
            <a href="${updateUrl}" class="revive-button">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Update Payment Method
            </a>

            <!-- Help Text -->
            <p class="revive-help">
              Need help? Contact support or <a href="mailto:support@yourdomain.com">email us</a>
            </p>
          </div>
        </div>
      `;
    },

    /**
     * Format currency amount
     */
    formatAmount: function(amount, currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
      }).format(amount / 100);
    },

    /**
     * Get user-friendly decline message
     */
    getDeclineMessage: function(failureCode) {
      const messages = {
        'card_declined': 'Your card was declined by your bank.',
        'insufficient_funds': 'Your card has insufficient funds.',
        'expired_card': 'Your card has expired.',
        'incorrect_cvc': 'The CVC code was incorrect.',
        'processing_error': 'There was a processing error.',
        'authentication_required': 'Additional authentication is required.',
      };
      return messages[failureCode] || 'Your payment could not be processed.';
    },

    /**
     * Destroy the payment wall and clean up
     */
    destroy: function() {
      if (this.checkTimer) {
        clearInterval(this.checkTimer);
        this.checkTimer = null;
      }
      this.hideWall();
      this.isInitialized = false;
      console.log('[RevivePaymentWall] Destroyed');
    }
  };

  // Expose globally
  window.RevivePaymentWall = RevivePaymentWall;

})(window);
