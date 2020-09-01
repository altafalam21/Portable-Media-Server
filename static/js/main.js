function loader(){
    

      function readCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }    
var arr = [];
var l =   readCookie('kit');
l = decodeURIComponent(l).substring(3);
l = l.substring(0,l.length-1).split(',');
// console.log(l);
// console.log(typeof(l));
l.forEach((e)=> {
  arr.push(e.substring(1,e.length-1));
})

l = arr;
let output='';
l.forEach((index) => {
    output += `
      <div class="col-md-3">
        <div class="well text-center">
          <img src="static/assets/${index}.jpg" onerror="if (this.src != 'error.jpg') this.src = 'https://valmorgan.co.nz/wp-content/uploads/2016/06/default-movie-1-3.jpg'">
          <h5>${index.substring(0,14)}</h5>
          <a class="btn btn-info" href="/pages?movie=${index}">PLAY</a>
        </div>
      </div>
    `;        });
    $('#movies').html(output);
    
  //   function movieSelected(index){
  //     console.log('movie selected chala');
  //     sessionStorage.setItem('movie',index);
  //     window.location = '/pages/play.html';
  //     return false;
  // }

 }