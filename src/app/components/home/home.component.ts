import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/sso-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string = "";

  constructor(private oAuthService: OAuthService) { }

  ngOnInit(): void {
    this.configureSingleSingOn();
    const userClaims: any = this.oAuthService.getIdentityClaims();
    this.name = userClaims.name ? userClaims.name: "";
  }

  configureSingleSingOn(){
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

}
