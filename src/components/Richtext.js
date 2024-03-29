import React from 'react'
import { Linking, useWindowDimensions } from 'react-native'
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  useInternalRenderer} from 'react-native-render-html'

import { baseUrl } from '../BaseApi'
import { COLORS } from '../theme/colors'
import { FONTS, SIZES } from '../theme/fonts'

import { LinkTextSourceSans } from './LinkTextSourceSans'
import { RichtextCollapsibleItem } from './RichtextCollapsibleItem'

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
  const {width} = useWindowDimensions()

  const extractCollapsibleData = (tnode) => {
    return {
      title: tnode.children[0].children[0].children[0].data,
      body: tnode.children[1].children[0].children[0].children[0].data
    }
  }

  const collapsibleRenderer = ({ TDefaultRenderer, tnode,  ...props }) => {
    const isCollapsible = tnode.domNode.attribs.class === 'collapsible-item'

    if (isCollapsible){
      const { title, body } = extractCollapsibleData(tnode)
      return (
        <TDefaultRenderer
          tnode={tnode}
          {...props}
        >
          <RichtextCollapsibleItem title={title} body={body} />
        </TDefaultRenderer>
      )
    } else {
      return (
        <TDefaultRenderer
          tnode={tnode}
          {...props}
        />
      )
    }
  }

  const customImageRenderer = (props) => {
    const { Renderer, rendererProps } = useInternalRenderer('img', props)
    const uri = rendererProps.source.uri.replace('about:///', baseUrl + '/')
    return (
      <Renderer {...rendererProps} source={{...rendererProps.source, uri:uri}}/>
    )
  }

  const extractIframeData = (tnode) => {
    const url = tnode.domNode.attribs.src
    const isYoutube = url.match(/(youtube)/)
    const platform = isYoutube
      ? 'Youtube.com'
      : 'Vimeo.com'
    return {platform, url}
  }

  const customIframeRenderer = ({ TDefaultRenderer, tnode, ...props }) => {
    // Interim: for now we convert media embeds to external links
    const {platform, url} = extractIframeData(tnode)
    return (
      <TDefaultRenderer
        tnode={tnode}
        {...props}
      >
        <LinkTextSourceSans
          onPress={() => Linking.openURL(url)}
        >
          Watch video on {platform}
        </LinkTextSourceSans>
      </TDefaultRenderer>
    )
  }

  const customHTMLElementModels = {
    'iframe': HTMLElementModel.fromCustomModel({
      tagName: 'iframe',
      contentModel: HTMLContentModel.mixed
    })
  }

  const renderers = {
    div: collapsibleRenderer,
    img: customImageRenderer,
    iframe: customIframeRenderer
  }

  const tagsStyles = {
    img: {
      alignSelf: 'flex-start'
    },
    a: {
      color: COLORS.text
    },
    p: {
      fontFamily: FONTS.familySans,
      fontSize: SIZES.sm,
    },
    li: {
      fontFamily: FONTS.familySans,
      fontSize: SIZES.sm,
    },
    div: {
      fontFamily: FONTS.familySans,
      fontSize: SIZES.sm,
    }
  }

  return (
    <RenderHTML
      source={{ html: text}}
      contentWidth={width}
      renderers={renderers}
      tagsStyles={tagsStyles}
      customHTMLElementModels={customHTMLElementModels}
    />)
}
