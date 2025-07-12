import { useState } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Download, Eye } from 'lucide-react';
import PDFResume from './PDFResume';
import { ResumeData } from '@shared/schema';
import { defaultResumeData } from '@/lib/resumeData';

export default function ResumeGenerator() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [showPreview, setShowPreview] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (value: string) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        achievements: ['']
      }]
    }));
  };

  const updateExperience = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }));
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? {
          ...exp,
          achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
        } : exp
      )
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: [],
        url: '',
        github: ''
      }]
    }));
  };

  const updateProject = (index: number, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateSkills = (category: string, value: string) => {
    const skills = value.split(',').map(s => s.trim()).filter(s => s);
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: skills }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Resume{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Generator
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Create a professional PDF resume with dynamic sections and real-time preview
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant="outline"
            className="bg-slate-800 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          
          <PDFDownloadLink
            document={<PDFResume data={resumeData} />}
            fileName={`${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
          >
            {({ loading }) => (
              <Button
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-violet-500 hover:from-cyan-600 hover:to-violet-600"
              >
                <Download className="w-4 h-4 mr-2" />
                {loading ? 'Generating...' : 'Download PDF'}
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={resumeData.personalInfo.title}
                          onChange={(e) => updatePersonalInfo('title', e.target.value)}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updatePersonalInfo('email', e.target.value)}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personalInfo.phone || ''}
                          onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                          className="bg-slate-700 border-slate-600"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                        className="bg-slate-700 border-slate-600 min-h-[100px]"
                        placeholder="Write a compelling professional summary..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-cyan-400">Work Experience</CardTitle>
                      <Button onClick={addExperience} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold">Experience {index + 1}</h4>
                          <Button
                            onClick={() => removeExperience(index)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label>Position</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          <div>
                            <Label>Company</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <Label>Key Achievements</Label>
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex gap-2 mt-2">
                              <Input
                                value={achievement}
                                onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                                className="bg-slate-700 border-slate-600"
                                placeholder="Describe your achievement..."
                              />
                              {exp.achievements.length > 1 && (
                                <Button
                                  onClick={() => {
                                    const newAchievements = exp.achievements.filter((_, i) => i !== achIndex);
                                    updateExperience(index, 'achievements', newAchievements);
                                  }}
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            onClick={() => addAchievement(index)}
                            size="sm"
                            variant="ghost"
                            className="mt-2 text-cyan-400"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Achievement
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Skills & Technologies</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="technical">Technical Skills (comma-separated)</Label>
                      <Input
                        id="technical"
                        value={resumeData.skills.technical.join(', ')}
                        onChange={(e) => updateSkills('technical', e.target.value)}
                        className="bg-slate-700 border-slate-600"
                        placeholder="JavaScript, Python, React..."
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="frameworks">Frameworks (comma-separated)</Label>
                      <Input
                        id="frameworks"
                        value={resumeData.skills.frameworks.join(', ')}
                        onChange={(e) => updateSkills('frameworks', e.target.value)}
                        className="bg-slate-700 border-slate-600"
                        placeholder="React, Next.js, Express..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="tools">Tools (comma-separated)</Label>
                      <Input
                        id="tools"
                        value={resumeData.skills.tools.join(', ')}
                        onChange={(e) => updateSkills('tools', e.target.value)}
                        className="bg-slate-700 border-slate-600"
                        placeholder="Git, Docker, AWS..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="languages">Languages (comma-separated)</Label>
                      <Input
                        id="languages"
                        value={resumeData.skills.languages.join(', ')}
                        onChange={(e) => updateSkills('languages', e.target.value)}
                        className="bg-slate-700 border-slate-600"
                        placeholder="English, Urdu, Arabic..."
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-cyan-400">Projects</CardTitle>
                      <Button onClick={addProject} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {resumeData.projects.map((project, index) => (
                      <div key={index} className="border border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold">Project {index + 1}</h4>
                          <Button
                            onClick={() => removeProject(index)}
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <Label>Project Name</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => updateProject(index, 'name', e.target.value)}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>
                          
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => updateProject(index, 'description', e.target.value)}
                              className="bg-slate-700 border-slate-600"
                            />
                          </div>

                          <div>
                            <Label>Technologies (comma-separated)</Label>
                            <Input
                              value={project.technologies.join(', ')}
                              onChange={(e) => {
                                const techs = e.target.value.split(',').map(t => t.trim()).filter(t => t);
                                updateProject(index, 'technologies', techs);
                              }}
                              className="bg-slate-700 border-slate-600"
                              placeholder="React, Node.js, MongoDB..."
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Live Preview</h3>
              <div className="bg-white rounded-lg overflow-hidden" style={{ height: '800px' }}>
                <PDFViewer width="100%" height="100%">
                  <PDFResume data={resumeData} />
                </PDFViewer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}