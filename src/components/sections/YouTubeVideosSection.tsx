import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ParallaxSection } from '../sections/ParallaxSection';
import { Search, RefreshCw, Play, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  category: string;
}

const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const VIDEOS_PER_PAGE = 6;

const categories = [
  'All',
  'Cybersecurity',
  'Compliance',
  'Risk Management',
  'Industry Insights',
  'Tutorials'
];

export const YouTubeVideosSection: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<YouTubeVideo[]>([]);
  const [displayedVideos, setDisplayedVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [retryCount, setRetryCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const previewTimeout = useRef<number | null>(null);

  const getCachedVideos = useCallback(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    
    return data;
  }, []);

  const setCachedVideos = useCallback((data: YouTubeVideo[]) => {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  }, []);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cachedVideos = getCachedVideos();
      if (cachedVideos) {
        setVideos(cachedVideos);
        setFilteredVideos(cachedVideos);
        setDisplayedVideos(cachedVideos.slice(0, VIDEOS_PER_PAGE));
        setLoading(false);
        return;
      }
      
      const API_KEY = 'AIzaSyAlcnX7oOMRVap0Ui0V1mjUJ3x228LoK0w';
      const CHANNEL_ID = 'UCeYysUyMcse89abFeugbBHg';
      
      // First, get the channel's upload playlist ID
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
      );
      
      if (!channelResponse.ok) {
        throw new Error('Failed to fetch channel details');
      }
      
      const channelData = await channelResponse.json();
      const uploadPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;
      
      // Then, get the videos from the upload playlist
      const playlistResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadPlaylistId}&maxResults=50&key=${API_KEY}`
      );
      
      if (!playlistResponse.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const playlistData = await playlistResponse.json();
      
      // Get video details including statistics
      const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
      const videoDetailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
      );
      
      if (!videoDetailsResponse.ok) {
        throw new Error('Failed to fetch video details');
      }
      
      const videoDetailsData = await videoDetailsResponse.json();
      
      const videoItems = videoDetailsData.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        category: item.snippet.categoryId
      }));
      
      setVideos(videoItems);
      setFilteredVideos(videoItems);
      setDisplayedVideos(videoItems.slice(0, VIDEOS_PER_PAGE));
      setCachedVideos(videoItems);
    } catch (err) {
      setError('Failed to load videos. Please try again later.');
      console.error('Error fetching YouTube videos:', err);
    } finally {
      setLoading(false);
    }
  }, [getCachedVideos, setCachedVideos]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    let filtered = videos;
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(video => 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredVideos(filtered);
    setDisplayedVideos(filtered.slice(0, VIDEOS_PER_PAGE));
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, videos]);

  const loadMore = () => {
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    const startIndex = nextPage * VIDEOS_PER_PAGE;
    const newVideos = filteredVideos.slice(0, startIndex);
    
    setDisplayedVideos(newVideos);
    setCurrentPage(nextPage);
    setLoadingMore(false);
  };

  const handleVideoHover = (videoId: string) => {
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
    }
    
    previewTimeout.current = window.setTimeout(() => {
      setHoveredVideo(videoId);
    }, 500);
  };

  const handleVideoLeave = () => {
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
    }
    setHoveredVideo(null);
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    
    const hours = (match[1] || '').replace('H', '');
    const minutes = (match[2] || '').replace('M', '');
    const seconds = (match[3] || '').replace('S', '');
    
    if (hours) {
      return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const formatNumber = (num: string) => {
    const number = parseInt(num);
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    }
    if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number.toString();
  };

  return (
    <ParallaxSection className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Videos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest insights, tutorials, and industry updates on cybersecurity, compliance, and risk management.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E60028]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E60028] mb-4"></div>
            <p className="text-gray-600">Loading videos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <Button
              variant="primary"
              onClick={() => {
                setRetryCount(prev => prev + 1);
                fetchVideos();
              }}
              disabled={retryCount >= 3}
            >
              <RefreshCw className="mr-2" />
              {retryCount >= 3 ? 'Max retries reached' : 'Try Again'}
            </Button>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No videos found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    onMouseEnter={() => handleVideoHover(video.id)}
                    onMouseLeave={handleVideoLeave}
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      {hoveredVideo === video.id && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                        {formatDuration(video.duration)}
                      </div>
                      {!hoveredVideo && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-[#E60028] text-white p-4 rounded-full">
                            <Play className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatNumber(video.viewCount)} views</span>
                        <span>{formatNumber(video.likeCount)} likes</span>
                        <span>{new Date(video.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
            
            {displayedVideos.length < filteredVideos.length && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={loadMore}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More'
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </ParallaxSection>
  );
}; 