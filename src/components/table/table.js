import React, { Component } from 'react';

export default class Table extends Component {
    render() {
        return(
          <div>
            <table>
              <thead>
                <th>name</th>
                <th>age</th>
              </thead> 
              <tbody>
                <tr>
                  <td>luo</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>zhao</td>
                  <td>24</td>
                </tr>
              </tbody>
            </table>
          </div> 
        )
    }
}
