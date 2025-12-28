export interface PlatformConfig {
  name: string;
  maxLength: number;
  recommendedLength: number;
  style: string;
  systemPrompt: string;
  tones: string[];
  emojiLevel: 'none' | 'very-low' | 'low' | 'medium' | 'high' | 'very-high';
  tips: string;
  color: string;
}

export const PLATFORM_CONFIG: Record<string, PlatformConfig> = {
  youtube: {
    name: 'YouTube',
    maxLength: 500,
    recommendedLength: 150,
    style: 'conversational, helpful, detailed',
    systemPrompt: 'Generate YouTube comment replies that are friendly, detailed, and encourage further engagement. Include timestamps when relevant. Use emojis sparingly (1-2 per reply). Aim for 50-150 words. Be helpful and build community.',
    tones: ['helpful', 'casual', 'witty', 'engaging', 'supportive'],
    emojiLevel: 'low',
    tips: 'YouTube favors longer, more detailed responses. Ask follow-up questions to boost engagement.',
    color: '#FF0000',
  },
  
  instagram: {
    name: 'Instagram',
    maxLength: 150,
    recommendedLength: 50,
    style: 'casual, friendly, emoji-heavy',
    systemPrompt: 'Generate Instagram comment replies that are casual, authentic, and emoji-rich. Keep it short and punchy (20-50 words). Match influencer energy. Use 3-5 emojis. Be fun and personable.',
    tones: ['casual', 'witty', 'supportive', 'hype', 'relatable'],
    emojiLevel: 'high',
    tips: 'Instagram loves quick, fun responses with lots of emojis. Reply within first hour for best algorithm boost.',
    color: '#E1306C',
  },
  
  tiktok: {
    name: 'TikTok',
    maxLength: 100,
    recommendedLength: 30,
    style: 'trendy, playful, gen-z',
    systemPrompt: 'Generate TikTok comment replies using Gen Z language, current slang, and humor. Be playful, authentic, and trend-aware. Heavy emoji use (3-6 per reply). Keep it super short (10-30 words). Can be chaotic and fun.',
    tones: ['trendy', 'funny', 'relatable', 'unhinged', 'hype'],
    emojiLevel: 'very-high',
    tips: 'TikTok is fast-paced. Short, funny replies perform best. Use trending phrases and sounds.',
    color: '#000000',
  },
  
  twitter: {
    name: 'Twitter/X',
    maxLength: 280,
    recommendedLength: 150,
    style: 'punchy, clever, concise',
    systemPrompt: 'Generate Twitter/X replies that are concise, witty, and engaging. Must be under 280 characters. Can be spicy, thoughtful, or humorous depending on tone. Minimal emojis (0-2). Be clever and quotable.',
    tones: ['witty', 'insightful', 'spicy', 'helpful', 'casual'],
    emojiLevel: 'very-low',
    tips: 'Twitter rewards clever, quotable responses. Keep it punchy. Less is more.',
    color: '#1DA1F2',
  },
  
  linkedin: {
    name: 'LinkedIn',
    maxLength: 400,
    recommendedLength: 120,
    style: 'professional, insightful, conversational',
    systemPrompt: 'Generate professional LinkedIn replies that add value and encourage discussion. Be thoughtful and industry-relevant. Use 50-150 words. Minimal emojis (0-1). Build professional relationships.',
    tones: ['professional', 'insightful', 'thoughtful', 'collaborative', 'helpful'],
    emojiLevel: 'very-low',
    tips: 'LinkedIn values thoughtful, professional responses. Add insights, not just agreement.',
    color: '#0A66C2',
  },
  
  facebook: {
    name: 'Facebook',
    maxLength: 300,
    recommendedLength: 80,
    style: 'warm, community-focused, personal',
    systemPrompt: 'Generate friendly Facebook replies that build community. Be warm, conversational, and personal. Use 30-100 words. Moderate emoji use (1-3). Focus on connection and relationships.',
    tones: ['friendly', 'supportive', 'conversational', 'warm', 'helpful'],
    emojiLevel: 'medium',
    tips: 'Facebook is about community. Be warm and personable. Build relationships.',
    color: '#1877F2',
  },
  
  reddit: {
    name: 'Reddit',
    maxLength: 1000,
    recommendedLength: 200,
    style: 'informative, authentic, no-bs',
    systemPrompt: 'Generate Reddit replies that are authentic, informative, and conversational. Redditors hate corporate speak. Be real, add value, cite sources when possible. Use 50-200 words. Almost no emojis (max 1). Be helpful or funny, never salesy.',
    tones: ['helpful', 'informative', 'witty', 'honest', 'casual'],
    emojiLevel: 'none',
    tips: 'Reddit values authenticity and substance. No corporate speak. Add real value or humor.',
    color: '#FF4500',
  },
  
  discord: {
    name: 'Discord',
    maxLength: 2000,
    recommendedLength: 100,
    style: 'casual, friendly, community-oriented',
    systemPrompt: 'Generate Discord replies that are casual, friendly, and community-oriented. Can be more relaxed and conversational. Use emojis moderately (2-4). Keep it conversational and helpful.',
    tones: ['casual', 'friendly', 'helpful', 'supportive', 'witty'],
    emojiLevel: 'medium',
    tips: 'Discord is about community building. Be friendly and helpful.',
    color: '#5865F2',
  },
};

export const TONE_OPTIONS = [
  { value: 'helpful', label: 'Helpful/Detailed' },
  { value: 'casual', label: 'Casual/Friendly' },
  { value: 'witty', label: 'Witty/Humorous' },
  { value: 'professional', label: 'Professional' },
  { value: 'engaging', label: 'Engaging/Question-based' },
];

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    repliesPerMonth: 25,
    platforms: ['youtube', 'instagram', 'twitter'],
    tones: ['helpful', 'casual', 'professional'],
  },
  creator_pro: {
    name: 'Creator Pro',
    price: 29,
    repliesPerMonth: -1, // unlimited
    platforms: Object.keys(PLATFORM_CONFIG),
    tones: TONE_OPTIONS.map(t => t.value),
  },
  agency: {
    name: 'Agency',
    price: 99,
    repliesPerMonth: -1, // unlimited
    platforms: Object.keys(PLATFORM_CONFIG),
    tones: TONE_OPTIONS.map(t => t.value),
    teamSeats: 10,
  },
};
