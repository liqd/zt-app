import React, { useState, useMemo, useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { baseUrl } from '../BaseApi';
import { RichtextCollapsibleItem } from './RichtextCollapsibleItem';
import { findAll } from 'domutils';
import RenderHTML, {
  TRenderEngineProvider,
  RenderHTMLConfigProvider,
  useAmbientTRenderEngine
} from 'react-native-render-html';

// The <Richtext /> component can be used as a container
// for HTML input. It converts html to React Native with the
// help of a package called react-native-render-html.
//
// 1. <Richtext> receives a html formatted prop called "information"
// 2. A Subcomponent <RenderRichtext> creates the dom and alters two things:
//    a.) image sources: relative to absoulte url
//    b.) collapsibles: converting div to article
// 3. <RenderRichtext> uses <RenderHTML> to convert html into React Native code.
// 4. While doing this it uses a custom renderer (collapsibleRenderer) and 
//    replaces all <article> elements with a custom component <RichtextCollapsibleItem>
//
// Important note: as the official documentation suggests, we should use 
// another dependency called 'domutils'. This is proprietary and NOT free to use
export const Richtext = ({ project: { information } }) => {
  const {width} = useWindowDimensions();

  const isCollapsible = (node) => node.attribs.class === 'collapsible-item';
  const isImage = (node) => node.name === 'img';

  const getAbsoluteImageUrl = image => {
    const img = {...image};
    const imgSrc = img.attribs.src;
    const newImgSrc = baseUrl + imgSrc;
    image.attribs.src = newImgSrc;
  };

  const extractCollapsibleData = (tnode) => {
    return {
      title: tnode.children[0].children[0].children[0].data,
      body: tnode.children[1].children[0].children[0].children[0].data
    };
  };

  const collapsibleRenderer = ({ TDefaultRenderer, tnode,  ...props }) => {
    const { title, body } = extractCollapsibleData(tnode);
    return (
      <TDefaultRenderer
        tnode={tnode}
        {...props}
      >
        <RichtextCollapsibleItem title={title} body={body} />
      </TDefaultRenderer>
    );
  };

  const renderers = {
    article: collapsibleRenderer
  };

  const RenderRichtext = ({ html, renderers }) => {
    const [isDomReady, setIsDomReady] = useState(false);

    const engine = useAmbientTRenderEngine();
    const dom = useMemo(() => engine.parseDocument(html), [html, engine]);

    useEffect(function inspectDom(){

      const collapsibles = findAll(isCollapsible, dom.children);
      collapsibles.forEach(c => c.name = 'article');

      const images = findAll(isImage, dom.children);
      images.forEach(i => getAbsoluteImageUrl(i));

      setIsDomReady(true);
    },[dom]);
    return isDomReady ?
      <RenderHTML
        contentWidth={width}
        source={{ dom }}
        renderers={renderers}
      />
      : null;
  };

  return (
    <TRenderEngineProvider>
      <RenderHTMLConfigProvider>
        <RenderRichtext
          html={information}
          renderers={renderers}
        />
      </RenderHTMLConfigProvider>
    </TRenderEngineProvider>
  );
};
