import { ConstructLibrary, ConstructLibraryOptions } from "../cdk";
import * as semver from "semver";

export interface ConstructLibraryCdktfOptions extends ConstructLibraryOptions {
  /**
   * Minimum target version this library is tested against.
   * @default "^0.8.3"
   * @featured
   */
  readonly cdktfVersion: string;

  /**
   * Construct version to use
   * @default "^10.0.12"
   */
  readonly constructsVersion?: string;
}

/**
 * CDKTF construct library project
 *
 * A multi-language (jsii) construct library which vends constructs designed to
 * use within the CDK for Terraform (CDKTF), with a friendly workflow and
 * automatic publishing to the construct catalog.
 *
 * @pjid cdktf-construct
 */
export class ConstructLibraryCdktf extends ConstructLibrary {
  constructor(options: ConstructLibraryCdktfOptions) {
    super(options);

    if (!options.cdktfVersion) {
      throw new Error("Required field cdktfVersion is not specified.");
    }

    function getDefaultConstructVersion() {
      if (semver.lte(options.cdktfVersion, "0.5.0")) {
        return "^3.0.0";
      }

      return "10.0.12";
    }

    const ver = options.cdktfVersion;
    const constructVersion =
      options.constructsVersion ?? getDefaultConstructVersion();

    this.addPeerDeps(`constructs@${constructVersion}`, `cdktf@${ver}`);
  }
}
