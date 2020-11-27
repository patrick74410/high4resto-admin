import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { MessageI } from 'src/app/interfaces/MessageI';
import { UserI } from 'src/app/interfaces/UserI';
import { AlertService } from 'src/app/rootComponent/comfirm-dialog/alert.service';
import { MessageService } from 'src/app/rootComponent/messages/message.service';
import { AuthentificationService } from 'src/app/services/Auth/authentification.service';
import { ExpireService } from 'src/app/services/expire.service';
import { UserService } from 'src/app/services/user.service';
import { Util } from '../../environement/util';

declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: UserI[];
  roles: string[];
  addRole: string[] = [];

  bRoles: string[]=[];
  util = new Util();
  UpdateDataUser:UserI;

  updateModal: any;
  updatePasswordModal: any;

  addForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('')
  })

  updateRoleShow(user:UserI) : void
  {
    this.UpdateDataUser=user;
    this.bRoles = this.roles.filter((item) => {
      return !user.roles.some(e => e == item)
    });
    this.updateModal.show();
  }

  updatePasswordShow(user:UserI): void
  {
    this.UpdateDataUser=user;
    this.updatePasswordModal.show();
  }

  updatePassword(password:string):void
  {
    this.UpdateDataUser.password=password;
    this.userService.updateUserPassword(this.UpdateDataUser).pipe(take(1)).subscribe(t=>{
      const message: MessageI = { content: 'Le mot de pass de l\'utilisateur a été mis à jour', level: 'Info'};
      this.messageService.add(message);
      this.updatePasswordModal.hide();
    })
  }

  updateRole()
  {
    this.userService.updateUsersRoles(this.UpdateDataUser).pipe(take(1)).subscribe(t=>{
      const message: MessageI = { content: 'Les rôles de l\'utilisateur ont été mis à jour', level: 'Info'};
      this.messageService.add(message);
      this.updateModal.hide();
    })
  }

  addUser(): void {
    var tpUser: UserI = {
      username: this.addForm.get('username').value,
      password: this.addForm.get('password').value,
      email: this.addForm.get('email').value, active: true, roles: this.addRole
    }
    console.log(tpUser.password);

    this.userService.insertUser(tpUser).pipe(take(1)).subscribe(u => {
      this.update();
      this.addRole = [];
      this.addForm.patchValue({ email: "", username: "", password: "" });
      const message: MessageI = { content: 'L\'utilisateur a été ajouté', level: 'Info' }
      this.messageService.add(message);
    })
  }

  delete(user: UserI) {
    const message: MessageI = { content: 'L\'élément à été supprimé', level: 'Attention' }
    let that = this;
    this.alertService.confirmThis("Êtes-vous sur de vouloir supprimer la l'utilisateur ?", function () {
      that.userService.delete(user).pipe(take(1)).subscribe(test => {
        var index = that.users.indexOf(user);
        that.users.splice(index, 1);
        that.messageService.add(message);
      }
      );

    }, function () {

    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  constructor(public authenticationService: AuthentificationService,private userService: UserService, private alertService: AlertService, private messageService: MessageService, private expireService: ExpireService) { }

  update(): void {
    this.userService.getRoles().pipe(take(1)).subscribe(roles => {
      this.roles = roles;
    })

    this.userService.getUsers().pipe(take(1)).subscribe(users => {
      this.users = users;
    })

  }

  ngOnInit(): void {
    this.expireService.check();
    this.update();
    this.updateModal = new bootstrap.Modal(document.getElementById('updateModal'), {});
    this.updatePasswordModal = new bootstrap.Modal(document.getElementById('updatePasswordModal'), {});
  }

}
