import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  selectedFile!: File;
  data: any=[];
  constructor(private billService:BillService){}
  ngOnInit(): void {
   this.billService.getBills().subscribe(
    (res)=>{
      this.data =res;
      
    }
   );
  }
  loadbills() {
    throw new Error('Method not implemented.');
  }
onSelected(event:any){
  this.selectedFile = event.target.files[0];

}
uploadFile(){
  if(this.selectedFile){
    const formData=new FormData();
    formData.append('file',this.selectedFile,this.selectedFile.name);
    this.billService.uploadFile(this.selectedFile).subscribe(
      (res)=>{
        console.log("Success");
        alert("succes");
      },
      error=>{console.log('Error',error);alert('error')}
    );
  }
}

downloadBill(id:number){
  this.billService.downloadFile(id).subscribe(
    (response) => {
   
      const blob = new Blob([response], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bill.pdf'; 
      a.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      console.error('Error downloading bill:', error);
    }
  );
}

}






