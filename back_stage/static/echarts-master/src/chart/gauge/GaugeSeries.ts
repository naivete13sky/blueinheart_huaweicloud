/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import createSeriesDataSimply from '../helper/createSeriesDataSimply';
import SeriesModel from '../../model/Series';
import {
    SeriesOption,
    CircleLayoutOptionMixin,
    LineStyleOption,
    ColorString,
    LabelOption,
    ItemStyleOption,
    OptionDataValueNumeric,
    StatesOptionMixin,
    SeriesEncodeOptionMixin,
    DefaultStatesMixinEmphasis,
    CallbackDataParams
} from '../../util/types';
import GlobalModel from '../../model/Global';
import SeriesData from '../../data/SeriesData';

// [percent, color]
type GaugeColorStop = [number, ColorString];

interface LabelFormatter {
    (value: number): string
}

interface PointerOption {
    icon?: string
    show?: boolean
    /**
     * If pointer shows above title and detail
     */
    showAbove?: boolean,
    keepAspect?: boolean
    itemStyle?: ItemStyleOption
    /**
     * Can be percent
     */
    offsetCenter?: (number | string)[]
    length?: number | string
    width?: number
}

interface AnchorOption {
    show?: boolean
    showAbove?: boolean
    size?: number
    icon?: string
    offsetCenter?: (number | string)[]
    keepAspect?: boolean
    itemStyle?: ItemStyleOption
}

interface ProgressOption {
    show?: boolean
    overlap?: boolean
    width?: number
    roundCap?: boolean
    clip?: boolean
    itemStyle?: ItemStyleOption
}

interface TitleOption extends LabelOption {
    /**
     * [x, y] offset
     */
    offsetCenter?: (number | string)[]
    formatter?: LabelFormatter | string

    /**
     * If do value animtion.
     */
    valueAnimation?: boolean
}

interface DetailOption extends LabelOption {
    /**
     * [x, y] offset
     */
    offsetCenter?: (number | string)[]
    formatter?: LabelFormatter | string

    /**
     * If do value animtion.
     */
    valueAnimation?: boolean
}

interface GaugeStatesMixin {
    emphasis?: DefaultStatesMixinEmphasis
}
export interface GaugeStateOption<TCbParams = never> {
    itemStyle?: ItemStyleOption<TCbParams>
}

export interface GaugeDataItemOption extends GaugeStateOption,
    StatesOptionMixin<GaugeStateOption<CallbackDataParams>, GaugeStatesMixin> {
    name?: string
    value?: OptionDataValueNumeric
    pointer?: PointerOption
    progress?: ProgressOption
    title?: TitleOption
    detail?: DetailOption
}
export interface GaugeSeriesOption extends SeriesOption<GaugeStateOption, GaugeStatesMixin>,
    GaugeStateOption<CallbackDataParams>,
    CircleLayoutOptionMixin, SeriesEncodeOptionMixin {
    type?: 'gauge'

    // override radius
    radius?: number | string

    startAngle?: number
    endAngle?: number
    clockwise?: boolean

    min?: number
    max?: number

    splitNumber?: number

    itemStyle?: ItemStyleOption

    axisLine?: {
        show?: boolean
        roundCap?: boolean
        lineStyle?: Omit<LineStyleOption, 'color'> & {
            color?: GaugeColorStop[]
        }
    },

    progress?: ProgressOption

    splitLine?: {
        show?: boolean
        /**
         * Can be percent
         */
        length?: number
        distance?: number
        lineStyle?: LineStyleOption
    }

    axisTick?: {
        show?: boolean
        splitNumber?: number
        /**
         * Can be percent
         */
        length?: number | string
        distance?: number
        lineStyle?: LineStyleOption
    }

    axisLabel?: Omit<LabelOption, 'rotate'> & {
        formatter?: LabelFormatter | string
        rotate?: 'tangential' | 'radial' | number
    }

    pointer?: PointerOption
    anchor?: AnchorOption

    title?: TitleOption
    detail?: DetailOption

    data?: (OptionDataValueNumeric | GaugeDataItemOption)[]
}

class GaugeSeriesModel extends SeriesModel<GaugeSeriesOption> {

    static type = 'series.gauge' as const;
    type = GaugeSeriesModel.type;

    visualStyleAccessPath = 'itemStyle';

    getInitialData(option: GaugeSeriesOption, ecModel: GlobalModel): SeriesData {
        return createSeriesDataSimply(this, ['value']);
    }

    static defaultOption: GaugeSeriesOption = {
        // zlevel: 0,
        z: 2,
        colorBy: 'data',
        // ??????????????????
        center: ['50%', '50%'],
        legendHoverLink: true,
        radius: '75%',
        startAngle: 225,
        endAngle: -45,
        clockwise: true,
        // ?????????
        min: 0,
        // ?????????
        max: 100,
        // ????????????????????????10
        splitNumber: 10,
        // ????????????
        axisLine: {
            // ?????????????????????show??????????????????
            show: true,
            roundCap: false,
            lineStyle: {       // ??????lineStyle??????????????????
                color: [[1, '#E6EBF8']],
                width: 10
            }
        },
        // ????????????
        progress: {
            // ?????????????????????show??????????????????
            show: false,
            overlap: true,
            width: 10,
            roundCap: false,
            clip: true
        },
        // ?????????
        splitLine: {
            // ?????????????????????show??????????????????
            show: true,
            // ??????length????????????
            length: 10,
            distance: 10,
            // ??????lineStyle?????????lineStyle?????????????????????
            lineStyle: {
                color: '#63677A',
                width: 3,
                type: 'solid'
            }
        },
        // ??????????????????
        axisTick: {
            // ??????show????????????????????????????????????
            show: true,
            // ??????split???????????????
            splitNumber: 5,
            // ??????length????????????
            length: 6,
            distance: 10,
            // ??????lineStyle??????????????????
            lineStyle: {
                color: '#63677A',
                width: 1,
                type: 'solid'
            }
        },
        axisLabel: {
            show: true,
            distance: 15,
            // formatter: null,
            color: '#464646',
            fontSize: 12,
            rotate: 0
        },
        pointer: {
            icon: null,
            offsetCenter: [0, 0],
            show: true,
            showAbove: true,
            length: '60%',
            width: 6,
            keepAspect: false
        },
        anchor: {
            show: false,
            showAbove: false,
            size: 6,
            icon: 'circle',
            offsetCenter: [0, 0],
            keepAspect: false,
            itemStyle: {
                color: '#fff',
                borderWidth: 0,
                borderColor: '#5470c6'
            }
        },

        title: {
            show: true,
            // x, y?????????px
            offsetCenter: [0, '20%'],
            // ???????????????????????????????????????????????????TEXTSTYLE
            color: '#464646',
            fontSize: 16,
            valueAnimation: false
        },
        detail: {
            show: true,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: '#ccc',
            width: 100,
            height: null, // self-adaption
            padding: [5, 10],
            // x, y?????????px
            offsetCenter: [0, '40%'],
            // formatter: null,
            // ???????????????????????????????????????????????????TEXTSTYLE
            color: '#464646',
            fontSize: 30,
            fontWeight: 'bold',
            lineHeight: 30,
            valueAnimation: false
        }
    };
}


export default GaugeSeriesModel;
