import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('aboutPage')
        .title('关于页面')
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
        ),
      S.listItem()
        .id('contactPage')
        .title('联系页面')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
        ),
      ...S
        .documentTypeListItems()
        .filter((item) => !['aboutPage', 'contactPage'].includes(item.getId() || '')),
    ])
