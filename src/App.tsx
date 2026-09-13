import { useState, useEffect } from 'react';
import { INITIAL_PROJECTS, INITIAL_CHEERS } from './data/projects';
import { ProjectPin, ProjectCategory, CheerMessage } from './types';
import { Header } from './components/Header';
import { ExploreWall } from './components/ExploreWall';
import { TagsAndStacksView } from './components/TagsAndStacksView';
import { PinProjectView } from './components/PinProjectView';
import { ProjectDetailView } from './components/ProjectDetailView';
import { TipModal } from './components/TipModal';
import { ManifestoModal } from './components/ManifestoModal';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';

export default function App() {
  // Load persisted projects or fallback to initial
  const [projects, setProjects] = useState<ProjectPin[]>(() => {
    try {
      const saved = localStorage.getItem('the_pinboard_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_PROJECTS;
  });

  // Load cheers
  const [cheers, setCheers] = useState<CheerMessage[]>(() => {
    try {
      const saved = localStorage.getItem('the_pinboard_cheers');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
    }
    return INITIAL_CHEERS;
  });

  // Navigation screen
  const [activeScreen, setActiveScreen] = useState<'explore-wall' | 'tags-and-stacks' | 'pin-a-project' | 'project-detail'>('explore-wall');
  const [selectedProject, setSelectedProject] = useState<ProjectPin | null>(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All Pins');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [tipModalState, setTipModalState] = useState<{
    isOpen: boolean;
    project: ProjectPin | null;
    initialAmount: number;
  }>({
    isOpen: false,
    project: null,
    initialAmount: 5,
  });

  const [manifestoOpen, setManifestoOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('the_pinboard_projects', JSON.stringify(projects));
    } catch (e) {
      console.error('Error writing projects to localStorage', e);
    }
  }, [projects]);

  // Save cheers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('the_pinboard_cheers', JSON.stringify(cheers));
    } catch (e) {
      console.error('Error writing cheers to localStorage', e);
    }
  }, [cheers]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleCopyText = (text: string, label: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          showToast(`Detached slip: "${label}" copied to clipboard!`);
        })
        .catch(() => {
          showToast(`Slip detached: "${text}"`);
        });
    } else {
      showToast(`Slip detached: "${text}"`);
    }
  };

  const handleOpenTipModal = (project: ProjectPin, tier: number = 5) => {
    setTipModalState({
      isOpen: true,
      project,
      initialAmount: tier,
    });
  };

  const handleSendTip = (projectId: string, amount: number, message: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId) {
          return {
            ...p,
            tipTotal: (p.tipTotal || 0) + amount,
            supporters: (p.supporters || 0) + 1,
          };
        }
        return p;
      })
    );

    const targetProject = projects.find(p => p.id === projectId);
    const newCheer: CheerMessage = {
      id: `cheer-${Date.now()}`,
      projectId,
      author: 'Indie Patron',
      amount,
      message,
      timestamp: 'Just now',
    };
    setCheers(prev => [newCheer, ...prev]);

    showToast(`Sent $${amount} direct micro-grant to ${targetProject?.title || 'indie builder'}! ★`);
  };

  const handleAddProject = (newPin: ProjectPin) => {
    setProjects(prev => [newPin, ...prev]);
    setActiveScreen('explore-wall');
    showToast(`🎉 "${newPin.title}" successfully pinned to the live matrix!`);
  };

  const handleSelectProject = (project: ProjectPin) => {
    setSelectedProject(project);
    setActiveScreen('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCheer = (projectId: string, author: string, message: string, amount?: number) => {
    const newCheer: CheerMessage = {
      id: `cheer-${Date.now()}`,
      projectId,
      author,
      amount,
      message,
      timestamp: 'Just now',
    };
    setCheers(prev => [newCheer, ...prev]);
    showToast('Your cheer was posted to the community board!');
  };

  // Filter projects by global search query
  const filteredProjects = projects.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.pitch.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.stacks.some(s => s.toLowerCase().includes(q)) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  const totalTips = projects.reduce((acc, p) => acc + (p.tipTotal || 0), 1420);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-on-surface font-body flex flex-col selection:bg-primary/20 selection:text-primary relative overflow-x-hidden">
      {/* Fixed Header */}
      <Header
        activeScreen={activeScreen === 'project-detail' ? 'explore-wall' : activeScreen}
        setActiveScreen={(scr) => {
          setActiveScreen(scr);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        pinCount={projects.length}
        onOpenPinModal={() => {
          setActiveScreen('pin-a-project');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenManifesto={() => setManifestoOpen(true)}
      />

      {/* Main Content Area with top padding for fixed navbar */}
      <main className="flex-1 w-full pt-20 bg-[#0a0e1a] relative">
        {searchQuery.trim() && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container/70 border border-primary/20 text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[16px]">filter_alt</span>
                Filtered by search: <strong className="text-primary">"{searchQuery}"</strong> ({filteredProjects.length} matches)
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-primary hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>
          </div>
        )}

        {/* Screen 1 / 5: Explore Wall */}
        {activeScreen === 'explore-wall' && (
          <ExploreWall
            projects={filteredProjects}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onOpenTipModal={handleOpenTipModal}
            onCopyText={handleCopyText}
            onOpenPinModal={() => {
              setActiveScreen('pin-a-project');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProject={handleSelectProject}
            totalTips={totalTips}
          />
        )}

        {/* Screen 2 / 3: Tags & Stacks */}
        {activeScreen === 'tags-and-stacks' && (
          <TagsAndStacksView
            projects={filteredProjects}
            onSelectProject={handleSelectProject}
            onOpenTipModal={handleOpenTipModal}
            onCopyText={handleCopyText}
          />
        )}

        {/* Screen 3 / 8: Pin A Project Composer */}
        {activeScreen === 'pin-a-project' && (
          <PinProjectView
            onAddProject={handleAddProject}
            onCancel={() => {
              setActiveScreen('explore-wall');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Screen 4 / 7: Project Detail View */}
        {activeScreen === 'project-detail' && selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            cheers={cheers}
            onBack={() => {
              setActiveScreen('explore-wall');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTipModal={handleOpenTipModal}
            onCopyText={handleCopyText}
            onAddCheer={handleAddCheer}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(screen) => {
          setActiveScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenManifesto={() => setManifestoOpen(true)}
        onShowRadar={() => {
          setActiveScreen('tags-and-stacks');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Tip Modal */}
      <TipModal
        isOpen={tipModalState.isOpen}
        project={tipModalState.project}
        initialAmount={tipModalState.initialAmount}
        onClose={() => setTipModalState(prev => ({ ...prev, isOpen: false }))}
        onSendTip={handleSendTip}
      />

      {/* Manifesto Modal */}
      <ManifestoModal
        isOpen={manifestoOpen}
        onClose={() => setManifestoOpen(false)}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        visible={toastVisible}
      />
    </div>
  );
}
