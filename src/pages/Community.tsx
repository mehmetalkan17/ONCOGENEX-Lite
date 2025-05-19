import { useState, useEffect } from 'react';
import { getPolls, voteInPoll, Poll, getComments, addComment, Comment } from '../services/api';
import { useUser } from '../contexts/UserContext';
import { BarChart2, MessageSquare, Send, Loader2 } from 'lucide-react';

const Community = () => {
  const { user } = useUser();
  const [polls, setPolls] = useState<Poll[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [pollsLoading, setPollsLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [pollError, setPollError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const [votedPolls, setVotedPolls] = useState<number[]>([]);

  // Fetch polls and comments
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pollsData = await getPolls();
        setPolls(pollsData);
      } catch (err) {
        setPollError('Anketler yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setPollsLoading(false);
      }

      try {
        const commentsData = await getComments();
        setComments(commentsData);
      } catch (err) {
        setCommentError('Yorumlar yüklenirken bir hata oluştu.');
        console.error(err);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle voting in a poll
  const handleVote = async (pollId: number, optionId: number) => {
    if (!user || votedPolls.includes(pollId)) return;

    try {
      const updatedPoll = await voteInPoll(pollId, optionId);
      setPolls(polls.map(poll => poll.id === pollId ? updatedPoll : poll));
      setVotedPolls([...votedPolls, pollId]);
    } catch (err) {
      console.error('Oy verilirken bir hata oluştu:', err);
    }
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const comment = await addComment(newComment, user.id);
      setComments([comment, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Yorum eklenirken bir hata oluştu:', err);
    }
  };

  // Calculate vote percentage for poll options
  const calculatePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  // Format date for comments
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="page-transition container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Topluluk</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Polls Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-primary-600 text-white p-4">
              <h2 className="text-xl font-semibold flex items-center">
                <BarChart2 className="mr-2 h-5 w-5" />
                Sağlık Anketleri
              </h2>
            </div>
            
            <div className="p-6">
              {pollsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
                </div>
              ) : pollError ? (
                <div className="text-center py-6">
                  <p className="text-red-500">{pollError}</p>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {polls.map((poll) => (
                    <div key={poll.id} className="border border-gray-100 rounded-lg p-4 transition-all duration-300 hover:border-primary-200">
                      <h3 className="text-lg font-medium mb-4">{poll.question}</h3>
                      <div className="space-y-3">
                        {poll.options.map((option) => {
                          const percentage = calculatePercentage(option.votes, poll.totalVotes);
                          const hasVoted = votedPolls.includes(poll.id);
                          
                          return (
                            <div key={option.id} className="relative">
                              <button
                                className={`w-full text-left p-3 rounded-md border transition-colors ${
                                  hasVoted 
                                    ? 'cursor-default bg-gray-50 border-gray-200' 
                                    : 'hover:bg-primary-50 hover:border-primary-200 border-gray-200'
                                }`}
                                onClick={() => handleVote(poll.id, option.id)}
                                disabled={hasVoted}
                              >
                                <div className="flex justify-between">
                                  <span>{option.text}</span>
                                  {(hasVoted || poll.totalVotes > 0) && (
                                    <span className="font-medium">{percentage}%</span>
                                  )}
                                </div>
                                
                                {(hasVoted || poll.totalVotes > 0) && (
                                  <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-primary-500"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        {poll.totalVotes === 0 ? (
                          'Henüz oy verilmedi.'
                        ) : (
                          `Toplam ${poll.totalVotes} kişi oy verdi.`
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Comments Section */}
        <div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-secondary-600 text-white p-4">
              <h2 className="text-xl font-semibold flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Topluluk Yorumları
              </h2>
            </div>
            
            <div className="p-6">
              {/* Comment form */}
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Yorum Ekle
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="comment"
                    className="input rounded-r-none flex-grow"
                    placeholder="Düşüncelerinizi paylaşın..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    className="btn btn-secondary rounded-l-none px-4"
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || !user}
                  >
                    <Send size={18} />
                  </button>
                </div>
                {!user && (
                  <p className="text-sm text-red-500 mt-1">
                    Yorum yapmak için giriş yapmalısınız.
                  </p>
                )}
              </div>
              
              {/* Comments list */}
              {commentsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 text-secondary-500 animate-spin" />
                </div>
              ) : commentError ? (
                <div className="text-center py-6">
                  <p className="text-red-500">{commentError}</p>
                  <button
                    className="btn btn-secondary mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Tekrar Dene
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {comments.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                      Henüz yorum yapılmamış. İlk yorumu siz yapın!
                    </p>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-secondary-200 transition-all duration-300"
                      >
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-secondary-600 font-medium text-sm">
                              {comment.username.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <h4 className="font-medium">{comment.username}</h4>
                              <span className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;