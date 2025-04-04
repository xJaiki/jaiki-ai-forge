import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ErrorBoundary from './pages/ErrorBoundary';
import ToastProvider from './components/ui/ToastProvider';
import KineticTypographyLandscape from './pages/Idee/KineticTypographyLandscape/KineticTypographyLandscape';
import ChronologicalLayering from './pages/Idee/ChronologicalLayering';
import WireframeDeconstruction from './pages/Idee/WireframeDeconstruction/WireframeDeconstruction';
import SensorySynesthesiaCanvas from './pages/Idee/SensorySynesthesiaCanvas/SensorySynesthesiaCanvas';
import ParallelUniverseNavigation from './pages/Idee/ParallelUniverseNavigation/ParallelUniverseNavigation';
import TactileMaterialLayers from './pages/Idee/TactileMaterialLayers/TactileMaterialLayers';
function App() {
  return (
    <Router>
      <ToastProvider />
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/ChronologicalLayering"
            element={
              <Layout>
                <ChronologicalLayering />
              </Layout>
            }
          />
          <Route
            path="/KineticTypographyLandscape"
            element={
              <Layout>
                <KineticTypographyLandscape />
              </Layout>
            }
          />
          <Route
            path="/WireframeDeconstruction"
            element={
              <Layout>
                <WireframeDeconstruction />
              </Layout>
            }
          />
            <Route
            path="/SensorySynesthesiaCanvas"
            element={
              <Layout>
                <SensorySynesthesiaCanvas />
              </Layout>
            }
          />
          <Route
            path="/ParallelUniverseNavigation"
            element={
              <Layout>
                <ParallelUniverseNavigation />
              </Layout>
            }
          />
          <Route
            path="/TactileMaterialLayers"
            element={
              <Layout>
                <TactileMaterialLayers />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;