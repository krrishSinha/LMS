'use client'
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';



export default function CourseContent({active,setActive}:any) {

  const [isReadOnly, setIsReadOnly] = useState(true)

  const [sections, setSections]: any = useState([
    {
      sectionTitle: 'Untitled Section',
      videos: []
    }
  ]);

  const [videoOpenStates, setVideoOpenStates] = useState<boolean[][]>(
    sections.map((section: any) => section.videos.map(() => true))
  );

  const handleAddSection = () => {
    setSections([...sections, { sectionTitle: 'Untitled Section', videos: [] }]);
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].sectionTitle = value;
    setSections(updatedSections);
  };

  const handleDeleteSection = (sectionIndex: number) => {
    const updatedSections = sections.filter((_: any, index: any) => index !== sectionIndex);
    setSections(updatedSections);

    const updatedOpenStates = videoOpenStates.filter((_, index) => index !== sectionIndex);
    setVideoOpenStates(updatedOpenStates);
  };

  const handleAddVideo = (sectionIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({
      title: '',
      description: '',
      url: '',
      links: [{
        title: '',
        url: ''
      }],
    });
    setSections(updatedSections);

    const updatedOpenStates = [...videoOpenStates];
    if (!updatedOpenStates[sectionIndex]) {
      updatedOpenStates[sectionIndex] = [];
    }
    updatedOpenStates[sectionIndex].push(true);
    setVideoOpenStates(updatedOpenStates);
  };

  const toggleVideoOpen = (sectionIndex: number, videoIndex: number) => {
    const updatedOpenStates = [...videoOpenStates];
    updatedOpenStates[sectionIndex][videoIndex] = !updatedOpenStates[sectionIndex][videoIndex];
    setVideoOpenStates(updatedOpenStates);
  };


  const handleVideoChange = (sectionIndex: number, videoIndex: number, field: any, value: string) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex][field] = value;
    setSections(updatedSections);
  };

  const handleVideoLinkChange = (sectionIndex: number, videoIndex: number, linkIndex: number, field: 'title' | 'url', value: string) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].links[linkIndex][field] = value;
    setSections(updatedSections);
  };

  const handleAddVideoLink = (sectionIndex: number, videoIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].links.push({ title: '', url: '' });
    setSections(updatedSections);
  };

  const handleDeleteVideoLink = (sectionIndex: number, videoIndex: number, linkIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex].links =
      updatedSections[sectionIndex].videos[videoIndex].links.filter((_: any, i: any) => i !== linkIndex);
    setSections(updatedSections);
  };

  const handleDeleteVideo = (sectionIndex: number, videoIndex: number) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos = updatedSections[sectionIndex].videos.filter((_: any, index: any) => index !== videoIndex);
    setSections(updatedSections);

    const updatedOpenStates = [...videoOpenStates];
    updatedOpenStates[sectionIndex] = updatedOpenStates[sectionIndex].filter((_, index) => index !== videoIndex);
    setVideoOpenStates(updatedOpenStates);
  };

  const isCourseContentValid = () => {
    const hasEmptyField = sections.some((section: any) =>
      !section.sectionTitle.trim() ||
      section.videos.some((video: any) =>
        !video.title.trim() || !video.description.trim() || !video.url.trim() ||
        video.links.some((link: any) => !link.title.trim() || !link.url.trim())
      )
    );

    if (hasEmptyField) {
      toast.error("All fields are required");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!isCourseContentValid()) return;

    setActive(active + 1);
    console.log('Final Course Structure:', sections);
    // You can send this to your backend via fetch/axios
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Create Sections</h1>

      {sections.map((section: any, sectionIndex: any) => (
        <div key={sectionIndex} className="border border-zinc-400  p-4 mb-6 rounded">

          <div className='flex items-center mb-4 relative justify-between ' >
            <div className='flex items-center' >
              <input
                type="text"
                value={section.sectionTitle}
                onChange={(e) =>
                  handleSectionTitleChange(sectionIndex, e.target.value)
                }
                readOnly={isReadOnly ? true : false}
                className="border-none text-xl w-fit outline-none "
              />
              <div className='' onClick={() => setIsReadOnly(!isReadOnly)} >
                <MdEdit size={20} />
              </div>
            </div>
            <div onClick={() => handleDeleteSection(sectionIndex)}>
              <MdDelete size={25} className='text-red-700 cursor-pointer ' />
            </div>
          </div>

          {section.videos.map((video: any, videoIndex: any) => (

            <div key={videoIndex} className="border border-zinc-400 bg-gray-50 dark:bg-[#080E19] text-black dark:text-white p-3 mb-4 rounded" >

              <div className='flex justify-between mb-4  ' onClick={() => toggleVideoOpen(sectionIndex, videoIndex)} >

                <h3 className="font-semibold">Video {videoIndex + 1} </h3>

                <div className='flex items-center gap-5' >
                  <div onClick={() => handleDeleteVideo(sectionIndex, videoIndex)}  >
                    <MdDelete size={25} className='text-red-700 cursor-pointer ' />
                  </div>

                  <div className='cursor-pointer' >
                    {videoOpenStates[sectionIndex]?.[videoIndex] ? <IoIosArrowUp size={25} /> : <IoIosArrowDown size={25} />}
                  </div>
                </div>

              </div>

              {
                videoOpenStates[sectionIndex]?.[videoIndex] && (
                  <>
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

                      {video.links.map((link: any, linkIndex: any) => (

                        <div className='flex items-center justify-between gap-4 ' >

                          <div className='flex w-full gap-4'   >
                            <input
                              key={linkIndex}
                              type="text"
                              value={link.title}
                              onChange={(e) => handleVideoLinkChange(sectionIndex, videoIndex, linkIndex, 'title', e.target.value)}
                              className="w-full border  px-3 py-2 mb-1"
                              placeholder={`Link  Title`}
                            />

                            <input
                              key={linkIndex}
                              type="text"
                              value={link.url}
                              onChange={(e) => handleVideoLinkChange(sectionIndex, videoIndex, linkIndex, 'url', e.target.value)}
                              className="w-full border px-3 py-2 mb-1"
                              placeholder={`Link URL`}
                            />

                          </div>

                          <div onClick={() => handleDeleteVideoLink(sectionIndex, videoIndex, linkIndex)} >
                            <MdDelete size={25} className='text-red-700 cursor-pointer ' />
                          </div>

                        </div>

                      ))}
                      <button
                        onClick={() => handleAddVideoLink(sectionIndex, videoIndex)}
                        className="text-blue-500 mt-2"
                      >
                        + Add Another Link
                      </button>
                    </div>
                  </>
                )
              }

            </div>
          ))}

          <button
            onClick={() => handleAddVideo(sectionIndex)}
            className=" px-4 py-2 rounded mt-2 border border-zinc-400 cursor-pointer "
          >
            + Add Video
          </button>
        </div>
      ))}

      <button
        onClick={handleAddSection}
        className="  px-4 py-2 rounded mt-2 border border-zinc-400 cursor-pointer "
      >
        + Add Section
      </button>

      <div className='flex justify-between mt-10' >
        <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={()=> setActive(active - 1)}  > Previous </div>
        <div className='bg-[#37a39a] p-2 px-16 w-fit rounded-sm cursor-pointer text-white' onClick={handleSubmit}  > Next </div>
      </div>


    </div>
  )
}

