import * as React from 'react';
import { IMessageProps } from '../types/index';

const Message: React.SFC<IMessageProps> = ({ text }): JSX.Element => (
	<div className={'modal'}>
		<p className={'text'}>
			{text}
		</p>
	</div>
);

export default Message;
