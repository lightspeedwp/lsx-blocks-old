const {
	Button,
	Dropdown,
} = wp.components;

const MyDropdown = () => {
	return (
		<Dropdown
			className="my-container-class-name"
			contentClassName="my-popover-content-classname"
			position="bottom right"
			renderToggle={ ( { isOpen, onToggle } ) => (
				<Button isPrimary onClick={ onToggle } aria-expanded={ isOpen }>
					Toggle Popover!
				</Button>
			) }
			renderContent={ () => (
				<div>
					This is the content of the popover.
				</div>
			) }
		/>
	);
};

export default MyDropdown;
