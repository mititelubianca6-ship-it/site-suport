document.addEventListener('DOMContentLoaded', () => {
    // 1. Animațiile de la început (Hero Section) sunt controlate prin CSS cu animation-delay

    // 2. Animația Pinguinului (la scroll, etc.)
    const penguin = document.querySelector('.penguin-placeholder');
    if (penguin) {
        // Exemplu: adaugă o clasă pentru o mică mișcare la scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) { // După ce scroll-ezi 100px
                // penguin.classList.add('scrolled-animation');
            } else {
                // penguin.classList.remove('scrolled-animation');
            }
        });
    }

    // 3. Animația casuțelor cu Definiții (Intersection Observer)
    const definitionSection = document.getElementById('definitions-section');
    if (definitionSection) {
        const definitionsBPD = [
            { title: "Schimbări Intense de Dispoziție", text: "Variații rapide și extreme ale emoțiilor..." },
            { title: "Teama de Abandon", text: "O frică profundă de a fi părăsit..." },
            { title: "Dificultatea de a Gestiona Relațiile", text: "Tipare instabile și intense de relaționare..." },
            { title: "Imaginare de Sine Distorsionată", text: "O instabilitate în percepția propriei identități..." },
            { title: "Comportamente Impulsive", text: "Acte riscante, auto-vătămare sau tentative de suicid..." }
        ];

        const definitionsBipolar = [
            { title: "Episoade Maniacale / Depresive", text: "Perioade de energie crescută, euforie sau iritabilitate extremă..." },
            { title: "Energie Oscilantă", text: "Fluctuații semnificative ale nivelului de energie..." },
            { title: "Schimbări de Somn & Apetit", text: "Dificultăți persistente de somn..." },
            { title: "Variații de Gândire & Comportament", text: "De la gânduri accelerate și grandioase..." }
        ];

        const borderlineContainer = definitionSection.querySelector('.borderline-definitions');
        const bipolarContainer = definitionSection.querySelector('.bipolar-definitions');

        // Funcție pentru a crea și adăuga carduri
        const addDefinitionCards = (container, definitions, directionClass, delayMultiplier = 0) => {
            definitions.forEach((def, index) => {
                const card = document.createElement('div');
                card.classList.add('definition-card');
                if (directionClass) {
                    card.classList.add(directionClass);
                }
                card.classList.add(container === borderlineContainer ? 'borderline' : 'bipolar');
                card.innerHTML = `<h3>${def.title}</h3><p>${def.text}</p>`;
                container.appendChild(card);

                // Setează delay-ul pentru animație
                card.style.transitionDelay = `${(index * 0.2) + delayMultiplier}s`;
            });
        };

        // Adaugă cardurile la DOM
        addDefinitionCards(borderlineContainer, definitionsBPD, '', 0.5); // Începe cu un delay de 0.5s după intrarea în viewport
        addDefinitionCards(bipolarContainer, definitionsBipolar, 'from-right', 1.5); // Bipolar începe mai târziu


        // Intersection Observer pentru a declanșa animația când secțiunea e vizibilă
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Când secțiunea e vizibilă, adaugă clasa de vizibilitate
                    const cards = entry.target.querySelectorAll('.definition-card');
                    cards.forEach(card => card.classList.add('is-visible'));
                    observer.unobserve(entry.target); // Oprește observarea după ce s-a declanșat
                }
            });
        }, {
            threshold: 0.3 // Declanașează când 30% din secțiune e vizibilă
        });

        observer.observe(definitionSection);
    }
});