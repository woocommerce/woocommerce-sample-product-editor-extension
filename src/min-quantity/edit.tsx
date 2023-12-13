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
  const [value, setValue] = useProductEntityProp<string>('meta_data.min_qty');
  const [maxQty] = useProductEntityProp<string>('meta_data.max_qty');
  const { error, validate } = useValidation(
    'meta_data.min_qty',
    async function validator() {
      const valueParsed = parseFloat(value || '');
      const maxQtyParsed = parseFloat(maxQty || '');
      if (valueParsed >= maxQtyParsed) {
        return sprintf(
          __(
            // translators: %d is the minimum value of the number input.
            'Value must be less than %d',
            'my-extension-name'
          ),
          maxQtyParsed
        );
      }
    },
    [value, maxQty]
  );

  useEffect(() => {
    validate();
  }, [value, maxQty]);

  return (
    <div {...blockProps}>
      <NumberControl
        label={__('Minimum Quantity', 'my-extension-name')}
        error={error}
        value={value || ''}
        onChange={setValue}
      />
    </div>
  );
}
