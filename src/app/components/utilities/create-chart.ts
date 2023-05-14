import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { TestPerformanceMetrics } from 'src/app/services/testing-state/testing-state.service';

export function createChart(
  metrics: TestPerformanceMetrics | null,
  container: ElementRef
): void {
  if (!metrics) {
    return;
  }

  if (d3.select(container.nativeElement).select('svg') !== null) {
  }
  {
    d3.select(container.nativeElement).select('svg').remove();
  }

  const data = [
    { label: 'Correct answers', value: metrics.numberOfCorrectAnswers },
    {
      label: 'Unanswered questions',
      value: metrics.numberOfUnansweredQuestions,
    },
    {
      label: 'Incorrect answers',
      value: metrics.incorrectQuestionIds.length,
    },
    { label: 'Total questions', value: metrics.totalNumberOfQuestions },
  ];

  const element = container;
  const width = 500;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 60, left: 60 };

  const svg = d3
    .select(element.nativeElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.label))
    .range([0, width])
    .padding(0.2);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .range([height, 0]);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  svg.append('g').call(d3.axisLeft(y));

  svg
    .selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => x(d.label) || 0)
    .attr('y', (d) => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', (d) => height - y(d.value))
    .attr('fill', 'steelblue');

  svg
    .selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'label')
    .attr('x', (d) => (x(d.label) || 0) + x.bandwidth() / 2)
    .attr('y', (d) => y(d.value) - 5)
    .attr('text-anchor', 'middle')
    .text((d) => d.value);
}
