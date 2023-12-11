// import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
import { FC } from 'react';

export const Report: FC<{ data: any }> = ({ data }) => {
  const { startDate, endDate, city, country, btName } = data;
  // const getPdf = () => {
  //   const input: HTMLElement | any = document.getElementById('divToPdf');

  //   html2canvas(input).then((canvas) => {
  //     const imgdata = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     const imgProps = pdf.getImageProperties(imgdata);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgdata, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.output('dataurlnewwindow');
  //     // pdf.save('report.pdf');
  //   });
  // };

  const sDate = new Date(startDate).toLocaleDateString();
  const eDate = new Date(endDate).toLocaleDateString();

  return (
    <>
      <div
        id="divToPdf"
        className="m-auto w-[210mm] min-h-[297mm] text-black bg-[#f5f5f5] p-[20px]"
      >
        <div className="flex flex-col items-end">
          <p className="text-end">
            Форма "Отчет ро итогам заграничной служебной командировки/ <br />
            участия в международном мероприятии"
          </p>
          <b>
            Министерство иностранных дел <br />
            Кыргызской республики
          </b>
        </div>
        <p className="text-center my-[24px]">
          Отчет ро итогам заграничной служебной командировки/ <br />
          участия в международном мероприятии
        </p>
        <p>
          Cooбщаем, что с {sDate} по {eDate} в г. {city}, {country} состоялось {btName}
        </p>
        <p>
          Предвартельное информировение МИД КР о проведении данного мероприятия было{'   '}
          осуществлено письмом за исх. № 1 от{' '}
        </p>
        <p>Организаторами мероприятия являлись:</p>
        <ol>
          <li>First</li>
          <li>Second</li>
          <li>Third</li>
        </ol>
      </div>
    </>
  );
};
