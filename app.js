var express= require('express');
var app = express();
var cookie = require('cookie-parser');
var session = require('express-session');
var fs = require('fs');
const path = require('path');
// const { equal } = require('assert');

app.use("/static", express.static('./static/'));
app.use(session({secret:'my secret', resave:false, saveUninitialized:false}));

app.get('/',function(req,res){
	if(req.session.isLoggedIn===true){
		res.sendFile(path.join(__dirname+'/index.html'));
	}
	else{
	res.sendFile(path.join(__dirname+'/login.html'));
	}
})
app.get('/index',function(req,res){
	if(req.session.isLoggedIn===true){
	res.sendFile(path.join(__dirname+'/index.html'));
	}
	else{
		res.redirect('/');
	}
})

app.get('/search',function(req,res){
	if(req.session.isLoggedIn===true){
		res.sendFile(path.join(__dirname+'/search.html'));
	}else{
		res.redirect('/');
	}

})

app.get('/about',function(req,res){
		res.sendFile(path.join(__dirname+'/about.html'));
	
})

app.post('/login', function(req,res){
	req.session.isLoggedIn = true;
	res.cookie('kit',l);
	res.redirect('/');
})

app.get('/logout', function(req,res){
	if(req.session.isLoggedIn===true){
		console.log('logout me aaya');
	req.session.destroy(err => {
		console.log(err);
		res.redirect('/');
	});
		}	
	else{
		res.redirect('/');
}
	
})


let l = [];

fs.readdir('static/assets/', (err, files) => {
	files.forEach(file => {
		if(file.endsWith('.mp4')){
		  l.push(file.substring(0,file.length-4));
	  }
	  if(file.endsWith('.mkv')){
		l.push(file.substring(0,file.length-4));
	}
  });
});
app.get('/pages',function(req,res){
	if(req.session.isLoggedIn===true){
		console.log(req.query.movie);
	res.cookie('movie',req.query.movie);
	res.sendFile(path.join(__dirname+'/static/pages/play.html'));	
		}	
		else{
			res.redirect('/');
		}
})

app.get('/movies',function(req,res){
	if(req.session.isLoggedIn===true){
		res.sendFile(path.join(__dirname+'/movies.html'));	
	}
	else{
		res.redirect('/');
	}
});

app.get('/video', function(req, res) {
	if(req.session.isLoggedIn===true){
	const path = 'static/assets/'+req.query.movie+'.mp4'
	const stat = fs.statSync(path)
	const fileSize = stat.size
	const range = req.headers.range
	if (range) {
	  const parts = range.replace(/bytes=/, "").split("-")
	  const start = parseInt(parts[0], 10)
	  const end = parts[1] 
		? parseInt(parts[1], 10)
		: fileSize-1
	  const chunksize = (end-start)+1
	  const file = fs.createReadStream(path, {start, end})
	  const head = {
		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
		'Accept-Ranges': 'bytes',
		'Content-Length': chunksize,
		'Content-Type': 'video/mp4',
	  }
	  res.writeHead(206, head);
	  file.pipe(res);
	} else {
	  const head = {
		'Content-Length': fileSize,
		'Content-Type': 'video/mp4',
	  }
	  res.writeHead(200, head)
	  fs.createReadStream(path).pipe(res)
	}
}
else{
	res.redirect('/');
}
})

app.use((req,res) => {
	if(req.session.isLoggedIn===true){
		res.status(404);
	res.sendFile(path.join(__dirname+'/404page.html'));
	}
	else{
		res.redirect('/');
	}
})



app.listen(3000, function () {
	console.log('App is running on port 3000')
})
