import { DropdownItem, DropdownItemProps } from 'reactstrap';
import { OrphanVisitType, VisitsFilter } from '../types';
import { DropdownBtn } from '../../utils/DropdownBtn';
import { hasValue } from '../../utils/utils';

interface VisitsFilterDropdownProps {
  onChange: (filters: VisitsFilter) => void;
  selected?: VisitsFilter;
  className?: string;
  isOrphanVisits: boolean;
  botsSupported: boolean;
}

export const VisitsFilterDropdown = (
  { onChange, selected = {}, className, isOrphanVisits, botsSupported }: VisitsFilterDropdownProps,
) => {
  if (!botsSupported && !isOrphanVisits) {
    return null;
  }

  const { orphanVisitsType, excludeBots = false } = selected;
  const propsForOrphanVisitsTypeItem = (type: OrphanVisitType): DropdownItemProps => ({
    active: orphanVisitsType === type,
    onClick: () => onChange({ ...selected, orphanVisitsType: type === selected?.orphanVisitsType ? undefined : type }),
  });
  const onBotsClick = () => onChange({ ...selected, excludeBots: !selected?.excludeBots });

  return (
    <DropdownBtn text="Filters" dropdownClassName={className} className="me-3" right minWidth={250}>
      {botsSupported && (
        <>
          <DropdownItem header>Bots:</DropdownItem>
          <DropdownItem active={excludeBots} onClick={onBotsClick}>Exclude potential bots</DropdownItem>
        </>
      )}

      {botsSupported && isOrphanVisits && <DropdownItem divider />}

      {isOrphanVisits && (
        <>
          <DropdownItem header>Orphan visits type:</DropdownItem>
          <DropdownItem {...propsForOrphanVisitsTypeItem('base_url')}>Base URL</DropdownItem>
          <DropdownItem {...propsForOrphanVisitsTypeItem('invalid_short_url')}>Invalid short URL</DropdownItem>
          <DropdownItem {...propsForOrphanVisitsTypeItem('regular_404')}>Regular 404</DropdownItem>
        </>
      )}

      <DropdownItem divider />
      <DropdownItem
        disabled={!hasValue(selected)}
        onClick={() => onChange({ excludeBots: false, orphanVisitsType: undefined })}
      >
        <i>Clear filters</i>
      </DropdownItem>
    </DropdownBtn>
  );
};
