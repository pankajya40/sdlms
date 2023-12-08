const fs = require("fs");
const path = require("path");
const PDFMerger = require('pdf-merger-js');
const {generatePdf} = require('./converter');
const {allowedUids} = require('./config');
const {paths} = require('../../constants');

const BASE_DIR = path.join(paths.baseDir, 'src', 'views', 'generators', 'joiningletter', 'templates');
const OUTPUT_DIR_BASE = path.join(paths.baseDir, 'public', 'uploads');

const joiningLetter = module.exports;
joiningLetter.allowedUids = allowedUids;

joiningLetter.listTemplates = () => {
  return listDirectories(BASE_DIR);
}

joiningLetter.generateJoiningLetter = async (data, template, filename='') => {

    const selectedTemplate = path.join(BASE_DIR, template);
    if (!fs.existsSync(selectedTemplate)) {
      throw new Error('Invalid template name!');
    }
    
    const templateAssets = listFiles(selectedTemplate);
    const outputPath = path.join(OUTPUT_DIR_BASE, 'generated');
    const dateOfGeneration = getFormattedDate(Date.now());
    const dataBinding = {...data, dateOfGeneration};
  
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, {recursive: true});
    }
    
    const outputsFiles = await Promise.all(templateAssets.map(async(template) => {
  
      const [header, footer] = listFiles(path.join(selectedTemplate, 'images'));
  
      const headerImage = Buffer.from(fs.readFileSync(path.join(selectedTemplate, 'images', header))).toString('base64');
      const footerImage = Buffer.from(fs.readFileSync(path.join(selectedTemplate, 'images', footer))).toString('base64');
      const outputFilePath = path.join(outputPath, generateFilename(template, 'pdf'));
  
      // selectedTemplate has to be the path of the template
      await generatePdf(dataBinding, headerImage, footerImage, [selectedTemplate, template].join('/'), outputFilePath);
      return outputFilePath;

    }));
  
    var merger = new PDFMerger();
    
    await outputsFiles.reduce( async (previous, next) => {
  
      await previous;
      return merger.add(next);
  
    }, Promise.resolve());
  
    const generatedFilename = generateFilename(['generated_', filename, '_'].join(''), 'pdf');
    const generatedFilePath = path.join(outputPath, generatedFilename);

    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, {recursive: true});
    }

    await merger.save(generatedFilePath);

    cleanUpTemporaryFiles(outputsFiles);
    return ['/assets/uploads/generated/', generatedFilename].join('');
}

function generateFilename(name, ext) {
	return [name, '_', Date.now(), '.', ext].join('');
}

function getFormattedDate(time = Date.now()) {
	const date = new Date(time);
	return `${date.getDate()} ${date.toLocaleDateString(undefined, { month: "long" })}, ${date.getFullYear()}`;
}

function listDirectories(dirPath) {
	return fs.readdirSync(dirPath, {
			withFileTypes: true
		})
		.filter(dirent => dirent.isDirectory())
		.map(dirent => dirent.name);
}

function listFiles(dirPath) {
	return fs.readdirSync(dirPath, {
			withFileTypes: true
		})
		.filter(dirent => dirent.isFile())
		.map(dirent => dirent.name);
}

function cleanUpTemporaryFiles(fileArray = []) {
	if (!Array.isArray(fileArray)) {
		throw new Error('Must be an array');
	}

	fileArray.forEach(file => fs.unlinkSync(file));
}