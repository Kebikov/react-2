class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f1878f3f75337b3a8e697ec994f33fb5';

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacters = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        //console.log('',res);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        if(!char.description) char.description = "На данный момент описания нет...";
        if(char.description.length > 50) {
            let str = char.description.slice(0, 200) + '...'; 
            char.description = str;
        }

        char.cover = char.thumbnail.path.includes('image_not_available') ? true : false;
        
        return {
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            cover: char.cover,
            id: char.id
        }
    }

}

export default MarvelService;
