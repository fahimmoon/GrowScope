import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Clock, Percent, TrendingUp, Bird, Github, Instagram, MessageCircle, X, CheckCircle, Shield, Repeat, Zap, Briefcase, Linkedin } from 'lucide-react';

interface DailyResult {
  day: number;
  amount: number;
  percentage: number;
  dailyReturn: number;
}

function calculateDailyResults(principal: number, days: number): DailyResult[] {
  const results: DailyResult[] = [];
  let currentAmount = principal;
  const DAILY_PERCENTAGE = 1; // Fixed 1% rate

  for (let day = 1; day <= days; day++) {
    // Apply 1% twice daily
    const dailyReturn = (currentAmount * (DAILY_PERCENTAGE / 100)) * 2;
    currentAmount += dailyReturn;

    results.push({
      day,
      amount: currentAmount,
      percentage: DAILY_PERCENTAGE,
      dailyReturn
    });
  }

  return results;
}

function App() {
  const [principal, setPrincipal] = useState<number>(0);
  const [days, setDays] = useState<number>(30);
  const [dailyResults, setDailyResults] = useState<DailyResult[]>([]);
  const [showAllDays, setShowAllDays] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(true);

  useEffect(() => {
    const results = calculateDailyResults(principal, days);
    setDailyResults(results);
  }, [principal, days]);

  const finalResult = dailyResults[dailyResults.length - 1];
  const displayDays = showAllDays ? dailyResults : dailyResults.slice(-5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 relative">
      {/* Dollar Exchange Popup Modal */}
      {showModal && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-[2px] animate-fadeIn"
            onClick={() => setShowModal(false)}
          />
          
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm mx-auto animate-slideIn">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Header with animated gradient */}
              <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 p-4 relative overflow-hidden animate-gradient">
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-full p-2 shadow-lg animate-bounce">
                      <DollarSign className="text-green-600 w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Dollar Exchange</h3>
                  </div>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="text-white/80 hover:text-white transition-colors hover:rotate-90 transform duration-300"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-5 animate-fadeIn">
                {/* Fee Display with shimmer effect */}
                <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 border border-green-100 rounded-lg p-4 mb-4 relative overflow-hidden">
                  <div className="text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                        100-200 PKR
                      </span>
                      <span className="text-sm text-gray-600">per $100</span>
                    </div>
                    <p className="text-sm text-gray-600">Market-based rates</p>
                  </div>
                </div>
                
                {/* Benefits with animated icons */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <Shield className="w-5 h-5 text-blue-500 animate-pulse" />
                    <span className="text-gray-700">100% Safe transactions</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <Repeat className="w-5 h-5 text-green-500 animate-spin-slow" />
                    <span className="text-gray-700">Daily rate updates</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors">
                    <Zap className="w-5 h-5 text-yellow-500 animate-bounce" />
                    <span className="text-gray-700">Quick processing</span>
                  </div>
                </div>
                
                {/* Animated CTA Button */}
                <a 
                  href="https://wa.me/03262424598" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <MessageCircle size={18} className="animate-bounce" />
                  Contact for Exchange
                </a>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="relative p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Calculator className="w-8 h-8 text-white filter drop-shadow-lg" />
              <Bird className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 transform rotate-45 animate-pulse filter drop-shadow" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              GrowScope
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Principal Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Principal Amount ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Days Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Projection Days
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                    min="1"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Summary Card */}
              {finalResult && (
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white">
                  <h3 className="text-lg font-semibold mb-4">Final Results</h3>
                  <div className="space-y-2">
                    <p className="flex justify-between">
                      <span>Initial Investment:</span>
                      <span>${principal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Final Amount:</span>
                      <span>${finalResult.amount.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Total Profit:</span>
                      <span>${(finalResult.amount - principal).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Final Daily Return:</span>
                      <span>${finalResult.dailyReturn.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Daily Percentage:</span>
                      <span>{finalResult.percentage}% (applied twice)</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Daily Results Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Daily Breakdown</h3>
                <button
                  onClick={() => setShowAllDays(!showAllDays)}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  {showAllDays ? 'Show Less' : 'Show All Days'}
                </button>
              </div>
              <div className="overflow-auto max-h-[500px] rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">%</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayDays.map((result) => (
                      <tr key={result.day} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{result.day}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">${result.amount.toFixed(2)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{result.percentage}% (×2)</td>
                        <td className="px-4 py-2 text-sm text-gray-900">${result.dailyReturn.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h3 className="font-semibold text-gray-700">How it works</h3>
            </div>
            <p className="text-sm text-gray-600">
              A fixed 1% return is applied to your current amount twice each day. This means every day,
              you earn 2% total return (1% applied two times) on your growing balance. The returns are
              compounded daily, meaning each day's calculation is based on the previous day's total amount.
            </p>
          </div>

          {/* Developer Contact */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6">
              <a
                href="https://github.com/fahimmoon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                title="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/fahim-ahmad-589a81246"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://fahimmoon.github.io/portfolio-website-main/?fbclid=PAY2xjawI8-JdleHRuA2FlbQIxMQABpufj_CW1OTMd0MCkUvGxm_IhkpaV8-pXrZp7RfOVJnNrki5x7fpboo1yWA_aem_9wZPAD0Tx8SDcLHSvdgSig"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                title="Portfolio"
              >
                <Briefcase className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/03262424598" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-600 transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/fa_himahmad?igsh=em5ubXMzdXkzbWUw"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-600 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Crafted with care by <a href="#" className="text-indigo-600 hover:text-indigo-800">Fahim Ahmad</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;