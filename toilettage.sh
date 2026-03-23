#!/bin/bash

# Script de gestion - Toilettage Animaux
# Usage: ./toilettage.sh [up|down|status|logs|rebuild|restart]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_NAME="toilettage-frontend"
DOMAIN="toilettage.dev.privateip.org"
PORT="8083"

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonctions
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}  Toilettage Animaux - $1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

check_unified_stack() {
    if ! docker network ls | grep -q "unified-stack_unified-net"; then
        print_error "unified-stack n'est pas actif!"
        print_info "Lancez d'abord: cd ~/projets/infrastructure/unified-stack && ./stack.sh up"
        exit 1
    fi
    print_success "unified-stack est actif"
}

start() {
    print_header "Démarrage"
    
    check_unified_stack
    
    cd "$SCRIPT_DIR"
    
    print_info "Construction de l'image..."
    docker compose build
    
    print_info "Démarrage du service..."
    docker compose up -d
    
    sleep 2
    
    if docker ps --format '{{.Names}}' | grep -q "$PROJECT_NAME"; then
        print_success "Service démarré avec succès!"
        print_info "Accès: https://$DOMAIN"
        print_info "Port local: $PORT"
    else
        print_error "Échec du démarrage"
        exit 1
    fi
}

stop() {
    print_header "Arrêt"
    
    cd "$SCRIPT_DIR"
    docker compose down
    
    print_success "Service arrêté"
}

restart() {
    print_header "Redémarrage"
    
    stop
    start
}

rebuild() {
    print_header "Rebuild complet"
    
    cd "$SCRIPT_DIR"
    
    print_info "Suppression de l'ancienne image..."
    docker compose down
    
    print_info "Reconstruction..."
    docker compose build --no-cache
    
    print_info "Démarrage..."
    docker compose up -d
    
    print_success "Rebuild terminé!"
    print_info "Accès: https://$DOMAIN"
}

status() {
    print_header "Status"
    
    cd "$SCRIPT_DIR"
    
    echo ""
    print_info "Containers:"
    docker compose ps
    
    echo ""
    print_info "Réseau:"
    docker network ls | grep unified || echo "  unified-stack non trouvé"
    
    echo ""
    if docker ps --format '{{.Names}}' | grep -q "$PROJECT_NAME"; then
        print_success "Service: ACTIF"
        print_info "URL: https://$DOMAIN"
        print_info "Port: $PORT"
    else
        print_error "Service: INACTIF"
    fi
}

logs() {
    cd "$SCRIPT_DIR"
    docker compose logs -f
}

show_help() {
    echo "Toilettage Animaux - Gestion du service"
    echo ""
    echo "Usage: $0 [commande]"
    echo ""
    echo "Commandes:"
    echo "  up        Démarrer le service"
    echo "  down      Arrêter le service"
    echo "  restart   Redémarrer le service"
    echo "  rebuild   Rebuild complet (no-cache)"
    echo "  status    Afficher le statut"
    echo "  logs      Voir les logs en temps réel"
    echo "  help      Afficher cette aide"
    echo ""
    echo "Domaine: https://$DOMAIN"
    echo "Port: $PORT"
}

# Main
case "${1:-help}" in
    up)
        start
        ;;
    down)
        stop
        ;;
    restart)
        restart
        ;;
    rebuild)
        rebuild
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        print_error "Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac
