import React, { useEffect, useState } from 'react';
import { StyledDraw } from '@/app/styled-components/Draw';
import { PlaceType, PlaceBookedType, DrawType } from '../../../types';

const defaultTables = [
  { placeId: 'test1', name: 'test1', status_book: false },
  { placeId: 'test2', name: 'test2', status_book: false },
  { placeId: 'test3', name: 'test3', status_book: false },
  { placeId: 'test4', name: 'test4', status_book: false },
  { placeId: 'test5', name: 'test5', status_book: false },
  { placeId: 'test6', name: 'test6', status_book: false },
  { placeId: 'test7', name: 'test7', status_book: false },
  { placeId: 'test8', name: 'test8', status_book: false },
  { placeId: 'test9', name: 'test9', status_book: false },
  { placeId: 'test10', name: 'test10', status_book: false },
  { placeId: 'test11', name: 'test11', status_book: false },
  { placeId: 'test12', name: 'test12', status_book: false },
];

const defaultDraw = {
  id: '1',
  name: 'shakita',
  dataHTML: `<svg id="testsvg" class="drawing" width="650" height="650" viewBox="0 0 821 822" fill="black" xmlns="http://www.w3.org/2000/svg" > <path d="M2 820V2H53.1132V80.7163H724.076V2H769.509V454.01H819V496.208H604V820H562.623V779.425V496.208H527.736V463.748H724.076V123.726H452.283V296.577H321.66V123.726H139.925H44.1887V463.748H208.887V496.208H44.1887V779.425H483.113V820H2Z" stroke="#D9D9D9" stroke-width="3" /> <path d="M452.283 355.006H410.094V463.748H296.509V496.208H465.264V463.748H452.283V355.006Z" stroke="#D9D9D9" stroke-width="3" /> <rect x="124" y="122" width="49" height="200" fill="#D9D9D9" /> <circle cx="275" cy="167" r="25" fill="#D9D9D9" id="test1" class="test1" /> <circle cx="167" cy="727" r="25" fill="#D9D9D9" id="test2" class="test2" /> <circle cx="378" cy="722" r="25" fill="#D9D9D9" id="test3" class="test3" /> <rect x="173" y="532" width="50" height="85" transform="rotate(90 173 532)" fill="#D9D9D9" id="test7" class="test7" /> <rect x="701" y="386" width="50" height="85" transform="rotate(90 701 386)" fill="#D9D9D9" id="test8" class="test8" /> <rect x="536" y="230" width="50" height="85" transform="rotate(-180 536 230)" fill="#D9D9D9" id="test9" class="test9" /> <rect x="701" y="272" width="50" height="85" transform="rotate(90 701 272)" fill="#D9D9D9" id="test10" class="test10" /> <rect x="701" y="152" width="50" height="85" transform="rotate(90 701 152)" fill="#D9D9D9" id="test11" class="test11" /> <circle cx="353" cy="407" r="25" fill="#D9D9D9" id="test4" class="test4" /> <circle cx="104" cy="407" r="25" fill="#D9D9D9" id="test5" class="test5" /> <circle cx="378.5" cy="547.5" r="25" fill="#D9D9D9" id="test6" class="test6" /></svg>`,
};

const Draw: React.FC<{
  tables?: PlaceType[];
  tablesActive?: PlaceBookedType[];
  tablesChoosed?: string;
  draw?: DrawType;
  choseHandler: (place: string) => void;
}> = (props) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [tables, setTables] = useState<PlaceType[]>([]);
  const [tablesActive, setTablesActive] = useState<PlaceBookedType[]>(
    props.tablesActive ?? [],
  );
  const [tablesChoosed, setTablesChoosed] = useState<string>(
    props.tablesChoosed ?? '',
  );
  const [drawing, setDrawing] = useState<DrawType>();

  const Teg = (data: string) =>
    new DOMParser()
      .parseFromString(data, 'image/svg+xml')
      .getElementsByTagName('svg')[0];

  const myClick = (place: string) => {
    const handler = () => {
      if (
        !tablesActive.find((table) => table.place === place) ||
        tablesActive.length === 0
      ) {
        setTablesChoosed(place);
      } else {
        document.getElementById(place)?.removeEventListener('click', handler);
      }
    };
    return handler;
  };

  const getDrawnig = async () => {
    setTables(props.tables ?? defaultTables);
    setDrawing(props.draw ?? defaultDraw);
    setTablesChoosed(props.tablesChoosed ?? '');
  };

  const getTables = async () => {
    try {
      setTablesActive([]);
      setTablesChoosed('');
    } catch (e) {
      console.error('Error', e);
    }
  };

  const addListeners = () => {
    tables.forEach(({ placeId }) => {
      document
        .getElementById(placeId)
        ?.addEventListener('click', myClick(placeId));
    });
  };

  useEffect(() => {
    getDrawnig();
    addListeners();
  }, [props]);

  useEffect(() => {
    props.choseHandler(tablesChoosed);
  }, [tablesChoosed]);

  useEffect(() => {
    addListeners();
  }, [tablesActive]);

  useEffect(() => {
    if (divRef.current && drawing?.dataHTML) {
      divRef.current.appendChild(Teg(drawing?.dataHTML));
    }
    addListeners();
  }, [drawing]);

  return (
    <StyledDraw
      ref={divRef}
      places={tables}
      placesActive={tablesActive}
      choosedPlaces={tablesChoosed}
    />
  );
};

export default Draw;
