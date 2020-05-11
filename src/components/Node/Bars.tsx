import React, { useEffect, useState } from 'react';

import { formatBytes } from '../../helpers';
import { INode, ISystemInfo } from '../../interfaces';

const ProgressBar = require('progressbar.js');

const barStyle = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1000,
  trailColor: '#555',
  trailWidth: 0.5,
  svgStyle: { width: '100%', height: '100%' },
  text: {
    className: 'bar__label',
    autoStyleContainer: true
  },
  from: { color: '#a3f7bf' },
  to: { color: '#ff5f5f' },
  step: (state: any, bar: any) => {
    const value = bar.value();
    if (value >= 1) {
      bar.trail.setAttribute('stroke', state.color);
      bar.trail.setAttribute('stroke-width', 4);
    }
    bar.path.setAttribute('stroke', state.color);
    bar.setText(Math.round(value * 100) + ' %');
  }
};

const circleStyle = {
  ...barStyle,
  text: {
    className: 'circle__label',
    autoStyleContainer: true
  },
  step: (state: any, bar: any) => {
    bar.path.setAttribute('stroke', state.color);
    bar.setText(Math.round(bar.value() * 100) + ' %');
  }
};

interface IProps {
  node: INode;
  systemInfo: ISystemInfo;
}

export default function Bars({ node, systemInfo }: IProps): JSX.Element {
  const [progressBars, setProgressBars] = useState<any>(null);

  /* Initialize the bars (once) and store the elements in state */
  useEffect(() => {
    const avg1 = new ProgressBar.Line(`#${node.id}_avg-1`, barStyle);
    const avg2 = new ProgressBar.Line(`#${node.id}_avg-2`, barStyle);
    const avg3 = new ProgressBar.Line(`#${node.id}_avg-3`, barStyle);

    const mem = new ProgressBar.Circle(`#${node.id}_mem`, circleStyle);
    const hdd = new ProgressBar.Circle(`#${node.id}_hdd`, circleStyle);

    const bars = { avg1, avg2, avg3, mem, hdd };

    setProgressBars(bars);
  }, []);

  /* Update bar data when system info is updated */
  useEffect(() => {
    const updateBarData = (bars = progressBars): void => {
      const numOfCpus = systemInfo.data.cpus.length || 1;

      bars.avg1.animate(systemInfo.data.loadAverage[0] / numOfCpus);
      bars.avg2.animate(systemInfo.data.loadAverage[1] / numOfCpus);
      bars.avg3.animate(systemInfo.data.loadAverage[2] / numOfCpus);

      const memPercentile =
        (systemInfo.data.memory.total - systemInfo.data.memory.free) / systemInfo.data.memory.total;
      const diskPercentile =
        (systemInfo.data.disk.total - systemInfo.data.disk.free) / systemInfo.data.disk.total;

      bars.mem.animate(memPercentile);
      bars.hdd.animate(diskPercentile);
    };

    if (progressBars) {
      updateBarData();
    }
  }, [progressBars, systemInfo]);

  return (
    <div className="w-100">
      <p className="text-center mb-0">Load Averages (1 / 5 / 15 min)</p>
      <div className="bar" id={node.id + '_avg-1'}></div>
      <div className="bar" id={node.id + '_avg-2'}></div>
      <div className="bar" id={node.id + '_avg-3'}></div>

      <div className="row mt-5">
        <div className="col">
          <p className="text-center mb-2">
            Memory Usage
            <br />
            <small className="text-muted">
              {formatBytes(systemInfo.data.memory.total - systemInfo.data.memory.free)} /{' '}
              {formatBytes(systemInfo.data.memory.total)}
            </small>
          </p>

          <div id={node.id + '_mem'}></div>
        </div>
        <div className="col">
          <p className="text-center mb-2">
            Disk Usage
            <br />
            <small className="text-muted">
              {formatBytes(systemInfo.data.disk.total - systemInfo.data.disk.free)} /{' '}
              {formatBytes(systemInfo.data.disk.total)}
            </small>
          </p>

          <div id={node.id + '_hdd'}></div>
        </div>
      </div>
    </div>
  );
}
