import { useCallback, useRef } from 'react';
import { Popup, PopupProps } from 'semantic-ui-react';
import { PricedMaterial } from '../../utils/materials';
import { FC } from '../../utils/react';
import { MaterialBox } from './material-box';

export interface MateriaPopupProps extends PopupProps {
  material: PricedMaterial;
}

export const MaterialPopup: FC<MateriaPopupProps> = ({
  material,
  children,
  ...rest
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  const onMount = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (wrapperRef.current) {
      timeoutRef.current = setTimeout(() => {
        wrapperRef.current.querySelector('input')?.focus();
      }, 100);
    }
  }, [wrapperRef]);

  const onClose = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, [timeoutRef]);

  return (
    <Popup
      {...rest}
      trigger={children}
      flowing
      hoverable
      onMount={onMount}
      onClose={onClose}
      mouseEnterDelay={rest.mouseEnterDelay ?? 300}
    >
      <Popup.Content>
        <MaterialBox material={material} forwardRef={wrapperRef} />
      </Popup.Content>
    </Popup>
  );
};
