graph TD;
    A[Client (Front-end)] -->|HTTP Requests| B[Routeur Express]
    B --> C{Service de Gestion};
    C --> D[Service des Clients];
    C --> E[Service des Employés];
    C --> F[Service des Rendez-vous];
    C --> G[Service des Factures];
    D --> H[Base de données MongoDB];
    E --> H;
    F --> H;
    G --> H;
    H --> I[Email Service (Nodemailer)];
    C --> J[Authentification JWT];
    J --> K[Token sécurisé];
    K --> L[Client (Front-end)];
