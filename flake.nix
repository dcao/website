{
  description = "personal website flake";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
   
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          overlays = [];

          pkgs = import nixpkgs {
            inherit system overlays;
          };

          buildInputs = with pkgs; [ ];
        in
        with pkgs;
        {
          devShells = {
            default = mkShell {
              inherit buildInputs;
            };
          };
        }
      );
}
