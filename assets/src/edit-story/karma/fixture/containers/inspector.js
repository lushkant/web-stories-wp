/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import { Container } from './container';
import { DesignPanel } from './designPanel';

/**
 * The editor's canvas. Includes: display, frames, editor layers, carousel,
 * navigation buttons, page menu.
 */
export class Inspector extends Container {
  constructor(node, path) {
    super(node, path);
  }

  get designTab() {
    return this.getByRole('tab', { name: /Design/ });
  }

  get designPanel() {
    return this._get(
      this.getByRole('tabpanel', { name: /Design/ }),
      'designPanel',
      DesignPanel
    );
  }

  get documentTab() {
    return this.getByRole('tab', { name: /Document/ });
  }

  get documentPanel() {
    // @todo: implement
    return null;
  }
}
