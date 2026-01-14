# PINNACLE Backend + Database Contract

## Technology Stack
- **Backend Framework**: Spring Boot 3.x
- **Database**: MongoDB 7.x
- **Authentication**: Firebase JWT
- **API Style**: REST with JSON
- **ID Format**: MongoDB ObjectId as String

---

## 1. USERS MODULE

### MongoDB Collection: `users`

#### Fields
```javascript
{
  _id: ObjectId,              // MongoDB auto-generated
  firebaseUid: String,        // Firebase UID (unique, indexed)
  email: String,              // User email (unique, indexed)
  displayName: String,        // User's display name
  photoURL: String,           // Profile picture URL
  phoneNumber: String,        // Phone number (optional)
  bio: String,                // User biography (optional)
  totalXP: Number,            // Accumulated experience points
  currentStreak: Number,      // Daily learning streak
  longestStreak: Number,      // Longest streak achieved
  skillDistribution: {        // Skill level distribution
    foundation: Number,
    fundamentals: Number,
    intermediate: Number,
    advanced: Number,
    expert: Number,
    mastery: Number,
    professional: Number,
    competence: Number
  },
  preferences: {
    emailNotifications: Boolean,
    pushNotifications: Boolean,
    theme: String             // "light" | "dark"
  },
  createdAt: Date,
  updatedAt: Date,
  lastLoginAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firebaseUid": "xYz9AbC123dEf456",
  "email": "john.doe@example.com",
  "displayName": "John Doe",
  "photoURL": "https://example.com/profile.jpg",
  "phoneNumber": "+1234567890",
  "bio": "Passionate learner",
  "totalXP": 1250,
  "currentStreak": 7,
  "longestStreak": 15,
  "skillDistribution": {
    "foundation": 100,
    "fundamentals": 150,
    "intermediate": 200,
    "advanced": 0,
    "expert": 0,
    "mastery": 0,
    "professional": 0,
    "competence": 0
  },
  "preferences": {
    "emailNotifications": true,
    "pushNotifications": false,
    "theme": "dark"
  },
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-20T14:45:00Z",
  "lastLoginAt": "2024-01-20T14:45:00Z"
}
```

#### API Endpoints

**GET /api/users/profile**
- **Auth**: Required (Firebase JWT)
- **Description**: Get current user profile
- **Request Headers**:
  ```json
  {
    "Authorization": "Bearer <firebase-jwt-token>"
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "firebaseUid": "xYz9AbC123dEf456",
      "email": "john.doe@example.com",
      "displayName": "John Doe",
      "photoURL": "https://example.com/profile.jpg",
      "bio": "Passionate learner",
      "totalXP": 1250,
      "currentStreak": 7,
      "longestStreak": 15,
      "preferences": {
        "emailNotifications": true,
        "pushNotifications": false,
        "theme": "dark"
      }
    }
  }
  ```
- **Response 401**:
  ```json
  {
    "success": false,
    "error": "Unauthorized",
    "message": "Invalid or missing authentication token"
  }
  ```

**PUT /api/users/profile**
- **Auth**: Required
- **Description**: Update user profile
- **Request Body**:
  ```json
  {
    "displayName": "John Smith",
    "bio": "Updated bio",
    "phoneNumber": "+1234567890",
    "preferences": {
      "emailNotifications": false,
      "theme": "light"
    }
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "displayName": "John Smith",
      "bio": "Updated bio",
      "updatedAt": "2024-01-20T15:00:00Z"
    }
  }
  ```

**POST /api/users/register**
- **Auth**: Required (New user with Firebase token)
- **Description**: Create user profile after Firebase authentication
- **Request Body**:
  ```json
  {
    "firebaseUid": "xYz9AbC123dEf456",
    "email": "john.doe@example.com",
    "displayName": "John Doe",
    "photoURL": "https://example.com/profile.jpg"
  }
  ```
- **Response 201**:
  ```json
  {
    "success": true,
    "data": {
      "userId": "507f1f77bcf86cd799439011",
      "message": "User profile created successfully"
    }
  }
  ```

#### Business Rules
- Firebase UID is immutable and unique
- Email must be unique across all users
- Total XP is calculated by backend based on completed activities
- Streaks auto-reset if user doesn't log in for 24+ hours
- Profile updates trigger `updatedAt` timestamp

---

## 2. COURSES MODULE

### MongoDB Collection: `courses`

#### Fields
```javascript
{
  _id: ObjectId,
  title: String,              // Course title
  domain: String,             // Course category/domain
  description: String,        // Full course description
  shortDescription: String,   // Brief summary
  thumbnailURL: String,       // Course thumbnail image
  bannerURL: String,          // Course banner image
  difficulty: String,         // "beginner" | "intermediate" | "advanced"
  duration: Number,           // Estimated hours to complete
  tags: [String],             // Array of tags
  prerequisites: [String],    // Array of prerequisite course IDs
  instructorName: String,     // Instructor name
  instructorBio: String,      // Instructor biography
  totalLevels: Number,        // Always 8
  isActive: Boolean,          // Published status
  totalEnrollments: Number,   // Enrollment count
  averageRating: Number,      // Average rating (0-5)
  totalRatings: Number,       // Number of ratings
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Web Development Mastery",
  "domain": "Web Development",
  "description": "Complete guide to modern web development...",
  "shortDescription": "Learn web development from scratch",
  "thumbnailURL": "https://example.com/web-dev-thumb.jpg",
  "bannerURL": "https://example.com/web-dev-banner.jpg",
  "difficulty": "beginner",
  "duration": 120,
  "tags": ["HTML", "CSS", "JavaScript", "React"],
  "prerequisites": [],
  "instructorName": "Jane Smith",
  "instructorBio": "10 years of web development experience",
  "totalLevels": 8,
  "isActive": true,
  "totalEnrollments": 1523,
  "averageRating": 4.7,
  "totalRatings": 342,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

#### API Endpoints

**GET /api/courses**
- **Auth**: Optional
- **Query Parameters**:
  - `domain` (optional): Filter by domain
  - `difficulty` (optional): Filter by difficulty
  - `search` (optional): Search in title/description
  - `page` (optional, default: 0): Page number
  - `size` (optional, default: 10): Page size
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courses": [
        {
          "courseId": "507f1f77bcf86cd799439012",
          "title": "Web Development Mastery",
          "domain": "Web Development",
          "shortDescription": "Learn web development from scratch",
          "thumbnailURL": "https://example.com/web-dev-thumb.jpg",
          "difficulty": "beginner",
          "duration": 120,
          "totalLevels": 8,
          "totalEnrollments": 1523,
          "averageRating": 4.7,
          "isEnrolled": false
        }
      ],
      "pagination": {
        "currentPage": 0,
        "totalPages": 5,
        "totalElements": 47,
        "pageSize": 10
      }
    }
  }
  ```

**GET /api/courses/{courseId}**
- **Auth**: Optional
- **Description**: Get detailed course information
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "title": "Web Development Mastery",
      "domain": "Web Development",
      "description": "Complete guide to modern web development...",
      "shortDescription": "Learn web development from scratch",
      "thumbnailURL": "https://example.com/web-dev-thumb.jpg",
      "bannerURL": "https://example.com/web-dev-banner.jpg",
      "difficulty": "beginner",
      "duration": 120,
      "tags": ["HTML", "CSS", "JavaScript", "React"],
      "prerequisites": [],
      "instructorName": "Jane Smith",
      "instructorBio": "10 years of web development experience",
      "totalLevels": 8,
      "totalEnrollments": 1523,
      "averageRating": 4.7,
      "totalRatings": 342,
      "isEnrolled": false,
      "userProgress": null
    }
  }
  ```
- **Response 404**:
  ```json
  {
    "success": false,
    "error": "Not Found",
    "message": "Course not found"
  }
  ```

**GET /api/courses/{courseId}/preview**
- **Auth**: Not Required
- **Description**: Get preview data for non-enrolled users
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "title": "Web Development Mastery",
      "domain": "Web Development",
      "description": "Complete guide...",
      "curriculum": [
        {
          "levelNumber": 1,
          "title": "Foundation",
          "description": "Basic concepts",
          "topics": ["HTML Basics", "CSS Fundamentals"]
        },
        {
          "levelNumber": 2,
          "title": "Fundamentals",
          "description": "Core skills",
          "topics": ["JavaScript Basics", "DOM Manipulation"]
        }
      ]
    }
  }
  ```

#### Business Rules
- Only active courses (`isActive: true`) are visible to users
- Course catalog is publicly accessible (no auth required)
- Enrollment status is included when user is authenticated
- Prerequisites must be completed before enrollment (if any)
- Total enrollments increment on successful enrollment

---

## 3. LEVELS MODULE

### MongoDB Collection: `levels`

#### Fields
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,         // Reference to course (indexed)
  levelNumber: Number,        // 1-8 (indexed with courseId)
  title: String,              // Level title
  description: String,        // Level description
  objectives: [String],       // Learning objectives
  unlockRule: {
    type: String,             // "auto" | "sequential" | "exam"
    requiresPrevious: Boolean, // Requires previous level completion
    requiredXP: Number,       // XP needed to unlock
    requiredPercentage: Number // Progress % needed
  },
  estimatedDuration: Number,  // Minutes to complete
  xpReward: Number,           // XP earned on completion
  skillCategory: String,      // Skill type
  contentCount: {
    videos: Number,
    articles: Number,
    quizzes: Number
  },
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439012",
  "levelNumber": 1,
  "title": "Foundation",
  "description": "Build a strong foundation in web development basics",
  "objectives": [
    "Understand HTML structure",
    "Learn CSS styling basics",
    "Create simple web pages"
  ],
  "unlockRule": {
    "type": "auto",
    "requiresPrevious": false,
    "requiredXP": 0,
    "requiredPercentage": 0
  },
  "estimatedDuration": 300,
  "xpReward": 100,
  "skillCategory": "foundation",
  "contentCount": {
    "videos": 5,
    "articles": 3,
    "quizzes": 2
  },
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### API Endpoints

**GET /api/courses/{courseId}/levels**
- **Auth**: Optional
- **Description**: Get all levels for a course
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "levels": [
        {
          "levelId": "507f1f77bcf86cd799439013",
          "levelNumber": 1,
          "title": "Foundation",
          "description": "Build a strong foundation...",
          "objectives": ["Understand HTML structure"],
          "estimatedDuration": 300,
          "xpReward": 100,
          "skillCategory": "foundation",
          "contentCount": {
            "videos": 5,
            "articles": 3,
            "quizzes": 2
          },
          "isLocked": false,
          "isCompleted": false,
          "progress": 0
        }
      ]
    }
  }
  ```

**GET /api/courses/{courseId}/levels/{levelId}**
- **Auth**: Required
- **Description**: Get detailed level content
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "levelId": "507f1f77bcf86cd799439013",
      "courseId": "507f1f77bcf86cd799439012",
      "levelNumber": 1,
      "title": "Foundation",
      "description": "Build a strong foundation...",
      "objectives": ["Understand HTML structure"],
      "isLocked": false,
      "isCompleted": false,
      "progress": 35,
      "content": [
        {
          "contentId": "507f1f77bcf86cd799439014",
          "type": "video",
          "title": "Introduction to HTML",
          "duration": 600,
          "order": 1,
          "isCompleted": true
        }
      ]
    }
  }
  ```
- **Response 403**:
  ```json
  {
    "success": false,
    "error": "Forbidden",
    "message": "Level is locked. Complete previous level first."
  }
  ```

#### Business Rules
- Levels are always ordered 1-8
- Level 1 is auto-unlocked on enrollment
- Sequential levels require previous level completion (except level 1)
- Lock status calculated based on user progress
- XP is awarded only on first completion

---

## 4. ROADMAP MODULE

### MongoDB Collection: `roadmaps`
*Note: Roadmap is a computed view, not a separate collection. Data comes from levels + user progress*

#### API Endpoints

**GET /api/courses/{courseId}/roadmap**
- **Auth**: Required
- **Description**: Get visual roadmap with progress
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "courseTitle": "Web Development Mastery",
      "overallProgress": 25,
      "currentLevel": 2,
      "roadmap": [
        {
          "levelId": "507f1f77bcf86cd799439013",
          "levelNumber": 1,
          "title": "Foundation",
          "description": "Build a strong foundation...",
          "status": "completed",
          "isLocked": false,
          "progress": 100,
          "xpEarned": 100,
          "completedAt": "2024-01-18T10:00:00Z"
        },
        {
          "levelId": "507f1f77bcf86cd799439014",
          "levelNumber": 2,
          "title": "Fundamentals",
          "description": "Core programming skills...",
          "status": "in_progress",
          "isLocked": false,
          "progress": 45,
          "xpEarned": 0,
          "completedAt": null
        },
        {
          "levelId": "507f1f77bcf86cd799439015",
          "levelNumber": 3,
          "title": "Intermediate",
          "description": "Advanced concepts...",
          "status": "locked",
          "isLocked": true,
          "progress": 0,
          "xpEarned": 0,
          "completedAt": null
        }
      ]
    }
  }
  ```
- **Response 403**:
  ```json
  {
    "success": false,
    "error": "Forbidden",
    "message": "User not enrolled in this course"
  }
  ```

#### Business Rules
- Roadmap is only accessible to enrolled users
- Status values: `locked`, `unlocked`, `in_progress`, `completed`
- Overall progress = (completed levels / 8) * 100
- Current level = first incomplete level or last level if all complete
- XP earned is 0 until level is completed

---

## 5. CONTENT MODULE

### MongoDB Collection: `contents`

#### Fields
```javascript
{
  _id: ObjectId,
  levelId: ObjectId,          // Reference to level (indexed)
  courseId: ObjectId,         // Reference to course (indexed)
  type: String,               // "video" | "article" | "quiz"
  title: String,              // Content title
  description: String,        // Content description
  order: Number,              // Display order within level
  videoURL: String,           // Video URL (if type=video)
  videoDuration: Number,      // Seconds (if type=video)
  articleContent: String,     // HTML content (if type=article)
  readingTime: Number,        // Minutes (if type=article)
  quizId: ObjectId,           // Reference to quiz (if type=quiz)
  thumbnailURL: String,       // Content thumbnail
  isRequired: Boolean,        // Must complete to finish level
  xpReward: Number,           // XP for completing this content
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "levelId": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439012",
  "type": "video",
  "title": "Introduction to HTML",
  "description": "Learn the basics of HTML structure",
  "order": 1,
  "videoURL": "https://example.com/videos/html-intro.mp4",
  "videoDuration": 600,
  "articleContent": null,
  "readingTime": null,
  "quizId": null,
  "thumbnailURL": "https://example.com/thumbs/html-intro.jpg",
  "isRequired": true,
  "xpReward": 10,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### API Endpoints

**GET /api/courses/{courseId}/levels/{levelId}/contents**
- **Auth**: Required
- **Description**: Get all content items for a level
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "levelId": "507f1f77bcf86cd799439013",
      "contents": [
        {
          "contentId": "507f1f77bcf86cd799439014",
          "type": "video",
          "title": "Introduction to HTML",
          "description": "Learn the basics...",
          "order": 1,
          "videoDuration": 600,
          "thumbnailURL": "https://example.com/thumbs/html-intro.jpg",
          "isRequired": true,
          "xpReward": 10,
          "isCompleted": true,
          "watchPercentage": 100
        }
      ]
    }
  }
  ```

**GET /api/contents/{contentId}**
- **Auth**: Required
- **Description**: Get detailed content with full data
- **Response 200 (Video)**:
  ```json
  {
    "success": true,
    "data": {
      "contentId": "507f1f77bcf86cd799439014",
      "type": "video",
      "title": "Introduction to HTML",
      "description": "Learn the basics of HTML structure",
      "videoURL": "https://example.com/videos/html-intro.mp4",
      "videoDuration": 600,
      "thumbnailURL": "https://example.com/thumbs/html-intro.jpg",
      "isRequired": true,
      "xpReward": 10,
      "isCompleted": true,
      "watchPercentage": 100,
      "lastWatchedAt": "2024-01-18T10:30:00Z",
      "nextContent": {
        "contentId": "507f1f77bcf86cd799439015",
        "title": "CSS Basics",
        "type": "video"
      }
    }
  }
  ```

#### Business Rules
- Content order determines sequence within a level
- Required content must be completed to finish level
- Video watch percentage tracked in progress collection
- Articles marked complete when user scrolls to bottom

---

## 6. QUIZZES MODULE

### MongoDB Collection: `quizzes`

#### Fields
```javascript
{
  _id: ObjectId,
  contentId: ObjectId,        // Reference to content (indexed)
  levelId: ObjectId,          // Reference to level
  courseId: ObjectId,         // Reference to course
  title: String,              // Quiz title
  description: String,        // Quiz description
  passingScore: Number,       // Percentage needed to pass (0-100)
  timeLimit: Number,          // Minutes (0 = unlimited)
  maxAttempts: Number,        // 0 = unlimited
  xpReward: Number,           // XP for passing
  questions: [
    {
      questionId: String,     // Unique within quiz
      questionText: String,   // Question text
      type: String,           // "single" | "multiple"
      options: [
        {
          optionId: String,   // Unique within question
          text: String,       // Option text
          isCorrect: Boolean  // Correct answer flag
        }
      ],
      explanation: String,    // Answer explanation
      points: Number          // Points for this question
    }
  ],
  totalPoints: Number,        // Sum of all question points
  shuffleQuestions: Boolean,  // Randomize question order
  shuffleOptions: Boolean,    // Randomize option order
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "contentId": "507f1f77bcf86cd799439015",
  "levelId": "507f1f77bcf86cd799439013",
  "courseId": "507f1f77bcf86cd799439012",
  "title": "HTML Fundamentals Quiz",
  "description": "Test your HTML knowledge",
  "passingScore": 70,
  "timeLimit": 15,
  "maxAttempts": 3,
  "xpReward": 50,
  "questions": [
    {
      "questionId": "q1",
      "questionText": "What does HTML stand for?",
      "type": "single",
      "options": [
        {
          "optionId": "a",
          "text": "Hyper Text Markup Language",
          "isCorrect": true
        },
        {
          "optionId": "b",
          "text": "High Tech Modern Language",
          "isCorrect": false
        }
      ],
      "explanation": "HTML stands for Hyper Text Markup Language",
      "points": 10
    }
  ],
  "totalPoints": 100,
  "shuffleQuestions": true,
  "shuffleOptions": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### API Endpoints

**GET /api/quizzes/{quizId}**
- **Auth**: Required
- **Description**: Get quiz with questions (without correct answers)
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "quizId": "507f1f77bcf86cd799439016",
      "title": "HTML Fundamentals Quiz",
      "description": "Test your HTML knowledge",
      "passingScore": 70,
      "timeLimit": 15,
      "maxAttempts": 3,
      "xpReward": 50,
      "questions": [
        {
          "questionId": "q1",
          "questionText": "What does HTML stand for?",
          "type": "single",
          "options": [
            {
              "optionId": "a",
              "text": "Hyper Text Markup Language"
            },
            {
              "optionId": "b",
              "text": "High Tech Modern Language"
            }
          ],
          "points": 10
        }
      ],
      "totalPoints": 100,
      "attemptsUsed": 1,
      "bestScore": 85
    }
  }
  ```

**POST /api/quizzes/{quizId}/submit**
- **Auth**: Required
- **Description**: Submit quiz answers for grading
- **Request Body**:
  ```json
  {
    "answers": [
      {
        "questionId": "q1",
        "selectedOptions": ["a"]
      },
      {
        "questionId": "q2",
        "selectedOptions": ["b", "c"]
      }
    ],
    "startedAt": "2024-01-20T10:00:00Z",
    "submittedAt": "2024-01-20T10:12:00Z"
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "quizAttemptId": "507f1f77bcf86cd799439020",
      "score": 85,
      "percentage": 85,
      "passed": true,
      "totalPoints": 100,
      "earnedPoints": 85,
      "xpEarned": 50,
      "timeTaken": 720,
      "correctAnswers": 9,
      "totalQuestions": 10,
      "results": [
        {
          "questionId": "q1",
          "questionText": "What does HTML stand for?",
          "isCorrect": true,
          "selectedOptions": ["a"],
          "correctOptions": ["a"],
          "explanation": "HTML stands for Hyper Text Markup Language",
          "points": 10,
          "earnedPoints": 10
        }
      ]
    }
  }
  ```
- **Response 400**:
  ```json
  {
    "success": false,
    "error": "Bad Request",
    "message": "Maximum attempts (3) reached for this quiz"
  }
  ```

**GET /api/quizzes/{quizId}/attempts**
- **Auth**: Required
- **Description**: Get user's quiz attempt history
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "quizId": "507f1f77bcf86cd799439016",
      "attempts": [
        {
          "attemptId": "507f1f77bcf86cd799439020",
          "attemptNumber": 1,
          "score": 85,
          "percentage": 85,
          "passed": true,
          "xpEarned": 50,
          "timeTaken": 720,
          "submittedAt": "2024-01-20T10:12:00Z"
        }
      ],
      "bestAttempt": {
        "attemptNumber": 1,
        "score": 85,
        "percentage": 85
      },
      "attemptsRemaining": 2
    }
  }
  ```

#### Business Rules
- Correct answers are never sent to frontend until after submission
- Backend validates all answers server-side
- XP is awarded only on first passing attempt
- Time limit enforced by checking submission time
- Shuffle randomization done server-side per attempt
- Past passing score marked as passed even if not best score

---

## 7. PROGRESS MODULE

### MongoDB Collection: `user_progress`

#### Fields
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to user (indexed)
  courseId: ObjectId,         // Reference to course (indexed)
  enrollmentId: ObjectId,     // Reference to enrollment
  currentLevelId: ObjectId,   // Last accessed level
  currentContentId: ObjectId, // Last accessed content
  overallProgress: Number,    // 0-100 percentage
  completedLevels: [ObjectId], // Array of completed level IDs
  levelProgress: [
    {
      levelId: ObjectId,
      progress: Number,       // 0-100 percentage
      isCompleted: Boolean,
      startedAt: Date,
      completedAt: Date,
      timeSpentMinutes: Number,
      xpEarned: Number
    }
  ],
  contentProgress: [
    {
      contentId: ObjectId,
      type: String,           // "video" | "article" | "quiz"
      isCompleted: Boolean,
      completedAt: Date,
      watchPercentage: Number, // For videos (0-100)
      lastWatchPosition: Number, // Seconds
      timeSpentMinutes: Number,
      xpEarned: Number
    }
  ],
  quizAttempts: [
    {
      quizId: ObjectId,
      attemptNumber: Number,
      score: Number,
      percentage: Number,
      passed: Boolean,
      answers: [Object],      // User answers
      xpEarned: Number,
      startedAt: Date,
      submittedAt: Date,
      timeTaken: Number       // Seconds
    }
  ],
  totalXPEarned: Number,
  totalTimeSpentMinutes: Number,
  lastAccessedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439017",
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "enrollmentId": "507f1f77bcf86cd799439018",
  "currentLevelId": "507f1f77bcf86cd799439014",
  "currentContentId": "507f1f77bcf86cd799439015",
  "overallProgress": 25,
  "completedLevels": ["507f1f77bcf86cd799439013"],
  "levelProgress": [
    {
      "levelId": "507f1f77bcf86cd799439013",
      "progress": 100,
      "isCompleted": true,
      "startedAt": "2024-01-15T10:00:00Z",
      "completedAt": "2024-01-18T15:30:00Z",
      "timeSpentMinutes": 420,
      "xpEarned": 100
    }
  ],
  "contentProgress": [
    {
      "contentId": "507f1f77bcf86cd799439014",
      "type": "video",
      "isCompleted": true,
      "completedAt": "2024-01-16T11:00:00Z",
      "watchPercentage": 100,
      "lastWatchPosition": 600,
      "timeSpentMinutes": 12,
      "xpEarned": 10
    }
  ],
  "quizAttempts": [
    {
      "quizId": "507f1f77bcf86cd799439016",
      "attemptNumber": 1,
      "score": 85,
      "percentage": 85,
      "passed": true,
      "xpEarned": 50,
      "startedAt": "2024-01-17T10:00:00Z",
      "submittedAt": "2024-01-17T10:12:00Z",
      "timeTaken": 720
    }
  ],
  "totalXPEarned": 250,
  "totalTimeSpentMinutes": 520,
  "lastAccessedAt": "2024-01-20T14:45:00Z",
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T14:45:00Z"
}
```

#### API Endpoints

**GET /api/progress/courses/{courseId}**
- **Auth**: Required
- **Description**: Get user's progress for a course
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "overallProgress": 25,
      "currentLevel": 2,
      "completedLevels": 1,
      "totalLevels": 8,
      "totalXPEarned": 250,
      "totalTimeSpentMinutes": 520,
      "lastAccessedAt": "2024-01-20T14:45:00Z",
      "levelProgress": [
        {
          "levelId": "507f1f77bcf86cd799439013",
          "levelNumber": 1,
          "progress": 100,
          "isCompleted": true,
          "completedAt": "2024-01-18T15:30:00Z"
        }
      ]
    }
  }
  ```

**POST /api/progress/content**
- **Auth**: Required
- **Description**: Update content progress (video watch, article read)
- **Request Body**:
  ```json
  {
    "contentId": "507f1f77bcf86cd799439014",
    "watchPercentage": 75,
    "lastWatchPosition": 450,
    "isCompleted": false
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "contentId": "507f1f77bcf86cd799439014",
      "progress": 75,
      "isCompleted": false,
      "levelProgress": 35,
      "xpEarned": 0
    }
  }
  ```

**POST /api/progress/level-complete**
- **Auth**: Required
- **Description**: Mark level as complete (auto-triggered by backend)
- **Request Body**:
  ```json
  {
    "levelId": "507f1f77bcf86cd799439013"
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "levelId": "507f1f77bcf86cd799439013",
      "isCompleted": true,
      "completedAt": "2024-01-18T15:30:00Z",
      "xpEarned": 100,
      "totalXP": 350,
      "nextLevel": {
        "levelId": "507f1f77bcf86cd799439014",
        "levelNumber": 2,
        "title": "Fundamentals",
        "isUnlocked": true
      }
    }
  }
  ```

#### Business Rules
- Progress tracked in real-time as user interacts with content
- Video progress updates every 10 seconds of watch time
- Video marked complete at 90% watch (not 100%)
- Articles marked complete when user scrolls to 95% of content
- Level auto-completes when all required content is complete
- XP only awarded once per content/level
- Overall progress = (completed levels / 8) * 100

---

## 8. ENROLLMENT MODULE

### MongoDB Collection: `enrollments`

#### Fields
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to user (indexed)
  courseId: ObjectId,         // Reference to course (indexed)
  status: String,             // "active" | "completed" | "dropped"
  enrolledAt: Date,
  completedAt: Date,
  droppedAt: Date,
  certificateIssued: Boolean,
  certificateId: ObjectId,    // Reference to certificate
  finalExamPassed: Boolean,
  finalExamScore: Number,
  totalXPEarned: Number,
  totalTimeSpentMinutes: Number,
  completionPercentage: Number, // 0-100
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes
```javascript
// Compound unique index to prevent duplicate enrollments
{ userId: 1, courseId: 1 } - unique
// Query optimization
{ userId: 1, status: 1 }
{ courseId: 1, status: 1 }
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439018",
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "status": "active",
  "enrolledAt": "2024-01-15T10:00:00Z",
  "completedAt": null,
  "droppedAt": null,
  "certificateIssued": false,
  "certificateId": null,
  "finalExamPassed": false,
  "finalExamScore": null,
  "totalXPEarned": 250,
  "totalTimeSpentMinutes": 520,
  "completionPercentage": 25,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-20T14:45:00Z"
}
```

#### API Endpoints

**POST /api/enrollments**
- **Auth**: Required
- **Description**: Enroll user in a course
- **Request Body**:
  ```json
  {
    "courseId": "507f1f77bcf86cd799439012"
  }
  ```
- **Response 201**:
  ```json
  {
    "success": true,
    "data": {
      "enrollmentId": "507f1f77bcf86cd799439018",
      "courseId": "507f1f77bcf86cd799439012",
      "userId": "507f1f77bcf86cd799439011",
      "enrolledAt": "2024-01-15T10:00:00Z",
      "message": "Successfully enrolled in course"
    }
  }
  ```
- **Response 409**:
  ```json
  {
    "success": false,
    "error": "Conflict",
    "message": "Already enrolled in this course"
  }
  ```
- **Response 403**:
  ```json
  {
    "success": false,
    "error": "Forbidden",
    "message": "Prerequisites not completed"
  }
  ```

**GET /api/enrollments**
- **Auth**: Required
- **Description**: Get all user enrollments
- **Query Parameters**:
  - `status` (optional): Filter by status
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "enrollments": [
        {
          "enrollmentId": "507f1f77bcf86cd799439018",
          "course": {
            "courseId": "507f1f77bcf86cd799439012",
            "title": "Web Development Mastery",
            "thumbnailURL": "https://example.com/thumb.jpg",
            "domain": "Web Development"
          },
          "status": "active",
          "enrolledAt": "2024-01-15T10:00:00Z",
          "completionPercentage": 25,
          "currentLevel": 2,
          "totalXPEarned": 250
        }
      ]
    }
  }
  ```

**GET /api/enrollments/{enrollmentId}**
- **Auth**: Required
- **Description**: Get detailed enrollment information
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "enrollmentId": "507f1f77bcf86cd799439018",
      "course": {
        "courseId": "507f1f77bcf86cd799439012",
        "title": "Web Development Mastery",
        "description": "Complete guide...",
        "thumbnailURL": "https://example.com/thumb.jpg"
      },
      "status": "active",
      "enrolledAt": "2024-01-15T10:00:00Z",
      "completionPercentage": 25,
      "currentLevel": 2,
      "totalXPEarned": 250,
      "totalTimeSpentMinutes": 520,
      "certificateIssued": false,
      "finalExamPassed": false
    }
  }
  ```

**DELETE /api/enrollments/{enrollmentId}**
- **Auth**: Required
- **Description**: Drop enrollment (soft delete)
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "enrollmentId": "507f1f77bcf86cd799439018",
      "status": "dropped",
      "droppedAt": "2024-01-21T10:00:00Z",
      "message": "Successfully dropped from course"
    }
  }
  ```

#### Business Rules
- Unique constraint on (userId, courseId) prevents duplicate enrollments
- Enrollment creates initial progress record automatically
- Level 1 is automatically unlocked on enrollment
- Status changes: active → completed (on course finish) or active → dropped (on user drop)
- Enrollment count on course increments on creation
- Prerequisites checked before allowing enrollment

---

## 9. EXAMS MODULE

### MongoDB Collection: `final_exams`

#### Fields
```javascript
{
  _id: ObjectId,
  courseId: ObjectId,         // Reference to course (indexed, unique)
  title: String,              // Exam title
  description: String,        // Exam description
  instructions: String,       // Exam instructions
  passingScore: Number,       // Percentage needed to pass (0-100)
  timeLimit: Number,          // Minutes
  maxAttempts: Number,        // 0 = unlimited
  xpReward: Number,           // XP for passing
  unlockRequirement: {
    allLevelsCompleted: Boolean,
    minimumXP: Number,
    minimumProgress: Number   // Percentage
  },
  questions: [
    {
      questionId: String,
      questionText: String,
      type: String,           // "single" | "multiple"
      options: [
        {
          optionId: String,
          text: String,
          isCorrect: Boolean
        }
      ],
      explanation: String,
      points: Number,
      difficulty: String      // "easy" | "medium" | "hard"
    }
  ],
  totalPoints: Number,
  shuffleQuestions: Boolean,
  shuffleOptions: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd799439019",
  "courseId": "507f1f77bcf86cd799439012",
  "title": "Web Development Final Assessment",
  "description": "Comprehensive test of all learned concepts",
  "instructions": "Answer all questions. You have 60 minutes.",
  "passingScore": 75,
  "timeLimit": 60,
  "maxAttempts": 3,
  "xpReward": 500,
  "unlockRequirement": {
    "allLevelsCompleted": true,
    "minimumXP": 800,
    "minimumProgress": 100
  },
  "questions": [
    {
      "questionId": "fe1",
      "questionText": "Which HTML tag is used for largest heading?",
      "type": "single",
      "options": [
        {
          "optionId": "a",
          "text": "<h1>",
          "isCorrect": true
        },
        {
          "optionId": "b",
          "text": "<h6>",
          "isCorrect": false
        }
      ],
      "explanation": "<h1> is the largest heading tag",
      "points": 5,
      "difficulty": "easy"
    }
  ],
  "totalPoints": 250,
  "shuffleQuestions": true,
  "shuffleOptions": true,
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### API Endpoints

**GET /api/courses/{courseId}/exam**
- **Auth**: Required
- **Description**: Get final exam details (checks eligibility)
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "examId": "507f1f77bcf86cd799439019",
      "title": "Web Development Final Assessment",
      "description": "Comprehensive test...",
      "instructions": "Answer all questions...",
      "passingScore": 75,
      "timeLimit": 60,
      "maxAttempts": 3,
      "xpReward": 500,
      "totalQuestions": 50,
      "totalPoints": 250,
      "isEligible": true,
      "attemptsUsed": 0,
      "bestScore": null,
      "requirements": {
        "allLevelsCompleted": true,
        "currentProgress": 100,
        "requiredXP": 800,
        "currentXP": 850
      }
    }
  }
  ```
- **Response 403**:
  ```json
  {
    "success": false,
    "error": "Forbidden",
    "message": "Complete all 8 levels before taking the final exam",
    "requirements": {
      "allLevelsCompleted": false,
      "completedLevels": 6,
      "totalLevels": 8
    }
  }
  ```

**POST /api/exams/{examId}/start**
- **Auth**: Required
- **Description**: Start exam (get questions without answers)
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "examAttemptId": "507f1f77bcf86cd799439021",
      "examId": "507f1f77bcf86cd799439019",
      "attemptNumber": 1,
      "startedAt": "2024-01-25T10:00:00Z",
      "expiresAt": "2024-01-25T11:00:00Z",
      "timeLimit": 60,
      "questions": [
        {
          "questionId": "fe1",
          "questionText": "Which HTML tag is used for largest heading?",
          "type": "single",
          "options": [
            {
              "optionId": "a",
              "text": "<h1>"
            },
            {
              "optionId": "b",
              "text": "<h6>"
            }
          ],
          "points": 5
        }
      ],
      "totalPoints": 250
    }
  }
  ```

**POST /api/exams/{examId}/submit**
- **Auth**: Required
- **Description**: Submit final exam answers
- **Request Body**:
  ```json
  {
    "examAttemptId": "507f1f77bcf86cd799439021",
    "answers": [
      {
        "questionId": "fe1",
        "selectedOptions": ["a"]
      }
    ],
    "startedAt": "2024-01-25T10:00:00Z",
    "submittedAt": "2024-01-25T10:45:00Z"
  }
  ```
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "examAttemptId": "507f1f77bcf86cd799439021",
      "examId": "507f1f77bcf86cd799439019",
      "score": 190,
      "percentage": 76,
      "passed": true,
      "totalPoints": 250,
      "earnedPoints": 190,
      "xpEarned": 500,
      "timeTaken": 2700,
      "correctAnswers": 38,
      "totalQuestions": 50,
      "certificateUnlocked": true,
      "results": [
        {
          "questionId": "fe1",
          "questionText": "Which HTML tag...",
          "isCorrect": true,
          "selectedOptions": ["a"],
          "correctOptions": ["a"],
          "explanation": "<h1> is the largest heading tag",
          "points": 5,
          "earnedPoints": 5
        }
      ]
    }
  }
  ```

**GET /api/exams/{examId}/attempts**
- **Auth**: Required
- **Description**: Get exam attempt history
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "examId": "507f1f77bcf86cd799439019",
      "attempts": [
        {
          "attemptId": "507f1f77bcf86cd799439021",
          "attemptNumber": 1,
          "score": 190,
          "percentage": 76,
          "passed": true,
          "xpEarned": 500,
          "timeTaken": 2700,
          "submittedAt": "2024-01-25T10:45:00Z"
        }
      ],
      "bestAttempt": {
        "attemptNumber": 1,
        "score": 190,
        "percentage": 76
      },
      "attemptsRemaining": 2,
      "hasPassed": true
    }
  }
  ```

#### Business Rules
- Exam unlocks only when all 8 levels are completed
- Time limit strictly enforced - auto-submit on expiration
- XP awarded only on first passing attempt
- Answers validated server-side
- Multiple attempts allowed up to maxAttempts
- Passing the exam triggers certificate generation
- Exam completion marks enrollment as complete

---

## 10. CERTIFICATES MODULE

### MongoDB Collection: `certificates`

#### Fields
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to user (indexed)
  courseId: ObjectId,         // Reference to course (indexed)
  enrollmentId: ObjectId,     // Reference to enrollment
  certificateNumber: String,  // Unique certificate number
  issuedAt: Date,
  expiresAt: Date,            // null = never expires
  status: String,             // "active" | "revoked"
  completionDetails: {
    finalExamScore: Number,
    finalExamPercentage: Number,
    totalXPEarned: Number,
    totalTimeSpentHours: Number,
    enrolledAt: Date,
    completedAt: Date,
    durationDays: Number
  },
  certificateURL: String,     // Generated PDF URL
  verificationURL: String,    // Public verification URL
  createdAt: Date,
  updatedAt: Date
}
```

#### Indexes
```javascript
// Compound unique index
{ userId: 1, courseId: 1 } - unique
// For verification
{ certificateNumber: 1 } - unique
```

#### Sample Document
```json
{
  "_id": "507f1f77bcf86cd79943901a",
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "enrollmentId": "507f1f77bcf86cd799439018",
  "certificateNumber": "PINNACLE-WDM-2024-001234",
  "issuedAt": "2024-01-25T11:00:00Z",
  "expiresAt": null,
  "status": "active",
  "completionDetails": {
    "finalExamScore": 190,
    "finalExamPercentage": 76,
    "totalXPEarned": 1350,
    "totalTimeSpentHours": 52,
    "enrolledAt": "2024-01-15T10:00:00Z",
    "completedAt": "2024-01-25T11:00:00Z",
    "durationDays": 10
  },
  "certificateURL": "https://example.com/certificates/PINNACLE-WDM-2024-001234.pdf",
  "verificationURL": "https://pinnacle.com/verify/PINNACLE-WDM-2024-001234",
  "createdAt": "2024-01-25T11:00:00Z",
  "updatedAt": "2024-01-25T11:00:00Z"
}
```

#### API Endpoints

**GET /api/certificates**
- **Auth**: Required
- **Description**: Get all user certificates
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "certificates": [
        {
          "certificateId": "507f1f77bcf86cd79943901a",
          "certificateNumber": "PINNACLE-WDM-2024-001234",
          "course": {
            "courseId": "507f1f77bcf86cd799439012",
            "title": "Web Development Mastery",
            "domain": "Web Development"
          },
          "issuedAt": "2024-01-25T11:00:00Z",
          "status": "active",
          "certificateURL": "https://example.com/certificates/PINNACLE-WDM-2024-001234.pdf",
          "verificationURL": "https://pinnacle.com/verify/PINNACLE-WDM-2024-001234"
        }
      ]
    }
  }
  ```

**GET /api/certificates/{certificateId}**
- **Auth**: Required
- **Description**: Get detailed certificate information
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "certificateId": "507f1f77bcf86cd79943901a",
      "certificateNumber": "PINNACLE-WDM-2024-001234",
      "user": {
        "displayName": "John Doe",
        "email": "john.doe@example.com"
      },
      "course": {
        "courseId": "507f1f77bcf86cd799439012",
        "title": "Web Development Mastery",
        "domain": "Web Development",
        "instructorName": "Jane Smith"
      },
      "issuedAt": "2024-01-25T11:00:00Z",
      "status": "active",
      "completionDetails": {
        "finalExamScore": 190,
        "finalExamPercentage": 76,
        "totalXPEarned": 1350,
        "totalTimeSpentHours": 52,
        "durationDays": 10
      },
      "certificateURL": "https://example.com/certificates/PINNACLE-WDM-2024-001234.pdf",
      "verificationURL": "https://pinnacle.com/verify/PINNACLE-WDM-2024-001234"
    }
  }
  ```

**GET /api/certificates/verify/{certificateNumber}**
- **Auth**: Not Required (Public endpoint)
- **Description**: Verify certificate authenticity
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "isValid": true,
      "certificateNumber": "PINNACLE-WDM-2024-001234",
      "recipientName": "John Doe",
      "courseName": "Web Development Mastery",
      "issuedAt": "2024-01-25T11:00:00Z",
      "status": "active",
      "issuer": "PINNACLE Learning Platform"
    }
  }
  ```
- **Response 404**:
  ```json
  {
    "success": false,
    "error": "Not Found",
    "message": "Certificate not found or invalid"
  }
  ```

**POST /api/certificates/download/{certificateId}**
- **Auth**: Required
- **Description**: Download certificate PDF
- **Response 200**: Binary PDF file with headers
  ```
  Content-Type: application/pdf
  Content-Disposition: attachment; filename="PINNACLE-WDM-2024-001234.pdf"
  ```

#### Business Rules
- Certificate auto-generated when user passes final exam
- Certificate number format: PINNACLE-{COURSE_CODE}-{YEAR}-{SEQUENCE}
- Certificate PDF generated with user name, course details, issue date
- Verification URL is publicly accessible without authentication
- One certificate per user per course (unique constraint)
- Certificate status can be revoked by admin

---

## 11. ANALYTICS MODULE

### MongoDB Collection: `user_analytics`
*Note: This is an aggregated/computed collection updated periodically*

#### Fields
```javascript
{
  _id: ObjectId,
  userId: ObjectId,           // Reference to user (indexed)
  totalXP: Number,            // Across all courses
  totalCoursesEnrolled: Number,
  totalCoursesCompleted: Number,
  totalLevelsCompleted: Number,
  totalQuizzesPassed: Number,
  totalExamsPassed: Number,
  totalCertificates: Number,
  learningStreak: {
    current: Number,          // Days
    longest: Number           // Days
  },
  timeSpent: {
    totalMinutes: Number,
    last7Days: Number,
    last30Days: Number,
    averagePerDay: Number
  },
  skillDistribution: {
    foundation: Number,       // XP in each category
    fundamentals: Number,
    intermediate: Number,
    advanced: Number,
    expert: Number,
    mastery: Number,
    professional: Number,
    competence: Number
  },
  activityByDay: [
    {
      date: Date,
      minutesSpent: Number,
      xpEarned: Number,
      lessonsCompleted: Number
    }
  ],
  recentActivity: [
    {
      type: String,           // "video" | "quiz" | "level" | "exam" | "certificate"
      title: String,
      courseTitle: String,
      timestamp: Date,
      xpEarned: Number
    }
  ],
  lastCalculatedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### API Endpoints

**GET /api/analytics/overview**
- **Auth**: Required
- **Description**: Get user's overall analytics
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "totalXP": 2750,
      "currentStreak": 12,
      "longestStreak": 18,
      "totalCoursesEnrolled": 3,
      "totalCoursesCompleted": 1,
      "totalCertificates": 1,
      "skillDistribution": {
        "foundation": 450,
        "fundamentals": 620,
        "intermediate": 780,
        "advanced": 400,
        "expert": 300,
        "mastery": 150,
        "professional": 50,
        "competence": 0
      },
      "timeSpent": {
        "totalHours": 87,
        "last7DaysHours": 12,
        "averagePerDayMinutes": 45
      }
    }
  }
  ```

**GET /api/analytics/progress-chart**
- **Auth**: Required
- **Query Parameters**:
  - `period` (optional): "7d" | "30d" | "90d" | "1y" (default: "30d")
- **Description**: Get progress chart data
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "period": "30d",
      "dataPoints": [
        {
          "date": "2024-01-01",
          "xpEarned": 120,
          "minutesSpent": 85,
          "lessonsCompleted": 3
        },
        {
          "date": "2024-01-02",
          "xpEarned": 95,
          "minutesSpent": 60,
          "lessonsCompleted": 2
        }
      ],
      "totals": {
        "totalXP": 2750,
        "totalMinutes": 3420,
        "totalLessons": 45
      }
    }
  }
  ```

**GET /api/analytics/course/{courseId}**
- **Auth**: Required
- **Description**: Get analytics for a specific course
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "courseId": "507f1f77bcf86cd799439012",
      "courseTitle": "Web Development Mastery",
      "completionPercentage": 100,
      "totalXPEarned": 1350,
      "totalTimeSpentHours": 52,
      "levelBreakdown": [
        {
          "levelNumber": 1,
          "title": "Foundation",
          "progress": 100,
          "xpEarned": 100,
          "timeSpentMinutes": 420,
          "completedAt": "2024-01-18T15:30:00Z"
        }
      ],
      "quizPerformance": {
        "totalQuizzes": 16,
        "passed": 14,
        "averageScore": 87,
        "totalAttempts": 18
      },
      "finalExam": {
        "passed": true,
        "score": 190,
        "percentage": 76,
        "attempts": 1
      }
    }
  }
  ```

**GET /api/analytics/recent-activity**
- **Auth**: Required
- **Query Parameters**:
  - `limit` (optional, default: 10): Number of activities
- **Description**: Get recent learning activities
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "activities": [
        {
          "activityId": "507f1f77bcf86cd79943901b",
          "type": "certificate",
          "title": "Certificate Earned",
          "description": "Completed Web Development Mastery",
          "courseTitle": "Web Development Mastery",
          "timestamp": "2024-01-25T11:00:00Z",
          "xpEarned": 500,
          "icon": "certificate"
        },
        {
          "activityId": "507f1f77bcf86cd79943901c",
          "type": "exam",
          "title": "Final Exam Passed",
          "description": "Scored 76%",
          "courseTitle": "Web Development Mastery",
          "timestamp": "2024-01-25T10:45:00Z",
          "xpEarned": 500,
          "icon": "exam"
        }
      ]
    }
  }
  ```

**GET /api/analytics/leaderboard**
- **Auth**: Optional
- **Query Parameters**:
  - `scope` (optional): "global" | "course" (default: "global")
  - `courseId` (required if scope=course): Course ID
  - `period` (optional): "all" | "week" | "month" (default: "all")
  - `limit` (optional, default: 10): Number of users
- **Description**: Get leaderboard rankings
- **Response 200**:
  ```json
  {
    "success": true,
    "data": {
      "scope": "global",
      "period": "all",
      "rankings": [
        {
          "rank": 1,
          "userId": "507f1f77bcf86cd799439022",
          "displayName": "Alice Johnson",
          "photoURL": "https://example.com/alice.jpg",
          "totalXP": 5420,
          "coursesCompleted": 4,
          "certificates": 4,
          "isCurrentUser": false
        }
      ],
      "currentUserRank": {
        "rank": 15,
        "totalXP": 2750,
        "coursesCompleted": 1
      }
    }
  }
  ```

#### Business Rules
- Analytics recalculated daily via batch job
- Real-time updates for critical metrics (XP, streak)
- Activity feed limited to last 100 activities
- Skill distribution based on level categories
- Streak breaks if no activity for 24+ hours
- Leaderboard updates hourly

---

## COMPLETE API ENDPOINT SUMMARY

### Authentication Endpoints
- `POST /api/users/register` - Create user profile
- `GET /api/users/profile` - Get current user
- `PUT /api/users/profile` - Update user profile

### Course Catalog Endpoints
- `GET /api/courses` - List all active courses (public)
- `GET /api/courses/{courseId}` - Get course details (public)
- `GET /api/courses/{courseId}/preview` - Get course preview (public)

### Level & Content Endpoints
- `GET /api/courses/{courseId}/levels` - List all levels
- `GET /api/courses/{courseId}/levels/{levelId}` - Get level details
- `GET /api/courses/{courseId}/levels/{levelId}/contents` - List level contents
- `GET /api/contents/{contentId}` - Get content details

### Roadmap Endpoints
- `GET /api/courses/{courseId}/roadmap` - Get course roadmap with progress

### Quiz Endpoints
- `GET /api/quizzes/{quizId}` - Get quiz (without answers)
- `POST /api/quizzes/{quizId}/submit` - Submit quiz answers
- `GET /api/quizzes/{quizId}/attempts` - Get quiz attempt history

### Progress Tracking Endpoints
- `GET /api/progress/courses/{courseId}` - Get course progress
- `POST /api/progress/content` - Update content progress
- `POST /api/progress/level-complete` - Mark level complete (auto)

### Enrollment Endpoints
- `POST /api/enrollments` - Enroll in course
- `GET /api/enrollments` - List user enrollments
- `GET /api/enrollments/{enrollmentId}` - Get enrollment details
- `DELETE /api/enrollments/{enrollmentId}` - Drop enrollment

### Final Exam Endpoints
- `GET /api/courses/{courseId}/exam` - Get exam details
- `POST /api/exams/{examId}/start` - Start exam
- `POST /api/exams/{examId}/submit` - Submit exam
- `GET /api/exams/{examId}/attempts` - Get exam attempts

### Certificate Endpoints
- `GET /api/certificates` - List user certificates
- `GET /api/certificates/{certificateId}` - Get certificate details
- `GET /api/certificates/verify/{certificateNumber}` - Verify certificate (public)
- `POST /api/certificates/download/{certificateId}` - Download certificate PDF

### Analytics Endpoints
- `GET /api/analytics/overview` - Get overall analytics
- `GET /api/analytics/progress-chart` - Get progress chart data
- `GET /api/analytics/course/{courseId}` - Get course analytics
- `GET /api/analytics/recent-activity` - Get recent activities
- `GET /api/analytics/leaderboard` - Get leaderboard rankings

---

## DATA FLOW DIAGRAMS

### Flow 1: Viewing Courses
```
Frontend (Browse Courses Page)
    ↓
    GET /api/courses
    ↓
Backend Controller
    ↓
Backend Service (CourseService)
    ↓
MongoDB: courses collection (find all active courses)
    ↓
Backend Service (adds isEnrolled flag if user authenticated)
    ↓
Backend Controller
    ↓
Frontend (Display course cards)
```

### Flow 2: Enrolling in Course
```
Frontend (Course Detail Page)
    ↓
    POST /api/enrollments { courseId }
    ↓
Backend Controller (verifies JWT)
    ↓
Backend Service (EnrollmentService)
    ├── Check prerequisites in courses collection
    ├── Check duplicate enrollment
    ├── Create enrollment document
    ├── Create initial progress document
    ├── Unlock Level 1
    └── Increment course enrollment count
    ↓
MongoDB: enrollments, user_progress collections
    ↓
Backend Controller
    ↓
Frontend (Redirect to roadmap)
```

### Flow 3: Learning (Watching Video)
```
Frontend (Video Player Component)
    ↓ (Every 10 seconds)
    POST /api/progress/content { contentId, watchPercentage, position }
    ↓
Backend Controller (verifies JWT)
    ↓
Backend Service (ProgressService)
    ├── Update contentProgress array
    ├── Calculate level progress
    ├── Check if video complete (90%+)
    ├── Award XP if first completion
    ├── Check if all level content complete
    └── Auto-complete level if ready
    ↓
MongoDB: user_progress collection (update)
    ↓
Backend Controller
    ↓
Frontend (Update UI with progress)
```

### Flow 4: Taking Quiz
```
Frontend (Quiz Page)
    ↓
    GET /api/quizzes/{quizId}
    ↓
Backend: Return questions WITHOUT correct answers
    ↓
Frontend (User answers questions)
    ↓
    POST /api/quizzes/{quizId}/submit { answers }
    ↓
Backend Controller (verifies JWT)
    ↓
Backend Service (QuizService)
    ├── Validate time limit
    ├── Validate attempt count
    ├── Grade answers (server-side)
    ├── Calculate score
    ├── Award XP if passing
    ├── Update user_progress
    ├── Update level progress
    └── Return results with explanations
    ↓
MongoDB: user_progress collection
    ↓
Backend Controller
    ↓
Frontend (Display results with correct/incorrect)
```

### Flow 5: Completing Course & Getting Certificate
```
User completes all levels
    ↓
Backend (ProgressService auto-checks)
    ├── All 8 levels completed?
    ├── All required content done?
    └── Unlock final exam
    ↓
User takes final exam
    ↓
    POST /api/exams/{examId}/submit
    ↓
Backend Service (ExamService)
    ├── Grade exam
    ├── Pass? (75%+)
    ├── Award XP
    ├── Update enrollment status = "completed"
    └── Trigger certificate generation
    ↓
Backend Service (CertificateService)
    ├── Generate unique certificate number
    ├── Create certificate document
    ├── Generate PDF certificate
    ├── Store PDF in cloud storage
    └── Update enrollment.certificateIssued = true
    ↓
MongoDB: certificates, enrollments collections
    ↓
Backend Controller
    ↓
Frontend (Show success + certificate download)
```

---

## BACKEND RESPONSIBILITIES

### 1. Authentication & Authorization
- Verify Firebase JWT tokens
- Validate user permissions
- Manage user sessions
- Handle token refresh

### 2. Business Logic
- Course enrollment validation
- Level unlock rules
- Quiz grading and validation
- Exam eligibility checks
- Certificate generation
- XP calculation
- Progress tracking
- Streak calculation

### 3. Data Validation
- Input validation for all endpoints
- Sanitize user inputs
- Validate MongoDB ObjectId formats
- Check data constraints

### 4. Data Aggregation
- Calculate course progress
- Compute roadmap status
- Generate analytics
- Create leaderboards

### 5. File Management
- Generate certificate PDFs
- Store files in cloud (AWS S3/Google Cloud Storage)
- Serve file URLs

### 6. Notifications (Future)
- Email notifications
- Push notifications
- In-app notifications

---

## FRONTEND RESPONSIBILITIES

### 1. User Interface
- Render all pages and components
- Handle user interactions
- Display data from backend

### 2. Client-Side Validation
- Form validation (basic)
- Input format checks
- User feedback

### 3. State Management
- Store user session (React Context)
- Cache API responses
- Manage UI state

### 4. API Communication
- Make HTTP requests via Axios
- Handle loading states
- Handle error responses
- Retry failed requests

### 5. Routing
- Navigate between pages
- Protected routes (auth required)
- URL management

### 6. Asset Management
- Display images, videos
- Handle responsive design
- Optimize media loading

---

## ERROR RESPONSE FORMAT

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Human-readable error message",
  "details": {
    // Optional: additional context
  },
  "timestamp": "2024-01-20T10:00:00Z"
}
```

### Common Error Codes

**400 Bad Request**
```json
{
  "success": false,
  "error": "Bad Request",
  "message": "Invalid input data",
  "details": {
    "field": "email",
    "issue": "Invalid email format"
  }
}
```

**401 Unauthorized**
```json
{
  "success": false,
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

**403 Forbidden**
```json
{
  "success": false,
  "error": "Forbidden",
  "message": "You don't have permission to access this resource"
}
```

**404 Not Found**
```json
{
  "success": false,
  "error": "Not Found",
  "message": "Resource not found"
}
```

**409 Conflict**
```json
{
  "success": false,
  "error": "Conflict",
  "message": "Already enrolled in this course"
}
```

**429 Too Many Requests**
```json
{
  "success": false,
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Try again later."
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred. Please try again later."
}
```

---

## SPRING BOOT IMPLEMENTATION STRUCTURE

### Recommended Package Structure
```
com.pinnacle.backend/
├── config/
│   ├── FirebaseConfig.java
│   ├── MongoConfig.java
│   ├── SecurityConfig.java
│   └── CorsConfig.java
├── controller/
│   ├── UserController.java
│   ├── CourseController.java
│   ├── LevelController.java
│   ├── ContentController.java
│   ├── QuizController.java
│   ├── EnrollmentController.java
│   ├── ProgressController.java
│   ├── ExamController.java
│   ├── CertificateController.java
│   └── AnalyticsController.java
├── service/
│   ├── UserService.java
│   ├── CourseService.java
│   ├── LevelService.java
│   ├── ContentService.java
│   ├── QuizService.java
│   ├── EnrollmentService.java
│   ├── ProgressService.java
│   ├── ExamService.java
│   ├── CertificateService.java
│   ├── AnalyticsService.java
│   └── FirebaseAuthService.java
├── repository/
│   ├── UserRepository.java
│   ├── CourseRepository.java
│   ├── LevelRepository.java
│   ├── ContentRepository.java
│   ├── QuizRepository.java
│   ├── EnrollmentRepository.java
│   ├── ProgressRepository.java
│   ├── ExamRepository.java
│   ├── CertificateRepository.java
│   └── AnalyticsRepository.java
├── model/
│   ├── User.java
│   ├── Course.java
│   ├── Level.java
│   ├── Content.java
│   ├── Quiz.java
│   ├── Enrollment.java
│   ├── Progress.java
│   ├── Exam.java
│   ├── Certificate.java
│   └── Analytics.java
├── dto/
│   ├── request/
│   └── response/
├── exception/
│   ├── GlobalExceptionHandler.java
│   ├── ResourceNotFoundException.java
│   ├── DuplicateEnrollmentException.java
│   └── UnauthorizedException.java
├── security/
│   ├── FirebaseTokenFilter.java
│   └── SecurityUtils.java
└── util/
    ├── ResponseUtil.java
    ├── CertificateGenerator.java
    └── XPCalculator.java
```

### Key Dependencies (pom.xml)
```xml
<dependencies>
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- MongoDB -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-mongodb</artifactId>
    </dependency>
    
    <!-- Firebase Admin SDK -->
    <dependency>
        <groupId>com.google.firebase</groupId>
        <artifactId>firebase-admin</artifactId>
        <version>9.2.0</version>
    </dependency>
    
    <!-- Security -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- PDF Generation -->
    <dependency>
        <groupId>com.itextpdf</groupId>
        <artifactId>itext7-core</artifactId>
        <version>8.0.2</version>
    </dependency>
</dependencies>
```

---

## SUMMARY

This backend contract provides:

✅ **Complete MongoDB Schema** for 11 collections with field types and samples
✅ **50+ REST API Endpoints** with full request/response examples
✅ **Authentication** using Firebase JWT
✅ **Business Logic Rules** for enrollment, progress, quizzes, exams, certificates
✅ **Data Flow Diagrams** showing Frontend ↔ Backend ↔ Database interactions
✅ **Error Handling** with standard response formats
✅ **Spring Boot Structure** with recommended package organization

**This contract is ready for implementation. Backend developers can directly:**
1. Create MongoDB collections
2. Define Spring Boot entities
3. Build repositories
4. Implement services
5. Create REST controllers
6. Test with these exact payload formats