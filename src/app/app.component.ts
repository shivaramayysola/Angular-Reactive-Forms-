import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenUsernames=['shiva','ram']
  
  ngOnInit(){
    this.signupForm = new FormGroup({
     'userData' : new FormGroup({
      'username' : new FormControl(null, [Validators.required,this.forbiddenNames.bind(this)]),
      'email': new FormControl(null,[Validators.required, Validators.email]),
      
     }),
     'gender': new FormControl('male'),
     'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //  (value) => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value)
    );
    // this.signupForm.setValue({
    //   'userData':{
    //     'username': 'Venkata',
    //     'email': 'Venkata@gmail.com'
    //   },
    //   'gender': 'male',
    //   'hobbies':[]
    // })

    this.signupForm.patchValue({
        'userData':{
          'username':'shiva',
          'email':'venkata@gmail.com'
        }
    })
  }
  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames( control : FormControl): {[s: string]: Boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return{'nameIsForbidden': true}
    }
    return null;
  }
  
}
