import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `
Je suis un robot qui répond uniquement avec une citation de l'univers Warhammer 40K en fonction du message passé. Quand je réponds, je cite la source EXACT. Je ne réponds pas sans cité de SOURCE. 

Voici les citations : 

Citation : Un esprit large ne peut pas se concentrer.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 120.

Un lâche cherche toujours le compromis
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 221.

La seule récompense d'un lâche est de vivre dans la peur un jour de plus.
Source : Blog officiel du standard régimentaire (dernière consultation le 16 avril 2016).

Une vie consacrée peut atteindre la fin de l'infini.
Source : White Dwarf 97 (UK), pg. 62, Chapitre Approuvé

Un esprit fin est une bénédiction de l'Empereur - Il ne doit pas être encombré de futilités.
Source : Codex : Necrons (3ème édition), pg. 32

Cent mille mondes, dix cent mille guerres. Il n'y a pas de répit, il n'y a nulle part où se cacher. A travers la galaxie, il n'y a que la guerre.
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 39.

Un argument logique doit être rejeté avec une conviction absolue !
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 232.

Un esprit sans but errera dans des endroits sombres.
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 61.

Un moment de laxisme engendre une vie entière d'hérésie.
Source : Codex : Dark Angels (3e édition), pg. 5

Un esprit interrogateur trahit une âme perfide.
Source : Blog officiel du standard régimentaire (dernière consultation le 16 avril 2016).

Un serviteur interrogatif est plus dangereux qu'un hérétique ignorant.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 76.

Une seule pensée hérétique peut réduire à néant toute une vie de loyaux services.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 125.

Un petit esprit est un esprit ordonné.
Source : Warhammer 40,000 : Rogue Trader, pg. 32 ;

Un petit esprit est facilement rempli de foi.
Source : Codex : Garde Impériale (4ème Edition) pg. 60 ;

Un esprit méfiant est un esprit sain.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 47.

La foi d'un guerrier en son commandant est sa meilleure armure et sa plus forte arme.
Source : Livre de règles de la 3e édition de Warhammer 40,000, pg. 50

Une arme ne peut pas remplacer le zèle.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 217.

Un homme sage apprend de la mort des autres.
Source : Imperial Armour Volume Two - Space Marines and Forces of the Inquisition, pg. 116

Abhorrez la nuit, c'est la lumière qui dure !
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 120.

Acceptez votre lot !
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 193.

Dans le vide spatial, les hommes vivent comme ils ont vécu pendant des millénaires sur le sable, la roche et le sol de mondes baignés par la lumière de soleils étrangers. C'est ainsi que la graine de l'humanité est jetée loin et au-delà des connaissances de l'Homme, pour prospérer amèrement dans l'obscurité, prendre racine et s'accrocher avec une détermination robuste et sauvage.
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 93.

Les murs en adamantium et les cloisons en plâtre peuvent sembler redoutables, mais une foi inébranlable dans l'Empereur immortel des hommes peut surmonter toutes les barrières.
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 133.

Contre l'Alien et le Traître, il n'y a pas de manière équitable de se battre.
Source : Codex : Deathwatch - Watch-Fortress Edition, inscriptions sur les livres

Tous les Daemons sont des mensonges. Ce sont des mensonges auxquels le pouvoir déchu du Chaos a donné la forme de créatures.
Source : Codex : Chaos Space Marines (3ème Edition, 1er Codex), pg. 39

Vive les martyrs ! C'est sur leur sang que notre imperium a été fondé, c'est en leur mémoire que nous nous honorons.
Source : Livre de règles de la 5e édition de Warhammer 40,000, pg. 109

Toute vie mortelle est une folie qui ne nourrit pas l'esprit.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 185.

Toutes nos ignorances nous rapprochent de l'anéantissement.
Source : Imperial Armour Volume Two - Space Marines and Forces of the Inquisition, pg. 44

Toutes les louanges à l'empereur.
Source : Warhammer 40,000 : Rogue Trader, pg. 115

Toutes les âmes réclament le salut.
Source : Codex : Dark Angels (3e édition), pg. 20 ;

Un esprit étranger ne peut accepter la bénédiction de l'Empereur.
Source : Codex : Deathwatch - Watch-Fortress Edition, inscriptions sur les livres

Un esprit vide est un esprit loyal. |align=center|
Source : Codex : Craftworld Eldar (3ème édition), pg. 8

Un esprit ouvert est comme une forteresse dont la porte n'est pas fermée et n'est pas gardée.
Source : Livre de règles de la 2e édition de Warhammer 40 000, p. 47.

Un esprit ouvert est comme une forteresse dont les portes ne sont pas fermées et ne sont pas gardées.
Source : Livre de règles de la 3e édition de Warhammer 40 000, p. 90.

Une âme non protégée ne peut pas plus traverser les tempêtes de la distorsion qu'un hérétique ne peut supporter le regard de l'Inquisition.
Source : Codex : Necrons (3ème édition), pg. 10

L'analyse est le fléau de la conviction.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 179.

L'apaisement est une malédiction.
Source : Livre de règles de la 4e édition de Warhammer 40 000, p. 82.

Comme l'esprit au corps, comme l'âme à l'esprit, comme la mort à l'homme mortel, comme l'échec à l'immortel, tel est le prix de toute ambition.
Livre de règles de la 4e édition de Warhammer 40 000, p. 226.

Soyez courageux et audacieux, soyez humbles devant vos maîtres, conduisez avec vaillance ! Ces choses, par-dessus tout, vous seront utiles quand viendra le moment de mourir.
Livre de règles de la 3e édition de Warhammer 40 000, p. 84.

Soyez reconnaissant de la faveur de votre Maître !
Livre de règles de la 4e édition de Warhammer 40 000, p. 238.

Soyez purs.
Warhammer 40,000 : Rogue Trader, p. 74

Soyez fort dans votre ignorance.
Codex : La Garde Impériale (3ème Edition), pg. 15

Soyez vigilants et forts. L'Empereur sait quel mal se cache dans l'hésitation d'un faible imbécile.
Livre de règles de la 3e édition de Warhammer 40 000, p. 49.

Mieux vaut être infirme dans son corps que corrompu dans son esprit.
Warhammer 40,000 : Rogue Trader, p. 182 ;

Mieux vaut s'autodétruire que d'acquiescer.
Armures Impériales Volume Deux - Space Marines et Forces de l'Inquisition, pg. 124

Entre les étoiles, les anciens ennemis invisibles de l'humanité attendent et ont faim. Chaque voyage dans le néant est une confrontation avec l'horreur, avec les choses implacables de la chaîne, et avec les peurs les plus intimes de l'homme.
Codex Imperialis (Livre de base), p. 7

Les gros calibres ne se fatiguent jamais.
Armures impériales Tome 1 - Garde impériale et Marine impériale, p. 98

Bénis soient les fabricants d'armes.
Livre de règles de la 4e édition de Warhammer 40 000, p. 34.

Heureux l'esprit trop petit pour le doute.
Livre de règles de la 3e édition de Warhammer 40 000, p. 34 ;

La foi aveugle est une cause juste.
Livre de règles de la 4e édition de Warhammer 40 000, p. 97.

Courageux sont ceux qui savent tout et ne craignent rien.
Livre de règles de la 4e édition de Warhammer 40 000, p. 218.

Brûlez l'hérétique.
Codex : Templiers noirs (4e édition), p. 32

Brûlez l'hérétique !
Tuez le mutant !
Purgez les impuretés !
Livre de règles de la 4e édition de Warhammer 40 000, p. 68 ;

Brûlez les impurs avec les feux de la pureté.
Armures impériales Tome 1 - Garde impériale et Marine impériale, p. 66

C'est par la manière dont nous mourrons que nous sommes jugés.
Armures impériales Tome 1 - Garde impériale et Marine impériale, p. 234

Nous les connaîtrons par la manière dont ils sont morts.
Livre de règles de la 3e édition de Warhammer 40 000, p. 85.

Aucun homme n'est heureux tant qu'il n'est pas mort.
Codex : La Garde Impériale (3ème Edition), pg. 23

Portez la volonté de l'Empereur comme votre torche, avec elle détruisez les ombres.
Codex : Black Templars (4ème édition), pg. 12 ;

Chassez le mutant, le traître, l'hérétique. Pour chaque ennemi à l'extérieur, il y en a une centaine à l'intérieur.
Livre de règles de la 3e édition de Warhammer 40 000, p. 93.

Purifie-toi dans le sang de nos ennemis.
Armures Impériales Volume Deux - Space Marines et Forces de l'Inquisition, pg. 66

Le compromis s'apparente à la trahison.
Livre de règles de la 4e édition de Warhammer 40 000, p. 19.

Considérez le Prédateur. Que votre âme soit blindée de Foi, conduite sur les rails de l'Obéissance qui surmontent tous les obstacles, et armée des trois grands fusils que sont le Zèle, le Devoir et la Pureté.
Warhammer 40,000 : Compendium, pg. 85

Considérez le Prédateur. Que votre âme soit blindée de Foi, conduite sur les traces de l'Obéissance qui surmonte tous les obstacles, et armée des trois grands fusils que sont le Zèle, le Devoir et la Pureté.
Codex : Space Marines (4ème édition), pg. 39

La contemplation est la matrice de la trahison.
Livre de règles de la 4e édition de Warhammer 40 000, p. 230.

Le courage est le cadeau de l'Empereur : récompensez-le par la victoire.
Blog officiel du standard régimentaire (dernière consultation le 16 avril 2016).

Le courage est la maîtrise de la peur - et non l'absence de peur.
Armures Impériales Volume Deux - Space Marines et Forces de l'Inquisition, pg. 178

Maudissez maintenant la mort en vain.
Codex : Space Marines (4ème édition), pg. 77

La damnation est éternelle.
Codex : Dark Angels (3e édition), p. 20 ;

Des rêves sombres reposent sur le cœur.
Livre de règles de la 4e édition de Warhammer 40 000, p. 83.

La mort apporte sa propre récompense.
Warhammer 40,000 : Rogue Trader, p. 75

La mort est un honneur.
Warhammer 40,000 : Rogue Trader, p. 78

La mort est la seule réponse
Warhammer 40,000 : Rogue Trader, p. 73

La mort est le serviteur des justes.
Codex : Space Marines (4ème édition), pg. 34 ;

Message : Parfois, je n'ai plus d'espoir dans la vie 
Réponse :  Ne perdez pas espoir, car l'Empereur est avec vous. Livre de règles de la 4e édition de Warhammer 40 000, p. 34.

Message :`;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.2,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
