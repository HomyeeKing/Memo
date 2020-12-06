var express = require('express')
var router = express.Router()
const formidable = require('formidable')

const AdmZip = require('adm-zip')
const computer = require('../models/computer')
const kaoyan = require('../models/kaoyan')
const Card = require('../models/cards')

const NODE = {
	computer: computer,
	kaoyan: kaoyan
}

/* GET home page. */
router.get('/', function(req, res) {
	res.send('connect')
})

router.get('/getWords', async (req, res) => {
	let count, Voca
	let { currentPage, range, which } = req.query
	currentPage = parseInt(currentPage)
	range = parseInt(range)
	if (typeof currentPage !== 'number' || typeof range !== 'number') {
		throw new TypeError('参数不是数值类型')
	}
	let skip = (currentPage - 1) * range

	if (which === 'computer' || which === 'kaoyan') {
		Voca = NODE[which]
		await Voca.countDocuments(null, (err, num) => {
			if (err) throw err
			count = num
		})

		await Voca.find({}, { _id: false, __v: false }).limit(range).skip(skip).exec((err, doc) => {
			if (err) throw err

			let backVal = {
				count,
				docs: doc
			}
			res.json(backVal)
		})
	} else {
		try {
			console.log(which)
			const words = await Card.find({ cardName: which }, { words: true })
			let docs = words[0]['words']
			count = docs.length
			docs = docs.slice(skip, skip + range)
			res.json({
				code: 200,
				count,
				docs,
				msg: '成功'
			})
		} catch (error) {
			res.json({
				code: 500,
				msg: '获取单词失败',
				count: 0
			})
		}
	}
})

router.post('/createCard', async (req, res) => {
	const { cardName, cover } = req.body
	const result = await Card.findOne({ cardName: cardName })
	if (result) {
		res.json({
			code: 2,
			msg: '该用户名已经存在'
		})
	} else {
		const newCard = new Card({
			cardName,
			cover: cover ? cover : null
		})
		try {
			await newCard.save()
			res.json({ code: 200, msg: '创建成功！' })
		} catch (error) {
			console.log(error.message)
			res.json({ code: 4, msg: '存储失败' + error })
		}
	}
})
router.get('/getCards', async (req, res) => {
	const result = await Card.find()
	if (result) {
		res.json({
			code: 200,
			data: result,
			msg: '获取成功！'
		})
	} else {
		res.json({
			code: 500,
			msg: '获取失败！'
		})
	}
})

// 接收上传的单词文件并解析
router.post('/upload', (req, res) => {
	const form = formidable({ multiples: true })
	const formatData = (dataArr) => {
		return dataArr.map((str) => {
			const words = str.replace(/<w:t>/g, '').replace(/<\/w:t>/, '')
			const [ word, translation ] = words.split(' ')
			return { word, translation }
		})
	}
	form.parse(req, async (err, fields, files) => {
		if (err) {
			return res.json({
				code: 500,
				msg: '文件解析错误'
			})
		}

		const doc = files['doc']
		const owner = fields['owner']
		if (!owner) {
			return res.json({
				code: 400,
				msg: '缺少owner名称！'
			})
		}
		const zip = new AdmZip(doc.path)

		zip.extractAllTo('./output/2', true)
		let contentXml = zip.readAsText('word/document.xml')

		let matchWT = contentXml.match(/(<w:t>.*?<\/w:t>)/gi)
		try {
			const words = formatData(matchWT)
			await Card.updateOne({ cardName: owner }, { $set: { words } })
			return res.json({
				code: 200,
				msg: '上传单词成功！'
			})
		} catch (error) {
			return res.json({
				code: 500,
				msg: '上传的文件的单词存储到数据库失败'
			})
		}
	})
})
module.exports = router
