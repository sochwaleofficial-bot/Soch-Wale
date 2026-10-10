import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Building,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    checkoutProduct,
    setCheckoutProduct,
    siteSettings,
    currentUser,
    setAuthModalOpen,
    processPurchase,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'stripe' | 'bank'>('whatsapp');
  const [processing, setProcessing] = useState(false);
  const [completedSuccess, setCompletedSuccess] = useState(false);

  if (!checkoutProduct) return null;

  // Dynamic WhatsApp prefilled link
  const prefilledMessage = encodeURIComponent(
    `Hello Soch Wale, I would like information about purchasing ${checkoutProduct.title} (PKR ${checkoutProduct.pricePkr}).`
  );
  const whatsAppDirectUrl = `https://wa.me/923032226181?text=${prefilledMessage}`;

  const handleSimulateStripe = async () => {
    if (!currentUser) {
      setAuthModalOpen('login');
      return;
    }

    setProcessing(true);
    const success = await processPurchase(
      {
        id: checkoutProduct.id,
        type: checkoutProduct.type,
        title: checkoutProduct.title,
        pricePkr: checkoutProduct.pricePkr,
      },
      'Stripe',
      `STRIPE-TEST-${Date.now().toString().slice(-5)}`
    );
    setProcessing(false);
    if (success) {
      setCompletedSuccess(true);
    }
  };

  const handleDirectWhatsAppClick = () => {
    // Open WhatsApp in new tab
    window.open(whatsAppDirectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#181818] border border-stone-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setCheckoutProduct(null);
            setCompletedSuccess(false);
          }}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-stone-800 bg-[#141414]">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B89A5A] mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Educational Enrollment</span>
          </div>
          <h3 className="text-lg font-serif font-bold text-white">
            {checkoutProduct.title}
          </h3>
          <p className="font-urdu text-sm text-[#B89A5A] mt-1 text-right">
            {checkoutProduct.titleUr}
          </p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-white font-mono">
              PKR {checkoutProduct.pricePkr.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400">· One-time access</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {completedSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold text-white">
                Payment Successful & Access Granted!
              </h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                You now have full access to {checkoutProduct.title}. A receipt has been added to your dashboard purchase history.
              </p>
              <button
                onClick={() => {
                  setCheckoutProduct(null);
                  setCompletedSuccess(false);
                }}
                className="px-6 py-2.5 bg-[#B89A5A] hover:bg-[#967B43] text-black font-semibold text-xs rounded transition-colors"
              >
                Start Learning Now
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#121212] rounded-xl border border-stone-800">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    paymentMethod === 'whatsapp'
                      ? 'bg-[#B89A5A] text-[#0A0A0A] shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-900" />
                  <span>WhatsApp Assist</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    paymentMethod === 'stripe'
                      ? 'bg-[#B89A5A] text-[#0A0A0A] shadow'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card / Stripe</span>
                </button>
              </div>

              {paymentMethod === 'whatsapp' ? (
                <div className="space-y-4">
                  <div className="p-4 bg-[#141414] border border-stone-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                      <MessageCircle className="w-4 h-4" />
                      <span>Direct WhatsApp Purchasing Channel</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      Connect directly with Soch Wale official helpline at{' '}
                      <strong className="text-white">+92 303 2226181</strong>.
                      Our team will assist you with immediate activation via JazzCash, EasyPaisa, or Online Bank Transfer.
                    </p>
                    <div className="pt-2 text-[11px] text-stone-400 font-urdu leading-loose text-right">
                      ہمارے آفیشل واٹس ایپ پر رابطہ کیجیے اور جاز کیش یا ایزی پیسہ کے ذریعے باآسانی کورس یا کتابچہ حاصل کریں۔
                    </div>
                  </div>

                  <a
                    href={whatsAppDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDirectWhatsAppClick}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Purchase via WhatsApp (+92 303 2226181)</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#141414] border border-stone-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span>Gateway Mode</span>
                      <span className="text-[#B89A5A] font-semibold uppercase">
                        {siteSettings.stripeConfig.mode} Mode
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[11px] text-stone-400 uppercase font-semibold">
                        Card Information (Simulation)
                      </label>
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full bg-[#0A0A0A] border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 font-mono"
                        readOnly
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          defaultValue="12/28"
                          className="w-full bg-[#0A0A0A] border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 font-mono"
                          readOnly
                        />
                        <input
                          type="text"
                          defaultValue="CVC: 992"
                          className="w-full bg-[#0A0A0A] border border-stone-700 rounded px-3 py-2 text-xs text-stone-200 font-mono"
                          readOnly
                        />
                      </div>
                    </div>

                    <p className="text-[10px] text-stone-500">
                      Stripe integration architecture configured. Real transactions require verified business registration and secret key setup in admin settings.
                    </p>
                  </div>

                  <button
                    onClick={handleSimulateStripe}
                    disabled={processing}
                    className="w-full py-3.5 bg-[#B89A5A] hover:bg-[#967B43] text-[#0A0A0A] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {processing
                        ? 'Verifying Transaction...'
                        : `Pay PKR ${checkoutProduct.pricePkr.toLocaleString()}`}
                    </span>
                  </button>
                </div>
              )}

              <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                <span>SSL Encrypted Checkout · 100% Privacy Protected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
