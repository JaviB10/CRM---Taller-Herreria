import PDFDocument from "pdfkit";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { formatDate, formatCurrency } from "./utils.js";
import ClientsRepository from "../repositories/clients.repository.js";

// Obtener el nombre del archivo y el directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const clientRepository = new ClientsRepository();

export const generateInvoicePDF = async (cid, res) => {
    try {
        
        const client = await clientRepository.getClientByIdRepository(cid)
        
        const doc = new PDFDocument({ margin: 20 });
        const filename = `factura_cliente_${client._id}.pdf`; 

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        doc.pipe(res);

        doc.registerFont('Montserrat-Bold', path.join(__dirname, '../assets/fonts/Montserrat-Bold.ttf'));
        doc.registerFont('Montserrat-Regular', path.join(__dirname, '../assets/fonts/Montserrat-Regular.ttf'));
        doc.registerFont('Montserrat-Light', path.join(__dirname, '../assets/fonts/Montserrat-Light.ttf'));

        const imagePath = path.join(__dirname, '../assets/images/logo-invoice.png'); // Cambia 'tu-imagen.png' por el nombre de tu imagen
        doc.image(imagePath, 20, 20, { width: 130 });

        // Encabezado
        doc.font('Montserrat-Regular').fontSize(30).text('TALLER HERRERIA BALLON',{align: "right"});
        
        doc.moveDown(2);
        doc.font('Montserrat-Regular').fontSize(14).text("ROSARIO  |  (341) 3967684  |  NICARAGUA 2030", {align: "right"})

        doc.moveDown();
        
        const lineY = doc.y; // Guarda la posición Y actual para dibujar la línea
        doc.strokeColor('black') // Establece el color de la línea a negro
            .lineWidth(2) // Establece el grosor de la línea
            .moveTo(20, lineY) // Coordenadas iniciales (x, y) para la línea
            .lineTo(600, lineY) // Coordenadas finales (x, y) para la línea (ajusta el ancho según sea necesario)
            .stroke(); // Dibuja la línea

        doc.moveDown();

        doc.font('Montserrat-Bold').fontSize(20).text('PRESUPUESTO', {align: "right"});

        // Información del cliente
        doc.font('Montserrat-Regular').fontSize(12).text(`Cliente: ${client.name} ${client.lastName}`, {align: "left"});
        doc.font('Montserrat-Regular').text(`Dirección: ${client.address}`);
        doc.font('Montserrat-Regular').text(`Teléfono: ${client.phone}`);
        doc.moveDown();

        doc.moveTo(20, 260)    // Ajusta la posición y (por ejemplo, 250)
            .lineTo(600, 260)   // La línea sigue de 50 a 550 en el eje x
            .stroke();

        // Para cada trabajo del cliente
        client.jobs.forEach(job => {
            // Verifica que job.budget esté definido y sea un objeto
            if (!job.budget || typeof job.budget !== 'object') {
                console.error('Error: budget no está definido o no es un objeto para el trabajo:', job);
                return; // Sal de esta iteración si budget no está definido o no es un objeto
            }
        
            // Para mostrar la información del presupuesto
            doc.font('Montserrat-Bold').fontSize(16).text('MATERIALES');

            doc.moveTo(20, 285)
                .lineTo(600, 285)  
                .stroke();

            doc.moveDown();

            if (Array.isArray(job.budget.materials)) {
                job.budget.materials.forEach(material => {
                    doc.font('Montserrat-Regular').fontSize(12).text(`Material: ${material.materialName}`);
                    doc.font('Montserrat-Regular').text(`Cantidad: ${material.amount}`);
                    doc.font('Montserrat-Regular').text(`Precio: ${formatCurrency(material.price)}`);
                    doc.moveDown();
                });
            } else {
                console.error('Error: materials no está definido o no es un arreglo en el presupuesto:', job.budget);
            }

            doc.font('Montserrat-Bold').fontSize(16).text(`Total de materiales: ${formatCurrency(job.budget.totalMaterialCost)}`, {align: "right"});
            doc.font('Montserrat-Bold').fontSize(16).text(`Total mano de obra: ${formatCurrency(job.budget.labourCost)}`, {align: "right"});
            
            doc.moveDown();

            doc.moveTo(20, 532)   
                .lineTo(600, 532)  
                .stroke();

            doc.font('Montserrat-Bold').fontSize(16).text('PAGOS');

            doc.moveTo(20, 557)  
                .lineTo(600, 557)
                .stroke();

            doc.moveDown();
            
            if (Array.isArray(job.budget.payments)) {
                job.budget.payments.forEach(payment => {
                    doc.font('Montserrat-Regular').fontSize(12).text(`Fecha de pago: ${formatDate(payment.paymentDate) || 'N/A'}`); // Asegúrate que paymentDate esté definido
                    doc.text(`Monto: ${formatCurrency(payment.amount)}`);
                    doc.text(`Método de pago: ${payment.paymentMethod}`);
                    if (payment.notes) doc.text(`Notas: ${payment.notes}`);
                    doc.moveDown();
                });
            } else {
                console.error('Error: payments no está definido o no es un arreglo en el presupuesto:', job.budget);
            }

            doc.font('Montserrat-Bold').fontSize(16).text(`Monto pagado: ${formatCurrency(job.budget.paidAmount)}`, {align: "right"});
            doc.font('Montserrat-Bold').fontSize(16).text(`Estado del pago: ${job.budget.paymentStatus}`, {align: "right"});
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error('Error generando PDF:', error);
        res.sendServerError(error.message);
    }
}