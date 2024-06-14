import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function PrivacyPolicyPage() {
    return (
        <div style={{textAlign: 'left', maxHeight:'80vh',overflowY: 'auto'}}>
            <Typography variant="h3" gutterBottom>Política de privacidad</Typography>
            <Typography variant="body1" paragraph>
                Esta política de privacidad describe cómo Flexyweek recopila, utiliza y protege la información personal que proporciona cuando utiliza este sitio web.
            </Typography>
            <Typography variant="h3" gutterBottom>Recopilación y Uso de Información</Typography>
            <Typography variant="body1" paragraph>
                Flexyweek recopila la información personal que usted proporciona voluntariamente, como su nombre y dirección de correo electrónico, cuando se registra en nuestro sitio web.
            </Typography>
            <Typography variant="body1" paragraph>
                La información personal que recopilamos se utiliza para proporcionarle los productos y servicios que solicita.
            </Typography>
            <Typography variant="h3" gutterBottom>Protección de la Información</Typography>
            <Typography variant="body1" paragraph>
                Flexyweek se compromete a garantizar la seguridad de su información personal. Hemos implementado medidas técnicas y organizativas adecuadas para proteger su información contra el acceso no autorizado, la divulgación, la alteración o destrucción.
            </Typography>
            <Typography variant="h3" gutterBottom>Publicidad y Recopilación de Datos</Typography>
            <Typography variant="body1" paragraph>
                Flexyweek utiliza tecnologías como cookies y píxeles de seguimiento para recopilar datos con fines publicitarios. Estos datos pueden incluir información sobre su actividad de navegación y otras interacciones con la publicidad. Trabajamos con proveedores de servicios de publicidad de terceros que pueden recopilar información similar con el fin de proporcionar anuncios personalizados.
            </Typography>
            <Typography variant="body1" paragraph>
                Puede optar por no participar en la recopilación de datos para publicidad personalizada ajustando la configuración de su dispositivo o navegador.
            </Typography>
            <Typography variant="h3" gutterBottom>Divulgación a Terceros</Typography>
            <Typography variant="body1" paragraph>
                No vendemos, intercambiamos ni transferimos de ninguna manera su información personal a terceros sin su consentimiento, excepto cuando sea necesario para cumplir con un requisito legal.
            </Typography>
            <Typography variant="h3" gutterBottom>Actualizaciones a esta Política de Privacidad</Typography>
            <Typography variant="body1" paragraph>
                Flexyweek se reserva el derecho de actualizar esta política de privacidad en cualquier momento. Le recomendamos que revise periódicamente esta página para estar informado de cualquier cambio. Los cambios entrarán en vigencia tan pronto como se publiquen en esta página.
            </Typography>
            {/* <Typography variant="body1">
                Si tiene alguna pregunta sobre esta política de privacidad, no dude en <Link href="/contact">contactarnos</Link>.
            </Typography> */}
            
        </div>
    );
}

export default PrivacyPolicyPage;
