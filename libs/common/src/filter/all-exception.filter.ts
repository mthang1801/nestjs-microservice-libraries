import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch(RpcException)
export class ExceptionFilter extends BaseRpcExceptionFilter {
	catch(exception: any, host: ArgumentsHost): Observable<any> {
		console.log(exception);
		return super.catch(exception, host);
	}
}
