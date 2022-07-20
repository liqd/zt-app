import React from 'react';
import { useWindowDimensions } from 'react-native';
import { baseUrl } from '../BaseApi';
import { RichtextCollapsibleItem } from './RichtextCollapsibleItem';
import RenderHTML, { useInternalRenderer } from 'react-native-render-html';
import { COLORS } from '../theme/colors';

// The <Richtext /> component can be used as a container
// for HTML input. It converts html to React Native with the
// help of a package called react-native-render-html.
//
// 1. <Richtext> receives a html formatted prop called "text"
// 2. A Subcomponent <RenderRichtext> creates the dom and alters two things:
//    a.) image sources: relative to absoulte url
//    b.) collapsibles: converting div to article
// 3. <RenderRichtext> uses <RenderHTML> to convert html into React Native code.
// 4. While doing this it uses a custom renderer (collapsibleRenderer) and
//    replaces all <article> elements with a custom component <RichtextCollapsibleItem>
export const Richtext = ({ text }) => {
  const {width} = useWindowDimensions();

  const isCollapsible = (node) => node.domNode.attribs.class === 'collapsible-item';

  const extractCollapsibleData = (tnode) => {
    return {
      title: tnode.children[0].children[0].children[0].data,
      body: tnode.children[1].children[0].children[0].children[0].data
    };
  };

  const collapsibleRenderer = ({ TDefaultRenderer, tnode,  ...props }) => {
    if (isCollapsible(tnode)){
      const { title, body } = extractCollapsibleData(tnode);
      return (
        <TDefaultRenderer
          tnode={tnode}
          {...props}
        >
          <RichtextCollapsibleItem title={title} body={body} />
        </TDefaultRenderer>
      );
    } else {
      return (
        <TDefaultRenderer
          tnode={tnode}
          {...props}
        />
      );
    }
  };

  const customImageRenderer = (props) => {
    const { Renderer, rendererProps } = useInternalRenderer('img', props);
    const uri = rendererProps.source.uri.replace('about:///', baseUrl + '/');
    return (
      <Renderer {...rendererProps} source={{...rendererProps.source, uri:uri}}/>
    );
  };

  const renderers = {
    div: collapsibleRenderer,
    img: customImageRenderer
  };

  const tagsStyles = {
    img: {
      alignSelf: 'flex-start'
    },
    a: {
      color: COLORS.text.main
    }
  };

  return (
    <RenderHTML
      source={{ html: text}}
      contentWidth={width}
      renderers={renderers}
      tagsStyles={tagsStyles}
    />);
};
