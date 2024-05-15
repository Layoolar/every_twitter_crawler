import { Post } from '../domain/entities';

export const data: Post[] = [
    {
        id: '7fe7f595-ff62-4345-abb8-166b0b095b9c',
        title: 'Prisoner of Zenda, The',
        admin_id: 'd6c47708-34ba-4ad3-ad5c-0852c6ad3f59',
        description:
            'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        url: 'http://yandex.ru/tincidunt/lacus/at/velit/vivamus.jsp?sed=mattis&sagittis=odio&nam=donec&congue=vitae&risus=nisi&semper=nam&porta=ultrices&volutpat=libero&quam=non&pede=mattis&lobortis=pulvinar&ligula=nulla&sit=pede&amet=ullamcorper&eleifend=augue&pede=a&libero=suscipit&quis=nulla',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$GOOGL'],
            hashtags: ['#doglover', '#summerfun'],
            mentions: ['Jane Smith']
        },
        actions: {
            retweet: 4,
            post: 2,
            quote: 3
        }
    },
    {
        id: '9afd7d41-75dd-4a79-90c7-5bf5ce3d9b58',
        title: '9 Souls (Nain souruzu)',
        admin_id: 'ab1dbd4a-0228-49cb-95ed-227fa1c18215',
        description:
            'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        url: 'https://blinklist.com/dui/luctus/rutrum.jpg?vestibulum=pellentesque&rutrum=eget&rutrum=nunc&neque=donec&aenean=quis&auctor=orci',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$TSLA'],
            hashtags: ['#coffeelover', '#travelbug'],
            keywords: ['carrot'],
            mentions: ['Jane Smith', 'Michael Brown']
        },
        actions: {
            retweet: 4,
            post: 4,
            comment: 2,
            quote: 1
        }
    },
    {
        id: 'cad42fcd-bfbf-4cd5-94fb-a1f415516992',
        title: 'Entre Amigos (Planta 4ª)',
        admin_id: '1b290422-d5bf-459f-949e-49a4588fff34',
        description:
            'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        url: 'http://webnode.com/vel/pede/morbi/porttitor.html?pulvinar=massa&lobortis=id&est=lobortis&phasellus=convallis&sit=tortor&amet=risus&erat=dapibus&nulla=augue&tempus=vel&vivamus=accumsan&in=tellus&felis=nisi&eu=eu&sapien=orci&cursus=mauris&vestibulum=lacinia',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$NFLX', '$TSLA'],
            keywords: ['book', 'ocean']
        },
        actions: {
            post: 3,
            quote: 4
        }
    },
    {
        id: '61a099d9-a284-44fe-969b-cb38df586d2d',
        title: 'Dust',
        admin_id: 'bc3b2084-ac18-44c3-9d03-20ea69f25cc2',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.',
        url: 'https://nps.gov/urna/pretium.html?leo=vivamus&rhoncus=vel&sed=nulla&vestibulum=eget&sit=eros&amet=elementum&cursus=pellentesque&id=quisque&turpis=porta&integer=volutpat&aliquet=erat&massa=quisque',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Sed ante. Vivamus tortor. Duis mattis egestas metus.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AMZN', '$AAPL'],
            hashtags: ['#doglover'],
            mentions: ['Sarah Lee']
        },
        actions: {
            retweet: 3,
            post: 3,
            comment: 2
        }
    },
    {
        id: '7b29115c-90f4-4fe2-b423-dca1c516a62e',
        title: 'Fist of Fury (Chinese Connection, The) (Jing wu men)',
        admin_id: 'b5fb215a-615b-44a0-a40c-bd8f32908287',
        description:
            'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        url: 'http://washingtonpost.com/nunc/rhoncus/dui/vel/sem/sed/sagittis.js?et=nunc&ultrices=nisl&posuere=duis&cubilia=bibendum&curae=felis&mauris=sed&viverra=interdum&diam=venenatis&vitae=turpis&quam=enim&suspendisse=blandit&potenti=mi&nullam=in&porttitor=porttitor&lacus=pede&at=justo&turpis=eu&donec=massa&posuere=donec&metus=dapibus&vitae=duis&ipsum=at&aliquam=velit&non=eu&mauris=est&morbi=congue&non=elementum&lectus=in&aliquam=hac&sit=habitasse&amet=platea&diam=dictumst&in=morbi&magna=vestibulum&bibendum=velit&imperdiet=id&nullam=pretium&orci=iaculis&pede=diam&venenatis=erat&non=fermentum&sodales=justo&sed=nec&tincidunt=condimentum&eu=neque&felis=sapien&fusce=placerat&posuere=ante&felis=nulla&sed=justo&lacus=aliquam&morbi=quis&sem=turpis&mauris=eget&laoreet=elit&ut=sodales&rhoncus=scelerisque&aliquet=mauris&pulvinar=sit&sed=amet&nisl=eros&nunc=suspendisse&rhoncus=accumsan&dui=tortor&vel=quis&sem=turpis&sed=sed&sagittis=ante&nam=vivamus&congue=tortor&risus=duis&semper=mattis&porta=egestas&volutpat=metus&quam=aenean&pede=fermentum&lobortis=donec&ligula=ut&sit=mauris&amet=eget&eleifend=massa&pede=tempor&libero=convallis&quis=nulla&orci=neque&nullam=libero&molestie=convallis&nibh=eget&in=eleifend&lectus=luctus&pellentesque=ultricies&at=eu&nulla=nibh',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$NFLX'],
            hashtags: ['#fitnessjourney'],
            keywords: ['carrot', 'ocean'],
            mentions: ['Alex Johnson']
        },
        actions: {
            retweet: 5,
            post: 1,
            comment: 1,
            quote: 4
        }
    },
    {
        id: '7a6664f4-b823-4494-ac19-d338b783579f',
        title: 'Kabluey',
        admin_id: 'd2a080ef-a8fb-4afd-ba26-e91f1a9d2302',
        description:
            'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',
        url: 'http://ameblo.jp/ultrices/posuere.jsp?orci=nisi&eget=at&orci=nibh&vehicula=in&condimentum=hac&curabitur=habitasse&in=platea&libero=dictumst&ut=aliquam&massa=augue&volutpat=quam&convallis=sollicitudin&morbi=vitae&odio=consectetuer&odio=eget&elementum=rutrum&eu=at&interdum=lorem&eu=integer&tincidunt=tincidunt&in=ante&leo=vel&maecenas=ipsum&pulvinar=praesent&lobortis=blandit&est=lacinia&phasellus=erat&sit=vestibulum&amet=sed&erat=magna&nulla=at&tempus=nunc&vivamus=commodo&in=placerat&felis=praesent&eu=blandit&sapien=nam&cursus=nulla&vestibulum=integer&proin=pede&eu=justo&mi=lacinia&nulla=eget&ac=tincidunt&enim=eget&in=tempus&tempor=vel&turpis=pede&nec=morbi&euismod=porttitor&scelerisque=lorem&quam=id&turpis=ligula&adipiscing=suspendisse&lorem=ornare&vitae=consequat&mattis=lectus&nibh=in&ligula=est&nec=risus&sem=auctor&duis=sed&aliquam=tristique&convallis=in&nunc=tempus&proin=sit&at=amet&turpis=sem&a=fusce&pede=consequat&posuere=nulla&nonummy=nisl&integer=nunc&non=nisl&velit=duis&donec=bibendum&diam=felis&neque=sed&vestibulum=interdum&eget=venenatis&vulputate=turpis&ut=enim&ultrices=blandit&vel=mi&augue=in&vestibulum=porttitor',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$GOOGL', '$NFLX'],
            hashtags: ['#foodie', '#travelbug'],
            keywords: ['book', 'ocean'],
            mentions: ['John Doe']
        },
        actions: {
            retweet: 3,
            post: 1,
            comment: 1,
            quote: 2
        }
    },
    {
        id: '9f4e1baf-9070-4b0c-a771-2f6213f00330',
        title: 'Big Street, The',
        admin_id: '050e9266-379a-4d2a-80a3-2444f3810ca3',
        description: 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
        url: 'https://pen.io/pretium/quis/lectus/suspendisse/potenti/in.xml?vivamus=vel&vestibulum=nulla&sagittis=eget&sapien=eros&cum=elementum&sociis=pellentesque&natoque=quisque&penatibus=porta&et=volutpat&magnis=erat&dis=quisque&parturient=erat&montes=eros&nascetur=viverra&ridiculus=eget&mus=congue&etiam=eget&vel=semper&augue=rutrum&vestibulum=nulla&rutrum=nunc&rutrum=purus&neque=phasellus&aenean=in&auctor=felis&gravida=donec&sem=semper&praesent=sapien&id=a&massa=libero&id=nam&nisl=dui&venenatis=proin&lacinia=leo&aenean=odio&sit=porttitor&amet=id&justo=consequat&morbi=in&ut=consequat&odio=ut&cras=nulla&mi=sed&pede=accumsan&malesuada=felis&in=ut&imperdiet=at&et=dolor&commodo=quis&vulputate=odio&justo=consequat&in=varius&blandit=integer&ultrices=ac&enim=leo&lorem=pellentesque&ipsum=ultrices&dolor=mattis&sit=odio&amet=donec&consectetuer=vitae&adipiscing=nisi&elit=nam&proin=ultrices&interdum=libero&mauris=non&non=mattis&ligula=pulvinar&pellentesque=nulla&ultrices=pede&phasellus=ullamcorper&id=augue&sapien=a&in=suscipit&sapien=nulla&iaculis=elit&congue=ac&vivamus=nulla&metus=sed&arcu=vel&adipiscing=enim&molestie=sit&hendrerit=amet&at=nunc&vulputate=viverra',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$GOOGL', '$AMZN'],
            hashtags: ['#coffeelover', '#fitnessjourney'],
            keywords: ['ocean'],
            mentions: ['Jane Smith']
        },
        actions: {
            retweet: 1,
            post: 3,
            comment: 1,
            quote: 4
        }
    },
    {
        id: '5ad31cc2-e9fd-44a6-9df9-f83990ede203',
        title: 'Hammer, The',
        admin_id: '6cdcbf00-83f6-4de9-a6b3-34bf45d927e9',
        description:
            'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        url: 'http://skype.com/nisi/nam/ultrices/libero/non/mattis.json?vestibulum=donec&proin=dapibus&eu=duis&mi=at&nulla=velit&ac=eu&enim=est&in=congue&tempor=elementum&turpis=in&nec=hac&euismod=habitasse&scelerisque=platea&quam=dictumst&turpis=morbi&adipiscing=vestibulum&lorem=velit&vitae=id&mattis=pretium&nibh=iaculis&ligula=diam&nec=erat&sem=fermentum&duis=justo&aliquam=nec&convallis=condimentum&nunc=neque',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AMZN'],
            hashtags: ['#foodie', '#summerfun'],
            keywords: ['ocean']
        },
        actions: {
            retweet: 2,
            comment: 5,
            quote: 5
        }
    },
    {
        id: '895752ed-02b7-4cad-a80c-4841ffec844c',
        title: 'Bell Boy, The',
        admin_id: '287b4cf6-c19f-477b-9259-7260936ce360',
        description:
            'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',
        url: 'https://ow.ly/venenatis/non/sodales/sed.xml?justo=facilisi&sit=cras&amet=non&sapien=velit&dignissim=nec&vestibulum=nisi&vestibulum=vulputate&ante=nonummy&ipsum=maecenas&primis=tincidunt&in=lacus&faucibus=at&orci=velit&luctus=vivamus&et=vel&ultrices=nulla&posuere=eget&cubilia=eros&curae=elementum&nulla=pellentesque&dapibus=quisque&dolor=porta&vel=volutpat&est=erat&donec=quisque&odio=erat&justo=eros&sollicitudin=viverra&ut=eget&suscipit=congue&a=eget&feugiat=semper&et=rutrum&eros=nulla&vestibulum=nunc&ac=purus&est=phasellus&lacinia=in&nisi=felis&venenatis=donec&tristique=semper&fusce=sapien&congue=a&diam=libero&id=nam&ornare=dui&imperdiet=proin&sapien=leo&urna=odio&pretium=porttitor&nisl=id&ut=consequat&volutpat=in&sapien=consequat&arcu=ut&sed=nulla&augue=sed&aliquam=accumsan&erat=felis&volutpat=ut&in=at&congue=dolor&etiam=quis&justo=odio&etiam=consequat&pretium=varius&iaculis=integer&justo=ac&in=leo&hac=pellentesque&habitasse=ultrices&platea=mattis&dictumst=odio&etiam=donec&faucibus=vitae&cursus=nisi&urna=nam&ut=ultrices&tellus=libero&nulla=non&ut=mattis&erat=pulvinar&id=nulla&mauris=pede',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            hashtags: ['#doglover', '#selfcare'],
            keywords: ['book'],
            mentions: ['Sarah Lee']
        },
        actions: {
            retweet: 1,
            post: 2,
            comment: 4,
            quote: 4
        }
    },
    {
        id: 'fa3808c6-b2f7-4ccb-8987-978f7147fefb',
        title: 'Land Before Time II: The Great Valley Adventure, The',
        admin_id: '2c0011dc-eb1d-43e2-ba76-b9c828c4b492',
        description: 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        url: 'https://sitemeter.com/nam/nulla/integer.js?in=nec&blandit=nisi&ultrices=volutpat&enim=eleifend&lorem=donec&ipsum=ut&dolor=dolor&sit=morbi&amet=vel&consectetuer=lectus&adipiscing=in&elit=quam&proin=fringilla&interdum=rhoncus&mauris=mauris&non=enim&ligula=leo&pellentesque=rhoncus&ultrices=sed&phasellus=vestibulum&id=sit&sapien=amet&in=cursus&sapien=id&iaculis=turpis&congue=integer&vivamus=aliquet&metus=massa&arcu=id&adipiscing=lobortis&molestie=convallis&hendrerit=tortor&at=risus&vulputate=dapibus&vitae=augue&nisl=vel&aenean=accumsan&lectus=tellus&pellentesque=nisi&eget=eu&nunc=orci&donec=mauris&quis=lacinia&orci=sapien&eget=quis&orci=libero&vehicula=nullam&condimentum=sit&curabitur=amet&in=turpis&libero=elementum&ut=ligula&massa=vehicula&volutpat=consequat&convallis=morbi&morbi=a&odio=ipsum&odio=integer&elementum=a&eu=nibh&interdum=in&eu=quis&tincidunt=justo&in=maecenas&leo=rhoncus&maecenas=aliquam&pulvinar=lacus&lobortis=morbi&est=quis&phasellus=tortor&sit=id&amet=nulla&erat=ultrices&nulla=aliquet&tempus=maecenas&vivamus=leo&in=odio&felis=condimentum&eu=id&sapien=luctus&cursus=nec&vestibulum=molestie&proin=sed&eu=justo&mi=pellentesque&nulla=viverra&ac=pede&enim=ac&in=diam&tempor=cras&turpis=pellentesque&nec=volutpat&euismod=dui&scelerisque=maecenas&quam=tristique&turpis=est&adipiscing=et',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AAPL', '$GOOGL'],
            keywords: ['book', 'carrot'],
            mentions: ['Alex Johnson']
        },
        actions: {
            post: 4
        }
    },
    {
        id: '7af64ad5-063e-432a-9a8b-d0dbc4cea00f',
        title: 'Queen Bee',
        admin_id: 'da8eb900-ea7f-4760-83d7-50c9472cafe8',
        description:
            'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
        url: 'http://e-recht24.de/curabitur/convallis/duis/consequat/dui.jsp?vitae=vitae&mattis=quam&nibh=suspendisse&ligula=potenti&nec=nullam&sem=porttitor&duis=lacus&aliquam=at&convallis=turpis&nunc=donec&proin=posuere&at=metus&turpis=vitae&a=ipsum&pede=aliquam&posuere=non&nonummy=mauris&integer=morbi&non=non&velit=lectus&donec=aliquam&diam=sit&neque=amet&vestibulum=diam&eget=in&vulputate=magna&ut=bibendum&ultrices=imperdiet&vel=nullam&augue=orci&vestibulum=pede&ante=venenatis&ipsum=non&primis=sodales&in=sed&faucibus=tincidunt&orci=eu&luctus=felis&et=fusce&ultrices=posuere&posuere=felis&cubilia=sed&curae=lacus&donec=morbi&pharetra=sem&magna=mauris&vestibulum=laoreet&aliquet=ut&ultrices=rhoncus',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AAPL'],
            hashtags: ['#hikingadventures'],
            keywords: ['apple'],
            mentions: ['John Doe', 'Michael Brown']
        },
        actions: {
            retweet: 3,
            post: 1,
            quote: 1
        }
    },
    {
        id: 'f489e1fd-2261-471c-b51a-2fa05db3669d',
        title: 'Killing Machine, The (Icarus)',
        admin_id: 'b1f22a42-d67e-47c5-a332-98e2eb5e8c1c',
        description:
            'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',
        url: 'http://i2i.jp/egestas/metus/aenean/fermentum/donec/ut.xml?suscipit=condimentum&ligula=neque&in=sapien&lacus=placerat&curabitur=ante&at=nulla',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AAPL'],
            hashtags: ['#selfcare', '#travelbug'],
            keywords: ['mountain']
        },
        actions: {
            retweet: 5,
            post: 5,
            comment: 2
        }
    },
    {
        id: 'c8fa0dfa-90eb-4a47-9366-ec687ea09f3a',
        title: 'Out of Nature',
        admin_id: 'af5f606e-78b3-4deb-91c5-be38740b3439',
        description: 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
        url: 'http://newsvine.com/molestie/lorem/quisque/ut.json?eleifend=quam&donec=sollicitudin&ut=vitae&dolor=consectetuer&morbi=eget&vel=rutrum&lectus=at&in=lorem&quam=integer&fringilla=tincidunt&rhoncus=ante&mauris=vel&enim=ipsum&leo=praesent&rhoncus=blandit&sed=lacinia&vestibulum=erat&sit=vestibulum&amet=sed&cursus=magna&id=at&turpis=nunc&integer=commodo&aliquet=placerat&massa=praesent&id=blandit&lobortis=nam&convallis=nulla&tortor=integer&risus=pede&dapibus=justo&augue=lacinia&vel=eget&accumsan=tincidunt&tellus=eget&nisi=tempus&eu=vel&orci=pede&mauris=morbi&lacinia=porttitor&sapien=lorem&quis=id&libero=ligula&nullam=suspendisse&sit=ornare&amet=consequat&turpis=lectus&elementum=in&ligula=est&vehicula=risus&consequat=auctor&morbi=sed&a=tristique&ipsum=in&integer=tempus&a=sit&nibh=amet&in=sem&quis=fusce&justo=consequat',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$AMZN'],
            hashtags: ['#travelbug', '#selfcare'],
            keywords: ['book', 'ocean'],
            mentions: ['Sarah Lee']
        },
        actions: {
            retweet: 4,
            post: 5,
            comment: 3,
            quote: 1
        }
    },
    {
        id: 'b60c4eb9-0ee6-4e76-b9b1-b1c8899fef19',
        title: 'The Little Matchgirl',
        admin_id: '98a35459-9381-4d96-a886-319c4ea235c7',
        description:
            'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.',
        url: 'http://npr.org/nunc.html?massa=volutpat&quis=dui&augue=maecenas&luctus=tristique&tincidunt=est&nulla=et&mollis=tempus&molestie=semper&lorem=est&quisque=quam&ut=pharetra&erat=magna&curabitur=ac&gravida=consequat&nisi=metus&at=sapien',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            hashtags: ['#foodie'],
            keywords: ['book', 'mountain'],
            mentions: ['Michael Brown']
        },
        actions: {
            retweet: 5,
            post: 3
        }
    },
    {
        id: '75f21062-d8c2-4ee0-ba70-874167e2c8eb',
        title: 'Killing of Sister George, The',
        admin_id: 'dcf31fd8-0fa9-4195-8633-fe09f084c643',
        description:
            'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.',
        url: 'https://nhs.uk/vulputate/ut/ultrices/vel/augue.aspx?augue=ipsum&quam=dolor&sollicitudin=sit&vitae=amet&consectetuer=consectetuer&eget=adipiscing&rutrum=elit&at=proin&lorem=risus&integer=praesent&tincidunt=lectus&ante=vestibulum',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$GOOGL'],
            hashtags: ['#fitnessjourney', '#doglover'],
            keywords: ['mountain'],
            mentions: ['Michael Brown', 'Sarah Lee']
        },
        actions: {
            retweet: 2,
            post: 5,
            comment: 5
        }
    },
    {
        id: '2656d8c6-a837-4571-bf6e-b64980082ffe',
        title: 'Mentiras y gordas',
        admin_id: 'dac28d86-2c4e-4d6d-add9-604ba7b0bf04',
        description:
            'Phasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.',
        url: 'https://google.cn/nam/tristique/tortor/eu/pede.json?montes=in&nascetur=felis&ridiculus=eu&mus=sapien&etiam=cursus&vel=vestibulum&augue=proin&vestibulum=eu&rutrum=mi&rutrum=nulla&neque=ac&aenean=enim&auctor=in&gravida=tempor&sem=turpis&praesent=nec&id=euismod&massa=scelerisque&id=quam&nisl=turpis&venenatis=adipiscing&lacinia=lorem&aenean=vitae&sit=mattis&amet=nibh&justo=ligula&morbi=nec&ut=sem&odio=duis&cras=aliquam&mi=convallis&pede=nunc&malesuada=proin&in=at&imperdiet=turpis&et=a&commodo=pede&vulputate=posuere&justo=nonummy&in=integer&blandit=non&ultrices=velit&enim=donec&lorem=diam&ipsum=neque&dolor=vestibulum&sit=eget&amet=vulputate&consectetuer=ut&adipiscing=ultrices&elit=vel&proin=augue&interdum=vestibulum&mauris=ante&non=ipsum&ligula=primis&pellentesque=in&ultrices=faucibus&phasellus=orci&id=luctus&sapien=et&in=ultrices&sapien=posuere&iaculis=cubilia&congue=curae&vivamus=donec&metus=pharetra&arcu=magna&adipiscing=vestibulum&molestie=aliquet&hendrerit=ultrices&at=erat&vulputate=tortor&vitae=sollicitudin&nisl=mi&aenean=sit&lectus=amet',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$NFLX', '$GOOGL'],
            hashtags: ['#travelbug', '#coffeelover'],
            mentions: ['Sarah Lee', 'Alex Johnson']
        },
        actions: {
            retweet: 5,
            post: 1,
            comment: 4,
            quote: 5
        }
    },
    {
        id: '4ab7106f-8cad-4a97-8798-04ff10a1a825',
        title: 'Vlad',
        admin_id: 'ab2f5003-cea1-4688-97aa-6e986ed16861',
        description:
            'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
        url: 'https://istockphoto.com/ac/nibh/fusce/lacus/purus/aliquet.aspx?nibh=odio&in=elementum&hac=eu&habitasse=interdum&platea=eu&dictumst=tincidunt&aliquam=in&augue=leo&quam=maecenas&sollicitudin=pulvinar&vitae=lobortis&consectetuer=est&eget=phasellus&rutrum=sit&at=amet&lorem=erat&integer=nulla',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$TSLA'],
            keywords: ['mountain', 'book']
        },
        actions: {
            retweet: 4,
            post: 4,
            comment: 5,
            quote: 5
        }
    },
    {
        id: 'df5e7cb2-eda2-48d8-9050-1fcad188bff9',
        title: 'Amu',
        admin_id: 'f8e4d79f-8270-4f0a-a27c-333bcdc13cc8',
        description:
            'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        url: 'http://bing.com/posuere.aspx?maecenas=etiam&tincidunt=pretium&lacus=iaculis&at=justo&velit=in&vivamus=hac&vel=habitasse&nulla=platea&eget=dictumst&eros=etiam&elementum=faucibus&pellentesque=cursus&quisque=urna&porta=ut&volutpat=tellus&erat=nulla&quisque=ut',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$TSLA', '$AMZN'],
            hashtags: ['#hikingadventures', '#foodie'],
            keywords: ['ocean']
        },
        actions: {
            retweet: 2,
            post: 1
        }
    },
    {
        id: '05cd1ac9-2a39-4dc4-9428-4a890fa66bbe',
        title: 'Challenger Disaster, The',
        admin_id: 'df9c34b1-e202-4c92-b87d-897a29297121',
        description:
            'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.',
        url: 'https://mozilla.com/rhoncus/aliquet/pulvinar/sed/nisl.json?sed=dui&vel=vel&enim=sem&sit=sed&amet=sagittis&nunc=nam&viverra=congue&dapibus=risus&nulla=semper&suscipit=porta&ligula=volutpat&in=quam&lacus=pede&curabitur=lobortis&at=ligula&ipsum=sit&ac=amet&tellus=eleifend&semper=pede&interdum=libero&mauris=quis&ullamcorper=orci&purus=nullam&sit=molestie&amet=nibh&nulla=in&quisque=lectus&arcu=pellentesque&libero=at&rutrum=nulla&ac=suspendisse&lobortis=potenti&vel=cras&dapibus=in&at=purus&diam=eu&nam=magna&tristique=vulputate&tortor=luctus',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$NFLX', '$GOOGL'],
            hashtags: ['#coffeelover']
        },
        actions: {
            post: 1,
            comment: 4,
            quote: 3
        }
    },
    {
        id: 'ecc6da8d-279a-4c9f-aab4-0bb5793e5e85',
        title: 'King Rat',
        admin_id: '9ee0b9f9-bf9b-4278-9450-1d46cffbe6ff',
        description: 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
        url: 'http://ning.com/arcu/libero/rutrum/ac/lobortis/vel/dapibus.png?posuere=hac&felis=habitasse&sed=platea&lacus=dictumst&morbi=etiam&sem=faucibus&mauris=cursus&laoreet=urna&ut=ut&rhoncus=tellus&aliquet=nulla&pulvinar=ut',
        createdAt: '11/12/2023 00:00:00Z',
        updatedAt: '11/11/2023 00:00:00Z',
        text: 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',
        endTime: '6/22/2023 00:00:00Z',
        entities: {
            cashtags: ['$GOOGL'],
            mentions: ['Alex Johnson', 'Michael Brown']
        },
        actions: {
            retweet: 2,
            quote: 5
        }
    }
];
