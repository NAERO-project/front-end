import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalesStatistics, updateInputs } from "../../../apis/DashboardApiCall";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SalesStatistics() {

    const dispatch = useDispatch();
    const { inputs, data } = useSelector(state => state.salesStatistics);
    const [formInputs, setFormInputs] = useState(inputs);

    // Update Local form state when an input changes
    const handleInputChange = (key, value) => {
        setFormInputs(prevInputs => ({
            ...prevInputs,
            [key]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        dispatch(updateInputs('getSalesStatistics', formInputs));
        dispatch(fetchSalesStatistics(formInputs)); // Dispatch action to fetch data
    };

    // Determin chart type based on the value of the specification
    const isSpecificationEmpty = !formInputs.specification || formInputs.specification.trim() === '';

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        카테고리 옵션
                    <select
                        value={formInputs.categoryOption || ''}
                        onChange={e => handleInputChange('categoryOption', e.target.value)}
                    >
                        <option value="category">카테고리</option>
                        <option value="brand">브랜드</option>
                        <option value="product">상품</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        인텍스 옵션
                        <select
                            value={formInputs.indexOption || ''}
                            onChange={e => handleInputChange('indexOption', e.target.value)}
                        >
                            <option value="index">인덱스</option>
                            <option value="amount">매출액</option>
                            <option value="quantity">판매량</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        시작 일자
                        <input
                            type="date"
                            value={formInputs.startDate || ''}
                            onChange={e => handleInputChange('startDate', e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        종료 일자
                        <input
                            type="date"
                            value={formInputs.endDate || ''}
                            onChange={e => handleInputChange('endDate', e.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        개별 조회
                        <input
                            type="text"
                            value={formInputs.specification || ''}
                            onChange={e => handleInputChange('specification', e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit">조회</button>
            </form>

            {/* Render chart based on the form data */}
            {data ? (
              <div>
              <h4>Chart Visualization</h4>
              {isSpecificationEmpty ? (
                <BarChart
                  width={500}
                  height={300}
                  data={data} // Fetched data used here
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ratio" fill="#82ca9d" />
                </BarChart>
              ) : (
                <LineChart
                  width={500}
                  height={300}
                  data={data} // Fetched data used here
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              )}
            </div>
            ) : (
            <p>No data available yet. Please search to fetch data</p>
            )}
        </>
    )
}

export default SalesStatistics;