import * as React from 'react';

interface IMessageProps {
	text: string;
}

const Message = ({ text }: IMessageProps) => (
	<div className={'modal'}>
		<p className={'text'}>
			{text}
		</p>
	</div>
);

export default Message;