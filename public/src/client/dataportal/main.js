'use strict'

/* globals define */

define('forum/dataportal/main', ['api',
	'https://cdn.datatables.net/1.13.3/js/jquery.dataTables.js',
	"https://cdn.jsdelivr.net/npm/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js",
	"https://cdn.jsdelivr.net/npm/jQuery-QueryBuilder@2.6.2/dist/js/query-builder.min.js"
], function (api) {

	let tableColumnsState = {};
	let datasetid;
	let invalidFilter = false;
	let groupByFieldName;

	const main = {};

	main.init = () => {

		/*  jQuery Querybuilder setup */

		$('#filter').on('validationError.queryBuilder', function (e, rule, error, value) {
			if (['no_filter', 'empty_group'].includes(error[0]) && ['filter_rule_0', 'filter_group_0'].includes(rule.id)) e.preventDefault();
			else {
				invalidFilter = true;
			}
		})

		$('#filter').on('rulesChanged.queryBuilder', function () {
			resetFetchedData();
			invalidFilter = false;
		})

		$('#filter').on('afterUpdateRuleValue.queryBuilder', function (e, rule) {
			if (rule.filter.plugin === 'datepicker') {
				rule.$el.find('.rule-value-container input').datepicker('update');
			}
		});

		$('#filter').queryBuilder({
			filters: [{ id: 'none', label: 'None', type: 'integer' }]
		})


		$('#filter-reset').on('click', function () {
			$('#filter').queryBuilder('reset');
		});

		/* end of setup */


		$('#dataportal-sidebar').children().each(function () {
			$(this).on('click', renderDatasetInterface);
		})
		$('#getDataButton').on('click', () => { fetchData(false, renderDataAsTable) });
		$('#getCSVDataButton').on('click', () => { fetchData(true, downloadDataAsCSV) });

	}

	return main;

	/**
	 * @function renderDatasetInterface
	 * @description reset rendered html, get dataset metadata and render dataset details and interface to get data
	 */
	function renderDatasetInterface() {

		$('#getDataButton').removeAttr('style').hide();
		$('#getCSVDataButton').removeAttr('style').hide();
		$('#filterContainer').removeAttr('style').hide();
		$('#datasetName').html('');
		$('#groupBy').html('');
		$('#datasetSchema').html('');
		$('#dataTableContainer').html('');

		datasetid = $(this).data('datasetid');
		groupByFieldName = 'none'
		api.get('/dataportal/datasets/' + datasetid, {}).then(renderDatasetDetails);
	}

	/**
	 * @function fetchData
	 * @description call appropriate API and get data as json or csv
	 *
	 * @param { Boolean } getCSV
	 * @param { (data: String | *[]) => void } dataHandler
	 */
	function fetchData(getCSV, dataHandler) {

		const groupOrSelectConfig = groupByFieldName === 'none' ? generateSelectionConfig() : generateGroupingConfig();

		const filterConfig = $('#filter').queryBuilder('getMongo');

		if (!groupOrSelectConfig) return alert('Select atleast one field');
		if (invalidFilter) return alert('Invalid filter');

		const requestBody = {
			datasetid,
			filter: filterConfig ? filterConfig : {},
		}

		if (groupByFieldName === 'none') requestBody.select = groupOrSelectConfig; // selectConfig
		else requestBody.group = groupOrSelectConfig; // groupConfig

		const requestHeaders = {
			type: 'POST',
			url: '/dataportal/data' + (getCSV ? '/csv' : ''),
			contentType: 'application/json',
			data: JSON.stringify(requestBody)
		}

		if (!getCSV) requestHeaders.dataType = 'json';

		doAjax(requestHeaders)
			.then(data => getCSV ? dataHandler(data) : dataHandler(data.response));
	}

	/**
	 * @function downloadDataAsCSV
	 *
	 * @param { String } data
	 */
	function downloadDataAsCSV(data) {

		const fileName = 'data-' + new Date().toISOString() + '.csv';

		// create a temporary anchor tag and click it, downloading the CSV
		$('<a>', {
			href: 'data:text/csv;charset=utf-8,' + encodeURI(data),
			target: '_blank',
			download: fileName
		})[0].click();
	}

	/**
	 * @function createDataTableHeader
	 * @description create an HTML table header
	 *
	 * @returns { JQuery<HTMLElement> }
	 */
	function createDataTableHeader() {

		const header = $('<tr>');

		if (groupByFieldName !== 'none') header.append($('<th>', { text: groupByFieldName }));

		$.each(tableColumnsState, function (fieldName, columnState) {
			if (columnState.checked === 1 && fieldName !== groupByFieldName) header.append($('<th>', { text: fieldName }));
		})

		return header;
	}

	/**
	 * @function formatDataTableValue
	 * @description format value to account for nulls and turn unix timestamps into date strings
	 *
	 * @param { String } fieldName
	 * @param { * } value
	 * @returns { * }
	 */
	function formatDataTableValue(fieldName, value) {

		if (value === null) return '-';
		else if (tableColumnsState[fieldName].finalType === 'UnixTimestamp') return moment(value, moment.DATETIME_LOCAL_SECONDS);
		else return value;
	}

	/**
	 * @function renderDataAsTable
	 * @description render input data as an html table and format it using datatable ( external plugin )
	 *
	 * @param { *[] } data
	 */
	function renderDataAsTable(data) {

		const header = createDataTableHeader();
		const body = $('<tbody>');

		$.each(data, function (index, rowData) {

			const row = $('<tr>');
			$.each(rowData, function (fieldName, value) {
				row.append($('<td>', { text: formatDataTableValue(fieldName, value) }));
			})
			body.append(row);
		})

		const table = $('<table>', { id: 'dataTable' })
			.addClass('table')
			.append($('<thead>').append(header))
			.append(body);

		$('#getCSVDataButton').show();
		$('#dataTableContainer').html(table);
		$('#dataTable').DataTable({});
	}

	/**
	 * @function resetFetchedData
	 * @description clear rendered html table and hide button to download CSV
	 */
	function resetFetchedData() {

		$('#getCSVDataButton').removeAttr('style').hide();
		$('#dataTableContainer').html('');
	}

	/**
	 * @function resetTableCoulumsState
	 * @description flush out existing coulumn state and update to the new state
	 *
	 * @param { { [FieldName: String]: 'String' | 'Number' | 'Boolean' | 'ObjectId' | 'UnixTimestamp' } } schema
	 */
	function resetTableCoulumsState(schema) {

		tableColumnsState = {};
		$.each(schema, function (fieldName, dataType) {
			tableColumnsState[fieldName] = {
				checked: 1,
				type: dataType,
				hidden: false,
				groupOperator: 'first',
				finalType: dataType
			}
		})
	}

	/**
	 * @function getGroupOperators
	 * @description return appropriate group operations according to data type
	 *
	 * @param { String } dataType
	 * @returns { String[] }
	 */
	function getGroupOperators(dataType) {

		switch (dataType) {
			case 'Boolean':
				return ['first', 'count', 'count distinct'];
			case 'String':
				return ['first', 'count', 'count distinct'];
			case 'Number':
				return ['first', 'count', 'count distinct', 'sum', 'minimum', 'maximum', 'average'];
			case 'ObjectId':
				return ['first', 'count', 'count distinct'];
			case 'UnixTimestamp':
				return ['first', 'count', 'count distinct', 'minimum', 'maximum'];
			default:
				alert('Invalid dataset, alert admin');
		}

	}

	/**
	 * @function renderDatasetDetails
	 * @description render dataset name, grouping, selecting, and filtering interface with dataset schema structure as a table
	 *
	 * @param { {
	 * 		_id: ObjectId
	 * 		name: String,
	 * 		description: String,
	 * 		schema: { [FieldName: String]: String }
	 * } } dataset
	 */
	function renderDatasetDetails(dataset) {

		resetTableCoulumsState(dataset.schema)

		const groupByHTMLDropdownElement = $('<select>', { id: 'groupByDropdown' })
			.append($('<option>', { text: 'none', value: 'none' }))

		const schemaTableHeader = $('<tr>')
			.append($('<th>').append($('<input>', { type: 'checkbox', id: 'select', checked: true })
				.off('change')
				.on('change', updateAllFieldSelections)
			))
			.append($('<th>', { text: 'Field' }))
			.append($('<th>', { text: 'Type' }))
			.append($('<th>', { text: 'Operation', id: 'groupedOperatorTitleColumn' }))
			.append($('<th>', { text: 'Final Type', id: 'groupedFinalTypeTitleColumn' }))

		const schemaTable = $('<table>')
			.addClass('table')
			.append(schemaTableHeader)

		$.each(dataset.schema, function (fieldName, dataType) {

			const operators = getGroupOperators(dataType);

			groupByHTMLDropdownElement.append($('<option>', { text: fieldName, value: fieldName }))

			const groupOperatorHTMLDropdownElement = $('<select>', { id: 'groupedOperator-' + fieldName })

			$.each(operators, function (index, operator) {
				groupOperatorHTMLDropdownElement.append($('<option>', { value: operator, text: operator }))
			})

			const schemaFieldRow = $('<tr>', { id: 'row-' + fieldName })
				.append($('<td>').append($('<input>', { type: 'checkbox', id: 'select-' + fieldName, checked: true }))) // Select
				.append($('<td>', { text: fieldName })) // FieldName
				.append($('<td>', { text: dataType })) // DataType
				.append($('<td>', { id: 'groupedOperatorContainer-' + fieldName }) // Operation to be done on grouped cells
					.append(groupOperatorHTMLDropdownElement)
					.append($('<span>', { text: '---', id: 'groupedEmptyOperator-' + fieldName }))
				)
				.append($('<td>', { id: 'groupedFinalType-' + fieldName, text: '---' })) // Final dataType after grouping

			schemaTable.append(schemaFieldRow);
		})

		// render dataset name and interface
		$('#datasetName').text(dataset.name);
		$('#groupBy')
			.append($('<span>', { text: 'Group By' }))
			.append(groupByHTMLDropdownElement)
			.append($('<span>', { id: 'groupByFieldDataType' }))
		$('#datasetSchema').html(schemaTable)

		// hide group related cells
		$('#groupedOperatorTitleColumn').hide();
		$('#groupedFinalTypeTitleColumn').hide();
		$('[id^=groupedOperatorContainer-]').hide()
		$('[id^=groupedOperator-]').hide()
		$('[id^=groupedFinalType-]').hide()

		// add event listeners to handle the checkboxes and groping related columns
		$('[id^=select-').each(function () {
			$(this).off('change').on('change', updateFieldSelection);
		})
		$('#groupByDropdown').on('change', updateGroupColumnsVisibility);
		$('[id^=groupedOperator-]').each(function () {
			$(this).off('change').on('change', updateGroupOperatorAndType)
		})

		// render filter interface
		$('#filterContainer').show()
		$('#filter').queryBuilder('reset')
		$('#filter').queryBuilder('setFilters', true, parseSchemaToFilters(dataset.schema));
		$('#getDataButton').show()
	}

	/**
	 * @function updateFieldSelection
	 * @description update field state in tableColumnsState and update visibility of grouping columns
	 */
	function updateFieldSelection() {

		const checkbox = $(this);
		const rowName = checkbox.prop('id').split('-')[1];
		tableColumnsState[rowName].checked = checkbox.is(':checked') ? 1 : 0;

		$('#groupedOperator-' + rowName).val('first').trigger('change');
		updateGroupColumnsValues(tableColumnsState[rowName].checked, rowName);

		resetFetchedData();
	}

	/**
	 * @function updateAllFieldSelections
	 * @description call updateFieldSelection for all fields
	 */
	function updateAllFieldSelections() {

		const checked = $(this).is(':checked');

		$('[id^=select-').each(function () {

			$(this).prop('checked', checked);
			updateFieldSelection.apply(this);
		})
	}

	/**
	 * @function updateGroupColumnsValues
	 * @description switch visibility of grouping operators and final data type
	 *
	 * @param { Boolean } check
	 * @param { String } rowName
	 */
	function updateGroupColumnsValues(check, rowName) {

		!check ? $('#groupedEmptyOperator-' + rowName).show() : $('#groupedEmptyOperator-' + rowName).hide()
		check ? $('#groupedOperator-' + rowName).show() : $('#groupedOperator-' + rowName).hide();
		!check && $('#groupedFinalType-' + rowName).text('---')
	}

	/**
	 * @function updateGroupColumnsVisibility
	 * @description update rendered state of dataset schema table and visibility of grouping related columns according to the field to group by
	 */
	function updateGroupColumnsVisibility() {

		groupByFieldName = $(this).val()
		const groupByNone = groupByFieldName === 'none';
		$('#groupByFieldDataType').text(groupByNone ? '' : tableColumnsState[groupByFieldName].type);

		!groupByNone ? $('#groupedOperatorTitleColumn').show() : $('#groupedOperatorTitleColumn').hide();
		!groupByNone ? $('#groupedFinalTypeTitleColumn').show() : $('#groupedFinalTypeTitleColumn').hide();

		!groupByNone ? $('[id^=groupedOperatorContainer-]').show() : $('[id^=groupedOperatorContainer-]').hide()
		!groupByNone ? $('[id^=groupedFinalType-]').show() : $('[id^=groupedFinalType-]').hide()

		// reset all fields in table ( select all fields if groupByField is none )
		$.each(tableColumnsState, function (fieldName, columnState) {
			if (columnState.hidden) $('#row-' + fieldName).show();
			columnState.checked = groupByNone ? 1 : 0;
			$('#select-' + fieldName).prop('checked', groupByNone)
			$('#select').prop('checked', groupByNone)
			updateGroupColumnsValues(groupByNone, fieldName)
		})

		// hide field to group by and _id since those should not be selected again
		if (tableColumnsState[groupByFieldName]) {
			(tableColumnsState[groupByFieldName].hidden = true);
			$('#row-' + groupByFieldName).hide();
			$('#row-_id').hide();
		}

		resetFetchedData();
	}

	/**
	 * @function updateGroupOperatorAndType
	 * @description update tableColumnsState groupOperator according to interface and show appropriate final data type
	 */
	function updateGroupOperatorAndType() {

		const operator = $(this).val();
		const rowName = $(this).prop('id').split('-')[1];
		const row = tableColumnsState[rowName];
		row.groupOperator = $(this).val();

		let finalType;
		const originalType = row.type;

		if (operator === 'first') finalType = originalType;
		else if (originalType === 'UnixTimestamp' && ['minimum', 'maximum'].includes(operator)) finalType = originalType;
		else finalType = 'Number';

		row.finalType = finalType;
		$('#groupedFinalType-' + rowName).text(finalType);

		resetFetchedData();
	}

	/**
	 * @function parseSchemaToFilters
	 * @description parse the schema structure of the dataset into valid filters for jQuery Querybuilder
	 *
	 * @param { { [FieldName: String]: 'String' | 'Number' | 'Boolean' | 'ObjectId' | 'UnixTimestamp' } } schema
	 * @returns { {
	 * 		id: String,
	 * 		label: String,
	 * 		type: String,
	 * 		operators: String[],
	 * 		input?: 'text' | 'radio' | 'number',
	 * 		values?: *,
	 * 		plugin?: String,
	 * 		plugin_config?: *,
	 * 		validation: *,
	 * 		valueGetter: (rule: *) => *
	 * }[] }
	 */
	function parseSchemaToFilters(schema) {

		const filters = [];

		const boolOP = ['equal', 'is_null', 'is_not_null'];
		const dateOp = ['between', 'not_between', 'less', 'greater', 'is_null', 'is_not_null'];
		const numberOp = ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null', 'less', 'less_or_equal', 'greater', 'greater_or_equal', 'between', 'not_between'];
		const stringOp = ['equal', 'not_equal', 'in', 'not_in', 'is_empty', 'is_not_empty', 'is_null', 'is_not_null', 'begins_with', 'not_begins_with', 'contains', 'not_contains', 'ends_with', 'not_ends_with'];

		for (let [fieldName, valueType] of Object.entries(schema)) {

			if (valueType === 'ObjectId' || valueType === 'Null') continue;
			const filter = {
				id: fieldName,
				label: fieldName.charAt(0).toUpperCase() + fieldName.slice(1),
			};

			switch (valueType) {
				case 'Boolean':
					filter.type = 'boolean';
					filter.operators = boolOP;
					filter.input = 'radio';
					filter.values = { true: 'Yes', false: 'No' };
					break;
				case 'UnixTimestamp':
					filter.type = 'datetime';
					filter.operators = dateOp;
					filter.plugin = 'datepicker';
					filter.plugin_config = {
						format: 'yyyy/mm/dd',
						todayBtn: 'linked',
						todayHighlight: true,
						autoclose: true
					}
					filter.validation = {
						callback: (value, rule) => {
							if (!Array.isArray(value) && isNaN(value)) return 'invalid_date';
							else if (Array.isArray(value) && value.some(value => isNaN(value))) return 'invalid_date';
							else return true
						}
					}
					filter.valueGetter = function convertToTimestamp(rule) {
						const initialDate = new Date(rule.$el.find('.rule-value-container [name$=_0]').val()).getTime();
						const endDate = new Date(rule.$el.find('.rule-value-container [name$=_1]').val()).getTime();
						if (['between', 'not_between'].includes(rule.operator.type))
							return [initialDate, endDate];
						else return initialDate;
					}
					break;
				case 'Number':
					filter.type = 'integer';
					filter.operators = numberOp;
					filter.input = 'number';
					break;
				case 'String':
					filter.type = 'string';
					filter.operators = stringOp;
					filter.input = 'text';
					break;
			}

			filters.push(filter);
		}

		return filters;
	}

	/**
	 * @function generateSelectionConfig
	 * @description create a selection config according to current table columns state
	 *
	 * @returns { { [FieldName: String]: Number } | false }
	 */
	function generateSelectionConfig() {
		const projection = {};
		let valid = false;

		for (let [key, value] of Object.entries(tableColumnsState)) {
			if (value.checked === 1) {
				projection[key] = 1;
				valid = true;
			}
		}

		if (tableColumnsState._id === undefined || tableColumnsState._id.checked !== 1) projection._id = 0;

		if (!valid) return false;

		return projection;
	}

	/**
	 * @function generateGroupingConfig
	 * @description create a groupig config according to current table columns state
	 *
	 * @returns { { groupBy: String, fields: { [FieldName: String]: 'count' | 'count distinct' | 'first' | 'sum' | 'average' | 'minimum' | 'maximum' } } | false }
	 */
	function generateGroupingConfig() {
		const grouping = {};

		grouping.groupBy = groupByFieldName;
		grouping.fields = {};

		for (let [key, value] of Object.entries(tableColumnsState)) {
			if (key === groupByFieldName) continue;
			if (value.checked === 1) {
				grouping.fields[key] = value.groupOperator;
			}
		}

		return groupByFieldName === 'none' ? false : grouping;
	}

})