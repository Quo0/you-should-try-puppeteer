/*
	For advanced test scenarios we need to be able to collect metrics from all pages.
	Unfortunately, page object doesn't have an id, but we can take it from the browserContext.
	Actually, in 99% of tests each context has only 1 active page,so we can use ctx._id as a page identifier.

	The metrics output structure is following:

	metricsOutput = {
		testName: 'TEST-001',
		featureTags: ['Email', 'Email Templates'],

		metricsList: ['Nodes', 'JSHeapUsedSize','JSHeapTotalSize', ... ],

		contexts: [              <------- NOTE: In the this.metrics "contexts" field is an Object with contextId as key
			{
				steps: [
					{
						stepName: 'STEP 1',
						metricsData: {
							Nodes: 1,
							JSHeapUsedSize: 1,
							JSHeapTotalSize: 1,
							JSEventListeners: 1,
							RecalcStyleDuration: 1,
							RecalcStyleCoun: 1
						}
					},
					{
						stepName: 'STEP 2',
						metricsData: {
							...
						}
					}
				]
			},
			{
				steps: [
					...
				]
			},
			...
		]
	};

*/

const trConfig = require('../config/test-run-config');
const saveToYourFavoriteDB = () => {};
const updateDashboardsIfNecessary = () => {};

class MetricsCollector {
	constructor(testName, featureTags) {
		this.primaryMetrics = [
			'Nodes',
			'JSHeapUsedSize',
			'JSHeapTotalSize',
			'JSEventListeners',
			'RecalcStyleDuration',
			'RecalcStyleCount'
		];
		this.contexts = {};
		this.targetPages = [];

		this.metrics = {
			testName,
			featureTags,
			contexts: {}
		};

		this.initialized = false;
		this.shouldNotSaveToDatabase = false;
	}

	async init() {
		/*
			NOTE: It's important to initialize metrics after all contexts are created.
		*/
		if (!trConfig.metrics.enabled) {
			console.log('Metrics are disabled');
			return;
		}

		const allContexts = await browser.browserContexts();
		this.contexts = allContexts.reduce((acc, ctx) => {
			const ctxId = ctx.isIncognito() ? [ctx._id] : 'defaultContextId'; // id of the default context === null

			return {
				...acc,
				[ctxId]: {
					ctx,
					steps: {}
				}
			};

		}, {});

		this.initialized = true;

		return this.collectChunk('Initialized');
	}

	async collectChunk(stepName) {
		if (!this.initialized) { return; }

		const targetPages = this.targetPages.length ? this.targetPages : await this._getTargetPages();

		for (const page of targetPages) {
			const ctxId = page.browserContext()._id || 'defaultContextId';

			const metricsData = this._filterMetrics(await page.metrics());
			this._updateMetricsWithNewData({ ctxId, stepName, metricsData });
		}
	}

	async saveToDatabase() {
		if (!this.initialized || this.shouldNotSaveToDatabase) {	return; }

		const { testName, featureTags, contexts } = this.metrics;

		const metricsData = {
			testName,
			featureTags,
			metricsList: this.primaryMetrics,
			contexts: Object.values(contexts)
    };

		await saveToYourFavoriteDB(metricsData);
    await updateDashboardsIfNecessary(metricsData);

    console.log(JSON.stringify(metricsData, null, 2));
	}

	preventSaveToDatabase() { this.shouldNotSaveToDatabase = true; }

	async _getTargetPages() {
		const targetPages = [];

		for (const { ctx } of Object.values(this.contexts)) {
			const [ mainPage ] = (await ctx.pages()).filter(p => !p.url().includes('about:blank'));
			targetPages.push(mainPage);
		}

		this.targetPages = targetPages;
		return targetPages;
	}

	_updateMetricsWithNewData({ ctxId, stepName, metricsData }) {

		if (!this.metrics.contexts[ctxId]) {
			this.metrics.contexts[ctxId] = {
				steps: []
			};
		}

		this.metrics.contexts = {
			...this.metrics.contexts,
			[ctxId]: {
				steps: [
					...this.metrics.contexts[ctxId].steps,
					{ stepName, metricsData }
				]
			}
		};

	}

	_filterMetrics(pageMetrics) {

		return Object.entries(pageMetrics).reduce((acc, [metricName, metricValue]) => {

			if (this.primaryMetrics.indexOf(metricName) < 0) { return acc; }

			return {
					...acc,
					[metricName]: metricValue
			};

		}, {});
	}

}

module.exports = { MetricsCollector };