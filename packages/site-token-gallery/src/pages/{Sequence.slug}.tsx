import React, { FunctionComponent } from 'react';
import { Application } from '../Application';
import { HeadTags } from '../components/HeadTags';
import { HomeHero } from '../components/HomeHero';
import { PageSection } from '../components/PageSection';
import { PageWithFooter } from '../components/PageWithFooter';

/** details / info about a sequence */
export const SequencePage: FunctionComponent = (props) => {
  return (
    <Application>
      <HeadTags />
      <PageWithFooter>
        <HomeHero />
        <PageSection>
          <pre>{JSON.stringify(props, null, 2)}</pre>
        </PageSection>
      </PageWithFooter>
    </Application>
  );
};

export default SequencePage;
