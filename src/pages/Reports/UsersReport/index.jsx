import React, { useEffect } from 'react';
import $ from 'jquery';
import '@progress/telerik-jquery-report-viewer/dist/styles/telerikReportViewer.css';

const ReportViewer = () => {
    useEffect(() => {
        const initializeReportViewer = () => {
            if (window.jQuery && window.jQuery.fn.telerik_ReportViewer) {
                $('#reportViewer1').telerik_ReportViewer({
                    serviceUrl: 'https://demos.telerik.com/reporting/api/reports/',
                    reportSource: {
                        report: 'ReportBook.trbp'
                    },
                    scale: 1.0,
                    viewMode: 'INTERACTIVE',
                    printMode: 'SPECIFIC',
                    sendEmail: { enabled: true }
                });
            } else {
                console.error('Telerik Report Viewer is not loaded.');
            }
        };

        const onLoad = () => {
            if (typeof window.jQuery === 'undefined' || typeof window.jQuery.fn.telerik_ReportViewer === 'undefined') {
                console.error('jQuery or Telerik Report Viewer is not loaded.');
            } else {
                initializeReportViewer();
            }
        };

        window.addEventListener('load', onLoad);

        return () => {
            window.removeEventListener('load', onLoad);
        };
    }, []);

    return <div id="reportViewer1" style={{ height: '800px' }}>Loading...</div>;
};

export default ReportViewer;
