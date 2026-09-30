import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle, Trophy, BookOpen } from 'lucide-react';
import { courseService } from '../services/courseService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { EmptyState } from '../components/EmptyState';

export const MyCoursesPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const res = await courseService.getMyEnrollments();
        if (res.data?.enrollments) {
          setEnrollments(res.data.enrollments);
        }
      } catch (err) {
        console.error('Error loading enrolled courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading Your Student Dashboard..." />;
  }

  return (
    <div className="my-courses-page container">
      <div className="dashboard-header">
        <div className="header-text">
          <h1 className="dashboard-title">MY <span className="text-gradient-purple">COURSES & MASTERY</span></h1>
          <p className="dashboard-sub">Track your video module progress and practice drills</p>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div style={{ marginTop: '2rem' }}>
          <EmptyState
            title="No Enrolled Courses Found"
            message="You haven't enrolled in any GG Academy mastery courses yet. Explore our catalog to start learning."
          />
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/shop" className="btn btn-primary">
              Explore Courses & Configs
            </Link>
          </div>
        </div>
      ) : (
        <div className="courses-grid">
          {enrollments.map((enr) => {
            const course = enr.course;
            const progress = enr.progressPercentage || 0;
            const thumbUrl =
              course.thumbnail ||
              'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80';

            return (
              <div key={enr.id} className="course-card glass-card">
                <div className="thumb-wrap">
                  <img src={thumbUrl} alt={course.title} className="course-thumb" />
                  <span className="progress-badge">{progress}% Completed</span>
                </div>

                <div className="card-body">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.shortDescription || course.description}</p>

                  {/* Progress Bar */}
                  <div className="progress-container">
                    <div className="progress-labels">
                      <span>{enr.completedLessons} of {enr.totalLessons} Lessons</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>

                  <Link to={`/courses/${course.slug}`} className="btn btn-primary continue-btn">
                    <PlayCircle size={18} /> Continue Learning
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        .my-courses-page {
          padding-top: 3rem;
          padding-bottom: 5rem;
        }

        .dashboard-header {
          margin-bottom: 2.5rem;
        }

        .dashboard-title {
          font-size: 2.6rem;
          margin-bottom: 0.4rem;
        }

        .dashboard-sub {
          color: var(--text-secondary);
          font-size: 1.05rem;
        }

        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .course-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .thumb-wrap {
          position: relative;
          height: 200px;
        }

        .course-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .progress-badge {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(18, 21, 30, 0.9);
          border: 1px solid var(--accent-cyan);
          color: var(--accent-cyan);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .course-title {
          font-size: 1.2rem;
          margin: 0;
          line-height: 1.3;
        }

        .course-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: auto;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-cyan));
          border-radius: 4px;
          transition: width 0.4s ease;
        }

        .continue-btn {
          width: 100%;
          justify-content: center;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};
