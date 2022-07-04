import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import { data } from '../data';
import { Card } from './CutomNode'
import './index.css';
import { createNodeFromReact } from "@antv/g6-react-node";

const Topology = () => {
    const ref = React.useRef(null)
    let graph = null;

    const width = 950;
    const height = 950;

    const tooltip = new G6.Tooltip({
        className: 'tooltip',
        getContent(e) {
            const outDiv = document.createElement("div");
            if (e.item._cfg.type == "node") {
                outDiv.style.width = "200px";
                outDiv.innerHTML = `
                    <div style="border: 1px solid #06a6db;position: relative;z-index:12">
                      <div style="background-color: #0786e0;padding: 10px 20px; font-size:20px;"> title </div>
                      <div style="padding: 20px;position: relative;z-index:12">
                        <p> test 1</p>
                        <p> test 2</p>
                        <p> test 3</p>
                        <p> test 4</p>
                      </div>
                    </div>  
                  `;
                return outDiv;
            } else {
                outDiv.style.display = "none";
                return outDiv;
            }
        },
    });

    const menu = new G6.Menu({
        className: 'contextMenu',
        getContent(e) {
            const outDiv = document.createElement('div');
            outDiv.style.width = '180px';
            outDiv.innerHTML = `<ul>
              <li>menu01</li>
              <li>menu01</li>
              <li>menu01</li>
              <li>menu01</li>
              <li>menu01</li>
            </ul>`
            return outDiv
        },
        handleMenuClick(target, item) {
            console.log(target, item)
        },
    });

    G6.registerNode("rect-xml2", createNodeFromReact(Card));

    useEffect(() => {
        if (!graph) {
            graph = new G6.Graph({
                container: ref.current,
                width,
                height,
                plugins: [tooltip, menu],
                // translate the graph to align the canvas's center, support by v3.5.1
                fitCenter: true,
                style: { border: '2px solid black' },
                //renderer:'svg',  //canvas içini görmek için
                defaultNode: {
                    /*type: 'circle',
                    size: [40],*/
                    type: 'rect-xml2',
                    size: [120, 40],
                    color: '#5B8FF9',
                    style: {
                        fill: '#9EC9FF',
                        lineWidth: 3,
                    },
                    labelCfg: {
                        style: {
                            fill: '#1890ff',
                            fontSize: 14,
                        },
                        position: 'bottom',
                    },
                },
                defaultEdge: {
                    style:{endArrow: {
                        path: G6.Arrow.triangle(10, 20, 10),
                        d: 20,
                        fill: '#000',
                      },
                     },
                    labelCfg: {
                        autoRotate: true,
                        style: {                            
                            background: {
                                fill: '#ffffff',
                                stroke: '#9EC9FF',
                                padding: [2, 2, 2, 2],
                                radius: 2,
                            },
                        },
                    },
                },
                modes: {
                    default: ['drag-canvas', 'drag-node', {
                        type: "zoom-canvas"
                    }],
                },
                nodeStateStyles: {
                    // style configurations for hover state
                    hover: {
                        fillOpacity: 0.8,
                    },
                    // style configurations for selected state
                    selected: {
                        lineWidth: 5,
                    },
                },
            });
        }
        graph.data(data);
        graph.render();
        bindEvents()
    }, []);

    const bindEvents = () => {
        graph.on("node:mouseenter", (evt) => {
            //console.log('mouseEnter: ',evt)
            const { item } = evt;
            graph.setItemState(item, "active", true);
        });

        graph.on("node:mouseleave", (evt) => {
            //console.log('mouseLeave: ',evt)
            const { item } = evt;
            graph.setItemState(item, "active", false);
        });

        graph.on("node:click", (evt) => {
            //console.log('mouseClick: ', evt)
            graph.getNodes().forEach((node) => {
                graph.clearItemStates(node);
                //console.log('Seçilme efekti temizlendi')
            });
            const { item } = evt;
            graph.setItemState(item, "selected", true);
        });
        graph.on("canvas:click", (evt) => {
            //console.log('canvasEnter: ',evt)
            graph.getNodes().forEach((node) => {
                graph.clearItemStates(node);
            });

        });
    }

    return <div ref={ref} style={{ border: '2px solid black', position: 'fixed' }}></div>
};

export default Topology;