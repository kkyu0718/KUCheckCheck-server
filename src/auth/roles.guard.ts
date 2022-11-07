import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from './role/user.role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('roles', context.getHandler());
    if (!role) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.authorization.replace('Bearer ', '');
    const decodedToken = this.jwtService.decode(accessToken);
    const user_role = decodedToken['role'];
    return this.matchRoles(role, user_role);
  }

  // index -> member : 0, manager: 1
  // 권한이 높은 사람이 숫자가 더 크다
  matchRoles(minimum_role, user_role) {
    // console.log("user_role",Object.keys(UserRole).indexOf(`${user_role}`) )
    // console.log("minimum_role",Object.keys(UserRole).indexOf(`${minimum_role}`) )

    if (
      Object.keys(UserRole).indexOf(`${user_role}`) >=
      Object.keys(UserRole).indexOf(`${minimum_role}`)
    ) {
      return true;
    }
    return false;
  }
}
