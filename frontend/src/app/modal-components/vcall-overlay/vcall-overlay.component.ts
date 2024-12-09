import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { CoreService } from "src/app/services/core/core.service";
import { SocketService } from "src/app/services/socket.service";

@Component({
  selector: 'app-vcall-overlay',
  templateUrl: './vcall-overlay.component.html',
  styleUrls: ['./vcall-overlay.component.scss']
})
export class VcallOverlayComponent implements OnInit {
  connectedSubs: Subscription
  constructor(
    private socketService: SocketService,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<VcallOverlayComponent>,
    private cs: CoreService
  ) { }

  ngOnInit(): void {
    this.socketService.incomingCallData = this.data;
    this.connectedSubs = this.socketService.onEvent("call-connected").subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  ngOnDestroy() {
    if (this.connectedSubs)
      this.connectedSubs.unsubscribe();
    this.socketService.closeVcOverlay();
  }

  /**
  * Accept incoiming call and close modal
  * @return {void}
  */
  accept() {
    this.socketService.incoming = true;
    this.cs.openVideoCallModal(
      {
        ...this.data,
        initiator: 'hw',
      }
    );
    this.dialogRef.close(true);
  }

  /**
  * Reject incoming call and close modal
  * @return {void}
  */
  reject() {
    this.socketService.emitEvent('dr_call_reject', this.data?.nurseId);
    this.dialogRef.close(true);
  }
}
