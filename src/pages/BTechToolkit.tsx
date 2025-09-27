import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Video, Code, Download, Search, Star, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BTechToolkit = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const subjects = [
    { 
      name: 'Data Structures', 
      files: 15, 
      videos: 8, 
      rating: 4.8,
      category: 'Core Programming',
      difficulty: 'Intermediate'
    },
    { 
      name: 'Object Oriented Programming', 
      files: 12, 
      videos: 10, 
      rating: 4.9,
      category: 'Programming',
      difficulty: 'Beginner'
    },
    { 
      name: 'Database Management', 
      files: 18, 
      videos: 6, 
      rating: 4.7,
      category: 'Database',
      difficulty: 'Intermediate'
    },
    { 
      name: 'Web Development', 
      files: 25, 
      videos: 15, 
      rating: 4.9,
      category: 'Frontend',
      difficulty: 'Beginner'
    },
    { 
      name: 'Software Engineering', 
      files: 20, 
      videos: 12, 
      rating: 4.6,
      category: 'Theory',
      difficulty: 'Advanced'
    },
    { 
      name: 'Computer Networks', 
      files: 14, 
      videos: 9, 
      rating: 4.5,
      category: 'Networking',
      difficulty: 'Intermediate'
    }
  ];

  const codingPlatforms = [
    { name: 'LeetCode', url: 'https://leetcode.com', description: 'Practice coding problems', users: '50M+' },
    { name: 'HackerRank', url: 'https://hackerrank.com', description: 'Programming challenges', users: '20M+' },
    { name: 'CodeChef', url: 'https://codechef.com', description: 'Competitive programming', users: '3M+' },
    { name: 'GeeksforGeeks', url: 'https://geeksforgeeks.org', description: 'Programming tutorials', users: '10M+' }
  ];

  const recentlyAdded = [
    { title: 'Java Collections Framework Guide', type: 'PDF', time: '2 days ago' },
    { title: 'React Hooks Tutorial', type: 'Video', time: '1 week ago' },
    { title: 'SQL Query Optimization', type: 'PDF', time: '3 days ago' },
    { title: 'Design Patterns in Java', type: 'Video', time: '5 days ago' }
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold gradient-text">B.Tech Academic Toolkit</h1>
                <p className="text-sm text-muted-foreground">Your comprehensive study companion</p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/')}>
              ← Back to Portfolio
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search subjects or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Card className="text-center">
            <CardContent className="py-4">
              <div className="text-2xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">PDF Resources</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-4">
              <div className="text-2xl font-bold text-primary">75+</div>
              <div className="text-sm text-muted-foreground">Video Tutorials</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="subjects" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="platforms">Coding Platforms</TabsTrigger>
                <TabsTrigger value="recent">Recent Additions</TabsTrigger>
              </TabsList>

              <TabsContent value="subjects" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredSubjects.map((subject, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg mb-2">{subject.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">{subject.category}</Badge>
                          </div>
                          <div className="flex items-center text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm ml-1">{subject.rating}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between text-sm text-muted-foreground mb-4">
                          <span>{subject.files} PDFs</span>
                          <span>{subject.videos} Videos</span>
                          <Badge variant="secondary" className="text-xs">
                            {subject.difficulty}
                          </Badge>
                        </div>
                        <Button className="w-full" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Access Resources
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {codingPlatforms.map((platform, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {platform.name}
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            {platform.users}
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{platform.description}</p>
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => window.open(platform.url, '_blank')}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          Visit Platform
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-4">
                {recentlyAdded.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-300">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {item.type === 'PDF' ? 
                            <BookOpen className="h-5 w-5 text-primary" /> : 
                            <Video className="h-5 w-5 text-primary" />
                          }
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.time}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Downloads</span>
                  <span className="font-semibold">12,500+</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Users</span>
                  <span className="font-semibold">2,800+</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span className="font-semibold">4.7 ⭐</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <h4 className="font-medium text-sm">Advanced Java Programming</h4>
                    <p className="text-xs text-muted-foreground">Complete guide with examples</p>
                  </div>
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <h4 className="font-medium text-sm">React.js Masterclass</h4>
                    <p className="text-xs text-muted-foreground">Video series for beginners</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to get notified about new resources and tutorials.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BTechToolkit;