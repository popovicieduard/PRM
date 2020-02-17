<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="text-center text-md-left my-1">
                    <span class="h2 text-capitalize">Dashboard</span>
                </el-col>
                <el-col :xs="24" :sm="12" class="text-center text-md-right">
                    <el-date-picker
                    v-model="dateRange"
                    align="right"
                    type="daterange"
                    unlink-panels
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    format="dd MMM yyyy"
                    :picker-options="pickerOptions"
                    @change="changeDateRange"
                    >
                    </el-date-picker>
                </el-col>
            </el-row>
        </div>        
        <el-row :gutter="12" class="card-row">
            <el-col :span="24">
                <h4 class="font-weight-bold">Statistics for: {{ dateRange ? $moment(dateRange[0]).format('DD MMMM YYYY') + ' - ' + $moment(dateRange[1]).format('DD MMMM YYYY') : ''}}</h4>
            </el-col>
            <el-col :span="24" v-if="loading">
                <el-row :gutter="12">
                    <el-col :span="24" class="mt-4">
                        <content-loader
                            :height="32"
                            :speed="2"
                            primaryColor="#9814fd"
                            secondaryColor="#f32cfb"
                        >
                        <circle cx="80" cy="9" r="8" /> 
                        <rect x="8" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="8" y="12" rx="1" ry="1" width="35" height="5" />

                        <circle cx="180" cy="9" r="8" /> 
                        <rect x="108" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="108" y="12" rx="1" ry="1" width="35" height="5" />

                        <circle cx="280" cy="9" r="8" /> 
                        <rect x="208" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="208" y="12" rx="1" ry="1" width="35" height="5" />

                        <circle cx="380" cy="9" r="8" /> 
                        <rect x="308" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="308" y="12" rx="1" ry="1" width="35" height="5" />
                        </content-loader>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" v-else>
                <el-row :gutter="12">
                    <el-col :xs="24" :md="12" :lg="6" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Spend</h5>
                                    <h3 class="card-row__numbers text-success">{{ statistics.spend | numFormat('0,0.00') }} USD</h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-spend"></i>
                                </el-col>
                            </el-row>
                        </el-card>     
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="6" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Clicks</h5>
                                    <h3 class="card-row__numbers">{{ statistics.clicks }}</h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-click"></i>
                                </el-col>
                            </el-row>
                        </el-card>                        
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="6" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Leads</h5>
                                    <h3 class="card-row__numbers">{{ statistics.leads }}</h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-lead"></i>
                                </el-col>
                            </el-row>
                        </el-card>     
                    </el-col>
                    <el-col :xs="24" :md="12" :lg="6" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Conversion Rate</h5>
                                    <h3 class="card-row__numbers">{{ statistics.clicks ? (statistics.leads / statistics.clicks * 100).toFixed(2) : 0 }}%</h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-conversion"></i>
                                </el-col>
                            </el-row>
                        </el-card>     
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import moment from 'moment'

export default {
    props: {
        statistics: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    data(){
        return {
            dateRange: [moment().startOf('month').format(), moment().endOf('month').format()],
            pickerOptions: {
                shortcuts: [
                     {
                        text: 'Today',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('day').format(), moment().endOf('day').format()]);
                        }
                    }, {
                        text: 'Yesterday',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'days').startOf('day').format(), moment().subtract(1, 'days').endOf('day').format()]);
                        }
                    }, {
                        text: 'This month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().startOf('month').format(), moment().endOf('month').format()]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                        picker.$emit('pick', [moment().subtract(1, 'months').startOf('month').format(), moment().subtract(1, 'months').endOf('month').format()]);
                        }
                    }
                ]
            },
        };
    },
    methods: {
        changeDateRange(){
            this.$emit('loading')
            this.$emit('changeDate', this.dateRange)
        }
    },
}
</script>

<style lang="scss" scoped>

.card-row{
    min-height: 160px;
    &__title{
        color: #8898aa !important;
        font-weight: 700 !important;
        text-transform: uppercase;
    }

    &__numbers{
        font-weight: 700 !important;
        margin: 0 !important;
    }

    .icon-click{
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url("data:image/png;base64,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")
            50% 50% no-repeat;
        background-size: 100%;
    }

    .icon-lead{
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFWElEQVRo3u1YXVBUZRhGpx+vHGv6ccyRbdg1FlQUUgQRWFh+VhAQFtpoRzHdZfl1UpKkET5TRmZsIieVnCTGCy6yMotGmGjGCrBmyrrxupuGUpvqTscZ2Kf33c4uK+d8uwucThfxzjxz9nu/532e7/3Ot3sOxMUtxmIsxrxi9QGkM0IJgYdWNWPf6mbUxsVhSTBtasTKVa1oe4Cr1D/TgkM8P5PFEq5nHdaTei00yLQ4vgl+AkzNECYfTPT5Oo8Za5ow8uwBPB3fDAeNbyv5KVMTjplb8CjX8FjJ3yHsSPDhKboOBzWo9lvWXdOILiXnp7oiXRow+9BlbsA04QIBhLuEv8yNcFp8qA+NG+An/JTQgDRa4IDC/UO5vs95nld4f3Id5byso9TfVbjvBa7kq0sDiT6IxHpM021eStc2qw/nrE2ID84neZBMnMFELzp4x4P557yoJu4lqqkMbQbNM8/qRT/XhXmYrPXoo7lDig/YV5cG1nkh1nmoAQOD/MC+uoil7ofYtM/YBsgP7KuL2JaXITbvNbYB8gP76iKWWQeRsQd+IxsgP7CvLmLZuyEIhjZAfmBfXcTy3BAEQxsgP7CvLmKFtRAEQxsgP7CvLmKlLogSl7ENkB/YNypR0EOjogbu8hq0R8AoAVE4AbBW+LtRMCgvpHAhdzaf/XguagNVVXBXOQE94XTiJZVPZL7Q4mvlVeGqhCAgOK6phI3HLzhRGK32xV0oZq7LObODgXHlws9uzDpuIrl3/dOA14uHaTxB40n+HK22uhqPEPcWYTzIZy23hnHAR4YK9RGS6aiirgKirhzYXQYbXScI03sqkB/rTtWVoZhr9pbjuqIB1lTxOC+DjF8RQwPeMgjPTkDBZH2p9uJbv4OFoTXnKUHR/p34LajDmgs9QjHrNJZCNJQAPlqEN0372HR/g3PdXwMKzsqOE2uwFmtq+cjgK1UfIZmOemd3QLQ4Zr7Es2PgC1gufAmEg3MyPmuxplZeBhlfK6+Kg8UQB4vkDQzRYj8fBsIxFKEB1mLNhR6hmHUOF0IcLgDa7SgSdAy0OD9cwdnvPwUUnNF8IFLtq/koZi3WlPm15WMDzbe2F8IlcrFMuq4oOqHosEMQoODXjnwUaPF++QgWhqZGHhxH7LgdpqNp/HoBfDQ3FeQdKcBNamKFZF1SnQeiMw+CgKM25HTaMEafp4Ud9lhvNfEdBD9hgupyWYs1VXfIgeWUv3c0D5+8loXHOmmjaHy/y4Zuia6mjiqO50IQAt+B8/QrRJ/Hj+dg8nxa9AcZHxvi3+KaIJ+1WHM29w0b0pS50pB3Dm7QeEiyLk0dVZzMhiCEvsTdObDxuGd79P/J9OTAwdyTuTM/g4FxtsYdSMdyyt8jXHkrA4/TtZBwn3BCsi5NHVWc2g73qSxAT7y5Tf0yx0F5H81PhXhZuNkr+Q4onOgNgF59e8nw7Uz0SLEN43RFRI6C0xmohcbrdDBo99cTr/V0JlwDEX6F2K83U6c/aN7ZCnFmq/xZ8W8E+7GvLmJ9JPRuurENsF+fXg30b4Ho32xsA+zHvrqIXXwe4mKasQ2wH/vOqWgwFWJwE2A4UtULleUjxgcbIS6lAB+moMcosB/7zl6LLB8xPt4AcXm9sUeF/dg31nzEGEpC12fJoCosNaoB8vMTjoXn2J/XweuZk9hwEuqHrcBIMlKMaoD8fiZcDs+xP6/jaiI8cxK7asaTo4n4nXBjZC1SIj1R9QryEgT/qBWvXNuIFexL4x8Jd66txRNzFvzKggIq5GL8h2B/+7x3hTsfS4B3zIITE2b0GIWAXwI889r5xViM/0n8DbM2OZbi0KFfAAAAAElFTkSuQmCC")
            50% 50% no-repeat;
        background-size: 100%;
    }

    .icon-conversion{
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAADo0lEQVRo3u2Wf0yUdRzHn7K2VnNrq6XW0lbtpnWyvCukRLrwKOTHccjwBAVBASEWrMSo3OyxTfOfWE77odWKmq6OBJMWmCcm3q1l9Uc//Ce2+qM/Wv/AMmeryb36fG7edrLIyHvgebZ7b689z/P5fr6fz+c9vnzBMDLKKCPLtWOYeeYpmhR9d9TwXcfJ7jrBmMBFxjTmGANvRYi9GYFUNOYYA+GjnBWYwFnHGBgYIDbwCUwgOuODPfsFN22L8vG2U5zTp37/U17sCA/E+hkVuMioxmbcwCtD7H51CJK8dpyXJ8s9E2bu9700Kvpui6NxaJA+gRT6HHOuVcP9BKP9jAvoU45FmaMMqH7sI3uklyf1OdW95knyXzhJx/bPeMRxxsOfUpd6rX5wlPXT07mSWfPa8N76BP4r4dB7dA+H+TqJfmtca2sPS2af08ENC1r58o5WsJjT2ivtBlzNNAq4NvG4qwW/RbQmekivtBtwN2G6G8HqU6o9tFfaC3saMD0bYdkGZls1vNbWHtor7cWX1vFMTh3krGdEOGYRI9pDe6XdwPJ1ePJqGBcu5NUSWV7DsXSiNRO1tUctSyz5EResZbN/LayoZocFtXcmaq/jKUt/yYrWsFegqIpNaasZoj5RM8QbVl8SRqX8oSmvpF/4q2I1/iutJ3UeFv4MVjLo83GNMR0KBJgdquAb4bdQOe7/W6eqgoVSY1Q4EwxyozGdqi3htpogPws/VQWYM+XhS7lZ9o7UlPFL9SoWGDOh+lI8GwOc2xDgdFMp1//XfXU+rpM9sYYA5+vLWGrMpFqKKRYuNBfTY5pcffkdXNVSwgHZM95cQrlhB7WtpKO9ENpXXv56bStkZyL3MTbbYviktjzK6wJbCiiaLOfpQlYlciTXVsOrTLkCt+bz3dYVfJ4a7/Qz/7l8OhVZ+0H41pyu63Kq2u5jl/DHBGM+iZHCLlsOr3oxD1PgX9bRHNsaeCkXs2vZpQZ25zJf4p2KrmmObQ3seQhz74OXGtiTg09jSTTHtgb2ZWPuz578CMlaXHNsa6Dbw/PveGGfl2tT4+96ye320ilr8bfvt7GBg/dRcHAJceGr9z0sSsYPeDAlhqLvtjWg6llM2YdZ/CqcF9qRfx2Sa/Id78myuQFVbxa3HLmXwwJC5LCb2zUu7/GP3A4wkNTgIhqE34WxwYVUy3N84B4HGVBFXNw55CIqoJxwEXKUAVXYYFb0blbH7mKN44bPKCOb628B6mvtr6e59AAAAABJRU5ErkJggg==")
            50% 50% no-repeat;
        background-size: 100%;
    }

    .icon-spend{
        display: inline-block;
        width: 48px;
        height: 48px;
        background: url("data:image/png;base64,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")
            50% 50% no-repeat;
        background-size: 100%;
    }
}
</style>