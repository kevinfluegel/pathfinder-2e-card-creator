vm.parse = function (str, plain = false) {
    if (!str)
        return '';

    if (plain) {
        return converter.makeHtml(DOMPurify.sanitize(str));
    }

    str = str
        .replace(/^([\w]*) SG/gmi, '**$1** SG')
        .replace(/^([\w ]*) \(/gmi, '**$1** (')
        .replace(/( |^)(RK Bonus|Kosten|Zugang|Härte TP|Domänenzauber|Kommunikation|Gottheitenties|Vertiefter Domänenzauber|Secondary Casters|Secondary Checks|Ziel\(e\)|Archetyp|Voraussetzung|Voraussetzungen|Rüstungsspezialisierungseffekte|Kapazität|Speziell|Cast(?! \w+ Spell)|Malus \w+ Bewegungsrate|Rüstungsmalus|Stärke \d+|Gruppe|Domäne|Vorteil|Ausschalten|Beschreibung|Nachteil|Reichweite|Nachladen|Fertigkeiten|Ziele|Herstellungsvoraussetzungen|Scope and Influence|Ziele|Hauptquartier|Key Members|Allies|Enemies|Assets|Membership Requirements|Accepted Alignments|TP \(BT\)|Werte|Anathema|Verzögerung|Traditions|verstärktes|\(\+\d\)|Dauer|Bereich|Skills|ST|GE|KO|IN|WE|CH|Gegenstände|Sprache|Sprachen|At Will|Nahkampf|Härte|Hands|Reichweited|Persistent Damage|Schaden|Rettungswurf|Maximale Wirkungsdauer|Phase \d|Auslöser|Effekt|Anforderungen|Zaubertrick|Schwächen|Immunitäten|Resistenzen|Auslöser|Effekt|Anforderung|Häufigkeit|Nutzung|Typ|Munition|Stufe|Preis|Aktivieren|Zaubertrick|Komplexität|Rücksetzer|Ablauf|\d+[stndhr]{2}(?! Stufe)|\(\d+[stndhr]{2}\))( )/gm, '$1**$2**$3')
        .replace(/^ (\w)/gmi, '&nbsp;&nbsp;&nbsp;&nbsp;$1')
        .replace(/^  (\w)/gmi, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$1')
        .replace(/\(x(\d)\)/g, '(&times;$1)')
        .replace(/\n(Bewegungsrate|TP|RK|Heimlichkeit|Wahrnehmung)/g, '\n**$1**')
        .replace(/\n(Kritischer Erfolg|Erfolg|Fehlschlag|Kritischer Fehlschlag)/gmi, '\n**$1**')
        .replace(/, (TP)/, ', **$1**')
        .replace(/(REF|WIL|ZÄH|Willen|Zähigkeit|Reflex) *([+\-\d]+?)/gm, '**$1** $2')
        .replace(/(Last)/, '**$1**')
        .replace(/^(Heimlichkeit|Wahrnehmung)/g, '**$1**')
        .replace(/\(\s*\)/g, '')
        .replace(/\((a|aa|aaa|r|f|1a|2a|3a)\)/gi, (m, p1) => {
            return `<img class="text-img" src="${Images[p1.toLowerCase()]}">`
        })
        .replace(/:(a|aa|aaa|r|f|1a|2a|3a):/gi, (m, p1) => {
            return `<img class="text-img" src="${Images[p1.toLowerCase()]}">`
        })
        .replace(/\[(a|aa|aaa|r|f|1a|2a|3a)\]/gi, (m, p1) => {
            return `<img class="text-img" src="${Images[p1.toLowerCase()]}">`
        })
        .replace(/^-+$/gmi, '<div style="background: #cccccc; height: 2px; margin: 1px 0; border-bottom: 1px solid #00000066"></div>')
        .replace(/[\u2014\u2013]/g, "-") // emdash
        .replace(/[\u2022]/g, "*") // bullet
        .replace(/[\u2018\u2019]/g, "'") // smart single quotes
        .replace(/[\u201C\u201D]/g, '"') // smart double quotes
    str = converter.makeHtml(DOMPurify.sanitize(str));
    return str
        .replace(/<\/div><br>/g, '</div>')
        .replace(/<br \/>\n/gmi, '</p><p>')
        .replace(/<p><strong>(Rettungswurf|Vorteil|Nachteil)/gmi, '<p class="indent"><strong>$1')
        .replace(/<p><strong>(Kritischer Erfolg|Erfolg|Fehlschlag|Kritischer Fehlschlag)/gmi, '<p class="pad"><strong>$1')
        .replace(/<p><strong>/gmi, '<p class="hang"><strong>')
        .replace(/ \+/gmi, '&nbsp;+')

}

var Pf2 = {
    alignment: ['cb', 'cn', 'cg', 'nb', 'n', 'ng', 'rb', 'rn', 'rg'],
    size: ['winzig', 'klein', 'mittegroß', 'groß', 'riesig', 'gigantisch'],
    type: ['Dorf', 'Kleinstadt', 'Stadt', 'Metropole'],
    rarity: ['Einzigartig', 'Selten', 'Ungewöhnlich'],
    categories: ['Merkmal', 'Fähigkeit', 'Gegenstand', 'Kreatur', 'Gefahr', 'Rüstugn', 'Rune', 'Vorrichtung', 'Zauber', 'Fokus', 'Ritual', 'Hintergrund', 'Waffe', 'Organisation', 'Abstammung'].sort(),
    actions: ['a', 'aa', 'aaa', 'r', 'f'],
    describe: {
        actions: {
            a: 'single action',
            aa: 'two actions',
            aaa: 'three actions',
            r: 'reaction',
            f: 'free action'
        }
    },
    traits: {
        all: ["additive", "alchemical", "apex", "archetype", "artifact", "attack", "auditory", "aura", "cantrip", "charm", "companion", "complex", "composition", "concentrate", "consecration", "contact", "curse", "darkness", "death", "dedication", "detection", "disease", "downtime", "emotion", "environmental", "exploration", "extradimensional", "fear", "flourish", "focused", "fortune", "general", "haunt", "healing", "incapacitation", "incorporeal", "infused", "instinct", "light", "linguistic", "litany", "magical", "manipulate", "mechanical", "mental", "metamagic", "minion", "misfortune", "morph", "move", "multiclass", "oath", "open", "polymorph", "possession", "precious", "prediction", "press", "rage", "revelation", "scrying", "secret", "shadow", "skill", "sleep", "splash", "stance", "summoned", "telepathy", "teleportation", "trap", "virulent", "visual", "chaotic", "evil", "good", "lawful", "dwarf", "elf", "gnome", "goblin", "half-elf", "halfling", "half-orc", "human", "bulwark", "comfort", "flexible", "noisy", "alchemist", "barbarian", "bard", "champion", "cleric", "druid", "fighter", "monk", "ranger", "rogue", "sorcerer", "wizard", "aberration", "animal", "astral", "beast", "celestial", "construct", "dragon", "elemental", "ethereal", "fey", "fiend", "fungus", "giant", "humanoid", "monitor", "ooze", "plant", "spirit", "undead", "air", "earth", "fire", "water", "acid", "cold", "electricity", "fire", "force", "negative", "positive", "sonic", "bomb", "consumable", "elixir", "invested", "mutagen", "oil", "potion", "scroll", "snare", "staff", "structure", "talisman", "wand", "aeon", "amphibious", "angel", "aquatic", "archon", "azata", "boggard", "brutal", "caligni", "catfolk", "changeling", "daemon", "demon", "dero", "devil", "dhampir", "dinosaur", "drow", "duergar", "genie", "ghost", "ghoul", "gnoll", "golem", "gremlin", "hag", "inevitable", "kobold", "leshy", "lizardfolk", "merfolk", "mindless", "mummy", "mutant", "nymph", "olfactory", "orc", "protean", "psychopomp", "rakshasa", "ratfolk", "sea", "devil", "skeleton", "soulbound", "sprite", "swarm", "tengu", "troll", "vampire", "werecreature", "xulgath", "zombie", "ingested", "inhaled", "injury", "poison", "common", "rare", "uncommon", "unique", "abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation", "arcane", "divine", "occult", "primal", "agile", "attached", "backstabber", "backswing", "deadly", "disarm", "dwarf", "elf", "fatal", "finesse", "forceful", "free-hand", "gnome", "goblin", "grapple", "halfling", "jousting", "monk", "nonlethal", "orc", "parry", "propulsive", "range", "ranged", "trip", "reach", "shove", "sweep", "tethered", "thrown", "trip", "twin", "two-hand", "unarmed", "versatile", "volley"].sort(),
        data: {
            'additive': `Feats with the additive trait allow you to spend actions to add special substances to bombs or elixirs. You can add only one additive to a single alchemical item, and attempting to add another spoils the item. You can typically use actions with the additive trait only when youâ€™re creating an infused alchemical item, and some can be used only with the Quick Alchemy action. The additive trait is always followed by a level, such as additive 2. An additive adds its level to the level of the alchemical item youâ€™re modifying; the result is the new level of the mixture. The mixtureâ€™s item level must be no higher than your advanced alchemy level.`
        }
    },
}