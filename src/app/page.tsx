'use client'

import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiCalendar, FiMapPin, FiHeart, FiMessageCircle, FiRepeat, FiShare2, FiPlus, FiX, FiSearch, FiHome, FiBell, FiMail, FiBookmark, FiUser, FiMoreHorizontal } from 'react-icons/fi'
import { RiTwitterXFill } from 'react-icons/ri'

const Page = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [showHeader, setShowHeader] = useState(false)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())
  const [repostedPosts, setRepostedPosts] = useState<Set<number>>(new Set())
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<number | null>(null)
  const [newComment, setNewComment] = useState('')

  const trendingTopics = [
    {
      id: 1,
      category: "Technology · Trending",
      tag: "#TypeScript",
      posts: "125.5K",
    },
    {
      id: 2,
      category: "Trending in Web Dev",
      tag: "#NextJS",
      posts: "58.2K",
    },
    {
      id: 3,
      category: "Technology · Trending",
      tag: "#AI",
      posts: "294K",
    },
    {
      id: 4,
      category: "Business · Trending",
      tag: "#TechLayoffs",
      posts: "82.1K",
    },
    {
      id: 5,
      category: "Technology · Trending",
      tag: "#React",
      posts: "45.2K",
    },
    {
      id: 6,
      category: "Entertainment · Trending",
      tag: "#Gaming",
      posts: "155K",
    },
  ]

  const [comments, setComments] = useState<{[key: number]: Array<{id: number, user: string, text: string, timestamp: string}>}>({
    1: [
      { id: 1, user: "@techie", text: "Nice", timestamp: "1h" },
      { id: 2, user: "@devguru", text: "Let's be friends!", timestamp: "30m" }
    ],
    2: [
      { id: 1, user: "@typescript_fan", text: "Couldn't agree more!", timestamp: "2h" }
    ],
    3: [
      { id: 1, user: "@uidesigner", text: "Sometimes we just need to sit back and drink coffee!S", timestamp: "5h" },
      { id: 2, user: "@webdev", text: "I agree!", timestamp: "3h" }
    ]
  })

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mockUser = {
    banner: "https://picsum.photos/1500/500",
    avatar: "https://picsum.photos/200",
    name: "John Developer",
    handle: "@johndeveloper",
    bio: "Full-stack developer | Open source enthusiast | Coffee 4 life ☕",
    following: 542,
    followers: 1834,
    posts: 327,
    joinDate: "September 2021",
    location: "San Francisco, CA"
  }

  const mockPosts = [
    {
      id: 1,
      content: "Good things come to those who code. #CodingLife #Developer",
      timestamp: "2h",
      likes: 1200,
      reposts: 234,
      replies: 89,
      image: "https://picsum.photos/400/300"
    },
    {
      id: 2,
      content: "TypeScript is amazing for large-scale applications. The type safety and developer experience are unmatched! #TypeScript #WebDev",
      timestamp: "5h",
      likes: 2300,
      reposts: 456,
      replies: 123
    },
    {
      id: 3,
      content: "Life is about balance. You need to find the right balance between work and play. #WorkLifeBalance #Developer",
      timestamp: "1d",
      likes: 3400,
      reposts: 567,
      replies: 234,
      image: "https://picsum.photos/400/400"
    }
  ]

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleRepost = (postId: number) => {
    setRepostedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const openCommentModal = (postId: number) => {
    setSelectedPost(postId)
    setShowCommentModal(true)
  }

  const addComment = () => {
    if (selectedPost && newComment.trim()) {
      setComments(prev => ({
        ...prev,
        [selectedPost]: [
          {
            id: prev[selectedPost]?.length + 1 || 1,
            user: "@johndeveloper",
            text: newComment,
            timestamp: "now"
          },
          ...(prev[selectedPost] || [])
        ]
      }))
      setNewComment('')
    }
  }


  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Sticky Header */}
      <header className={`${showHeader ? 'fixed top-0 left-0 right-0 bg-opacity-95 backdrop-blur-md z-50' : 'hidden'} 
        ${darkMode ? 'bg-black border-b border-gray-800' : 'bg-white border-b border-gray-200'} p-4`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl">{mockUser.name}</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Three Column Layout - Updated with Left Sidebar */}
    <div className="max-w-7xl mx-auto px-4 flex gap-6">
      {/* Left Sidebar Navigation */}
      <div className="w-72 hidden md:flex flex-col h-screen sticky top-0 py-4 gap-2">
        {/* X Logo */}
        <div className="px-4 mb-2">
          <RiTwitterXFill size={28} className="hover:bg-gray-800 p-1 rounded-full cursor-pointer h-12 w-12" />
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1">
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiHome size={24} />
            <span className="font-bold">Home</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiSearch size={24} />
            <span className="font-bold">Explore</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiBell size={24} />
            <span className="font-bold">Notifications</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiMail size={24} />
            <span className="font-bold">Messages</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiBookmark size={24} />
            <span className="font-bold">Bookmarks</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiUser size={24} />
            <span className="font-bold">Profile</span>
          </button>
          
          <button className={`flex items-center gap-4 px-4 py-3 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors text-xl`}>
            <FiMoreHorizontal size={24} />
            <span className="font-bold">More</span>
          </button>

          {/* Post Button */}
          <button className={`rounded-full ${darkMode ? 'bg-white text-black hover:bg-gray-100' : 'bg-black text-white hover:bg-gray-800'} py-3 px-4 mt-4 font-bold text-lg transition-colors`}>
            Post
          </button>
        </nav>

        {/* Profile Button */}
        <button className={`mt-auto flex items-center gap-3 p-4 ${darkMode? 'hover:bg-gray-900' : 'hover:bg-gray-200'} rounded-full transition-colors`}>
          <img 
            src={mockUser.avatar} 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 text-left">
            <p className="font-bold">{mockUser.name}</p>
            <p className="text-gray-500">{mockUser.handle}</p>
          </div>
          <FiMoreHorizontal size={20} />
        </button>
      </div>
        {/* Main Content Column */}
        <div className="flex-grow max-w-2xl">
          {/* Search Bar (Mobile Only) */}
          <div className={`sticky top-0 z-40 pt-4 pb-2 lg:hidden ${darkMode ? 'bg-black ' : 'bg-white '}`}>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full 
              ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-gray-100'} 
              focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200`}>
              <FiSearch className={darkMode ? 'text-white' : 'text-black'} />
              <input 
                type="text"
                placeholder="Search C"
                className={`bg-transparent w-full focus:outline-none text-sm ${darkMode ? 'placeholder-white' : 'placeholder-black'}`}
              />
            </div>
          </div>

          {/* Profile Section */}
          <div className="relative mt-3">
            <img 
              src={mockUser.banner} 
              alt="Banner" 
              className="w-full h-48 object-cover rounded-xl"
            />
            <img 
              src={mockUser.avatar} 
              alt="Avatar"
              className="absolute -bottom-16 left-4 w-32 h-32 rounded-full border-4 border-black dark:border-black shadow-xl"
            />
          </div>

          <div className="mt-20 px-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{mockUser.name}</h1>
                <p className="text-gray-500 font-medium">{mockUser.handle}</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </button>
            </div>

            <p className="mt-4 text-lg">{mockUser.bio}</p>

            <div className="flex items-center gap-4 mt-4 text-gray-500">
              <div className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                <FiMapPin className="text-sm" /> 
                <span className="text-sm">{mockUser.location}</span>
              </div>
              <div className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                <FiCalendar className="text-sm" /> 
                <span className="text-sm">Joined {mockUser.joinDate}</span>
              </div>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="hover:text-blue-500 transition-colors cursor-pointer">
                <span className="font-bold">{formatNumber(mockUser.following)}</span>
                <span className="text-gray-500 ml-1 text-sm">Following</span>
              </div>
              <div className="hover:text-blue-500 transition-colors cursor-pointer">
                <span className="font-bold">{formatNumber(mockUser.followers)}</span>
                <span className="text-gray-500 ml-1 text-sm">Followers</span>
              </div>
              <div className="hover:text-blue-500 transition-colors cursor-pointer">
                <span className="font-bold">{formatNumber(mockUser.posts)}</span>
                <span className="text-gray-500 ml-1 text-sm">Posts</span>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="mt-8">
            {mockPosts.map(post => (
              <div key={post.id} 
                className={`p-4 ${darkMode ? 'bg-black' : 'bg-gray-50'} 
                  border ${darkMode ? 'border-gray-800' : 'border-gray-200'} 
                  rounded-xl mb-4 hover:bg-opacity-80 transition-all duration-200`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src={mockUser.avatar} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border border-gray-800"
                  />
                  <div className="flex items-center flex-wrap">
                    <span className="font-bold hover:text-blue-500 cursor-pointer">{mockUser.name}</span>
                    <span className="text-gray-500 mx-2">{mockUser.handle}</span>
                    <span className="text-gray-500">· {post.timestamp}</span>
                  </div>
                </div>
                <p className="mb-2 text-lg leading-relaxed">{post.content}</p>
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="rounded-2xl max-h-96 w-full object-cover mb-2 border border-gray-800"
                  />
                )}
                <div className="flex items-center justify-between mt-4 text-gray-500">
                  <button 
                    onClick={() => openCommentModal(post.id)}
                    className="flex items-center gap-2 hover:text-blue-500 transition group"
                  >
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-all duration-200">
                      <FiMessageCircle className="text-lg" />
                    </div>
                    <span className="text-sm">{formatNumber(comments[post.id]?.length || 0)}</span>
                  </button>
                  <button 
                    onClick={() => toggleRepost(post.id)}
                    className={`flex items-center gap-2 transition group 
                      ${repostedPosts.has(post.id) ? 'text-green-500' : 'hover:text-green-500'}`}
                  >
                    <div className={`p-2 rounded-full ${repostedPosts.has(post.id) ? 'bg-green-500/10' : 'group-hover:bg-green-500/10'} transition-all duration-200`}>
                      <FiRepeat className="text-lg" />
                    </div>
                    <span className="text-sm">{formatNumber(post.reposts)}</span>
                  </button>
                  <button 
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition group
                      ${likedPosts.has(post.id) ? 'text-pink-500' : 'hover:text-pink-500'}`}
                  >
                    <div className={`p-2 rounded-full ${likedPosts.has(post.id) ? 'bg-pink-500/10' : 'group-hover:bg-pink-500/10'} transition-all duration-200`}>
                      <FiHeart className="text-lg" />
                    </div>
                    <span className="text-sm">{formatNumber(post.likes)}</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-blue-500 transition group">
                    <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-all duration-200">
                      <FiShare2 className="text-lg" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Column */}
        <div className="w-80 hidden lg:block">
          <div className="sticky top-4 mt-4">
            {/* Search Bar for Desktop */}
            <div className={`mb-4 ${darkMode ? 'bg-black' : 'bg-white'} rounded-2xl overflow-hidden`}>
              <div className={`flex items-center gap-3 px-4 py-3
                ${darkMode ? 'bg-black border border-gray-800' : 'bg-gray-100 border border-gray-300'} 
                focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200 rounded-full m-2`}>
                <FiSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className={`bg-transparent w-full focus:outline-none text-sm ${darkMode ? 'placeholder-white' : 'placeholder-black'}`}
                />
              </div>
            </div>

            {/* Trending Section */}
            <div className={`${darkMode ? 'bg-black border border-gray-800' : 'bg-white border border-gray-300'} rounded-2xl overflow-hidden`}>
              <h2 className="text-xl font-bold p-4 border-b border-gray-800">
                Trending
              </h2>
              
              {trendingTopics.map((topic) => (
                <div 
                  key={topic.id}
                  className={`p-4 hover:${darkMode ? 'bg-gray-800' : 'bg-gray-100'} transition-colors duration-200 cursor-pointer
                    border-b border-gray-800 last:border-b-0`}
                >
                  <p className="text-sm text-gray-500">{topic.category}</p>
                  <p className="font-bold mt-0.5">{topic.tag}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{topic.posts} posts</p>
                </div>
              ))}

              <button 
                className={`p-4 text-blue-500 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors duration-200 w-full text-left`}
              >
                Show more
              </button>
            </div>

            {/* Who to follow section */}
            <div className={`${darkMode ? 'bg-black border border-gray-800' : 'bg-white border border-gray-300'} rounded-2xl overflow-hidden mt-4`}>
              <h2 className="text-xl font-bold p-4 border-b border-gray-800">
                Who to follow
              </h2>
              
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`p-4 hover:${darkMode ? 'bg-gray-800' : 'bg-gray-100'} 
                    transition-colors duration-200 flex items-center justify-between
                    border-b border-gray-800 last:border-b-0`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://picsum.photos/seed/${i}/200`} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">Developer {i}</p>
                      <p className="text-sm text-gray-500">@dev_{i}</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-white text-black rounded-full font-bold
                    hover:bg-gray-200 transition-colors duration-200">
                    Follow
                  </button>
                </div>
              ))}

              <button 
                className={`p-4 text-blue-500 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors duration-200 w-full text-left`}
              >
                Show more
              </button>
            </div>

            {/* Footer Links */}
            <div className="mt-4 px-4 text-sm text-gray-500">
              <div className="flex flex-wrap gap-2">
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Cookie Policy</a>
                <a href="#" className="hover:underline">Accessibility</a>
                <a href="#" className="hover:underline">Ads info</a>
                <a href="#" className="hover:underline">More</a>
              </div>
              <p className="mt-2">© 2024 C Corp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Post Button */}
      <button 
        onClick={() => alert('Plus button clicked!')}
        className={`fixed bottom-8 right-8 ${darkMode ? 'bg-white hover:bg-gray-100 text-black' : 'bg-black hover:bg-gray-800 text-white'} p-4 rounded-full shadow-lg 
           transition-all duration-200 hover:scale-110 active:scale-95`}
      >
        <FiPlus size={24} />
      </button>

      {/* Comment Modal */}
      {showCommentModal && selectedPost && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className={`${darkMode ? 'bg-black' : 'bg-white'} rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto
            border ${darkMode ? 'border-gray-800' : 'border-gray-200'} shadow-2xl`}>
            <div className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'} flex justify-between items-center sticky top-0 backdrop-blur-md bg-black/90`}>
              <h2 className="text-xl font-bold">Comments</h2>
              <button 
                onClick={() => setShowCommentModal(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-all duration-200 active:scale-95"
              >
                <FiX size={20} />
              </button>
            </div>
            
            {/* Comment Input */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex gap-4">
                <img src={mockUser.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-gray-800" />
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}

                    placeholder="Post your reply"
                    className={`w-full bg-transparent border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'} 
                      p-2 focus:outline-none focus:border-blue-500 min-h-[100px] text-lg`}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={addComment}
                      disabled={!newComment.trim()}
                      className={`px-6 py-2 rounded-full ${darkMode ? ' bg-white border border-black text-black' : ' bg-black border border-white text-white'}  font-bold
                        ${newComment.trim() ? 'hover:bg-neutral-300 active:scale-95' : 'opacity-50 cursor-not-allowed'}
                        transition-all duration-200`}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="p-4">
              {comments[selectedPost]?.map(comment => (
                <div key={comment.id} 
                  className={`p-4 border-b ${darkMode ? 'border-gray-800 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}
                     transition-colors duration-200 rounded-xl`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold hover:text-blue-500 cursor-pointer">{comment.user}</span>
                    <span className="text-gray-500">· {comment.timestamp}</span>
                  </div>
                  <p className={`${darkMode ? 'text-white text-sm' : 'text-black text-sm'} text-lg`}>{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page