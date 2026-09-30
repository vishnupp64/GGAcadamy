import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, PlayCircle, Lock, ArrowLeft, Award, Clock } from 'lucide-react';
import { courseService } from '../services/courseService';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const CourseViewPage = () => {
  const { slug } = useParams();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const res = await courseService.getCourseBySlug(slug);
        if (res.data?.course) {
          setCourse(res.data.course);
          setIsEnrolled(res.data.isEnrolled || false);
          setCompletedLessonIds(res.data.completedLessonIds || []);

          // Set default active lesson to first lesson of first module
          const firstModule = res.data.course.modules?.[0];
          const firstLesson = firstModule?.lessons?.[0];
          if (firstLesson) {
            setActiveLesson(firstLesson);
          }
        }
      } catch (err) {
        console.error('Error loading course content:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [slug]);

  const handleToggleComplete = async (lessonId) => {
    try {
      const res = await courseService.toggleLessonCompletion(lessonId);
      if (res.data?.isCompleted) {
        setCompletedLessonIds((prev) => [...prev, lessonId]);
      } else {
        setCompletedLessonIds((prev) => prev.filter((id) => id !== lessonId));
      }
    } catch (err) {
      console.error('Failed toggling lesson completion:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Opening Video Player & Lesson Modules..." />;
  }

  if (!course) {
    return (
      <div className="container text-center" style={{ padding: '5rem 0' }}>
        <h2>Course Not Found</h2>
        <Link to="/my-courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to My Courses
        </Link>
      </div>
    );
  }

  // Calculate totals
  let totalLessonsCount = 0;
  course.modules?.forEach((m) => {
    totalLessonsCount += m.lessons?.length || 0;
  });
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  const isCurrentCompleted = activeLesson ? completedLessonIds.includes(activeLesson.id) : false;
  const canAccessCurrent = isEnrolled || activeLesson?.isFreePreview;

  return (
    <div className="course-view-page">
      <div className="container view-header">
        <Link to="/my-courses" className="back-link">
          <ArrowLeft size={18} /> Back to My Courses
        </Link>
        <div className="header-meta">
          <h1 className="course-title">{course.title}</h1>
          <div className="progress-badge-chip">
            <Award size={16} color="#00f0ff" /> {progressPercent}% Completed ({completedCount}/{totalLessonsCount})
          </div>
        </div>
      </div>

      <div className="container player-layout">
        {/* Main Video & Content Area */}
        <div className="player-main">
          {activeLesson ? (
            <div className="video-card glass-card">
              {canAccessCurrent ? (
                <div className="video-responsive">
                  <iframe
                    src={activeLesson.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                    title={activeLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="locked-placeholder">
                  <Lock size={48} color="#ff0055" />
                  <h3>Content Locked</h3>
                  <p>Enroll or purchase this course bundle to view full video modules.</p>
                  <Link to={`/products/${course.slug}`} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Enroll Now
                  </Link>
                </div>
              )}

              <div className="lesson-info-bar">
                <div className="lesson-details">
                  <h2 className="lesson-title">{activeLesson.title}</h2>
                  {activeLesson.duration && (
                    <span className="lesson-duration">
                      <Clock size={16} /> {activeLesson.duration}
                    </span>
                  )}
                </div>

                {isEnrolled && (
                  <button
                    onClick={() => handleToggleComplete(activeLesson.id)}
                    className={`complete-toggle-btn ${isCurrentCompleted ? 'completed' : ''}`}
                  >
                    <CheckCircle2 size={18} />
                    {isCurrentCompleted ? 'Completed' : 'Mark as Complete'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
              Select a lesson from the module sidebar to start watching.
            </div>
          )}

          <div className="glass-card course-desc-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
            <h3>Course Overview</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginTop: '0.5rem' }}>
              {course.description}
            </p>
          </div>
        </div>

        {/* Modules & Lessons Sidebar */}
        <aside className="modules-sidebar glass-card">
          <h3 className="sidebar-heading">Course Curriculum</h3>

          <div className="modules-accordion">
            {course.modules?.map((mod, modIdx) => (
              <div key={mod.id} className="module-group">
                <div className="module-title-bar">
                  <span className="module-title">{mod.title}</span>
                </div>

                <ul className="lessons-list">
                  {mod.lessons?.map((les) => {
                    const isSelected = activeLesson?.id === les.id;
                    const isDone = completedLessonIds.includes(les.id);
                    const canView = isEnrolled || les.isFreePreview;

                    return (
                      <li
                        key={les.id}
                        className={`lesson-item ${isSelected ? 'active' : ''} ${isDone ? 'done' : ''}`}
                        onClick={() => setActiveLesson(les)}
                      >
                        <div className="lesson-left">
                          {isDone ? (
                            <CheckCircle2 size={16} color="#00f0ff" />
                          ) : canView ? (
                            <PlayCircle size={16} color="#7000ff" />
                          ) : (
                            <Lock size={16} color="#ff0055" />
                          )}
                          <span className="lesson-name">{les.title}</span>
                        </div>

                        {les.isFreePreview && !isEnrolled && (
                          <span className="preview-chip">PREVIEW</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        .course-view-page {
          padding-top: 2rem;
          padding-bottom: 5rem;
        }

        .view-header {
          margin-bottom: 2rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-weight: 600;
          margin-bottom: 0.8rem;
        }

        .header-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .course-title {
          font-size: 2.2rem;
          margin: 0;
        }

        .progress-badge-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 240, 255, 0.1);
          border: 1px solid rgba(0, 240, 255, 0.3);
          color: var(--accent-cyan);
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-size: 0.88rem;
          font-weight: 800;
        }

        .player-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }

        .video-card {
          padding: 0.75rem;
          overflow: hidden;
        }

        .video-responsive {
          position: relative;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          height: 0;
          overflow: hidden;
          border-radius: 12px;
        }

        .video-responsive iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
        }

        .locked-placeholder {
          height: 380px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          text-align: center;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 12px;
          padding: 2rem;
        }

        .lesson-info-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.2rem 0.5rem 0.5rem 0.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .lesson-title {
          font-size: 1.3rem;
          margin: 0;
        }

        .lesson-duration {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .complete-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: #fff;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .complete-toggle-btn.completed {
          background: rgba(0, 240, 255, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .modules-sidebar {
          padding: 1.5rem;
          height: fit-content;
        }

        .sidebar-heading {
          font-size: 1.1rem;
          margin-bottom: 1.2rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modules-accordion {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .module-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-cyan);
        }

        .lessons-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.5rem;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: background 0.2s ease;
        }

        .lesson-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .lesson-item.active {
          background: rgba(112, 0, 255, 0.2);
          color: #fff;
          font-weight: 700;
        }

        .lesson-left {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .preview-chip {
          background: rgba(255, 184, 0, 0.2);
          color: var(--accent-gold);
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
        }

        @media (max-width: 992px) {
          .player-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
