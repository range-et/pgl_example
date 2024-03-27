import * as PGL from 'plebeiangraphlibrary';

async function createVisualization() {
    // Assuming LoadZKCSimulated and other methods are available in your library
    const zkcSimulated = await PGL.SampleData.LoadZKCSimulated();

    const canvas = document.getElementById("displayCanvas");
    const graphDrawerOptions = {
        graph: zkcSimulated,
        width: 800,
        height: 700,
        canvas: canvas,
    };

    const graph3d = new PGL.GraphDrawer.GraphDrawer3d(graphDrawerOptions);
    await graph3d.init();
    
    // Create the 3d elements for the graph
    // first describe a global scaling factor
    const bounds = 1
    // first create all the node elements
    const nodeVisualElements = PGL.ThreeWrapper.DrawTHREEBoxBasedVertices(zkcSimulated, bounds, 0xffffff, 5);
    // add the node elements to the scene
    graph3d.addVisElement(nodeVisualElements);
    // then create the edge elements 
    const edgeVisualElements = PGL.ThreeWrapper.DrawTHREEGraphEdgesThick(zkcSimulated, bounds, 0xffafcc, 0.02);
    graph3d.addVisElement(edgeVisualElements);


    function animate() {
        requestAnimationFrame(animate);
        graph3d.rendercall();
    }

    animate();
}

createVisualization();
