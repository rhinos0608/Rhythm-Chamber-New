import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Heart, MessageCircle, TrendingUp, Music, Settings, Zap, Star, Share2, Download } from 'lucide-react';

const MusicAnalyticsApp = () => {
  const [user, setUser] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMode, setChatMode] = useState('general');
  const [listeningData, setListeningData] = useState({
    totalPlays: 47,
    topArtist: 'Radiohead',
    topTrack: 'Paranoid Android',
    skipRate: 23,
    currentStreak: 5
  });
  const [credits, setCredits] = useState(3);
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Mock current track
  useEffect(() => {
    setCurrentTrack({
      name: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      isPlaying: true,
      progress: 45,
      duration: 354
    });
  }, []);

  // Mock chat responses based on mode
  const getChatResponse = (message, mode) => {
    const responses = {
      general: [
        "That's an interesting track choice! I notice you've been gravitating toward classic rock lately.",
        "Your skip rate on this artist is only 12% - they're clearly resonating with you right now.",
        "Based on your recent listening, I'd say you're in a nostalgic, emotional phase. The acoustic elements seem to draw you in."
      ],
      curator: [
        "📊 You've played 3 Queen songs in the last week, with 'Bohemian Rhapsody' being your most repeated at 5 plays.",
        "Your listening pattern shows 67% classic rock this week, up 23% from last month.",
        "Peak listening time: 8-10 PM, mostly emotional/dynamic tracks with high vocal complexity."
      ],
      enthusiast: [
        "This song hits different when you're feeling introspective, doesn't it? The way Mercury builds that emotional arc...",
        "I can tell this connects to something deeper - your music choices lately suggest you're processing some big feelings.",
        "The orchestral section at 2:45 - that's where you never skip. It's like your emotional reset button."
      ],
      explorer: [
        "If you love Queen's theatrical style, you might vibe with Muse's 'Bohemian Rhapsody'-inspired tracks.",
        "Have you tried King Crimson? Similar prog-rock complexity but with a darker edge that fits your night listening patterns.",
        "Based on your Queen obsession, here's a deep cut: 'The March of the Black Queen' - it's like Bohemian Rhapsody's eccentric cousin."
      ],
      reflector: [
        "Your music choices are telling a story about where you are right now. Queen represents your desire for grandiosity amidst uncertainty.",
        "Notice how your skip rate drops when songs have strong narrative structure? You're seeking meaning in music right now.",
        "Your listening patterns suggest you're in a phase of wanting to feel both understood and elevated. Music as emotional architecture."
      ]
    };
    return responses[mode][Math.floor(Math.random() * responses[mode].length)];
  };

  const handleAuth = (method) => {
    setUser({
      name: 'Alex',
      email: 'alex@example.com',
      spotifyConnected: true,
      joinedDate: new Date().toISOString()
    });
    setShowOnboarding(false);
    // Add welcome message
    setChatMessages([{
      id: 1,
      type: 'ai',
      content: "Hey Alex! 👋 I've synced with your Spotify and already found some interesting patterns. You've played 'Bohemian Rhapsody' 5 times today - want to know why I think that is?",
      timestamp: new Date()
    }]);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getChatResponse(chatInput, chatMode),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setChatInput('');
  };

  const handleSkip = () => {
    setListeningData(prev => ({
      ...prev,
      skipRate: prev.skipRate + 1
    }));
  };

  const handleLike = () => {
    setListeningData(prev => ({
      ...prev,
      currentStreak: prev.currentStreak + 1
    }));
  };

  const generateDeepDive = () => {
    if (credits <= 0) {
      alert('You need credits to generate a deep-dive report. Purchase more credits or upgrade to Pro!');
      return;
    }
    setCredits(prev => prev - 1);
    alert('🎵 Deep-dive report generated! "Your Musical DNA: A 7-day emotional journey through sound" - Check your downloads.');
  };

  if (showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <Music className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Rhythm Chamber</h1>
            <p className="text-white/70">Let's talk about your music</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={() => handleAuth('spotify')}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Music className="w-5 h-5" />
              <span>Connect Spotify</span>
            </button>
            
            <button 
              onClick={() => handleAuth('apple')}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <Music className="w-5 h-5" />
              <span>Connect Apple Music</span>
            </button>
            
            <button 
              onClick={() => handleAuth('email')}
              className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              Continue with Email
            </button>
            
            <button 
              onClick={() => handleAuth('anonymous')}
              className="w-full text-white/70 hover:text-white py-2 transition-colors"
            >
              Try Anonymous Session
            </button>
          </div>

          <div className="mt-6 text-xs text-white/50 text-center">
            <p>✨ No historical import required - we start learning now</p>
            <p>🔒 Your data stays yours, we just help you understand it</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Rhythm Chamber</h1>
              <p className="text-sm text-white/60">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-white text-sm">{credits} credits</span>
            </div>
            <Settings className="w-6 h-6 text-white/60 hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Now Playing */}
        {currentTrack && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{currentTrack.name}</h3>
                  <p className="text-white/70">{currentTrack.artist}</p>
                  <p className="text-sm text-white/50">{currentTrack.album}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleSkip}
                  className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors"
                >
                  <SkipForward className="w-5 h-5 text-red-400" />
                </button>
                <button 
                  onClick={handleLike}
                  className="p-3 bg-pink-500/20 hover:bg-pink-500/30 rounded-full transition-colors"
                >
                  <Heart className="w-5 h-5 text-pink-400" />
                </button>
                <button className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                  {currentTrack.isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{width: `${(currentTrack.progress / currentTrack.duration) * 100}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>{Math.floor(currentTrack.progress / 60)}:{(currentTrack.progress % 60).toString().padStart(2, '0')}</span>
                <span>{Math.floor(currentTrack.duration / 60)}:{(currentTrack.duration % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white/10 backdrop-blur-lg rounded-2xl p-2">
          {[
            { id: 'chat', label: 'Chat', icon: MessageCircle },
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'insights', label: 'Deep Dives', icon: Star }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white text-purple-900 font-semibold' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 h-96 flex flex-col">
                {/* Chat Mode Selector */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex space-x-2 overflow-x-auto">
                    {[
                      { id: 'general', label: 'General', color: 'bg-blue-500' },
                      { id: 'curator', label: 'Curator', color: 'bg-green-500' },
                      { id: 'enthusiast', label: 'Enthusiast', color: 'bg-pink-500' },
                      { id: 'explorer', label: 'Explorer', color: 'bg-purple-500' },
                      { id: 'reflector', label: 'Reflector', color: 'bg-orange-500' }
                    ].map(mode => (
                      <button
                        key={mode.id}
                        onClick={() => setChatMode(mode.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          chatMode === mode.id 
                            ? `${mode.color} text-white` 
                            : 'bg-white/20 text-white/70 hover:bg-white/30'
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatMessages.map(message => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-white/20 text-white'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                      placeholder="Ask me anything about your music..."
                      className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                    />
                    <button 
                      onClick={handleChatSend}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Sidebar */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-3">Today's Vibe</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Plays</span>
                    <span className="text-white">{listeningData.totalPlays}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Skip Rate</span>
                    <span className="text-white">{listeningData.skipRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Streak</span>
                    <span className="text-white">{listeningData.currentStreak} songs</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-2 px-3 rounded-lg text-sm transition-colors">
                    "Why this song?"
                  </button>
                  <button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 px-3 rounded-lg text-sm transition-colors">
                    "First insight"
                  </button>
                  <button className="w-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 py-2 px-3 rounded-lg text-sm transition-colors">
                    "Surprise me"
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Top Artist
              </h3>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Music className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">{listeningData.topArtist}</h4>
                <p className="text-white/70">47 plays this week</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Top Track</h3>
              <div>
                <h4 className="text-lg font-bold text-white">{listeningData.topTrack}</h4>
                <p className="text-white/70">Radiohead</p>
                <div className="mt-3 w-full bg-white/20 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-sm text-white/50 mt-1">15 plays</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Listening Pattern</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Alternative Rock</span>
                    <span className="text-white">67%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Classic Rock</span>
                    <span className="text-white">23%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-1/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/70">Indie</span>
                    <span className="text-white">10%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-pink-500 h-2 rounded-full w-1/12"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 md:col-span-2">
              <h3 className="text-white font-semibold mb-4">Vibe Evolution</h3>
              <div className="h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <p className="text-white/50">Chart visualization would go here</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-white font-semibold mb-4">Mood Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['Nostalgic', 'Energetic', 'Melancholic', 'Uplifting', 'Introspective'].map(mood => (
                  <span key={mood} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {mood}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Deep-Dive Reports</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-white/70">Credits: {credits}</span>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Buy More
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Weekly Emotional Journey</h3>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">1 Credit</span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">Deep analysis of your emotional patterns through music over the past week.</p>
                  <button 
                    onClick={generateDeepDive}
                    className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-2 rounded-lg transition-colors"
                  >
                    Generate Report
                  </button>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Vibe Profile Analysis</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">1 Credit</span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">Discover your unique musical DNA and what it says about your personality.</p>
                  <button 
                    onClick={generateDeepDive}
                    className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-2 rounded-lg transition-colors"
                  >
                    Generate Report
                  </button>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Curated Discovery Playlist</h3>
                    <span className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded">2 Credits</span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">AI-curated 20-song playlist based on your current emotional trajectory.</p>
                  <button 
                    onClick={generateDeepDive}
                    className="w-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 py-2 rounded-lg transition-colors"
                  >
                    Generate Playlist
                  </button>
                </div>

                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white">Relationship Music Map</h3>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">1 Credit</span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">How your music choices reflect and influence your relationships.</p>
                  <button 
                    onClick={generateDeepDive}
                    className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 rounded-lg transition-colors"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Subscription Upsell */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-xl font-bold text-white mb-2">Upgrade to Pro</h3>
              <p className="text-white/70 mb-4">Get unlimited insights, trend forecasts, and exclusive features.</p>
              <div className="flex items-center space-x-4">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Pro - $5/month
                </button>
                <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Elite - $10/month
                </button>
              </div>
            </div>

            {/* Social Sharing */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Share Your Vibe
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share First Insight</span>
                </button>
                <button className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicAnalyticsApp;