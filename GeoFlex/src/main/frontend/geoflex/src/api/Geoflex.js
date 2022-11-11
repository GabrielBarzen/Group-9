import React, { Component } from 'react';
import axios from 'axios';

export default class Geoflex {
    constructor(data) {
        this.data = data;

    }
    handleAddNew = (data) => {
        //var data = '{"route":\r\n{\r\n  "title":"This is the title",\r\n  "description":"This quiz is for testing purposes.",\r\n  "type": "QUIZ",\r\n  "locations": 5\r\n}\r\n}';

        var config = {
            method: 'post',
            url: '/admin/route/',
            headers: {
                'Content-Type': 'text/plain',
                'Cookie': 'authentication-token=NI; user-id=1'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleAdminOverview = () =>{
        var config = {
            method: 'get',
            url: '/admin/routes',
            headers: { 
            }
          };

          axios(config)
          .then(function (response) {
            return response.data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
}