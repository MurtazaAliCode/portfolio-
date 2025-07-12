import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { ResumeData } from '@shared/schema';

// Define PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#6b7280',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    color: '#374151',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  company: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
  },
  achievementList: {
    marginTop: 4,
  },
  achievement: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    color: '#6b7280',
  },
  achievementText: {
    flex: 1,
    color: '#374151',
    lineHeight: 1.3,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  skillsList: {
    color: '#374151',
    lineHeight: 1.3,
  },
  projectItem: {
    marginBottom: 10,
  },
  projectName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDescription: {
    color: '#374151',
    marginTop: 2,
    lineHeight: 1.3,
  },
  projectTech: {
    color: '#6b7280',
    marginTop: 2,
    fontSize: 9,
  },
});

interface PDFResumeProps {
  data: ResumeData;
}

const PDFResume: React.FC<PDFResumeProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.fullName}</Text>
        <Text style={styles.title}>{data.personalInfo.title}</Text>
        <View style={styles.contactInfo}>
          <Text>{data.personalInfo.email}</Text>
          {data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>}
        </View>
      </View>

      {/* Professional Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp.position}</Text>
              <Text style={styles.company}>{exp.company}</Text>
              {exp.achievements && exp.achievements.length > 0 && (
                <View style={styles.achievementList}>
                  {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                    <View key={achIndex} style={styles.achievement}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.achievementText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu.degree} in {edu.field}</Text>
              <Text style={styles.company}>{edu.institution}</Text>
              {edu.gpa && (
                <Text style={styles.company}>GPA: {edu.gpa}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        {data.skills.technical.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Technical:</Text>
            <Text style={styles.skillsList}>{data.skills.technical.join(', ')}</Text>
          </View>
        )}
        {data.skills.frameworks.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Frameworks:</Text>
            <Text style={styles.skillsList}>{data.skills.frameworks.join(', ')}</Text>
          </View>
        )}
        {data.skills.tools.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Tools:</Text>
            <Text style={styles.skillsList}>{data.skills.tools.join(', ')}</Text>
          </View>
        )}
        {data.skills.languages.length > 0 && (
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Languages:</Text>
            <Text style={styles.skillsList}>{data.skills.languages.join(', ')}</Text>
          </View>
        )}
      </View>

      {/* Projects */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              {project.technologies.length > 0 && (
                <Text style={styles.projectTech}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default PDFResume;