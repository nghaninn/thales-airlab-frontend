import React, { useEffect, useState } from "react"
import { Result, Button, Spin, DatePicker, Form, TreeSelect } from "antd"
import { Link } from "react-router-dom"
import API from "@aws-amplify/api"
import { listAirports } from "../backend/graphql/queries"
import { Auth } from "@aws-amplify/auth"
import CardType from "./Component-Card-Type"

const Home = () => {
    const [dataLoaded, setDataLoaded] = useState(true)
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const { TreeNode, SHOW_PARENT } = TreeSelect
    const [table, setTable] = useState(-1)
    const [filter, setFilter] = useState({
        airports: [0]
    })

    useEffect(() => {
        _listAllAirport()

        return () => { }
    }, [])

    // useEffect(() => {
    //     console.log(loading)
    // }, [loading])

    useEffect(() => {
        if (table !== -1) {
            setDataLoaded(true);
        }
    }, [table])


    const handleLoadData = () => {
        console.log('handleLoadData');

        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false)
            clearTimeout(timer)
        }, 1000)
    }

    const onFinish = (values) => {

    }

    const _listAllAirport = async () => {
        setLoading(loading);
        try {
            await Auth.currentCredentials();
            const result = await API.graphql({
                query: listAirports,
                authMode: "AWS_IAM"
            })
            // console.log(result);

            setTable(result.data.listAirports.items)
        } catch (err) {
            console.log(err);
        }
    }

    const _searchAirport = async () => {

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
                    <CardType title={"SIDs"} />
                    <CardType title={"STARs"} />
                </div> :
                <></>
            }
        </Spin>
    )
}

export default Home