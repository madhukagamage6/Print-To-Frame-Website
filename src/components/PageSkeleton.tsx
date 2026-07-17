import React from 'react';
import { Page } from '../types';

interface PageSkeletonProps {
  page: Page;
}

export default function PageSkeleton({ page }: PageSkeletonProps) {
  // Common skeleton block helper
  const pulseBlock = (className: string) => (
    <div className={`animate-pulse bg-surface-container-high/50 rounded ${className}`} />
  );

  const pulseHighlight = (className: string) => (
    <div className={`animate-pulse bg-primary-container/20 rounded ${className}`} />
  );

  switch (page) {
    case 'home':
      return (
        <div className="w-full">
          {/* Hero Section Skeleton */}
          <section className="relative min-h-[90vh] flex items-center justify-center pt-16 pb-32">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 technical-grid opacity-15"></div>
            </div>
            
            <div className="relative z-10 max-w-5xl px-6 md:px-12 text-left w-full mx-auto flex flex-col items-start space-y-6">
              {pulseHighlight('w-72 h-4')}
              {pulseBlock('w-full max-w-3xl h-14 md:h-16')}
              {pulseBlock('w-5/6 max-w-2xl h-14 md:h-16')}
              <div className="space-y-2.5 w-full max-w-xl pt-2">
                {pulseBlock('w-full h-4')}
                {pulseBlock('w-11/12 h-4')}
                {pulseBlock('w-4/5 h-4')}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
                {pulseHighlight('w-full sm:w-56 h-14')}
                {pulseBlock('w-full sm:w-52 h-14')}
              </div>
            </div>
          </section>

          {/* Advantage Section Skeleton */}
          <section className="py-24 bg-surface-container-lowest border-t border-outline-variant/10 relative">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="text-center mb-20 space-y-4">
                {pulseHighlight('w-44 h-3 mx-auto')}
                {pulseBlock('w-80 h-10 mx-auto')}
                <div className="h-1 w-24 bg-primary-container/30 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 lg:row-span-2 border border-outline-variant/10 bg-surface-container-low rounded-xl p-8 space-y-6 h-80 lg:h-auto flex flex-col justify-between">
                  <div className="space-y-4">
                    {pulseBlock('w-12 h-12 rounded-xl')}
                    {pulseHighlight('w-32 h-3')}
                    {pulseBlock('w-2/3 h-8')}
                    {pulseBlock('w-full h-4')}
                  </div>
                  {pulseBlock('w-28 h-4')}
                </div>
                <div className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-4 h-44">
                  {pulseBlock('w-10 h-10 rounded-lg')}
                  {pulseHighlight('w-24 h-3')}
                  {pulseBlock('w-4/5 h-5')}
                </div>
                <div className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-4 h-44">
                  {pulseBlock('w-10 h-10 rounded-lg')}
                  {pulseHighlight('w-28 h-3')}
                  {pulseBlock('w-3/4 h-5')}
                </div>
                <div className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-4 h-44">
                  {pulseBlock('w-10 h-10 rounded-lg')}
                  {pulseHighlight('w-20 h-3')}
                  {pulseBlock('w-5/6 h-5')}
                </div>
                <div className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-4 h-44">
                  {pulseBlock('w-10 h-10 rounded-lg')}
                  {pulseHighlight('w-24 h-3')}
                  {pulseBlock('w-2/3 h-5')}
                </div>
              </div>
            </div>
          </section>
        </div>
      );

    case 'process':
      return (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-16">
          <header className="max-w-3xl space-y-4">
            {pulseHighlight('w-48 h-3')}
            {pulseBlock('w-80 h-10')}
            <div className="space-y-2">
              {pulseBlock('w-full h-4')}
              {pulseBlock('w-2/3 h-4')}
            </div>
          </header>

          <div className="space-y-6 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-full border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 flex items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5 flex-1">
                  {pulseHighlight('w-12 h-12 rounded-full shrink-0')}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      {pulseHighlight('w-16 h-3')}
                      {pulseBlock('w-40 h-5')}
                    </div>
                    {pulseBlock('w-3/4 h-4')}
                  </div>
                </div>
                {pulseBlock('w-6 h-6 shrink-0')}
              </div>
            ))}
          </div>
        </div>
      );

    case 'capabilities':
      return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-12">
          <div className="w-full text-center space-y-4 max-w-3xl mx-auto">
            {pulseHighlight('w-64 h-4 mx-auto')}
            {pulseBlock('w-96 h-10 mx-auto')}
            <div className="space-y-2">
              {pulseBlock('w-full h-4 mx-auto')}
              {pulseBlock('w-4/5 h-4 mx-auto')}
            </div>
          </div>

          {/* Navigation Tabs Skeleton */}
          <div className="flex flex-wrap justify-center gap-4 border-b border-outline-variant/10 pb-px">
            {['system', 'clients', 'printers'].map((tab) => (
              <div key={tab} className="w-32 h-12 border-b-2 border-transparent flex items-center justify-center">
                {pulseBlock('w-24 h-5')}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-xl space-y-6 h-80 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {pulseHighlight('w-12 h-12 rounded-lg')}
                  {pulseBlock('w-2/3 h-6')}
                  {pulseHighlight('w-36 h-3')}
                  <div className="space-y-2">
                    {pulseBlock('w-full h-3.5')}
                    {pulseBlock('w-11/12 h-3.5')}
                    {pulseBlock('w-4/5 h-3.5')}
                  </div>
                </div>
                {pulseBlock('w-24 h-3.5')}
              </div>
            ))}
          </div>
        </div>
      );

    case 'portfolio':
      return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            {pulseHighlight('w-48 h-4 mx-auto')}
            {pulseBlock('w-80 h-10 mx-auto')}
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="px-5 py-2.5 rounded-full bg-surface-container-low border border-outline-variant/10">
                {pulseBlock('w-16 h-3')}
              </div>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i} 
                className="border border-outline-variant/10 bg-surface-container-low rounded-xl overflow-hidden h-[420px] flex flex-col"
              >
                {/* Images mock block */}
                <div className="flex-1 bg-surface-container-high/30 relative flex items-center justify-center overflow-hidden">
                  {pulseBlock('absolute inset-0')}
                </div>
                <div className="p-6 space-y-3 shrink-0">
                  <div className="flex justify-between items-center">
                    {pulseHighlight('w-24 h-3')}
                    {pulseBlock('w-16 h-3')}
                  </div>
                  {pulseBlock('w-3/4 h-5')}
                  {pulseBlock('w-full h-4.5')}
                  {pulseBlock('w-2/3 h-4.5')}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-12">
          <header className="text-center space-y-4 max-w-2xl mx-auto">
            {pulseHighlight('w-32 h-4 mx-auto')}
            {pulseBlock('w-64 h-10 mx-auto')}
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            {/* Left Col */}
            <div className="md:col-span-5 space-y-8">
              <div className="space-y-4">
                {pulseBlock('w-40 h-6')}
                {pulseBlock('w-full h-4')}
                {pulseBlock('w-5/6 h-4')}
              </div>

              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    {pulseHighlight('w-10 h-10 rounded-lg shrink-0')}
                    <div className="space-y-2 flex-1 pt-1">
                      {pulseBlock('w-24 h-3')}
                      {pulseBlock('w-44 h-4.5')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col */}
            <div className="md:col-span-7 border border-outline-variant/10 bg-surface-container-low rounded-xl p-8 space-y-6">
              <div className="space-y-2">
                {pulseBlock('w-24 h-3.5')}
                {pulseBlock('w-full h-11')}
              </div>
              <div className="space-y-2">
                {pulseBlock('w-28 h-3.5')}
                {pulseBlock('w-full h-11')}
              </div>
              <div className="space-y-2">
                {pulseBlock('w-24 h-3.5')}
                {pulseBlock('w-full h-28')}
              </div>
              {pulseHighlight('w-36 h-12')}
            </div>
          </div>
        </div>
      );

    case 'pipeline':
      return (
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 space-y-10">
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              {pulseBlock('w-48 h-8')}
              {pulseHighlight('w-64 h-4')}
            </div>
            {pulseBlock('w-28 h-10')}
          </header>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-3">
                {pulseHighlight('w-20 h-3')}
                {pulseBlock('w-24 h-8')}
                {pulseBlock('w-36 h-3')}
              </div>
            ))}
          </div>

          {/* List/Table Container */}
          <div className="border border-outline-variant/10 bg-surface-container-low rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/10 pb-6">
              {pulseBlock('w-56 h-10')}
              {pulseBlock('w-32 h-10')}
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-b border-outline-variant/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-2 flex-1">
                      {pulseBlock('w-1/3 h-5')}
                      {pulseBlock('w-1/4 h-3.5')}
                    </div>
                    {pulseHighlight('w-24 h-7')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
