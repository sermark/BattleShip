import * as React from 'react';
import { IMessageProps } from '../types/index';

const Message = ({ text }: IMessageProps): JSX.Element => (
	<div className={'modal'}>
		<p className={'text'}>
			{text}
		</p>
	</div>
);

export default Message;