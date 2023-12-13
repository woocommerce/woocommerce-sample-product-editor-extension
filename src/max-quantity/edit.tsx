/**
 * External dependencies
 */
import type { BlockAttributes } from '@wordpress/blocks';
import { useWooBlockProps } from '@woocommerce/block-templates';
import { createElement, useEffect } from '@wordpress/element';
import {
  __experimentalNumberControl as NumberControl,
  __experimentalUseProductEntityProp as useProductEntityProp,
  useValidation,
} from '@woocommerce/product-editor';
import { __, sprintf } from '@wordpress/i18n';

export function Edit({ attributes }: { attributes: BlockAttributes }) {
  const blockProps = useWooBlockProps(attributes);
  const [value, setValue] = useProductEntityProp<string>('meta_data.max_qty');
  const [minQty] = useProductEntityProp<string>('meta_data.min_qty');
  const { error, validate } = useValidation(
    'meta_data.max_qty_blur',
    async function validator() {
      const valueParsed = parseFloat(value || '');
      const minQtyParsed = parseFloat(minQty || '');
      if (valueParsed < minQtyParsed) {
        return sprintf(
          __(
            // translators: %d is the minimum value of the number input.
            'Value must be greater than or equal to %d',
            'my-extension-name'
          ),
          minQtyParsed
        );
      }
    },
    [value, minQty]
  );

  useEffect(() => {
    validate();
  }, [value, minQty]);

  return (
    <div {...blockProps}>
      <NumberControl
        label={__('Maximum Quantity', 'my-extension-name')}
        error={error}
        value={value || ''}
        onChange={setValue}
      />
    </div>
  );
}
