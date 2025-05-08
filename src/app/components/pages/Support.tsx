"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Globe, ChevronDown, Settings } from "lucide-react";
import DashLogo from '../../../../public/assets/icons/DashLogo';
import MobileLogo from "../../../../public/assets/icons/MobileLogo"
import { supportArticles, SupportArticle, uploadArticles } from "../../supportArticle";
import { SupportModals } from "../../../components/modals/SupportModals";
import { useRouter } from 'next/navigation';

export default function SupportCentre() {
  const [isEmpty] = useState(false);
  const router = useRouter();
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({});
  const [showContactModal, setShowContactModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  const toggleArticle = (id: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };


  const handleReportIssue = () => {
    setShowContactModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile View */}
      <div className="md:hidden">
        {/* Back Button */}
        <div className="px-4 py-3">
          <button className="p-1">
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Welcome Card */}
        <div className="mx-4 rounded-xl bg-[#e6f0ff] p-6">
          <div className="mb-4">
            <MobileLogo />
          </div>
          <h1 className="text-[#000842] text-2xl font-bold mb-6">
            Welcome to Brandsquare Support Centre
          </h1>
          <div className="flex flex-col gap-4">
            <button
              className="bg-white text-[rgba(0,0,81,1)] rounded-md py-2 px-4 flex items-center w-max"
              onClick={() => router.push('/dashboard/support/ticket')}
            >
              <Settings size={16} className="mr-2" />
              view customer tickets
            </button>
            <button
              className="bg-[#000842] text-white rounded-md py-2 px-4 flex items-center justify-center w-48"
              onClick={handleReportIssue}
            >
              <Globe size={16} className="mr-2" />
              Report an issue
            </button>
          </div>
        </div>

        {/* Articles Section */}
        <div className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Articles</h2>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 px-2">
              Managing your orders
            </h3>

            {supportArticles.map((article: SupportArticle, index: number) => (
              <div key={index} className="border-b py-3 px-2">
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleArticle(`support-${index}`)}
                >
                  <div className="pr-4">
                    <h4 className="font-medium mb-1">
                      {article.title}
                    </h4>
                    <div className="overflow-hidden">
                      <p className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${expandedArticles[`support-${index}`] ? 'max-h-[1000px]' : 'max-h-5 line-clamp-1'}`}>
                        {article.content}
                      </p>
                    </div>
                  </div>
                  {expandedArticles[`support-${index}`] ? (
                    <ChevronRight size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 px-2">
              Uploading Products
            </h3>

            {uploadArticles.map((article: SupportArticle, index: number) => (
              <div key={index} className="border-b py-3 px-2">
                <div
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => toggleArticle(`upload-${index}`)}
                >
                  <div className="pr-4">
                    <h4 className="font-medium mb-1">
                      {article.title}
                    </h4>
                    <div className="overflow-hidden">
                      <p className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${expandedArticles[`upload-${index}`] ? 'max-h-[1000px]' : 'max-h-5 line-clamp-1'}`}>
                        {article.content}
                      </p>
                    </div>
                  </div>
                  {expandedArticles[`upload-${index}`] ? (
                    <ChevronRight size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Card */}
          <div className="rounded-xl bg-[#e6f0ff] p-8 mb-8 flex items-center  sm:flex-col md:flex-row   min-h-[300px]">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between flex-grow">
              <div className="mb-6 md:mb-0">
                <div className="mb-4">
                  <DashLogo width="100" height="100" />
                </div>
                <h1 className="text-[#000842] text-3xl font-bold mb-3">
                  Welcome to Brandsquare Support Centre
                </h1>
                {!isEmpty && (
                  <p className="text-gray-700 max-w-2xl">
                    We have curated helpful materials so you can navigate your dashboard with ease.
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-4 self-end">
              <button
                className="bg-white text-[rgba(0,0,81,1)] rounded-md py-2 px-4 flex items-center"
                onClick={() => router.push('/dashboard/support/ticket')}
              >
                <Settings size={16} className="mr-2" />
                view customer tickets
              </button>
              <button
                className="bg-[#000842] text-white rounded-md py-2 px-4 flex items-center"
                onClick={handleReportIssue}
              >
                <Globe size={16} className="mr-2" />
                Report an issue
              </button>
            </div>
          </div>

          {/* Articles Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Articles</h2>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 px-4 py-2 bg-gray-50 rounded-md">
                Managing your orders
              </h3>

              {supportArticles.map((article: SupportArticle, index: number) => (
                <div key={index} className="border-b py-4 px-4 hover:bg-gray-50">
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleArticle(`support-${index}`)}
                  >
                    <div className="pr-8">
                      <h4 className="font-medium mb-1">
                        {article.title}
                      </h4>
                      <div className="overflow-hidden">
                        <p className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${expandedArticles[`support-${index}`] ? 'max-h-[1000px]' : 'max-h-[3rem] line-clamp-2'}`}>
                          {article.content}
                        </p>
                      </div>
                    </div>
                    {expandedArticles[`support-${index}`] ? (
                      <ChevronRight size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-700 mb-3 px-4 py-2 bg-gray-50 rounded-md">
                Uploading Products
              </h3>

              {uploadArticles.map((article: SupportArticle, index: number) => (
                <div key={index} className="border-b py-4 px-4 hover:bg-gray-50">
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleArticle(`upload-${index}`)}
                  >
                    <div className="pr-8">
                      <h4 className="font-medium mb-1">
                        {article.title}
                      </h4>
                      <div className="overflow-hidden">
                        <p className={`text-sm text-gray-500 transition-all duration-300 ease-in-out ${expandedArticles[`upload-${index}`] ? 'max-h-[1000px]' : 'max-h-[3rem] line-clamp-2'}`}>
                          {article.content}
                        </p>
                      </div>
                    </div>
                    {expandedArticles[`upload-${index}`] ? (
                      <ChevronRight size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 mt-1 flex-shrink-0 transition-transform duration-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add SupportModals component */}
      <SupportModals
        showContactModal={showContactModal}
        setShowContactModal={setShowContactModal}
        showTicketModal={showTicketModal}
        setShowTicketModal={setShowTicketModal}
      />
    </div>
  );
}