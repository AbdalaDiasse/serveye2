import React from "react";

export const ReconnaissancePage = (): JSX.Element => {
  return (
    <div className="flex-1 p-8 bg-[linear-gradient(90deg,rgba(248,250,252,1)_0%,rgba(230,242,255,1)_100%)]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <img
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              alt="Reconnaissance"
              src="/figmaAssets/frame-2.svg"
            />
            <h2 className="text-xl font-semibold text-gray-900 [font-family:'Inter',Helvetica] mb-2">
              Reconnaissance Faciale
            </h2>
            <p className="text-gray-500 [font-family:'Inter',Helvetica]">
              Cette section sera bientôt disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};