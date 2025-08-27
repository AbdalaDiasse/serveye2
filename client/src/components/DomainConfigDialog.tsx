import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { DOMAINS, type DomainType } from "@shared/schema";

interface DomainConfigDialogProps {
  currentDomain: DomainType;
  currentSections: string[];
  onDomainChange: (domain: DomainType, sections: string[]) => void;
}

export function DomainConfigDialog({ 
  currentDomain, 
  currentSections, 
  onDomainChange 
}: DomainConfigDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDomain, setSelectedDomain] = useState<DomainType>(currentDomain);
  const [selectedSections, setSelectedSections] = useState<string[]>(currentSections);

  const handleDomainSelect = (domain: DomainType) => {
    setSelectedDomain(domain);
    // Initialize with all sections enabled for the selected domain
    const domainSections = DOMAINS[domain].sections.map(section => section.id);
    setSelectedSections(domainSections);
    setStep(2);
  };

  const handleSectionToggle = (sectionId: string, checked: boolean) => {
    setSelectedSections(prev => 
      checked 
        ? [...prev, sectionId]
        : prev.filter(id => id !== sectionId)
    );
  };

  const handleSave = () => {
    onDomainChange(selectedDomain, selectedSections);
    setIsOpen(false);
    setStep(1);
  };

  const handleCancel = () => {
    setSelectedDomain(currentDomain);
    setSelectedSections(currentSections);
    setIsOpen(false);
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 hover:bg-slate-50 group"
          data-testid="button-open-domain-config"
        >
          <Settings className="w-4 h-4" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Configuration
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto" data-testid="dialog-domain-config">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Configuration du Centre de Contrôle Intelligent
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Niveau 1: Sélection du Domaine</h3>
              <p className="text-slate-600 mb-6">
                Choisissez le domaine d'application pour adapter l'interface à vos besoins spécifiques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(DOMAINS).map(([domainKey, domain]) => (
                <Card 
                  key={domainKey}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedDomain === domainKey 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-slate-50'
                  }`}
                  onClick={() => handleDomainSelect(domainKey as DomainType)}
                  data-testid={`card-domain-${domainKey}`}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="text-2xl">{domain.icon}</span>
                      {domain.name}
                      {selectedDomain === domainKey && (
                        <Badge variant="default" className="ml-auto">
                          Sélectionné
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-slate-600 mb-3">
                        {domain.sections.length} sections disponibles
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {domain.sections.slice(0, 3).map((section) => (
                          <Badge key={section.id} variant="secondary" className="text-xs">
                            {section.name}
                          </Badge>
                        ))}
                        {domain.sections.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{domain.sections.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel} data-testid="button-cancel">
                Annuler
              </Button>
              <Button 
                onClick={() => setStep(2)} 
                disabled={!selectedDomain}
                className="gap-2"
                data-testid="button-next-step"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setStep(1)}
                className="gap-2"
                data-testid="button-back-step"
              >
                <ChevronLeft className="w-4 h-4" />
                Retour
              </Button>
              <div>
                <h3 className="text-lg font-medium">
                  Niveau 2: Configuration des Sections
                </h3>
                <p className="text-slate-600">
                  Domaine: <span className="font-medium">{DOMAINS[selectedDomain].name}</span>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-600">
                Sélectionnez les sections à afficher dans votre dashboard:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DOMAINS[selectedDomain].sections.map((section) => (
                  <Card key={section.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={section.id}
                        checked={selectedSections.includes(section.id)}
                        onCheckedChange={(checked) => 
                          handleSectionToggle(section.id, checked as boolean)
                        }
                        data-testid={`checkbox-section-${section.id}`}
                      />
                      <div className="flex-1 min-w-0">
                        <Label 
                          htmlFor={section.id} 
                          className="text-sm font-medium cursor-pointer"
                        >
                          {section.name}
                        </Label>
                        <p className="text-xs text-slate-600 mt-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Sections sélectionnées:</strong> {selectedSections.length} / {DOMAINS[selectedDomain].sections.length}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleCancel} data-testid="button-cancel-final">
                Annuler
              </Button>
              <Button 
                onClick={handleSave}
                disabled={selectedSections.length === 0}
                data-testid="button-save-config"
              >
                Sauvegarder la Configuration
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}