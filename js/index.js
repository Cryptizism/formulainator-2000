class graph{
    constructor(){
        this.nodes = {};
    }
    
    addNode(node){
        if(this.nodes[node]) throw new Error("Node already exists");
        this.nodes[node] = [];
    }

    addEdge(source, destination){
        if(!this.nodes[source]) throw new Error("Source node does not exist");
        else if (!this.nodes[destination]) throw new Error("Destination node does not exist");

        if(!this.nodes[source].includes(destination)){
            this.nodes[source].push(destination);
        }

        if(!this.nodes[destination].includes(source)){
            this.nodes[destination].push(source);
        }
    }
}

const g = new graph();
g.addNode("Velocity Distance Time formula");
g.addNode("Distance");
g.addNode("Time");
g.addNode("Velocity");
g.addNode("Frequency formula");
g.addNode("Frequency");
g.addNode("Wavelength");

g.addEdge("Velocity Distance Time formula", "Distance");
g.addEdge("Velocity Distance Time formula", "Time");
g.addEdge("Velocity Distance Time formula", "Velocity");
g.addEdge("Frequency formula", "Frequency");
g.addEdge("Frequency formula", "Wavelength");
g.addEdge("Frequency formula", "Velocity");

console.log(g);

//Creates nodes
for (const elem in g.nodes) {
    if (Object.hasOwnProperty.call(g.nodes, elem)) {
        let node = document.createElement("div");
        node.classList.add("draggable");
        node.classList.add("node");
        node.id = htmlFriendly(elem);
        node.appendChild(document.createTextNode(elem));
        document.body.appendChild(node);
    }
}
//Creates edges
let connectedEdges = {};

for (const elem in g.nodes) {
    if (Object.hasOwnProperty.call(g.nodes, elem)) {
        g.nodes[elem].forEach(element => {
            try {
                connectEdges(element, elem);
            } catch (error) {}
        });
    }
}

function connectEdges(element, elem){
    if(connectedEdges[`${element}-${elem}`] || connectedEdges[`${elem}-${element}`]) throw new Error("Edge already exists");
    $().connections({ from: `#${htmlFriendly(element)}`, to: `#${htmlFriendly(elem)}`});
    connectedEdges[`${element}-${elem}`] = true;
}

$('*').disableSelection();
$( ".draggable" ).draggable();
$.repeat().add('connection').each($).connections('update').wait(0);

function htmlFriendly(str){
    return str.replace(/ /g, '-');
}