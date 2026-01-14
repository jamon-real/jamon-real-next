import { getOpeningHours, getRestaurantInfo } from "@/lib/google-maps"
import { MapPin, Phone, Mail, Navigation, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
import { getTranslations, type Language } from "@/lib/translations"

export const metadata: Metadata = {
    title: "Ubicación y Contacto - Mesón Jamón Real",
}

export function generateStaticParams() {
    return [{ lang: "es" }, { lang: "en" }]
}

export default async function LocationPage({ params }: { params: Promise<{ lang: Language }> }) {
    const resolvedParams = await params
    const { lang } = resolvedParams
    const t = getTranslations(lang)

    const [openingHours, restaurantInfo] = await Promise.all([getOpeningHours(), Promise.resolve(getRestaurantInfo())])

    return (
        <div className="flex flex-col min-h-screen">
            <section className="bg-gradient-to-b from-muted/30 to-background py-20 border-b border-border">
                <div className="container px-4 text-center mx-auto">
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
                        {t.location.title}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t.location.subtitle}</p>
                </div>
            </section>

            <section className="flex-1 py-20">
                <div className="container px-4 mx-auto">
                    <div className="grid gap-16 lg:grid-cols-2 max-w-6xl mx-auto">
                        <div>
                            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{t.location.howToGet}</h2>
                            <div className="embed-map-responsive">
                                <div className="embed-map-container">
                                    <iframe
                                        className="embed-map-frame"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight={0}
                                        marginWidth={0}
                                        src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Jamon%20real&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                                        title="Ubicación de Mesón Jamón Real"
                                    />
                                    {/* Oculto: <a href="https://sprunkiretake.net" style={{fontSize:'2px',color:'gray',position:'absolute',bottom:0,left:0,zIndex:1,maxHeight:'1px',overflow:'hidden'}}>Sprunki</a> */}
                                </div>
                                <style>{`.embed-map-responsive{position:relative;text-align:right;width:100%;height:0;padding-bottom:66.66666666666666%;}.embed-map-container{overflow:hidden;background:none!important;width:100%;height:100%;position:absolute;top:0;left:0;}.embed-map-frame{width:100%!important;height:100%!important;position:absolute;top:0;left:0;}`}</style>
                            </div>
                            <p className="text-sm text-muted-foreground mt-6 leading-relaxed text-center">
                                {t.location.transportInfo}
                            </p>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{t.location.contactInfo}</h2>

                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{t.location.address}</h3>
                                            <p className="text-muted-foreground leading-normal">{restaurantInfo.address}</p>
                                            <div>
                                                <a
                                                    href="https://maps.app.goo.gl/kmQK2hsDMgknc2rs9"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-primary hover:underline mt-2"
                                                    style={{ paddingLeft: 0 }}
                                                >
                                                    <Navigation className="h-4 w-4" />
                                                    {t.location.viewOnMaps}
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Phone className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{t.location.phone}</h3>
                                            <a
                                                href="tel:+34954563998"
                                                className="text-muted-foreground hover:text-primary transition-colors text-lg"
                                            >
                                                +34 954 56 39 98
                                            </a>
                                            <p className="text-sm text-muted-foreground mt-1">{t.location.callToReserve}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1">{t.location.email}</h3>
                                            <a
                                                href={`mailto:${restaurantInfo.email}`}
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {restaurantInfo.email}
                                            </a>
                                            <p className="text-sm text-muted-foreground mt-1">{t.location.sendQuestions}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground mb-1">{t.location.schedule}</h3>
                                    <p className="text-muted-foreground leading-normal">
                                        {t.location.scheduleInfo}
                                    </p>
                                    <div>
                                        <a
                                            href="https://maps.app.goo.gl/kmQK2hsDMgknc2rs9"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-primary hover:underline mt-2"
                                            style={{ paddingLeft: 0 }}
                                        >
                                            <Navigation className="h-4 w-4" />
                                            {t.location.viewOnMaps}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            <section className="bg-muted/20 py-16 border-t border-border">
                <div className="container px-4 text-center mx-auto">
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-4">{t.location.readyToVisit}</h2>
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">{t.location.readyToVisitDesc}</p>
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">
                        <a href="tel:+34954563998">{t.nav.reserve}</a>
                    </Button>
                </div>
            </section>
        </div>
    )
}
