'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faChartLine, faHandsHelping } from '@fortawesome/free-solid-svg-icons';

const SobreNosPage = () => {
    const teamMembers = [
        {
            name: 'Caique Carnargo Azevedo',
            role: 'Developer Full Stack, Analista de Sistemas e Cientista de Dados',
            image: 'https://ui-avatars.com/api/?name=Caique+Azevedo&background=17A354&color=fff&size=150',
            bio: 'Especialista em desenvolvimento de soluções completas e análise de dados para otimização de processos agrícolas.'
        },
        {
            name: 'Viviane Aparecida Reis',
            role: 'Developer Full Stack e CEO',
            image: 'https://ui-avatars.com/api/?name=Viviane+Reis&background=17A354&color=fff&size=150',
            bio: 'Lidera nossa equipe com visão estratégica e expertise técnica em desenvolvimento de sistemas para o agronegócio.'
        },
        {
            name: 'Gabriel Furtado de Souza Carvalho',
            role: 'Developer Full Stack, Analista de Sistemas e CTO',
            image: 'https://ui-avatars.com/api/?name=Gabriel+Carvalho&background=17A354&color=fff&size=150',
            bio: 'Responsável pela arquitetura de sistemas e inovação tecnológica, integrando soluções para o mercado agrícola.'
        }
    ];

    const features = [
        {
            icon: faSeedling,
            title: 'Sustentabilidade',
            description: 'Soluções que promovem práticas agrícolas sustentáveis e responsáveis.'
        },
        {
            icon: faChartLine,
            title: 'Análise de Dados',
            description: 'Tomada de decisões baseada em dados precisos e em tempo real.'
        },
        {
            icon: faHandsHelping,
            title: 'Suporte Especializado',
            description: 'Equipe técnica altamente qualificada para atender suas necessidades.'
        }
    ];

    return (
        <div className="bg-bg-light min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary text-white py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Transformando o Agronegócio com Tecnologia</h1>
                    <p className="text-xl opacity-90">Conectando o campo às inovações tecnológicas para um futuro mais produtivo e sustentável</p>
                </div>
            </section>

            {/* Sobre Nós */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-dark border-l-4 border-primary pl-4">Nossa História</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fundada em 2023, a EconAgro nasceu da paixão por tecnologia e agricultura. 
                            Nossa jornada começou com o objetivo de simplificar a vida no campo através 
                            de soluções inovadoras que integram tecnologia de ponta com o conhecimento 
                            tradicional do agronegócio.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Acreditamos que a tecnologia deve ser acessível a todos os produtores, 
                            independentemente do tamanho de sua propriedade. Por isso, desenvolvemos 
                            ferramentas intuitivas e eficientes que realmente fazem a diferença no dia a dia do campo.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl transform transition hover:scale-105 duration-300">
                        <img 
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
                            alt="Campo agrícola com tecnologia"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Missão, Visão e Valores */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-xl transform transition hover:scale-105 duration-300">
                        <img 
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
                            alt="Tecnologia no campo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="order-1 md:order-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-4">Nossa Missão</h2>
                            <p className="text-gray-600">
                                Potencializar a produtividade e sustentabilidade no campo através de 
                                soluções tecnológicas inovadoras, acessíveis e fáceis de usar.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-4">Nossa Visão</h2>
                            <p className="text-gray-600">
                                Ser referência em inovação tecnológica para o agronegócio, 
                                contribuindo para uma produção agrícola mais eficiente e sustentável.
                            </p>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-dark mb-4">Nossos Valores</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Inovação contínua</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Sustentabilidade ambiental</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Compromisso com o cliente</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Excelência operacional</li>
                                <li className="flex items-center"><span className="w-2 h-2 bg-primary rounded-full mr-2"></span>Ética e transparência</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Destaques */}
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center group">
                            <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <FontAwesomeIcon icon={feature.icon} size="2x" />
                            </div>
                            <h3 className="text-xl font-bold text-dark mb-4">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Nossa Equipe */}
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-dark mb-4">Conheça Nossa Equipe</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Profissionais apaixonados por tecnologia e agricultura dedicados a transformar o setor</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="p-8 text-center">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md">
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-xl font-bold text-dark mb-2">{member.name}</h3>
                                    <p className="text-primary font-medium text-sm mb-4 uppercase tracking-wider">{member.role}</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Chamada para Ação */}
                <div className="bg-secondary rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para transformar sua produção agrícola?</h2>
                        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Entre em contato e descubra como podemos ajudar seu negócio a crescer com nossas soluções tecnológicas</p>
                        <Link href="/talktous" className="inline-block bg-white text-primary font-bold py-4 px-10 rounded-full hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 no-underline">
                            Fale Conosco
                        </Link>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
            </section>
        </div>
    );
};

export default SobreNosPage;
