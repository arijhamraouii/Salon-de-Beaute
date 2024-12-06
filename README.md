graph TD;
    A[Postman] -->|JSON Requests| B[Express.js Backend]
    B --> C{Routing};
    C --> D[Client Management Controller];
    C --> E[Employee Management Controller];
    C --> F[Appointment Management Controller];
    C --> G[Invoice Management Controller];
    C --> H[Authentication Controller];
    D --> I[Client Model];
    E --> J[Employee Model];
    F --> K[Appointment Model];
    G --> L[Invoice Model];
    H --> M[User Model];
    I --> N[MongoDB Database];
    J --> N;
    K --> N;
    L --> N;
    M --> N;
    B --> O[JWT Authentication];
    O --> P[JWT Secret Key];
    P --> Q[.env Configuration];
    N --> R[MongoDB Compass];

    classDef service fill:#6DB33F,stroke:#333,stroke-width:2px;
    class A,B,C,D,E,F,G,H service;
    class I,J,K,L,M,N service;
