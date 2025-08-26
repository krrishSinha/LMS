'use client';

import React, { useState } from 'react';

type Video = {
  title: string;
  description: string;
  url: string;
  links: string[];
};

type Section = {
  sectionTitle: string;
  videos: Video[];
};

export default function CreateCourse() {
  const [sections, setSections] = useState<Section[]>([]);

  const handleAddSection = () => {
    setSections([...sections, { sectionTitle: '', videos: [] }]);
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].sectionTitle = value;
    setSections(updatedSections);
  };

  const handleAddVideo = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({
      title: '',
      description: '',
      url: '',
      links: [''],
    });
    setSections(updatedSections);
  };

  const handleVideoChange = (
    sectionIndex: number,
    videoIndex: number,
    field: keyof Video,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex][field] = value;
    setSections(updatedSections);
  };

  const handleVideoLinkChange = (
    sectionIndex: number,
    videoIndex: number,
    linkIndex: number,
    value: string
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].links[linkIndex] = value;
    setSections(updatedSections);
  };

  const handleAddVideoLink = (sectionIndex: number, videoIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].links.push('');
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    console.log('Final Course Structure:', sections);
    // You can send this to your backend via fetch/axios
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Course</h1>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 mb-6 rounded shadow-sm">
          <label className="block font-semibold mb-2">Section Title</label>
          <input
            type="text"
            value={section.sectionTitle}
            onChange={(e) =>
              handleSectionTitleChange(sectionIndex, e.target.value)
            }
            className="w-full border px-3 py-2 mb-4"
            placeholder="Enter section title"
          />

          {section.videos.map((video, videoIndex) => (
            <div
              key={videoIndex}
              className="border p-3 mb-4 rounded bg-gray-50"
            >
              <h3 className="font-semibold mb-2">
                Video {videoIndex + 1} in Section {sectionIndex + 1}
              </h3>
              <input
                type="text"
                value={video.title}
                onChange={(e) =>
                  handleVideoChange(sectionIndex, videoIndex, 'title', e.target.value)
                }
                className="w-full border px-3 py-2 mb-2"
                placeholder="Video Title"
              />
              <input
                type="text"
                value={video.description}
                onChange={(e) =>
                  handleVideoChange(sectionIndex, videoIndex, 'description', e.target.value)
                }
                className="w-full border px-3 py-2 mb-2"
                placeholder="Video Description"
              />
              <input
                type="text"
                value={video.url}
                onChange={(e) =>
                  handleVideoChange(sectionIndex, videoIndex, 'url', e.target.value)
                }
                className="w-full border px-3 py-2 mb-2"
                placeholder="Video URL"
              />

              <div className="mb-2">
                <p className="font-medium">Video Links:</p>
                {video.links.map((link, linkIndex) => (
                  <input
                    key={linkIndex}
                    type="text"
                    value={link}
                    onChange={(e) =>
                      handleVideoLinkChange(sectionIndex, videoIndex, linkIndex, e.target.value)
                    }
                    className="w-full border px-3 py-2 mb-1"
                    placeholder={`Link ${linkIndex + 1}`}
                  />
                ))}
                <button
                  onClick={() => handleAddVideoLink(sectionIndex, videoIndex)}
                  className="text-blue-500 mt-2"
                >
                  + Add Another Link
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => handleAddVideo(sectionIndex)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            + Add Video
          </button>
        </div>
      ))}

      <button
        onClick={handleAddSection}
        className="bg-blue-600 text-white px-6 py-3 rounded mb-6"
      >
        + Add Section
      </button>

      <button
        onClick={handleSubmit}
        className="bg-purple-600 text-white px-6 py-3 rounded"
      >
        Submit Course
      </button>
    </div>
  );
}
