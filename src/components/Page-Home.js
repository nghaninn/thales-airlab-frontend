import React, { useEffect, useState } from "react"
import { Result, Button, Spin, DatePicker, Form, TreeSelect, Select } from "antd"
import { Link } from "react-router-dom"
import API from "@aws-amplify/api"
import { getTopAirportSID, getTopAirportSTAR, listAirports, loadData } from "../backend/graphql/queries"
import { Auth } from "@aws-amplify/auth"
import CardType from "./Component-Card-Type"

const Home = () => {
    const [dataLoaded, setDataLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { Option } = Select;
    const { TreeNode, SHOW_PARENT } = TreeSelect
    const [table, setTable] = useState(-1)
    const [sid, setSid] = useState([])
    const [star, setStar] = useState([])
    const [filter, setFilter] = useState({
        airports: [0]
    })

    useEffect(() => {
        _listAllAirport()
        form.setFieldsValue({
            top: 2,
            airport: 0
        })

        return () => { }
    }, [])

    // useEffect(() => {
    //     console.log(loading)
    // }, [loading])

    useEffect(() => {
        if (table !== -1 && table.length > 0) {
            // setDataLoaded(true);
        }
    }, [table])


    const handleLoadData = async () => {
        console.log('handleLoadData');
        setLoading(true)
        try {
            await Auth.currentCredentials();
            const result = await API.graphql({
                query: loadData,
                authMode: "AMAZON_COGNITO_USER_POOLS"
            })
            console.log(result);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setDataLoaded(true);
        }
    }

    const onFinish = (values) => {
        console.log(values);
        _searchAirport(values);
    }

    const _listAllAirport = async () => {
        setLoading(true);
        try {
            // console.log(await Auth.signOut());
            // console.log(await Auth.currentCredentials());
            // console.log(await Auth.currentAuthenticatedUser());
            const result = await API.graphql({
                query: listAirports,
                authMode: "AMAZON_COGNITO_USER_POOLS"
            })
            console.log(result);

            setTable(result.data.listAirports.items)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const _searchAirport = async (values) => {
        setLoading(true)
        try {
            const variables = {};

            if (values?.top > 0) {
                variables.top = Number(values.top);
            }
            if (values?.airport && values.airport !== 0) {
                variables.airportIcaos = values.airport
            }

            const result = await API.graphql({
                query: getTopAirportSID,
                authMode: "AMAZON_COGNITO_USER_POOLS",
                variables
            })

            let topSID = JSON.parse(result.data.getTopAirportSID) ?? [];
            console.log('getTopAirportSID', topSID);
            setSid(topSID);

            const result2 = await API.graphql({
                query: getTopAirportSTAR,
                authMode: "AMAZON_COGNITO_USER_POOLS",
                variables
            })

            let topSTAR = JSON.parse(result2.data.getTopAirportSTAR) ?? [];
            console.log('getTopAirportSTAR', topSTAR);
            setStar(topSTAR)

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const renderAirportOptions = (data) => {
        if (data !== -1)
            return data?.map(s => (
                <TreeNode value={s.uid} title={s.icao} />
            ))
    }

    return (
        <Spin spinning={loading}>
            <div className="homepage row">
                <h1 className="row1">Coding Assignment</h1>
                <div>
                    <Button disabled={dataLoaded} onClick={handleLoadData}>Load Data</Button>
                </div>
            </div>
            <div>
                <Form
                    className="row"
                    form={form}
                    layout={"horizontal"}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name={"airport"}
                        label={"Airport"}
                        style={{ flex: 1 }}
                    >
                        <TreeSelect
                            showSearch
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            treeCheckable
                            placeholder="Select Airports"
                            showCheckedStrategy={SHOW_PARENT}
                            filterTreeNode={(input, treenode) =>
                                treenode.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        // value={filter.clinics}
                        // onChange={handleTreeSelectChange}
                        >
                            <TreeNode value={0} title="All">
                                {renderAirportOptions(table)}
                            </TreeNode>
                        </TreeSelect>
                    </Form.Item>
                    <Form.Item
                        label={"Top"}
                        name={"top"}
                    >
                        <Select defaultValue={2}
                        >
                            <Option value="1">1</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            <Option value="4">4</Option>
                            <Option value="5">5</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            onClick={() => onFinish(form.getFieldsValue())}
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            {dataLoaded ?
                <div>
                    <CardType title={"SIDs"} array={sid}/>
                    <CardType title={"STARs"} array={star}/>
                </div> :
                <></>
            }
        </Spin>
    )
}

export default Home