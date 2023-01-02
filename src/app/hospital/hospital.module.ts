import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { MaterialModule } from "../shared/material.module";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { FullCalendarModule } from "@fullcalendar/angular";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgApexchartsModule } from "ng-apexcharts";
//components
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UpdateProfileComponent } from "./profile-update/profile-update.component";
import { ManageDoctorsComponent } from "./manage-doctors/manage-doctors.component";
import { ProfileSettingsComponent } from "./manage-doctors/profile-settings/profile-settings.component";
import { establishmentComponent } from "./manage-doctors/profile-settings/establishment/establishment.component";
import { ProfileViewComponent } from "./manage-doctors/profile-view/profile-view.component";
import { ImageUploadComponent } from "./manage-doctors/image-upload/image-upload.component";
import { FileUploadComponent } from "../shared/components/file-upload/file-upload.component";
import { FileUploadComponent2 } from "../shared/components/file-upload2/file-upload2.component";
import { FileUploadComponent3 } from "../shared/components/file-upload3/file-upload.component";
import { FilePickerModule } from "ngx-awesome-uploader";
import { HospitalRoutingModule } from "./hospital-routing.module";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
@NgModule({
  declarations: [
    DashboardComponent,
    ProfileViewComponent,
    UpdateProfileComponent,
    ManageDoctorsComponent,
    ProfileSettingsComponent,
    establishmentComponent,
    ImageUploadComponent,
    FileUploadComponent,
    FileUploadComponent2,
    FileUploadComponent3,
  ],
  imports: [
    CommonModule,
    HospitalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    CKEditorModule,
    MaterialModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import("echarts"),
    }),
    FullCalendarModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    GooglePlaceModule,
    FilePickerModule,
    NgxDaterangepickerMd.forRoot(),
  ],
})
export class HospitalModule {}
