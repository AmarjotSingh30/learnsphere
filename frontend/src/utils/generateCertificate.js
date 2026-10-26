// frontend/src/utils/generateCertificate.js
import { jsPDF } from 'jspdf';

export const downloadCertificate = (studentName, courseName, date) => {
  // Initialize landscape letter-sized PDF
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
    format: 'letter'
  });

  // 1. Stark Black Background (#09090b)
  doc.setFillColor(9, 9, 11);
  doc.rect(0, 0, 11, 8.5, 'F');

  // 2. Heavy Orange Border (#ff4f00)
  doc.setDrawColor(255, 79, 0);
  doc.setLineWidth(0.1);
  doc.rect(0.5, 0.5, 10, 7.5);

  // 3. Header Text
  doc.setTextColor(255, 79, 0); // Orange
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('L E A R N S P H E R E   S T U D I O S', 5.5, 1.5, { align: 'center' });

  // 4. Main Title
  doc.setTextColor(255, 255, 255); // White
  doc.setFontSize(40);
  doc.text('CERTIFICATE OF MASTERY', 5.5, 3, { align: 'center' });

  // 5. Presenter Text
  doc.setTextColor(161, 161, 170); // Zinc-400
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('THIS IS TO ACKNOWLEDGE THAT', 5.5, 4, { align: 'center' });

  // 6. Student Name
  doc.setTextColor(255, 255, 255); // White
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(studentName.toUpperCase(), 5.5, 4.8, { align: 'center' });

  // 7. Completion Text
  doc.setTextColor(161, 161, 170); // Zinc-400
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('HAS SUCCESSFULLY COMPLETED THE CURRICULUM FOR', 5.5, 5.6, { align: 'center' });

  // 8. Course Name
  doc.setTextColor(255, 79, 0); // Orange
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text(courseName.toUpperCase(), 5.5, 6.3, { align: 'center' });

  // 9. Date & Verification Bottom Bar
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`ISSUED ON: ${date}`, 1, 7.5);
  doc.text(`VERIFICATION ID: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`, 10, 7.5, { align: 'right' });

  // Download the file
  doc.save(`${studentName.replace(/\s+/g, '_')}_${courseName.replace(/\s+/g, '_')}_Certificate.pdf`);
};