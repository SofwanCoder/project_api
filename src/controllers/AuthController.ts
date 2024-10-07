import { Route, Post, Body, SuccessResponse, Tags, Inject } from "tsoa";
import { success } from "../utils/response";
import AuthService from "../services/AuthService";
import {
  CreateTokenPayload,
  DoEmailVerificationPayload,
  RefreshTokenPayload,
} from "../types/authorization";

@Route("/auths")
@Tags("Auth")
export default class AuthController {
  @SuccessResponse("201", "Session started")
  @Post("/sessions")
  public static async createTokenController(@Body() body: CreateTokenPayload) {
    return success(await AuthService.createSession(body));
  }

  @SuccessResponse("200", "Session refereshed")
  @Post("/access")
  public static async refreshTokenController(
    @Body() body: RefreshTokenPayload,
  ) {
    return success(await AuthService.refreshToken(body.refresh_token));
  }

  @SuccessResponse("200", "OK")
  @Post("/verifiers")
  public static async sendVerificationEmailController(
    @Inject() userId: string,
  ) {
    return success(await AuthService.sendVerificationEmail(userId));
  }

  @SuccessResponse("200", "OK")
  @Post("/verify")
  public static async doEmailVerificationController(
    @Inject() userId: string,
    @Body() body: DoEmailVerificationPayload,
  ) {
    return success(await AuthService.doEmailVerification(userId, body));
  }
}
