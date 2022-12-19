import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { UpdateProfileComponent } from "./profile-update/profile-update.component";
const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "profile-settings",
  //   pathMatch: "full",
  // },
  {
    path: "Dashboard",
    component: DashboardComponent,
  },
  {
    path: "updateProfile",
    component: UpdateProfileComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class HospitalRoutingModule {}
