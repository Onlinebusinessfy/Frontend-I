import requests
from django.shortcuts import render

# Create your views here.
def buscar_pokemon(request):
    data = None
    status_code = None
    mensaje = ""
    if request.method == 'POST':
        nombre = request.POST.get("nombre", "").strip().lower()
        url = f"https://api.pokemontcg.io/v2/cards?q=name:{nombre}"
        
        try:
            response = requests.get(url)
            status_code = response.status_code
            json_data = response.json()
            cards = json_data.get("data", [])

            if status_code == 200:
                if cards:
                    card = cards[0]
                    data = {
                        "nombre": card["name"],
                        "imagen": card["images"]["large"],
                        "tipo": ", ".join(card.get("types", [])),
                        "rareza": card.get("rarity", "Desconocida"),
                        "set": card.get("set", {}).get("name", "Desconocido")
                    }
                    mensaje = "¡Pokemon encontrado!"
                    status_code = 200

                else:
                    mensaje = "No se encontraron pokemones con ese nombre."
                    status_code = 404

            
            elif status_code == 404:
                mensaje = "Tú pokemon no ha sido encontrado."

            elif status_code in [401, 403]:
                mensaje = "No autorizado. Verifica tus credenciales."

            elif status_code == 500:
                mensaje = "Error en el servidor. Por favor, intenta nuevamente más tarde."

            else:
                mensaje = f"Error inesperado. Código de estado: {status_code}"

        except requests.exceptions.RequestException:
            mensaje = "Error de conexión. Por favor, verifica tu conexión a internet."
            status_code = "Error de conexión"

    return render(request, 'index.html', {'data': data, 'status_code': status_code, 'mensaje': mensaje})
            
