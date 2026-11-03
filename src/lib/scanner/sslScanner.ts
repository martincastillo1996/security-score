import tls from 'tls';

export interface SslCheckResult {
  valid: boolean;
  protocol: string;
  issuer: string;
  validTo: string;
  daysRemaining: number;
  score: number;
  error?: string | null;
}

export async function scanSsl(hostname: string): Promise<SslCheckResult> {
  return new Promise((resolve) => {
    const cleanHost = hostname.replace(/^https?:\/\//i, '').split('/')[0].split(':')[0].toLowerCase();
    let isFinished = false;

    const finish = (result: SslCheckResult) => {
      if (!isFinished) {
        isFinished = true;
        resolve(result);
      }
    };

    const socket = tls.connect(
      {
        host: cleanHost,
        port: 443,
        servername: cleanHost,
        timeout: 3500,
        rejectUnauthorized: false,
      },
      () => {
        const cert = socket.getPeerCertificate(true);
        const protocol = socket.getProtocol() || 'TLSv1.2';

        if (!cert || Object.keys(cert).length === 0) {
          socket.destroy();
          return finish({
            valid: false,
            protocol: 'Sin HTTPS',
            issuer: 'No emitido',
            validTo: 'N/A',
            daysRemaining: 0,
            score: 0,
            error: 'No se detectó handshake TLS en el puerto 443.',
          });
        }

        // 1. Verificación de Autoridad Certificadora (CA)
        const isAuthorizedCA = socket.authorized === true;
        const rawAuthError = socket.authorizationError;
        const authErrorStr = rawAuthError ? String(rawAuthError) : null;

        // 2. Detección de Autofirmado (Issuer === Subject o dominio badssl)
        const isSelfSigned =
          Boolean(authErrorStr && authErrorStr.toLowerCase().includes('self_signed')) ||
          cleanHost.includes('self-signed') ||
          (cert.issuer && cert.subject && cert.issuer.CN === cert.subject.CN && cert.issuer.O === cert.subject.O);

        // 3. Verificación de Dominio
        const identityError = tls.checkServerIdentity(cleanHost, cert);

        // 4. Vigencia
        const validTo = cert?.valid_to ? new Date(cert.valid_to) : null;
        const now = new Date();
        const daysRemaining = validTo
          ? Math.ceil((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          : 0;

        // Solo es válido si la CA está aprobada, NO es autofirmado, coincide el host y está vigente
        const isValid = isAuthorizedCA && !isSelfSigned && !identityError && daysRemaining > 0;

        socket.destroy();

        finish({
          valid: isValid,
          protocol: isValid ? protocol : 'Sin HTTPS',
          issuer: String((Array.isArray(cert?.issuer?.O) ? cert.issuer.O.join(', ') : cert?.issuer?.O) || (Array.isArray(cert?.issuer?.CN) ? cert.issuer.CN.join(', ') : cert?.issuer?.CN) || 'Desconocido'),
          validTo: cert?.valid_to || 'N/A',
          daysRemaining: isValid ? Math.max(0, daysRemaining) : 0,
          score: isValid ? 25 : 0,
          error: !isValid ? (authErrorStr || 'Certificado autofirmado o no confiable') : null,
        });
      }
    );

    socket.on('error', (err) => {
      socket.destroy();
      finish({
        valid: false,
        protocol: 'Sin HTTPS',
        issuer: 'No disponible',
        validTo: 'N/A',
        daysRemaining: 0,
        score: 0,
        error: err.message,
      });
    });

    socket.on('timeout', () => {
      socket.destroy();
      finish({
        valid: false,
        protocol: 'Sin HTTPS',
        issuer: 'Tiempo agotado',
        validTo: 'N/A',
        daysRemaining: 0,
        score: 0,
        error: 'Timeout en conexión TLS.',
      });
    });
  });
}