import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'save-Me',
    templateUrl: '../html/howto.component.html',
    styleUrls: ['./howto.component.css']
  })

  export class howto  implements OnInit {
    @ViewChild('videoPlayer') videoplayer: ElementRef;
category=12;
constructor(

  public activatedrouter: ActivatedRoute,


) {  }
back(){
  history.back();
}
src="";
    ngOnInit(){
      this.category = +this.activatedrouter.snapshot.paramMap.get('categoryId');
      if(this.category==12){
        this.src="../../../assets/images/match the pair.mp4"
      }
      else {
        this.src ="../../../assets/images/path finder.mp4"
      }

      setTimeout(() => {
        this.videoplayer.nativeElement.src=this.src;
        this.videoplayer.nativeElement.load();
		
        var promise=this.playVideo();
	
      
      }, 100);
    }
    playVideo(): void {
      
    var promise;
     
       promise= this.videoplayer.nativeElement.play();
      
   
    }

   
    }
  